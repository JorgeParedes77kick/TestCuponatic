import {
  Container,
  MenuItem,
  TextField,
  Grid,
  Pagination,
  Button,
  Skeleton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { truthty, objectToUrlPath, urlPathToObject } from "utils/*";
import { getDataDiscount } from "redux/actions/discountAction";
import CardDiscount from "components/CardDiscount";
import Navbar from "components/navbar";
import { useRouter } from "next/router";

import { wrapper } from "redux/store";

const index = ({ props }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const discountR = useSelector((state) => state.discountReducer);
  const {
    discounts,
    waiting,
    order: orderReducer,
    page: pageReducer,
    max,
  } = discountR;

  const [order, setOrder] = useState(orderReducer);
  const [page, setPage] = useState(pageReducer);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getDataDiscount());
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    const handleRouteChange = (url, a) => {
      console.log(url, window.location.search);
      const index = url.indexOf("?") + 1;
      let params = {};
      if (url && index != 0 && url.substring(index)) {
        let search = url.substring(index);
        params = JSON.parse(
          '{"' +
            decodeURI(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
        console.log(params);
      }
      const localPage = params.page ? parseInt(params.page) : 1;
      const localOrder = params.order ? params.order : "titulo asc";
      setOrder(localOrder);
      setPage(localPage);

      dispatch(getDataDiscount(localOrder, localPage));
    };
    router.events.on("routeChangeStart", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const localPage = router.query.page ? parseInt(router.query.page) : 1;
  //   const localOrder = router.query.order ? router.query.order : "titulo asc";
  //   setPage(router.query.page ? parseInt(router.query.page) : 1);
  //   setOrder(router.query.order ? router.query.order : "titulo asc");
  //   if (localPage != 1 || localOrder != "titulo asc") {
  //     dispatch(getDataDiscount(localOrder, localPage));
  //   }
  //   // codes using router.query
  // }, [router.isReady]);

  const changeOrder = (e) => {
    e.preventDefault;
    setOrder(e.target.value);
    const str = objectToUrlPath({ page, order: e.target.value });
    router.push(router.pathname + "?" + str.toString());
    // dispatch(getDataDiscount(e.target.value, page));
  };
  const changePaginate = (e, pageChange) => {
    setPage(pageChange);
    const str = objectToUrlPath({ page: pageChange, order });
    router.push(router.pathname + "?" + str.toString());
    // dispatch(getDataDiscount(order, pageChange));
  };
  return (
    <div
    // style={{ background: "#2a34ea" }}
    >
      <Navbar />
      <Container sx={{ pb: 4 }}>
      <h1>Listado de productos</h1>
        <Grid container sx={{ py: 2 }}>
          <Grid container item justifyContent="center">
            <Grid item xs={12} sm={4} md={2} xs={4}>
              {/* <Button onClick={click}>1231321</Button> */}
              <TextField
                select
                label="Ordenar"
                type="number"
                size="small"
                variant="standard"
                value={order}
                onChange={changeOrder}
                sx={{ width: 1 }}
              >
                <MenuItem value="titulo asc">Titulo</MenuItem>
                <MenuItem value="precio desc">Mayor precio</MenuItem>
                <MenuItem value="precio asc">Menor precio</MenuItem>
                <MenuItem value="fecha_inicio asc">Fecha inicio</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Pagination
              count={max}
              onChange={changePaginate}
              page={page}
              color="primary"
              sx={{ my: 2 }}
            />
          </Grid>
          {waiting ? (
            <Skeleton
              sx={{
                transformOrigin: "0 0%",
                transform: "scale(1, 1)",
                width: 1,
                height: "50vh",
                my: 1,
              }}
            >
              {/* <Grid container item rowSpacing={2} columnSpacing={2}></Grid> */}
            </Skeleton>
          ) : (
            <Grid
              container
              item
              rowSpacing={2}
              columnSpacing={2}
              sx={{
                my: 1,
              }}
            >
              {discounts.map((x) => {
                return (
                  <Grid key={x.id} item xs={12} sm={6} md={4}>
                    <CardDiscount discount={x} />
                  </Grid>
                );
              })}
            </Grid>
          )}
          <Grid container item justifyContent="center" xs={12}>
            <Pagination
              count={max}
              onChange={changePaginate}
              page={page}
              color="primary"
              sx={{ my: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default index;
