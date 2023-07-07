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
import Birdpicture from "../../images2/IPHTech.png";
import CustomerTableList from "../../Table/CustomerTableList";
import useAuth from "../../components/hooks/useAuth";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const drawerWidth = 240;

function Sidebar(props) {
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
    // localStorage.clear();
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
    <div >

<Toolbar sx={{marginTop:6.1}}/>

 {/* commented  image for sidebar */}
   {/* <Box
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
   /> */}

    

      <List>
        {[
          { text: "All Data", icon: <PeopleAltIcon />, path: "/" },
          // { text: "View-Data", icon: <VisibilityIcon />, path: "/ViewData" },  
          { text: "Add Data", icon: <AddCardIcon />, path: "/adddata" },
          { text: "MyAccount", icon: <AccountCircleIcon />, path: "/MyAccount" },
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
              {/* <MenuIcon  /> */}
 
  <MenuIcon    sx={{ marginTop:3,
    display: 'block', // Show the icon by default
    '@media screen and (min-width: 600px)': {
      display: 'none', // Hide the icon for screen size greater than or equal to 600px
    },
  }}/>
 



            </IconButton>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Home
            </Typography> */}

<Box
     component="img"
     sx={{
       height: 100,
       width: 180,
       marginTop:1,
       marginLeft:-6,
       borderRadius: '10px',
    maxHeight: { xs: 233, md: 167 },
    maxWidth: { xs: 350, md: 250 },
    display: 'none', // Hide the image by default
    '@media screen and (min-width: 600px)': {
      display: 'block', // Show the image for screen size greater than or equal to 600px
    },
  }}
  alt="The house from the offer."
  src={Birdpicture}
/>

          


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
                style={{ marginTop:20}}
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
          sx={{ width: 'auto',
          // marginLeft:20.5,

          flexShrink: 0,

          '@media (min-width: 1369px) and (min-height: 214px)': {
            width: '310px',
          },

        }}
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
          {/* <Toolbar /> */}

          {/* <ListTable />   don't uncomment this file (Getting API issue after run this file) */}

          {/* <CustomerTableList /> */}
          {/* <DialogBox/> */}
          {/* <ViewList/> */}
          {/* <Customer2/> */}
        </Box>

        
      </Box>
    </>
  );
}

export default Sidebar;


// import * as React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import AddCardIcon from "@mui/icons-material/AddCard";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import MenuIcon from "@mui/icons-material/Menu";
// import SaveIcon from "@mui/icons-material/Save";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import ListTable from "../../Table/ListTable";
// // import Birdpicture from "../images2/bird.png";
// import Birdpicture from "../../images2/bird.png";
// import CustomerTableList from "../../Table/CustomerTableList";
// import ViewList from "../../Table/ViewList";
// import Customer2 from "../../Table/Customer2";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../components/hooks/useAuth";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import DialogBox from "../../DialogBox";

// const drawerWidth = 240;

// function Sidebar(props) {
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   let navigate = useNavigate();
//   const { logout, auth } = useAuth();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (!user) return navigate("/sign-in");

//       setUser(user);
//     });
//   }, [auth, navigate]);

//   function handleClose() {
//     logout();
//     navigate("/sign-in");
//     localStorage.clear();
//   }

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <Box
//         component="img"
//         sx={{
//           height: 150,
//           width: 220,
//           maxHeight: { xs: 233, md: 167 },
//           maxWidth: { xs: 350, md: 250 },
//         }}
//         alt="The house from the offer."
//         src={Birdpicture}
//       />

//       <List>
//         {["All Data", "Add Data"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <SaveIcon /> : <AddCardIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>

//       {/* <List>
//         <ListItem disablePadding sx={{ display: "block" }} onClick={() => {}}>
//           <ListItemButton >
//             <ListItemIcon>

//                 <SaveIcon/>

//             </ListItemIcon>
//             <ListItemText    primary="Orders"    />
//           </ListItemButton>
//         </ListItem>
//       </List> */}
//     </div>
//   );

//   const container =
//     window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* adding appbar */}

//       {/* <Header user={user} logout={handleClose} /> */}

