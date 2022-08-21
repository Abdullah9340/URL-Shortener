import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useState } from "react";

const NavMenu = ({ setNavigation }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    const { myValue } = event.currentTarget.dataset;
    setNavigation(myValue);
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="nav-menu-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Menu
      </Button>

      <Menu id="nav-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} data-my-value="URL Short">
          URL Shortener
        </MenuItem>
        <MenuItem onClick={handleClose} data-my-value="QR CODE">
          QR Code Generator
        </MenuItem>
      </Menu>
    </div>
  );
};
export default NavMenu;
