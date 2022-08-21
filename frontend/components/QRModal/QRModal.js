import styles from "./QRModal.module.scss";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Slider,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import NavMenu from "../../components/Menu/Menu";
import { useState } from "react";

const QRModal = ({ setNavigation }) => {
  const [size, setSize] = useState(150);
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(false);

  const genQRCode = () => {
    if (
      /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(
        url
      )
    ) {
      const qrCode = `${process.env.NEXT_PUBLIC_API_QR}?size=${size}x${size}&data=${url}`;
      setImageUrl(qrCode);
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
  };
  return (
    <div className={styles.container}>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          URL is not valid. Be sure to include http(s)://
        </Alert>
      </Snackbar>
      <Grid container sx={{ rowGap: 1 }}>
        <Grid item xs={8}>
          <Typography
            fontFamily="Mouse Memoirs, sans-serif"
            variant="h5"
            letterSpacing="0.05rem"
          >
            Enter a URL to convert!
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <NavMenu setNavigation={setNavigation} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            fontFamily="Mouse Memoirs, sans-serif"
            variant="h5"
            letterSpacing="0.05rem"
          >
            Qr Code Size
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Slider
            defaultValue={150}
            min={100}
            max={300}
            step={25}
            valueLabelDisplay="auto"
            value={size}
            onChange={(event, value) => setSize(value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="standard-basic"
            label="Original Url"
            variant="standard"
            fullWidth
            value={url}
            onChange={(event) => setUrl(event.target.value)}
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
            onClick={() => {
              genQRCode();
            }}
          >
            Generate
          </Button>
        </Grid>
        {imageUrl && (
          <>
            <Grid item xs={12}>
              <div className={styles.qrCode}>
                <Link href={imageUrl}>
                  <img src={imageUrl} alt="qr code" />
                </Link>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default QRModal;
