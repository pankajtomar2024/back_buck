import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

// Sample data
const sampleBranches = [
  {
    _id: "1",
    name: "First Branch",
    email: "first.branch@example.com",
    number: "1234567890",
    address: {
      street: "MDA Phase 2",
      city: "Moradabad",
      state: "Uttar Pradesh",
      postalCode: "244001",
      country: "India",
    },
  },
  {
    _id: "2",
    name: "Second Branch",
    email: "second.branch@example.com",
    number: "0987654321",
    address: {
      street: "MG Road",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001",
      country: "India",
    },
  },
];

const BranchList: React.FC = () => {
  const [branches, setBranches] = useState(sampleBranches);
  const [addBranchModalOpen, setAddBranchModalOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleAddBranch = () => {
    // Commented out API call
    // try {
    //   await axios.post('/api/branches', newBranch);
    //   setAddBranchModalOpen(false);
    //   // Fetch updated branches list
    //   const response = await axios.get('/api/branches');
    //   setBranches(response.data.branch);
    // } catch (error) {
    //   console.error('Error adding branch', error);
    // }

    // Adding the new branch to the sample data list
    setBranches([
      //@ts-ignore
      ...branches,
      //@ts-ignore
      { ...newBranch, _id: (branches.length + 1).toString() },
    ]);
    setAddBranchModalOpen(false);
  };

  return (
    <Box
      p={3}
      sx={{
        // backgroundColor: "yellow",
        height: "60vh",
      }}
    >
      {/* <Typography variant="h4" gutterBottom>
        Branch List
      </Typography> */}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setAddBranchModalOpen(true)}
      >
        Add Branch
      </Button>

      <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
        {branches.map((branch) => (
          <Card key={branch._id} sx={{ minWidth: 275, maxWidth: 400, mb: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {branch.name}
              </Typography>
              <Typography variant="body2">Email: {branch.email}</Typography>
              <Typography variant="body2">Number: {branch.number}</Typography>
              <Typography variant="body2">
                Address: {branch.address.street}, {branch.address.city},{" "}
                {branch.address.state}, {branch.address.postalCode}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Add Branch Modal */}
      <Modal
        open={addBranchModalOpen}
        onClose={() => setAddBranchModalOpen(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6" mb={2}>
            Add New Branch
          </Typography>
          <TextField
            label="Branch Name"
            name="name"
            value={newBranch.name}
            onChange={handleInputChange}
            // fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={newBranch.email}
            onChange={handleInputChange}
            // fullWidth
            sx={{ mb: 2, ml: 2 }}
          />
          <TextField
            label="Number"
            name="number"
            value={newBranch.number}
            onChange={handleInputChange}
            // fullWidth
            sx={{ mb: 2, ml: 2 }}
            // sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            value={newBranch.password}
            onChange={handleInputChange}
            type="password"
            // fullWidth
            // sx={{ mb: 2 }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Street"
            name="street"
            value={newBranch.address.street}
            onChange={handleAddressChange}
            // fullWidth
            sx={{ mb: 2, ml: 2 }}
            // sx={{ mb: 2 }}
          />
          <TextField
            label="City"
            name="city"
            value={newBranch.address.city}
            onChange={handleAddressChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="State"
            name="state"
            value={newBranch.address.state}
            onChange={handleAddressChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={newBranch.address.postalCode}
            onChange={handleAddressChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddBranch}>
            Add Branch
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

// Style for the modal
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%", // Full width
  maxWidth: 800, // Optional: limit the max-width
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Allow vertical scrolling if content overflows
};

export default BranchList;