//       <AppBar
//         position="fixed"
//         sx={{
//           backgroundColor: "green",
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Home
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//         aria-label="mailbox folders"
//       >
//         {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", sm: "none" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//         >
//           {drawer}
//         </Drawer>

//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", sm: "block" },
//             "& .MuiDrawer-paper": {
//               boxSizing: "border-box",
//               width: drawerWidth,
//             },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//         }}
//       >
//         {/* <Toolbar /> */}

//         {/* <ListTable /> */}
//         <CustomerTableList />
//         {/* <DialogBox/> */}
//         {/* <ViewList/> */}
//         {/* <Customer2/> */}
//       </Box>
//     </Box>
//   );
// }

// export default Sidebar;

// here a code of shorting table  of customerTablelist file

// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Box,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody
// } from '@mui/material';
// import {
//   getAuth,
//   onAuthStateChanged,
//   setPersistence,
//   browserLocalPersistence
// } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// import '../CustomerTable.css';

// const firebaseConfig = {
//   apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
//   authDomain: "pwa-app-2b96d.firebaseapp.com",
//   databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
//   projectId: "pwa-app-2b96d",
//   storageBucket: "pwa-app-2b96d.appspot.com",
//   messagingSenderId: "230575406452",
//   appId: "1:230575406452:web:fab98689e7446fb3064021",
//   measurementId: "G-V2G6MGPNN5"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence);
// const messaging = getMessaging(app);

// const CustomerTableList = () => {
//   const [postData, setPostData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [company, setCompany] = useState('');
//   const [location, setLocation] = useState('');
//   const [editPostId, setEditPostId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [isEmptyResults, setIsEmptyResults] = useState(false);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [confirmDialogAction, setConfirmDialogAction] = useState('');
//   const [sortOrder, setSortOrder] = useState('asc');

//   const handleOpenConfirmationDialog = () => {
//     setConfirmDialogAction('edit');
//     setConfirmDialogOpen(true);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json');
//       const data = await response.json();

//       if (data) {
//         const postsArray = Object.keys(data)
//           .map((key) => ({
//             id: key,
//             ...data[key]
//           }))
//           .filter((post) =>
//             post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.location.toLowerCase().includes(searchQuery.toLowerCase())
//           );

//         setPostData(postsArray);
//         setIsEmptyResults(postsArray.length === 0);
//       } else {
//         setPostData([]);
//         setIsEmptyResults(true);
//       }
//     } catch (error) {
//       console.error('Error retrieving post data:', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editPostId) {
//         // Edit existing post
//         const response = await fetch(
//           `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
//           {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               name,
//               email,
//               designation,
//               company,
//               location,
//             }),
//           }
//         );

//         if (response.ok) {
//           handleCloseDialog();
//           fetchData();
//         } else {
//           console.error('Error updating post:', response.status);
//         }
//       } else {
//         // Create new post
//         const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             designation,
//             company,
//             location,
//           }),
//         });

