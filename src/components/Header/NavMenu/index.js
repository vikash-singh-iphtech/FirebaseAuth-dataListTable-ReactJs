import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";



function NavMenu({
  children: [anchorElNav, setAnchorElNav, handleCloseNavMenu],
}) {
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const styles = {
    box: { flexGrow: 1, display: { xs: "flex", md: "none" } },
    menu: { display: { xs: "block", md: "none" } },
  };

  return (
    <Box sx={styles.box}>
  

<MenuIcon />

    </Box>
  );
}

export default NavMenu;
