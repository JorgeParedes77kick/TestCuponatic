import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Navbar = () => {
  const discountR = useSelector((state) => state.discountReducer);
  const { amount } = discountR;

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {" "}
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Productos en descuentos
          </Typography>

          <Link href="/carro">
            <Button color="inherit">
              Carro
              <Badge badgeContent={amount} color="error">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
