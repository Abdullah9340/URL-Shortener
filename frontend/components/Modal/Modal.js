import styles from "./Modal.module.scss";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Modal = () => {
  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            fontFamily="Mouse Memoirs, sans-serif"
            variant="h5"
            letterSpacing="0.05rem"
            // textAlign="center"
          >
            Enter a URL to Shorten!
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="standard-basic"
            label="Original Url"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Button
            variant="contained"
            sx={{
              margin: "auto",
              marginTop: "10px",
              width: "80%",
              textTransform: "none",
            }}
          >
            Shorten
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Modal;
