import {
  TextField,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAmount } from "redux/actions/discountAction";

const ItemListCart = ({ shopItem }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(shopItem.cantidad);

  const update = (e) => {
    e.preventDefault();
    if (amount >= 0) {
      dispatch(updateAmount(amount, shopItem.id));
    }
  };
  return (
    <Grid item container sx={{ my: 1, textAlign: "center" }} rowSpacing={2}>
      <Grid item container xs rowSpacing={3}>
        <Grid item xs>
          <img src={shopItem.imagen} style={{ width: "100%" }} />{" "}
        </Grid>
        <Grid item xs>
          {shopItem.titulo}
        </Grid>
      </Grid>
      <Grid item xs>
        {shopItem.cantidad}
      </Grid>
      <Grid item xs>
        ${new Intl.NumberFormat("de-DE").format(shopItem.precio)}
      </Grid>
      <Grid item xs>
        $
        {new Intl.NumberFormat("de-DE").format(
          shopItem.precio * shopItem.cantidad
        )}
      </Grid>
      <Grid item xs>
        <TextField
          label="Cantidad"
          type="number"
          size="small"
          variant="standard"
          value={amount}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          sx={{ maxWidth: 1 / 2, mx: 2 }}
        />
        <Button size="small" onClick={update}>
          actualizar
        </Button>
      </Grid>
    </Grid>
  );
};

export default ItemListCart;
