import React, { useState } from 'react';
import { Button, Box, Typography, IconButton, Container, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigate } from 'react-router-dom';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Sidebar from '../pages/Home/Sidebar';


// Replace with your Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function AddDataButton() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleAddData = () => {
    const data = {
      name,
      email,
      designation,
      company,
      location,
    };


    setIsConfirmationOpen(true);
  };

  const handleConfirmationYes = () => {
    const data = {
      name,
      email,
      designation,
      company,
      location,
    };

    // Push data to Firebase Realtime Database
    firebase.database().ref('posts').push(data);

    // Reset form fields
    setName('');
    setEmail('');
    setDesignation('');
    setCompany('');
    setLocation('');

    setIsConfirmationOpen(false);
    setIsDialogOpen(true);

  };

  const handleConfirmationNo = () => {
    setIsConfirmationOpen(false);
  };


  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };


  return (
    <>
    <Sidebar/>
    <Container style={{marginRight:0 ,marginTop:20}}
       sx={{
        '@media (min-width: 1500px) and (min-height: 900px)': {
          /* Styles for the media query */
          width: '100%',
          marginLeft: 55,
          /* Other styles here */
        },
      }}
    >
        <div style={{ height: '30px', width: '200px' }}>
          <IconButton
            color="secondary"
            onClick={goBack}
            style={{ fontSize: '17px', float: 'left', marginTop: '25px' }}
          >
            <KeyboardBackspaceIcon />
            Back
          </IconButton>
        </div>
<Box
     width="auto"
     backgroundColor="#F4F6F8"
    
     height="80vh"
     borderRadius={3}
     padding={2}
     paddingBottom={0.5}
     marginTop={5}
     textAlign="center"
     boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
    //  sx={{
    //   '@media (min-width: 1370px) and (min-height: 701px)': {
    //     /* Styles for the media query */
    //     width: '100%',
    //     marginLeft:-25
    //     /* Other styles here */
    //   },
    // }}
>



        <Box
         maxWidth={'80%'}
         marginLeft={14}
         backgroundColor="#fff"
         height="auto"
         borderRadius={3}
         padding={2}
         paddingBottom={0.5}
         marginTop={5}
         textAlign="center"
         boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
         
          >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography style={{ fontSize: '24px', textAlign: 'center', color: 'green', marginBottom: '10px' }}>
              Enter your details
            </Typography>
          </div>

          <Box mt={2} mb={2}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <Button variant="contained" color="success" onClick={handleAddData}>
              Add Data
            </Button>
          </Box>
        </Box>

        </Box>





      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationOpen} onClose={handleConfirmationNo}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to add data?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationNo} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmationYes} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>



      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Data Added</DialogTitle>
        <DialogContent>
          <Typography variant="body1">The data has been successfully added.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
}