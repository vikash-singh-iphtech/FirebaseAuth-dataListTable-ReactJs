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
  Paper,
  TableContainer,
} from "@mui/material";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import "../CustomerTable.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Sidebar from "./Home/Sidebar";
import { Link } from "react-router-dom";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const ViewData = () => {
  const [postData, setPostData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [editPostId, setEditPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);
  const [isEndOfData, setIsEndOfData] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editDesignation, setEditDesignation] = useState("");
  const [editCompany, setEditCompany] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [viewEmail, setViewEmail] = useState("");
  const [viewDesignation, setViewDesignation] = useState("");
  const [viewCompany, setViewCompany] = useState("");
  const [viewLocation, setViewLocation] = useState("");



  const handleOpenConfirmationDialog = () => {
    setConfirmDialogAction("edit");
    setConfirmDialogOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
        setIsEmptyResults(postsArray.length === 0);
        setIsEndOfData(true);

        if (postsArray.length < data.length) {
          setIsEndOfData(false);
        }
      } else {
        setPostData([]);
        setIsEmptyResults(true);
        setIsEndOfData(true);
      }
    } catch (error) {
      console.error("Error retrieving post data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        throw new Error("User is not authenticated.");
      }

      if (editPostId) {

        const response = await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: editName,
              email: editEmail,
              designation: editDesignation,
              company: editCompany,
              location: editLocation,
              userId: auth.currentUser.uid, 
            }),
          }
        );

        if (response.ok) {
          setName("");
          setEmail("");
          setDesignation("");
          setCompany("");
          setLocation("");

          fetchData();
        } else {
          console.error("Error editing post:", response);
        }
      } else {
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
              userId: auth.currentUser.uid, 
            }),
          }
        );

        if (response.ok) {
          setName("");
          setEmail("");
          setDesignation("");
          setCompany("");
          setLocation("");
          fetchData();
        } else {
          console.error("Error adding post:", response);
        }
      }
    } catch (error) {
      console.error("Error adding/editing post:", error);
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
    setIsEmptyResults(false); 
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
      // Handle delete action
      try {
        // Delete the post
        await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: "DELETE",
          }
        );

        // Reset state and fetch updated data
        setConfirmDialogOpen(false);
        setEditPostId(null);
        fetchData();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    } else if (confirmDialogAction === "edit") {
      // Handle edit action
      try {
        if (editPostId) {
          // Edit existing post
          const response = await fetch(
            `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: editName,
                email: editEmail,
                designation: editDesignation,
                company: editCompany,
                location: editLocation,
                userId: auth.currentUser.uid, 
              }),
            }
          );

          if (response.ok) {
            setName("");
            setEmail("");
            setDesignation("");
            setCompany("");
            setLocation("");
            handleCloseDialog();
            fetchData();
          } else {
            console.error("Error editing post:", response);
          }
        } else {
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
                userId: auth.currentUser.uid,
              }),
            }
          );

          if (response.ok) {
            setName("");
            setEmail("");
            setDesignation("");
            setCompany("");
            setLocation("");
            handleCloseDialog();
            fetchData();
          } else {
            console.error("Error adding post:", response);
          }
        }
      } catch (error) {
        console.error("Error adding/editing post:", error);
      }
    }
    setConfirmDialogOpen(false);
  };

      

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredData(
      postData.filter(
        (post) =>
          post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setIsEmptyResults(filteredData.length === 0);
  }, [searchQuery, postData]);

  const handleSort = (column) => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }

    setFilteredData(
      [...postData]
        .sort((a, b) => {
          if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
          if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
          return 0;
        })
        .filter(
          (post) =>
            post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.designation
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  };

  useEffect(() => {
    setFilteredData(
      postData.filter(
        (post) =>
          post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [postData, searchQuery]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has reached the bottom of the page
      loadMoreData();
    }
  };

  const loadMoreData = () => {
    if (!isLoading && !isEndOfData) {
      // Fetch more data
      fetchData();
    }
  };

  const handleView = (post) => {
    setViewName(post.name);
    setViewEmail(post.email);
    setViewCompany(post.company);
    setViewLocation(post.location);
    setViewDesignation(post.designation);
    setViewDialogOpen(true);
  };

  return (
    <>
      <Sidebar />
      <Container style={{ marginRight: 0, marginTop: 20 }}
         sx={{
          '@media (min-width: 1500px) and (min-height: 900px)': {
            /* Styles for the media query */
            width: '100%',
            marginLeft: 55,
            /* Other styles here */
          },
        }}
      >
        <Box
          className="Largescreen"
          width="100%"
          // backgroundColor="#F4F6F8"
          borderRadius={3}
          padding={2}
          paddingBottom={0.5}
          marginTop={0}
          textAlign="center"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
          // sx={{
          //   '@media (min-width: 1370px) and (min-height: 701px)': {
          //     /* Styles for the media query */
          //     width: '100%',
          //     marginLeft:-25
          //     /* Other styles here */
          //   },
          // }}

        >
          <Box display="flex" justifyContent="flex-end" marginBottom={2}>
            <Link
              variant="contained"
              color="primary"
              style={{
                padding: "4px",
                width: "100px",
                border: "1px solid grey",
                borderRadius: "5px",
                backgroundColor: "green",
                textDecoration: "none",
                color: "white",
              }}
              to="/AddData"
            >
              Add Data
            </Link>{" "}
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Typography
                variant="h4"
                position="center"
                style={{
                  textAlign: "center",
                  display: "inline",
                  color: "green",
                }}
                mb={2}
              >
                TableList View
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <TextField
                sx={{ marginBlock: 1 }}
                label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Table>
            <TableHead className="head-contentname">
              <TableRow>
                <TableCell>
                  <button className="shortingbtn">Sr.</button>
                </TableCell>

                <TableCell>
                  <button
                    className="sort-button shortingbtn"
                    onClick={() => handleSort("name")}
                    style={{ border: "none" }}
                  >
                    Name
                    {sortOrder === "asc" ? (
                      <span>&#x25BC;</span>
                    ) : (
                      <span>&#x25B2;</span>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="sort-button shortingbtn"
                    onClick={() => handleSort("email")}
                  >
                    Email
                    {sortOrder === "asc" ? (
                      <span>&#x25BC;</span>
                    ) : (
                      <span>&#x25B2;</span>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="sort-button shortingbtn"
                    onClick={() => handleSort("designation")}
                  >
                    Designation
                    {sortOrder === "asc" ? (
                      <span>&#x25BC;</span>
                    ) : (
                      <span>&#x25B2;</span>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="sort-button shortingbtn"
                    onClick={() => handleSort("company")}
                  >
                    Company
                    {sortOrder === "asc" ? (
                      <span>&#x25BC;</span>
                    ) : (
                      <span>&#x25B2;</span>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    className="sort-button shortingbtn"
                    onClick={() => handleSort("location")}
                  >
                    Location
                    {sortOrder === "asc" ? (
                      <span>&#x25BC;</span>
                    ) : (
                      <span>&#x25B2;</span>
                    )}
                  </button>
                </TableCell>
                <TableCell>
                  <button className="shortingbtn">Actions</button>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((post, index) => (
                <TableRow key={post.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{post.name}</TableCell>
                  <TableCell>{post.email}</TableCell>
                  <TableCell>{post.designation}</TableCell>
                  <TableCell>{post.company}</TableCell>
                  <TableCell>{post.location}</TableCell>

                  <TableCell>
                    <Button
                      style={{ margin: "1px " }}
                      variant="outlined"
                      color="success"
                      onClick={() => handleView(post)}
                    >
                      <VisibilityIcon />
                    </Button>
                    <Button
                      style={{ margin: "1px " }}
                      variant="outlined"
                      color="primary"
                    >
                      <BorderColorIcon
                        color="success"
                        onClick={() => handleEdit(post)}
                      />
                    </Button>

                    <Button
                      style={{ margin: "1px " }}
                      variant="outlined"
                      color="success"
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
                  // required
                  value={editPostId ? editName : name}
                  onChange={(e) =>
                    editPostId
                      ? setEditName(e.target.value)
                      : setName(e.target.value)
                  }
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  // required
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
                  required
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
                  // required
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
                  // required
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
              {/* here i am making change to add the data by giving eve */}

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
            {/* </form> */}
          </Dialog>
          <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
            <DialogTitle>Confirmation</DialogTitle>

            <DialogContent>
              {confirmDialogAction === "delete" ? (
                <Typography>
                  Are you sure you want to delete this post?
                </Typography>
              ) : (
                <Typography>Are you sure you want to save changes?</Typography>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleConfirmDialogClose}>Cancel</Button>
              <Button onClick={handleConfirmAction} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={viewDialogOpen}
            onClose={() => setViewDialogOpen(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle style={{ color: "green" }}>User Details</DialogTitle>
            <DialogContent style={{ marginTop: "" }}>
              <Box mt={2} mb={2}>
                <TextField label="Name" value={viewName} fullWidth />
              </Box>
              <Box mb={2}>
                <TextField label="Email" value={viewEmail} fullWidth />
              </Box>
              <Box mb={2}>
                <TextField label="Company" value={viewCompany} fullWidth />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Designation"
                  value={viewDesignation}
                  fullWidth
                />
              </Box>
              <Box mb={2}>
                <TextField label="Location" value={viewLocation} fullWidth />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={() => setViewDialogOpen(false)}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </>
  );
};
export default ViewData;
