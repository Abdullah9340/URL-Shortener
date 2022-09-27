import styles from "./URLModal.module.scss";
import NavMenu from "../../components/Menu/Menu";
import {
  Alert,
  Button,
  Grid,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

const Modal = ({ setNavigation }) => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const shortenURL = async () => {
    if (
      /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(
        url
      )
    ) {
      const fetchUrl = `https://urlify-react-flask.herokuapp.com/addUrl`;

      const response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const shortUrl = await response.json();
      setShortUrl(shortUrl["short"]);
    } else {
      setError(true);
    }
  };

  const copyToClipboard = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(`https://short-url2.vercel.app/${shortUrl}`);
  };
  const handleClose = () => {
    setError(false);
  };

  return (
    <div className={styles.container}>
      <Snackbar
        id="URL-snackbar"
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
      <Grid container>
        <Grid item xs={8}>
          <Typography
            fontFamily="Mouse Memoirs, sans-serif"
            variant="h5"
            letterSpacing="0.05rem"
            // textAlign="center"
          >
            Enter a URL to Shorten!
          </Typography>
        </Grid>
        <Grid item xs={4} textAlign="center">
          <NavMenu setNavigation={setNavigation} />
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="URL-input-label"
            label="Original Url"
            variant="standard"
            fullWidth
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </Grid>
        <Grid item xs={4} textAlign="center">
          <Button
            id="URL-submit-button"
            variant="contained"
            sx={{
              margin: "auto",
              marginTop: "10px",
              width: "80%",
              textTransform: "none",
            }}
            onClick={shortenURL}
          >
            Shorten
          </Button>
        </Grid>
        {shortUrl && (
          <>
            <Grid item xs={8}>
              <div id="URL-output" className={styles.shortUrl}>
                Short Url: https://short-url2.vercel.app/{shortUrl}
              </div>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Button
                id="URL-copy-button"
                variant="contained"
                sx={{
                  margin: "auto",
                  marginTop: "10px",
                  width: "80%",
                  textTransform: "none",
                }}
                onClick={copyToClipboard}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Modal;
