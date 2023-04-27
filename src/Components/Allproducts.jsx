import React, { useEffect, useState } from "react";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  makeStyles,
  Button,
} from "@material-ui/core";

import { getallproducts } from "../service/api";
import { Link } from "react-router-dom";
import Popup from "./view";

const useStyle = makeStyles({
  table: {
    width: "80%",
    margin: "50px 100px 100px 140px",
  },
  thead: {
    "& > *": {
      background: "#000000",
      color: "#FFFFFF",
      fontSize: "16px",
    },
  },
  trow: {
    "& > *": {
      fontSize: "16px",
    },
  },
});

const Allproducts = () => {
  const classes = useStyle();

  const [product, setproduct] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [popData, setPopData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedproductData = localStorage.getItem("productData");
    if (storedproductData) {
      setproduct(JSON.parse(storedproductData));
    } else {
      getproducts();
    }
  }, []);

  //getting all products
  const getproducts = async () => {
    const response = await getallproducts();
    console.log(response);
    localStorage.setItem("productData", JSON.stringify(response.data));
  };

  //deleting product
  const deleteData = async (id) => {
    const storedproductData = localStorage.getItem("productData");
    if (storedproductData) {
      const productData = JSON.parse(storedproductData);
      const updatedproductData = productData.filter(
        (product) => product.id !== id
      );
      localStorage.setItem("productData", JSON.stringify(updatedproductData));
      alert("Data Deleted");
      setproduct(updatedproductData);
    }
  };

  //Pop functionality
  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    const storedproductData = localStorage.getItem("productData");
    const productData = JSON.parse(storedproductData);
    const getData = productData.find((product) => product.id === id);
    setPopData(getData);
  };

  //seraching in tbale
  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    // Filter data based on search query and selected category
    const newData = product.filter((row) => {
      const { title, price, description, category } = row;
      const query = searchQuery.toLowerCase();
      const selected = selectedCategory.toLowerCase();

      if (selected && category.toLowerCase() !== selected) {
        return false;
      }

      return (
        title.toLowerCase().includes(query) ||
        price.toString().includes(query) ||
        description.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query)
      );
    });

    setFilteredData(newData);
  }, [product, searchQuery, selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div>
        <div style={{ width: "100%" }}>
          <input
            style={{
              width: "100%",
              margin: "auto",
              padding: "20px",
            }}
            type="text"
            value={searchQuery}
            placeholder="Search..."
            onChange={handleSearchQueryChange}
          />
        </div>
        <div>
          <select
            style={{ width: "100%", padding: "20px" }}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </div>
      </div>

      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>ID</TableCell>
            <TableCell>Product Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((product) => (
            <TableRow className={classes.trow} key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <div style={{ display: "flex" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "0px 20px" }}
                    component={Link}
                    to={`/edit/${product.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ margin: "0px 20px" }}
                    onClick={() => deleteData(product.id)}
                  >
                    Del
                  </Button>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "0px 20px" }}
                      onClick={() => togglePopup(product.id)}
                    >
                      view
                    </Button>

                    {isOpen && (
                      <Popup product={popData} handleClose={togglePopup} />
                    )}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Allproducts;
