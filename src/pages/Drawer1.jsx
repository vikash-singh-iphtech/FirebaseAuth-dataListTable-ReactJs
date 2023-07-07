import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import AddCardIcon from "@mui/icons-material/AddCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SaveIcon from "@mui/icons-material/Save";
import Birdpicture from "../../images2/bird.png";
// import CustomerTableList from "../Table/CustomerTableList";
import useAuth from "../components/hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import AddData from "../Table/AddData";

const drawerWidth = 240;

function Drawer1 (props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();
  let navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/sign-in");

      setUser(user);
    });
  }, [auth, navigate]);

  function handleClose() {
    logout();
    navigate("/sign-in");
    localStorage.clear();
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      user={user}
      logout={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {" "}
      <MenuItem>
        {user?.displayName} 
      </MenuItem>
      <MenuItem>
        {user?.email}
      </MenuItem>
      <MenuItem>
        {" "}
        <Link style={{textDecoration:'none' ,color:'black'}} to="/MyAccount">My Account</Link>{" "}
      </MenuItem>
      {/* <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem key="logout" onClick={handleMenuClose}>
        <Typography textAlign="center" onClick={logout}>
          Logout
        </Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu 
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
        
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>MyAccount</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <div style={{}}>
      <Toolbar/>
   
      <Divider/>
      <Box
        component="img"
        sx={{
          height: 100,
          width: 200,
          marginTop:7,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
          
        }}
        alt="The house from the offer."
        src={Birdpicture}
      />

      <List>
        {[
          { text: "All Data", icon: <SaveIcon />, path: "/" },
          { text: "Add Data", icon: <AddCardIcon />, path: "/adddata" },
          { text: "MyAccount", icon: <AddCardIcon />, path: "/MyAccount" },
        ].map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            sx={{
              backgroundColor: isActive(item.path) ? "green " : "inherit",
            }}
          >
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                color: isActive(item.path) ? "#fff" : "black",
              }}
            />

            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

 
        <AppBar position="fixed" sx={{ backgroundColor: "green",boxShadow:'none',  zIndex: 1201, height:'120px',width: "100%"}} >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              // style={{color:'green'}}
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Home
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                // style={{color:'green'}}
                color="inherit"

              >
            <AccountCircle style={{ fontSize: '60px' }} />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                // style={{color:'green'}}
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
 
          }}
        >

            <AddData/>
     
        </Box>
      </Box>
    </>
  );
}

export default Drawer1;