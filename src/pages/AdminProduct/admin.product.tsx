import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

interface Category {
  _id: string;
  title: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  image: File | null;
  stock: number;
  category: Category | null;
  ingredients: string[];
}

const sampleCategories: Category[] = [
  {
    _id: "1",
    title: "Cake",
    image:
      "https://static8.depositphotos.com/1203063/895/i/950/depositphotos_8957532-stock-photo-chocolate-cacke.jpg",
  },
  {
    _id: "2",
    title: "Cake",
    image:
      "https://static8.depositphotos.com/1203063/895/i/950/depositphotos_8957532-stock-photo-chocolate-cacke.jpg",
  },
  {
    _id: "2",
    title: "Shake",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkrv-Ft0_semJFdGxxAz8XaK3wtWyglfNYkg&s",
  },
];

const sampleProducts: Product[] = [
  {
    _id: "101",
    name: "Chocolate Cake",
    description: "Delicious chocolate cake",
    price: 250,
    veg: false,
    image: null,
    stock: 20,
    category: sampleCategories[0],
    ingredients: ["Flour", "Dark Chocolate", "Butter", "Sugar"],
  },
  {
    _id: "104",
    name: "Chocolate COCO ",
    description: "Delicious chocolate cake",
    price: 250,
    veg: false,
    image: null,
    stock: 20,
    category: sampleCategories[0],
    ingredients: ["Flour", "Dark Chocolate", "Butter", "Sugar"],
  },
  {
    _id: "102",
    name: "Banana Shake",
    description: "Refreshing banana shake",
    price: 150,
    veg: true,
    image: null,
    stock: 30,
    category: sampleCategories[1],
    ingredients: ["Banana", "Milk", "Sugar", "Ice"],
  },
];

const AdminMainPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [categories, setCategories] = useState<Category[]>(sampleCategories);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ title: "", image: "" });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    veg: false,
    price: 0,
    categoryId: "",
    ingredients: [""],
    image: null as File | null,
    stock: 0,
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleAddCategory = () => {
    const newCategoryObj: Category = {
      _id: (categories.length + 1).toString(),
      title: newCategory.title,
      image: newCategory.image,
    };
    setCategories([...categories, newCategoryObj]);
    setAddCategoryModalOpen(false);
  };

  const handleAddProduct = () => {
    const selectedCategory = categories.find(
      (category) => category._id === newProduct.categoryId
    );
    const newProductObj: Product = {
      ...newProduct,
      _id: (products.length + 1).toString(),
      category: selectedCategory || null,
    };
    setProducts([...products, newProductObj]);
    setAddProductModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setNewProduct({ ...newProduct, categoryId: e.target.value as string });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  const handleEditSubmit = () => {
    if (selectedProduct) {
      const updatedProducts = products.map((product) =>
        product._id === selectedProduct._id ? selectedProduct : product
      );
      setProducts(updatedProducts);
      setEditModalOpen(false);
      // Here you would call the edit API with the updated product data.
    }
  };

  // Group products by category
  const groupedProducts = categories.reduce((acc, category) => {
    acc[category._id] = products.filter(
      (product) => product.category?._id === category._id
    );
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" onClick={() => setAddCategoryModalOpen(true)}>
        Add Category
      </Button>
      <Button
        variant="contained"
        onClick={() => setAddProductModalOpen(true)}
        sx={{ ml: 2 }}
      >
        Add Product
      </Button>

      {/* Carousels for each category */}
      {categories.map((category) => (
        <Box key={category._id} mb={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src={category.image}
              alt={category.title}
              width={50}
              height={50}
              style={{ borderRadius: "50%", marginRight: "16px" }}
            />
            <Typography variant="h5">{category.title}</Typography>
          </Box>

          <Box display="flex" overflow="auto" position="relative">
            <IconButton
              onClick={() =>
                document
                  .querySelector(`.carousel-${category._id}`)
                  ?.scrollBy(-300, 0)
              }
              sx={{ position: "absolute", top: "50%", left: 0, zIndex: 1 }}
            >
              <ArrowLeft />
            </IconButton>
            <Box
              className={`carousel-${category._id}`}
              display="flex"
              gap={2}
              sx={{ overflowX: "auto", scrollBehavior: "smooth" }}
            >
              {groupedProducts[category._id].map((product) => (
                <Box
                  key={product._id}
                  border={1}
                  borderRadius={2}
                  p={2}
                  onClick={() => handleProductClick(product)}
                  sx={{
                    cursor: "pointer",
                    minWidth: "300px",
                    maxWidth: "300px",
                    flexShrink: 0,
                    boxSizing: "border-box",
                  }}
                >
                  <img
                    src={
                      product.image
                        ? URL.createObjectURL(product.image)
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    width="100%"
                    style={{ borderRadius: "8px" }}
                  />
                  <Typography variant="h6" mt={1}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                  <Typography variant="body1">
                    Price: ₹{product.price}
                  </Typography>
                  <Typography variant="body2">
                    Category:{" "}
                    {product.category ? product.category.title : "None"}
                  </Typography>
                </Box>
              ))}
            </Box>
            <IconButton
              onClick={() =>
                document
                  .querySelector(`.carousel-${category._id}`)
                  ?.scrollBy(300, 0)
              }
              sx={{ position: "absolute", top: "50%", right: 0, zIndex: 1 }}
            >
              <ArrowRight />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Edit Product Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Edit Product</Typography>
          <TextField
            label="Product Name"
            name="name"
            value={selectedProduct?.name || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={selectedProduct?.description || ""}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={selectedProduct?.price || 0}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedProduct?.category?._id || ""}
              //@ts-ignore
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={selectedProduct?.stock || 0}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleEditSubmit} sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        open={addCategoryModalOpen}
        onClose={() => setAddCategoryModalOpen(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Add Category</Typography>
          <TextField
            label="Category Title"
            value={newCategory.title}
            onChange={(e) =>
              setNewCategory({ ...newCategory, title: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Category Image URL"
            value={newCategory.image}
            onChange={(e) =>
              setNewCategory({ ...newCategory, image: e.target.value })
            }
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddCategory}
            sx={{ mt: 2 }}
          >
            Add Category
          </Button>
        </Box>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        open={addProductModalOpen}
        onClose={() => setAddProductModalOpen(false)}
      >
        <Box sx={{ ...modalStyle }}>
          <Typography variant="h6">Add Product</Typography>
          <TextField
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newProduct.categoryId}
              //@ts-ignore
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={newProduct.stock}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <Button variant="contained" onClick={handleAddProduct} sx={{ mt: 2 }}>
            Add Product
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default AdminMainPage;
