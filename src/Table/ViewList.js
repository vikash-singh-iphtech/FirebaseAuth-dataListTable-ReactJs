import React, { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  getMessaging,
  onMessage,
  getToken,
  onTokenRefresh,
} from 'firebase/messaging';
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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const firebaseConfig = {

  apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
  authDomain: "pwa-app-2b96d.firebaseapp.com",
  databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
  projectId: "pwa-app-2b96d",
  storageBucket: "pwa-app-2b96d.appspot.com",
  messagingSenderId: "230575406452",
  appId: "1:230575406452:web:fab98689e7446fb3064021",
  measurementId: "G-V2G6MGPNN5"

};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const messaging = getMessaging(app);

const ListTable = () => {
  const [postData, setPostData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [srNo, setSrNo] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [postId, setPostId] = useState(null);
  

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Ensure user is authenticated before making the request
      if (!auth.currentUser) {
        throw new Error('User is not authenticated.');
      }

      const response = await fetch(
        'https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json'
      );
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      // Filter the posts to display only the ones created by the current user
      const currentUserPosts = postsArray.filter(
        (post) => post.userId === auth.currentUser.uid
      );

      setPostData(currentUserPosts);
    } catch (error) {
      console.error('Error retrieving post data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure user is authenticated before making the request
      if (!auth.currentUser) {
        throw new Error('User is not authenticated.');
      }

      const postUrl = postId
        ? `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${postId}.json`
        : 'https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json';

      const response = await fetch(postUrl, {
        method: postId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          srNo,
          name,
          email,
          designation,
          company,
          location,
          userId: auth.currentUser.uid, // Include the user ID in the post data
        }),
      });

      if (response.ok) {
        console.log('Post created/updated successfully');
        setSrNo('');
        setName('');
        setEmail('');
        setDesignation('');
        setCompany('');
        setLocation('');
        setPostId(null);

        fetchData();
      } else {
        throw new Error('Error creating/updating post');
      }
    } catch (error) {
      console.error('Error creating/updating post:', error);
    }

    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEdit = (post) => {
    setSrNo(post.srNo);
    setName(post.name);
    setEmail(post.email);
    setDesignation(post.designation);
    setCompany(post.company);
    setLocation(post.location);
    setPostId(post.id);
    setOpenDialog(true);
  };

  const handleDelete = async (postId) => {
    try {
      // Ensure user is authenticated before making the request
      if (!auth.currentUser) {
        throw new Error('User is not authenticated.');
      }

      const response = await fetch(
        `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${postId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        console.log('Post deleted successfully');
        fetchData();
      } else {
        throw new Error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Container>
        <Box
          width="auto"
          backgroundColor="#F4F6F8"
          borderRadius={3}
          padding={2}
          paddingBottom={0.5}
          marginTop={-10}
          textAlign="center"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <Typography
            variant="h3"
            style={{ textAlign: 'center', display: 'inline', color: 'green' }}
            mb={2}
          >
            Comments
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            style={{
              background: 'green',
              color: 'white',
              borderRadius: '10px',
              float: 'right',
            }}
          >
            Add Message
          </Button>

          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
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
        <IconButton color="primary" onClick={() => handleEdit(post)}>
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleDelete(post.id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{postId ? 'Edit' : 'Add'} New Post</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
           
                <TextField
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Designation"
                  type="text"
                  fullWidth
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Company"
                  type="text"
                  fullWidth
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Location"
                  type="text"
                  fullWidth
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                {postId ? 'Save' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
};

export default ListTable;
