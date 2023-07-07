//  dialog box working fine but not adding new data issue

import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const firebaseConfig = {
  apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
  authDomain: "pwa-app-2b96d.firebaseapp.com",
  databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
  projectId: "pwa-app-2b96d",
  storageBucket: "pwa-app-2b96d.appspot.com",
  messagingSenderId: "230575406452",
  appId: "1:230575406452:web:fab98689e7446fb3064021",
  measurementId: "G-V2G6MGPNN5",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const messaging = getMessaging(app);

const DialogBox = () => {
  const [postData, setPostData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json"
      );
      const data = await response.json();

      if (data) {
        const postsArray = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key],
          }))
          .filter(
            (post) =>
              post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.designation
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
              post.location.toLowerCase().includes(searchQuery.toLowerCase())
          );

        setPostData(postsArray);
        setIsEmptyResults(postsArray.length === 0); // Check if search results are empty
      } else {
        setPostData([]);
        setIsEmptyResults(true);
      }
    } catch (error) {
      console.error("Error retrieving post data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure user is authenticated before making the request
      if (!auth.currentUser) {
        throw new Error("User is not authenticated.");
      }

      if (editPostId) {
        // Update existing post
        const response = await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: editName,
              email: editEmail,
              designation: editDesignation,
              company: editCompany,
              location: editLocation,
              userId: auth.currentUser.uid, // Include the user ID in the post data
            }),
          }
        );

        if (response.ok) {
          console.log("Post updated successfully");
          setEditPostId(null);
          setEditName("");
          setEditEmail("");
          setEditDesignation("");
          setEditCompany("");
          setEditLocation("");

          fetchData();
        } else {
          throw new Error("Error updating post");
        }
      } else {
        // Add new post
        const response = await fetch(
          "https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              designation,
              company,
              location,
              userId: auth.currentUser.uid, // Include the user ID in the post data
            }),
          }
          
        );

        if (response.ok) {
          console.log("Post created successfully");
          setName("");
          setEmail("");
          setDesignation("");
          setCompany("");
          setLocation("");

          fetchData();
        } else {
          throw new Error("Error creating post");
        }
      }
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }

    setOpenDialog(false);
  };

  const handleEdit = (post) => {
    handleOpenDialog(post);
  };

  const handleOpenDialog = (post) => {
    setOpenDialog(true);

    if (post) {
      setEditPostId(post.id);
      setEditName(post.name);
      setEditEmail(post.email);
      setEditDesignation(post.designation);
      setEditCompany(post.company);
      setEditLocation(post.location);
    } else {
      setEditPostId(null);
      setEditName("");
      setEditDesignation("");
      setEditCompany("");
      setEditLocation("");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditPostId(null);
    setEditName("");
    setEditDesignation("");
    setEditCompany("");
    setEditLocation("");
    setIsEmptyResults(false); // Reset the isEmptyResults state variable
  };

  const handleDelete = async (postId) => {
    setEditPostId(postId);
    setConfirmDialogAction("delete");
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    if (confirmDialogAction === "delete") {
      try {
        await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: "DELETE",
          }
        );

        setConfirmDialogOpen(false);
        setEditPostId(null);
        fetchData();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }

    //here added code
    else if (confirmDialogAction === "edit") {
      // Perform edit action
      try {
        await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: "PATCH",
            body: JSON.stringify({
              name: editName,
              email: editEmail,
              designation: editDesignation,
              company: editCompany,
              location: editLocation,
            }),
          }
        );

        setConfirmDialogOpen(false);
        handleCloseDialog();
        fetchData();
      } catch (error) {
        console.error("Error editing post:", error);
      }
    } else if (confirmDialogAction === "Add") {
      
      try {
        await fetch(
          "https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json",
          {
            method: "POST",
            body: JSON.stringify({
              name: editName,
              email: editEmail,
              designation: editDesignation,
              company: editCompany,
              location: editLocation,
            }),
          }
        );

        setConfirmDialogOpen(false);
        handleCloseDialog();
        fetchData();
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }
  };

  return (
    <>
      <div>
        <Container>
          <Box>
            <Box mb={2}>
              <TextField
                margin="dense"
                label="Search"
                type="text"
                width="50%"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={fetchData} // Fetch data when the search query loses focus
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    fetchData(); // Fetch data when the Enter key is pressed
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography
              variant="h4"
              position="center"
              style={{ textAlign: "center", display: "inline", color: "green" }}
              mb={2}
            >
              TableList View
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenDialog}
              style={{
                background: "green",
                color: "white",
                borderRadius: "10px",
                float: "right",
              }}
            >
              Add Data
            </Button>

            {isEmptyResults && (
              <Typography
                variant="h5"
                style={{
                  display: "contents",
                  textAlign: "center",
                  marginTop: "16px",
                  color: "red",
                }}
              >
                No result found.
              </Typography>
            )}
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr no</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {postData.map((post, index) => (
                  <TableRow key={post.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{post.name}</TableCell>
                    <TableCell>{post.email}</TableCell>
                    <TableCell>{post.designation}</TableCell>
                    <TableCell>{post.company}</TableCell>
                    <TableCell>{post.location}</TableCell>
                    <TableCell>
                      <Button
                        style={{ marginRight: "8px" }}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(post)}
                      >
                        <BorderColorIcon />
                      </Button>

                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(post.id)}
                      >
                        <DeleteOutlineIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>
                {editPostId ? "Edit Post" : "Add New Post"}
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={editPostId ? editName : name}
                    onChange={(e) =>
                      editPostId
                        ? setEditName(e.target.value)
                        : setName(e.target.value)
                    }
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    value={editPostId ? editEmail : email}
                    onChange={(e) =>
                      editPostId
                        ? setEditEmail(e.target.value)
                        : setEmail(e.target.value)
                    }
                  />

                  <TextField
                    margin="dense"
                    label="Designation"
                    type="text"
                    fullWidth
                    value={editPostId ? editDesignation : designation}
                    onChange={(e) =>
                      editPostId
                        ? setEditDesignation(e.target.value)
                        : setDesignation(e.target.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Company"
                    type="text"
                    fullWidth
                    value={editPostId ? editCompany : company}
                    onChange={(e) =>
                      editPostId
                        ? setEditCompany(e.target.value)
                        : setCompany(e.target.value)
                    }
                  />
                  <TextField
                    margin="dense"
                    label="Location"
                    type="text"
                    fullWidth
                    value={editPostId ? editLocation : location}
                    onChange={(e) =>
                      editPostId
                        ? setEditLocation(e.target.value)
                        : setLocation(e.target.value)
                    }
                  />
                </form>
              </DialogContent>

              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleSubmit();
                    setConfirmDialogAction("edit");
                    setConfirmDialogOpen(true);
                  }}
                  color="primary"
                >
                  {editPostId ? "Update" : "Add"}
                </Button>
               
              </DialogActions>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
              <DialogTitle>Confirmation</DialogTitle>

              <DialogContent>
                {confirmDialogAction === "delete" ? (
                  <Typography>
                    Are you sure you want to delete this post?
                  </Typography>
                ) : (
                  <Typography>
                    Are you sure you want to save changes?
                  </Typography>
                )}
              </DialogContent>

              <DialogActions>
                <Button onClick={handleConfirmDialogClose}>Cancel</Button>
                <Button onClick={handleConfirmAction} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>



          </Box>
        </Container>
      </div>
    </>
  );
};

