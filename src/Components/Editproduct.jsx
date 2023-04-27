import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Box,
  FormGroup,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

const Editproduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const { id } = useParams();

  const history = useNavigate();

  useEffect(() => {
    const productData = JSON.parse(localStorage.getItem("productData"));
    const data = productData.find((product) => product.id === parseInt(id));
    setProduct(data);
  }, [id]);

  const onValueChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateProductDetails = () => {
    const productData = JSON.parse(localStorage.getItem("productData"));
    const index = productData.findIndex(
      (product) => product.id === parseInt(id)
    );

    const updatedProduct = {
      ...productData[index],
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    };
    productData[index] = updatedProduct;

    localStorage.setItem("productData", JSON.stringify(productData));
    history("/");
    alert("data updated");
  };

  return (
    <Container maxWidth="sm">
      <Box my={5}>
        <Typography variant="h5" align="center">
          Update product Details
        </Typography>
        <FormGroup>
          <FormControl>
            <InputLabel>Name</InputLabel>
            <Input
              onChange={onValueChange}
              name="title"
              value={product.title}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Price</InputLabel>
            <Input
              onChange={onValueChange}
              name="price"
              value={product.price}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Description</InputLabel>
            <Input
              onChange={onValueChange}
              name="description"
              value={product.description}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Input
              onChange={onValueChange}
              name="category"
              value={product.category}
            />
          </FormControl>
          <Box my={3}>
            <Button
              variant="contained"
              onClick={updateProductDetails}
              color="primary"
              align="center"
            >
              Update product
            </Button>
            <Button
              onClick={() => history("/")}
              variant="contained"
              color="secondary"
              align="center"
              style={{ margin: "0px 20px" }}
            >
              Cancel
            </Button>
          </Box>
        </FormGroup>
      </Box>
    </Container>
  );
};

export default Editproduct;
