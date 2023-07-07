import React, { useEffect, useState } from 'react';
// import { getAuth } from 'firebase/auth';
import { getAuth,onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import {  Container, Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

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
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

      const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json');
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      }));

      // Filter the posts to display only the ones created by the current user
      const currentUserPosts = postsArray.filter((post) => post.userId === auth.currentUser.uid);
      // console.log( auth.currentUser.getIdToken)
      // console.log( "----------------")
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

      const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body,
          userId: auth.currentUser.uid // Include the user ID in the post data
        }),
      });

      if (response.ok) {
        console.log('Post created successfully');
        setTitle('');
        setBody('');

        fetchData();
      } else {
        throw new Error('Error creating post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          <Typography variant="h3" style={{ textAlign: "center", display: "inline", color: 'green' }} mb={2}>
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
              float: 'right'
            }}
          >
            Add Message
          </Button>

          <ul>
            {postData.map((post) => (
              <li key={post.id}>
                <Box
                  width="auto"
                  backgroundColor="#fff"
                  borderRadius={5}
                  padding={5}
                  paddingBottom={0.5}
                  marginTop={2}
                  textAlign="center"
                  boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
                >
                  <h3 style={{ textAlign: 'left', fontSize: '20px', fontWeight: 'bold', color: '#213625', paddingBottom: '10px' }}>
                    {post.title}:
                  </h3>
                  <p style={{ textAlign: 'left', paddingBottom: '10px', color: '#778591' }}>{post.body}</p>
                </Box>
              </li>
            ))}
          </ul>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Add New Post</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="Body"
                  multiline
                  rows={4}
                  fullWidth
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </div>
  );
};

export default ListTable;