export default DialogBox;

//  check tomorrow why after .filter remove then data is showing else it not showing check

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
// import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//  import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from '@mui/material/InputAdornment';

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
//   const [editName, setEditName] = useState('');
//   const [editEmail, setEditEmail] = useState('');
//   const [editDesignation, setEditDesignation] = useState('');
//   const [editCompany, setEditCompany] = useState('');
//   const [editLocation, setEditLocation] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [isEmptyResults, setIsEmptyResults] = useState(false);

//   // Fetch data on component mount
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
//           // .filter((post) =>
//           //   post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           //   post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           //   post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           //   post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           //   post.location.toLowerCase().includes(searchQuery.toLowerCase())
//           // );

//         setPostData(postsArray);
//         setIsEmptyResults(postsArray.length === 0); // Check if search results are empty
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
//       // Ensure user is authenticated before making the request
//       if (!auth.currentUser) {
//         throw new Error('User is not authenticated.');
//       }

//       if (editPostId) {
//         // Update existing post
//         const response = await fetch(`https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             name: editName,
//             email: editEmail,
//             designation: editDesignation,
//             company: editCompany,
//             location: editLocation,
//             userId: auth.currentUser.uid // Include the user ID in the post data
//           })
//         });

//         if (response.ok) {
//           console.log('Post updated successfully');
//           setEditPostId(null);
//           setEditName('');
//           setEditEmail('');
//           setEditDesignation('');
//           setEditCompany('');
//           setEditLocation('');

//           fetchData();
//         } else {
//           throw new Error('Error updating post');
//         }
//       } else {
//         // Add new post
//         const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             designation,
//             company,
//             location,
//             userId: auth.currentUser.uid // Include the user ID in the post data
//           })
//         });

//         if (response.ok) {
//           console.log('Post created successfully');
//           setName('');
//           setEmail('');
//           setDesignation('');
//           setCompany('');
//           setLocation('');

//           fetchData();
//         } else {
//           throw new Error('Error creating post');
//         }
//       }
//     } catch (error) {
//       console.error('Error creating/updating post:', error);
//     }

//     setOpenDialog(false);
//   };

//   const handleOpenDialog = (post) => {
//     setOpenDialog(true);

