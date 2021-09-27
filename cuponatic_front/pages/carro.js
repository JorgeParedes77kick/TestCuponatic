import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import ItemListCart from "components/ItemListCart";

import Navbar from "components/navbar";
const carro = () => {
  const dispatch = useDispatch();
  const discountR = useSelector((state) => state.discountReducer);
  const { shopping } = discountR;

  useEffect(() => {});
  return (
    <div
    // style={{ background: "#2a34ea" }}
    >
      <Navbar />
      <Container sx={{ pb: 4 }}>
        <h1>Carro</h1>
        <Card sx={{ px: 2 }}>
          <Grid container sx={{ py: 2 }}></Grid>
          <Grid
            container
            item
            sx={{ textAlign: "center" }}
            rowSpacing={1}
            columns={5}
          >
            <Grid item xs>
              <h3>Producto</h3>
            </Grid>
            <Grid item xs>
              <h3>Cantidad</h3>
            </Grid>
            <Grid item xs>
              <h3>Precio</h3>
            </Grid>
            <Grid item xs>
              <h3>Total</h3>
            </Grid>
            <Grid item xs />
          </Grid>
          {shopping.map((x) => {
            return <ItemListCart key={x.id} shopItem={x} />;
          })}
          <hr />
          <Grid
            container
            item
            sx={{ textAlign: "center" }}
            rowSpacing={1}
            columns={5}
          >
            <Grid item xs={2} />
            <Grid item xs>
              <h4 style={{ marginTop: 0 }}>Total a pagar</h4>
            </Grid>
            <Grid item xs>
              $
              {shopping.reduce((ant, act) => {
                return ant + act.precio * act.cantidad;
              }, 0)}
            </Grid>
            <Grid item xs />
          </Grid>
        </Card>
      </Container>
    </div>
  );
};
export default carro;