//         if (response.ok) {
//           handleCloseDialog();
//           fetchData();
//         } else {
//           console.error('Error creating post:', response.status);
//         }
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const response = await fetch(
//         `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${postId}.json`,
//         {
//           method: 'DELETE',
//         }
//       );

//       if (response.ok) {
//         fetchData();
//       } else {
//         console.error('Error deleting post:', response.status);
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   const handleEdit = (post) => {
//     setEditPostId(post.id);
//     setName(post.name);
//     setEmail(post.email);
//     setDesignation(post.designation);
//     setCompany(post.company);
//     setLocation(post.location);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setEditPostId(null);
//     setName('');
//     setEmail('');
//     setDesignation('');
//     setCompany('');
//     setLocation('');
//     setOpenDialog(false);
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//   };

//   const handleSort = (column) => {
//     if (sortOrder === 'asc') {
//       setSortOrder('desc');
//     } else {
//       setSortOrder('asc');
//     }

//     setFilteredData(
//       [...postData].sort((a, b) => {
//         if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
//         if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
//         return 0;
//       }).filter((post) =>
//         post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   };

//   useEffect(() => {
//     setFilteredData(
//       postData.filter((post) =>
//         post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [postData, searchQuery]);

//   return (
//     <Container>
//       <Box>
//         <Typography variant="h4" className="title">
//           Customer Table
//         </Typography>
//         <div className="search-container">
//           <TextField
//             className="search-field"
//             variant="outlined"
//             placeholder="Search"
//             onChange={handleSearch}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <button className="sort-button" onClick={() => handleSort('name')}>
//                   Name {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//                 </button>
//               </TableCell>
//               <TableCell>
//                 <button className="sort-button" onClick={() => handleSort('email')}>
//                   Email {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//                 </button>
//               </TableCell>
//               <TableCell>
//                 <button className="sort-button" onClick={() => handleSort('designation')}>
//                   Designation {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//                 </button>
//               </TableCell>
//               <TableCell>
//                 <button className="sort-button" onClick={() => handleSort('company')}>
//                   Company {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//                 </button>
//               </TableCell>
//               <TableCell>
//                 <button className="sort-button" onClick={() => handleSort('location')}>
//                   Location {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//                 </button>
//               </TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {isEmptyResults ? (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No results found.
//                 </TableCell>
//               </TableRow>
//             ) : (
//               filteredData.map((post) => (
//                 <TableRow key={post.id}>
//                   <TableCell>{post.name}</TableCell>
//                   <TableCell>{post.email}</TableCell>
//                   <TableCell>{post.designation}</TableCell>
//                   <TableCell>{post.company}</TableCell>
//                   <TableCell>{post.location}</TableCell>
//                   <TableCell>
//                     <BorderColorIcon
//                       className="edit-icon"
//                       onClick={() => handleEdit(post)}
//                     />
//                     <DeleteOutlineIcon
//                       className="delete-icon"
//                       onClick={() => {
//                         setEditPostId(post.id);
//                         setConfirmDialogAction('delete');
//                         setConfirmDialogOpen(true);
//                       }}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//         <Dialog open={openDialog} onClose={handleCloseDialog}>
//           <DialogTitle>{editPostId ? 'Edit Post' : 'Create New Post'}</DialogTitle>
//           <DialogContent>
//             <form onSubmit={handleSubmit}>
//               <TextField
//                 label="Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Designation"
//                 variant="outlined"
//                 value={designation}
//                 onChange={(e) => setDesignation(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Company"
//                 variant="outlined"
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Location"
//                 variant="outlined"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <DialogActions>
//                 <Button type="submit" variant="contained">
//                   {editPostId ? 'Save Changes' : 'Create'}
//                 </Button>
//                 <Button onClick={handleCloseDialog} variant="outlined">
//                   Cancel
//                 </Button>
//               </DialogActions>
//             </form>
//           </DialogContent>
//         </Dialog>
//         <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//           <DialogTitle>
//             {confirmDialogAction === 'edit'
//               ? 'Discard Changes?'
//               : 'Are you sure you want to delete this post?'}
//           </DialogTitle>
//           <DialogActions>
//             <Button
//               onClick={() => {
//                 setConfirmDialogOpen(false);
//                 if (confirmDialogAction === 'edit') {
//                   handleCloseDialog();
//                 } else {
//                   handleDelete(editPostId);
//                 }
//               }}
//               color="primary"
//             >
//               Confirm
//             </Button>
//             <Button onClick={() => setConfirmDialogOpen(false)} color="primary" autoFocus>
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     </Container>
//   );
// };

// export default CustomerTableList;

// second code with shorting orignial file today done 11am

// import React, { useEffect, useState } from 'react';
// import {
//   Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions,
//   Button, TextField, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';
// import '../CustomerTable.css'

// const firebaseConfig = {
//   apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
//   authDomain: "pwa-app-2b96d.firebaseapp.com",
//   databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
//   projectId: "pwa-app-2b96d",
//   storageBucket: "pwa-app-2b96d.appspot.com",
//   messagingSenderId: "230575406452",
//   appId: "1:230575406452:web:fab98689e7446fb3064021",
//   measurementId: "G-V2G6MGPNN5"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// setPersistence(auth, browserLocalPersistence);
// const messaging = getMessaging(app);

// const CustomerTableList = () => {
//   const [postData, setPostData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [designation, setDesignation] = useState('');
//   const [company, setCompany] = useState('');
//   const [location, setLocation] = useState('');
//   const [editPostId, setEditPostId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [isEmptyResults, setIsEmptyResults] = useState(false);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const [confirmDialogAction, setConfirmDialogAction] = useState('');
//   // started edit here
//   const [sortOrder, setSortOrder] = useState('asc');

//   const handleOpenConfirmationDialog = () => {
//     setConfirmDialogAction('edit');
//     setConfirmDialogOpen(true);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json');
//       const data = await response.json();

//       if (data) {
//         const postsArray = Object.keys(data)
//           .map((key) => ({
//             id: key,
//             ...data[key]
//           }))
//           .filter((post) =>
//             post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             post.location.toLowerCase().includes(searchQuery.toLowerCase())
//           );

//         setPostData(postsArray);
//         setIsEmptyResults(postsArray.length === 0);
//       } else {
//         setPostData([]);
//         setIsEmptyResults(true);
//       }
//     } catch (error) {
//       console.error('Error retrieving post data:', error);
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editPostId) {
//         // Edit existing post
//         const response = await fetch(
//           `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
//           {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               name,
//               email,
//               designation,
//               company,
//               location,
//             }),
//           }
//         );

//         if (response.ok) {
//           setName('');
//           setEmail('');
//           setDesignation('');
//           setCompany('');
//           setLocation('');
//           setEditPostId(null);
//           setOpenDialog(false);
//           fetchData();
//         } else {
//           console.error('Error editing post:', response);
//         }
//       } else {
//         // Add new post
//         const response = await fetch(
//           'https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               name,
//               email,
//               designation,
//               company,
//               location,
//             }),
//           }
//         );

//         if (response.ok) {
//           setName('');
//           setEmail('');
//           setDesignation('');
//           setCompany('');
//           setLocation('');
//           setOpenDialog(false);
//           fetchData();
//         } else {
//           console.error('Error adding post:', response);
//         }
//       }
//     } catch (error) {
//       console.error('Error adding/editing post:', error);
//     }
//   };

//   const handleEdit = (post) => {
//     setEditPostId(post.id);
//     setName(post.name);
//     setEmail(post.email);
//     setDesignation(post.designation);
//     setCompany(post.company);
//     setLocation(post.location);
//     setOpenDialog(true);
//     handleOpenConfirmationDialog();

//   };

//   const handleOpenDialog = () => {
//     setEditPostId(null);
//     setName('');
//     setEmail('');
//     setDesignation('');
//     setCompany('');
//     setLocation('');
//     setOpenDialog(true);
//   };

//   const handleDelete = async (id) => {
//     setConfirmDialogOpen(false);

//     try {
//       const response = await fetch(`https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${id}.json`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         fetchData();
//       } else {
//         console.error('Error deleting post:', response);
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     setFilteredData(
//       postData.filter((post) =>
//         post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//     setIsEmptyResults(filteredData.length === 0);
//   }, [searchQuery, postData]);

//   const handleSort = (column) => {
//     if (sortOrder === 'asc') {
//       setSortOrder('desc');
//     } else {
//       setSortOrder('asc');
//     }

//     setFilteredData(
//       [...postData].sort((a, b) => {
//         if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
//         if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
//         return 0;
//       }).filter((post) =>
//         post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   };

//   useEffect(() => {
//     setFilteredData(
//       postData.filter((post) =>
//         post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         post.location.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     );
//   }, [postData, searchQuery]);

//   return (

//     <Container maxWidth=" "
//       sx={{ marginTop: -5 }} >

//       {/* here code for search bar */}

//       <Box display="flex" justifyContent="flex-end" marginBottom={2}>
//         <TextField
//           label="Search"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             )
//           }}
//         />
//       </Box>
//       <Box display="flex" justifyContent="space-between">
//         <Box display="flex" alignItems="center">
//           <Typography variant="h4" position="center" style={{ textAlign: 'center', display: 'inline', color: 'green' }} mb={2}>
//             TableList View
//           </Typography>
//         </Box>
//         <Box display="flex" alignItems="center">
//           <Button className='btn-adddata' variant="contained" color="primary" style={{ backgroundColor: 'green' }} onClick={handleOpenDialog}>
//             Add Data
//           </Button>
//         </Box>
//       </Box>
//       <Table >
//         <TableHead className='head-contentname' >
//           <TableRow>
//             <TableCell>
//               <button className='shortingbtn'>Sr.</button>
//             </TableCell>
//             {/* <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Designation</TableCell>
//             <TableCell>Company</TableCell>
//             <TableCell>Location</TableCell> */}

//             <TableCell>
//               <button className="sort-button shortingbtn" onClick={() => handleSort('name')} style={{ border: 'none' }} >
//                 Name {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//               </button>
//             </TableCell>
//             <TableCell>
//               <button className="sort-button shortingbtn" onClick={() => handleSort('email')}>
//                 Email {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//               </button>
//             </TableCell>
//             <TableCell>
//               <button className="sort-button shortingbtn" onClick={() => handleSort('designation')}>
//                 Designation {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//               </button>
//             </TableCell>
//             <TableCell>
//               <button className="sort-button shortingbtn" onClick={() => handleSort('company')}>
//                 Company {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//               </button>
//             </TableCell>
//             <TableCell>
//               <button className="sort-button shortingbtn" onClick={() => handleSort('location')}>
//                 Location {sortOrder === 'asc' ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
//               </button>
//             </TableCell>
//             <TableCell>
//               <button className='shortingbtn'>Actions</button>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredData.map((post, index) => (
//             <TableRow key={post.id}>
//               <TableCell>{index + 1}</TableCell>
//               <TableCell>{post.name}</TableCell>
//               <TableCell>{post.email}</TableCell>
//               <TableCell>{post.designation}</TableCell>
//               <TableCell>{post.company}</TableCell>
//               <TableCell>{post.location}</TableCell>
//               <TableCell>

//                 <Button style={{ marginRight: '8px' }} variant="outlined" color="primary"  >
//                   <BorderColorIcon
//                     color="primary"
//                     onClick={() => handleEdit(post)}
//                   />
//                 </Button>
//                 <Button variant="outlined" color="secondary"  >
//                   <DeleteOutlineIcon
//                     color="error"
//                     onClick={() => {
//                       setEditPostId(post.id);
//                       setConfirmDialogAction('delete');
//                       setConfirmDialogOpen(true);
//                     }}
//                   />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {isEmptyResults && (
//         <Typography variant="h4" component="p" align="center" color="red">
//           No result found.
//         </Typography>
//       )}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>{editPostId ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Name"
//               type="text"
//               fullWidth
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Email"
//               type="email"
//               fullWidth
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Designation"
//               type="text"
//               fullWidth
//               required
//               value={designation}
//               onChange={(e) => setDesignation(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Company"
//               type="text"
//               fullWidth
//               required
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//             />
//             <TextField
//               margin="dense"
//               label="Location"
//               type="text"
//               fullWidth
//               required
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button type="submit" color="primary">
//               {editPostId ? 'Save' : 'Add'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//       <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
//         <DialogTitle>Confirm</DialogTitle>

//         <DialogContent>
//           {confirmDialogAction === 'delete' && (
//             <Typography>Are you sure you want to delete this customer?</Typography>
//           )}
//           {confirmDialogAction === 'edit' && (
//             <Typography>Are you sure you want to edit this customer?</Typography>
//           )}

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
//           <Button
//             onClick={() => {
//               if (confirmDialogAction === 'delete') {
//                 handleDelete(editPostId);
//               } else if (confirmDialogAction === 'edit') {
//                 // Handle the edit action here
//                 handleSubmit();
//               }
//               setConfirmDialogOpen(false);
//             }}
//             color="primary"
//             autoFocus
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };
// export default CustomerTableList;

// const firebaseConfig = {
//   apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
//   authDomain: "pwa-app-2b96d.firebaseapp.com",
//   databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
//   projectId: "pwa-app-2b96d",
//   storageBucket: "pwa-app-2b96d.appspot.com",
//   messagingSenderId: "230575406452",
//   appId: "1:230575406452:web:fab98689e7446fb3064021",
//   measurementId: "G-V2G6MGPNN5"
// };
