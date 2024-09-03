import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

const sampleOrders = [
  {
    _id: "66bcea4c480d0a9e1e64fe5a",
    userId: "66bc8ba8b1bb9d801fa576fa",
    cartData: [
      {
        productId: {
          name: "Strawberry Cake Flavour",
          description: "Delicious strawberry cake.",
          price: 98765432323,
          image:
            "https://imgcdn.floweraura.com/chocolate-bliss-heart-cake-9797530ca-A_0.jpg",
        },
        quantity: 2,
        sku: "BBB-Strawberry-004",
      },
      // Add more items here for testing the scroll
    ],
    orderId: "ODID-147-2507520-6839388",
    payment_method: "Credit Card",
    status: "Pending",
    addressId: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      postalCode: "62704",
      country: "INDIA",
    },
    ordertype: "PAID",
    total_price: 0,
    image:
      "https://www.fnp.com/images/pr/l/v20221205202803/chocolate-rose-designer-cake-half-kg_1.jpg",
    createdAt: "2024-08-14T17:33:00.251Z",
    updatedAt: "2024-08-14T17:33:00.251Z",
  },
];

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrderPageAdmin: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [status, setStatus] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleRowClick = (row: any) => {
    setSelectedOrder(row);
    setStatus(row.status);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const handleUpdateStatus = () => {
    // Add API call to update order status here
    console.log("Updated status:", status);
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "Order ID", flex: 1 },
    { field: "total_price", headerName: "Total Price", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <IconButton color="primary" onClick={() => handleRowClick(params.row)}>
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box p={3}>
      {/* <Typography variant="h4" gutterBottom>
    
      </Typography> */}
      <Box height={400} width="100%">
        <DataGrid
          sx={{
            backgroundColor: "white",
          }}
          rows={sampleOrders.map((order) => ({ id: order._id, ...order }))}
          columns={columns}
          //@ts-ignore
          pageSize={5}
          autoHeight
        />
      </Box>

      {/* Order Details Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: 600,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Order Details</Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Order ID"
                fullWidth
                value={selectedOrder?._id || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Total Price"
                fullWidth
                value={selectedOrder?.grandTotal || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Payment Method"
                fullWidth
                value={selectedOrder?.payment_method || ""}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  //@ts-ignore
                  onChange={handleStatusChange}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
              <Typography variant="h6">Cart Items</Typography>
              <Box
                sx={{
                  maxHeight: 200, // Adjust the height as needed
                  overflowY: "auto",
                  mt: 1,
                }}
              >
                {selectedOrder?.cartData.map((item: any, index: number) => (
                  <Card key={index} sx={{ display: "flex", mb: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, borderRadius: "50%" }}
                      image={item.productId.image}
                      alt={item.productId.name}
                    />
                    <CardContent>
                      <Typography variant="body1">
                        {item.productId.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.productId.description}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        SKU: {item.sku}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateStatus}
                sx={{ mt: 2 }}
              >
                Update Status
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default OrderPageAdmin;
