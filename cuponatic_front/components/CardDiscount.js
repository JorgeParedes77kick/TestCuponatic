import {
  TextField,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Snackbar,
  Alert,
} from "@mui/material";
import parse from "html-react-parser";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAmount } from "redux/actions/discountAction";

import moment from "moment";

const CardDiscount = ({ discount }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);
  const [oldAmount, setOldAmount] = useState(1);
  const [open, setOpen] = useState(false);
  const addElement = (e) => {
    e.preventDefault();
    dispatch(addAmount(amount, discount));
    setOldAmount(amount);
    setOpen(true);
    setAmount(1);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ height: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={discount.imagen}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {discount.titulo}
        </Typography>
        <div style={{ height: "20rem", overflowY: "auto" }}>
          <Typography variant="body2" color="text.secondary">
            {parse(discount.descripcion)}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
            Valido desde el{" "}
            {moment(discount.fechaInicio).format("YYYY-MM-DD [a las] HH:MM:SS")}{" "}
            hasta el{" "}
            {moment(discount.fechaTermino).format(
              "YYYY-MM-DD [a las] HH:MM:SS"
            )}
            .
          </Typography>
        </div>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Typography variant="body2" color="text.secondary">
          a solo
        </Typography>

        <Typography variant="body1">
          ${new Intl.NumberFormat("de-DE").format(discount.precio)}
        </Typography>
        <TextField
          label="Cantidad"
          type="number"
          size="small"
          variant="standard"
          value={amount}
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
          sx={{ maxWidth: 1 / 4, mx: 2 }}
        />
        <Button size="small" onClick={addElement}>
          Agregar
        </Button>
      </CardActions>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {oldAmount} producto{oldAmount > 1 && "s"} al carro
        </Alert>
      </Snackbar>
    </Card>
  );
};
export default CardDiscount;