//     if (post) {
//       setEditPostId(post.id);
//       setEditName(post.name);
//       setEditEmail(post.email);
//       setEditDesignation(post.designation);
//       setEditCompany(post.company);
//       setEditLocation(post.location);
//     } else {
//       setEditPostId(null);
//       setEditName('');
//       setEditDesignation('');
//       setEditCompany('');
//       setEditLocation('');
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditPostId(null);
//     setEditName('');
//     setEditDesignation('');
//     setEditCompany('');
//     setEditLocation('');
//     setIsEmptyResults(false); // Reset the isEmptyResults state variable

//   };

//   const handleEdit = (post) => {
//     handleOpenDialog(post);
//   };

//   const handleDelete = async (postId) => {
//     try {
//       // Ensure user is authenticated before making the request
//       if (!auth.currentUser) {
//         throw new Error('User is not authenticated.');
//       }

//       const response = await fetch(`https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${postId}.json`, {
//         method: 'DELETE'
//       });

//       if (response.ok) {
//         console.log('Post deleted successfully');
//         fetchData();
//       } else {
//         throw new Error('Error deleting post');
//       }
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   return (<>
//     <div>

//       <Container>
//         <Box>
//         <Box mb={2}>
//             <TextField
//               margin="dense"
//               label="Search"
//               type="text"

//               width='50%'
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onBlur={fetchData} // Fetch data when the search query loses focus
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   e.preventDefault();
//                   fetchData(); // Fetch data when the Enter key is pressed
//                 }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="end">
//                   <SearchIcon />
//                   </InputAdornment>
//                 )
//               }}
//             />
//           </Box>
//           <Typography variant="h4" position="center" style={{ textAlign: 'center', display: 'inline', color: 'green' }} mb={2}>
//             TableList View
//           </Typography>

//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleOpenDialog}
//             style={{
//               background: 'green',
//               color: 'white',
//               borderRadius: '10px',
//               float: 'right'
//             }}
//           >
//             Add Data
//           </Button>

//           {isEmptyResults && (
//                   <Typography variant="h5" style={{ display:'contents',textAlign: 'center', marginTop: '16px',color:'red' }}>
//                     Data not found.
//                   </Typography>
//                 )}
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Sr no</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Designation</TableCell>
//                   <TableCell>Company</TableCell>
//                   <TableCell>Location</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {postData.map((post, index) => (
//                   <TableRow key={post.id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{post.name}</TableCell>
//                     <TableCell>{post.email}</TableCell>
//                     <TableCell>{post.designation}</TableCell>
//                     <TableCell>{post.company}</TableCell>
//                     <TableCell>{post.location}</TableCell>
//                     <TableCell >
//                       <Button style={{ marginRight: '8px' }} variant="outlined" color="primary" onClick={() => handleEdit(post)}>
//                         <BorderColorIcon />
//                       </Button>

//                       <Button variant="outlined" color="secondary" onClick={() => handleDelete(post.id)}>
//                         <DeleteOutlineIcon />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//            <Dialog open={openDialog} onClose={handleCloseDialog}>
//             <DialogTitle>{editPostId ? 'Edit Post' : 'Add New Post'}</DialogTitle>
//             <DialogContent>
//               <form onSubmit={handleSubmit}>

//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label="Name"
//                   type="text"
//                   fullWidth
//                   value={editPostId ? editName : name}
//                   onChange={(e) => (editPostId ? setEditName(e.target.value) : setName(e.target.value))}
//                 />
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   label="Email"
//                   type="text"
//                   fullWidth
//                   value={editPostId ? editEmail : email}
//                   onChange={(e) => (editPostId ? setEditEmail(e.target.value) : setEmail(e.target.value))}
//                 />

//                 <TextField
//                   margin="dense"
//                   label="Designation"
//                   type="text"
//                   fullWidth
//                   value={editPostId ? editDesignation : designation}
//                   onChange={(e) => (editPostId ? setEditDesignation(e.target.value) : setDesignation(e.target.value))}
//                 />
//                 <TextField
//                   margin="dense"
//                   label="Company"
//                   type="text"
//                   fullWidth
//                   value={editPostId ? editCompany : company}
//                   onChange={(e) => (editPostId ? setEditCompany(e.target.value) : setCompany(e.target.value))}
//                 />
//                 <TextField
//                   margin="dense"
//                   label="Location"
//                   type="text"
//                   fullWidth
//                   value={editPostId ? editLocation : location}
//                   onChange={(e) => (editPostId ? setEditLocation(e.target.value) : setLocation(e.target.value))}
//                 />

//               </form>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseDialog} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit} color="primary">
//                 {editPostId ? 'Update' : 'Add'}
//               </Button>
//             </DialogActions>
//           </Dialog>

//         </Box>

//       </Container>
//     </div>
//   </>
//   );
// };

// export default CustomerTableList;
