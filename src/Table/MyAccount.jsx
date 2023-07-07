// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/database';

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState(null);

//   useEffect(() => {
//     // Firebase configuration
//     const firebaseConfig = {
//       // Your Firebase configuration
//     };

//     // Initialize Firebase
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     // Check if a user is authenticated
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // Retrieve user data from Firebase Realtime Database based on UID
//         const fetchUserData = async () => {
//           try {
//             const response = await firebase
//               .database()
//               .ref('Sign-up-form')
//               .child(user.uid)
//               .once('value');
//             const data = response.val();

//             if (data) {
//               setUserData(data);
//             } else {
//               console.log('User data not found.');
//             }
//           } catch (error) {
//             console.error('Error retrieving user data:', error);
//           }
//         };

//         fetchUserData();
//       } else {
//         console.log('User not authenticated.');
//       }
//     });
//   }, []);

//   const goBack = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//     setUpdatedData(userData);
//   };

//   const handleInputChange = (e) => {
//     setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       await firebase
//         .database()
//         .ref('Sign-up-form')
//         .child(firebase.auth().currentUser.uid)
//         .update(updatedData);

//       setUserData(updatedData);
//       setIsEditing(false);
//       console.log('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   return (
//     <div>
//       <button className="backButton" onClick={goBack}>
//         Back
//       </button>
//       <h1>Profile Page</h1>
//       {userData && (
//         <div>
//           {isEditing ? (
//             <div>
//               <h1>Edit User Information:</h1>
//               <p>
//                 Name:{' '}
//                 <input
//                   name="name"
//                   type="text"
//                   value={updatedData.name}
//                   onChange={handleInputChange}
//                 />
//               </p>
//               <p>
//                 Email:{' '}
//                 <input
//                   name="email"
//                   type="email"
//                   value={updatedData.email}
//                   onChange={handleInputChange}
//                 />
//               </p>
//               <p>
//                 Password:{' '}
//                 <input
//                   name="password"
//                   type="password"
//                   value={updatedData.password}
//                   onChange={handleInputChange}
//                 />
//               </p>
//               {/* Render other input fields for the remaining data */}
//               {/* ... */}
//               <button onClick={handleSave}>Save</button>
//             </div>
//           ) : (
//             <div>
//               <h1>User Information:</h1>
//               <p>Name: {userData.name}</p>
//               <p>Email: {userData.email}</p>
//               <p>Password: {userData.password}</p>
//               {/* Render other data fields */}
//               {/* ... */}
//               <button onClick={handleEdit}>Edit</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


        // Firebase configuration
        // const firebaseConfig = {
        //     apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
        //     authDomain: "pwa-app-2b96d.firebaseapp.com",
        //     databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
        //     projectId: "pwa-app-2b96d",
        //     storageBucket: "pwa-app-2b96d.appspot.com",
        //     messagingSenderId: "230575406452",
        //     appId: "1:230575406452:web:fab98689e7446fb3064021",
        //     measurementId: "G-V2G6MGPNN5"
        // };
    
    



 

 
    // import React, { useEffect, useState } from 'react';
    // import { useNavigate } from 'react-router-dom';
    // import firebase from 'firebase/compat/app';
    // import 'firebase/compat/database';
    
    // export default function Profile() {
    //   const navigate = useNavigate();
    //   const [userData, setUserData] = useState(null);
    
    //   useEffect(() => {
    //     // Firebase configuration
        // const firebaseConfig = {
        //     apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
        //     authDomain: "pwa-app-2b96d.firebaseapp.com",
        //     databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
        //     projectId: "pwa-app-2b96d",
        //     storageBucket: "pwa-app-2b96d.appspot.com",
        //     messagingSenderId: "230575406452",
        //     appId: "1:230575406452:web:fab98689e7446fb3064021",
        //     measurementId: "G-V2G6MGPNN5"
        // };
    
    //     // Initialize Firebase
    //     if (!firebase.apps.length) {
    //       firebase.initializeApp(firebaseConfig);
    //     }
    
    //     // Retrieve user data from Firebase Realtime Database
    //     const fetchUserData = async () => {
    //       try {
    //         const response = await firebase.database().ref('Sign-up-form').once('value');
    //         const data = response.val();
    
    //         // Get the first user in the data object (assuming there's only one user)
    //         const userId = Object.keys(data)[0];
    //         const user = data[userId];
    
    //         setUserData(user);
    //       } catch (error) {
    //         console.error('Error retrieving user data:', error);
    //       }
    //     };
    
    //     fetchUserData();
    //   }, []);
    
    //   const goBack = () => {
    //     navigate(-1); // Navigate back to the previous page
    //   };
    
    //   return (
    //     <div>
    //       <button className='backButton' onClick={goBack}>Back</button>
    //       <h1>Profile Page</h1>
    //       {userData && (
    //         <div>
    //           <h1>User Information:</h1>
    //           <p>Name: {userData.name}</p>
    //           <p>Email: {userData.email}</p>
    //           <p>Password: {userData.password}</p>
    //           <p>dateofbirth: {userData.dateofbirth}</p>
    //           <p>Address: {userData.address}</p>
    //           <p>colony: {userData.colony}</p>
    //           <p>city: {userData.city}</p>
    //           <p>state: {userData.state}</p>
    //           <p>country: {userData.country}</p>
    //           <p>pincode: {userData.pincode}</p>
    //           <p>phone: {userData.phone}</p>
            
            
            
          
    //         </div>
    //       )}
    //     </div>
    //   );
    // }
    








//   import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/database';

// import {  Container, Box,TextField, Button, Card, CardContent, Grid, Typography } from '@mui/material';
// import { IconButton } from '@mui/material';
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
// import Sidebar from '../pages/Home/Sidebar';
// import Header from '../components/Header';
// import 'firebase/compat/auth';

 

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     dateofbirth: '',
//     address: '',
//     colony: '',
//     city: '',
//     state: '',
//     country: '',
//     pincode: '',
//     phone: '',
//   });

//   useEffect(() => {
//     // Firebase configuration
    // const firebaseConfig = {
    //     apiKey: "AIzaSyDZLtUPRAH2QiydAymfRf4457j7NyUv8SU",
    //     authDomain: "pwa-app-2b96d.firebaseapp.com",
    //     databaseURL: "https://pwa-app-2b96d-default-rtdb.firebaseio.com",
    //     projectId: "pwa-app-2b96d",
    //     storageBucket: "pwa-app-2b96d.appspot.com",
    //     messagingSenderId: "230575406452",
    //     appId: "1:230575406452:web:fab98689e7446fb3064021",
    //     measurementId: "G-V2G6MGPNN5"
    // };

//     // Initialize Firebase
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     // Retrieve user data from Firebase Realtime Database
//     const fetchUserData = async () => {
//       try {
//         const response = await firebase.database().ref('Sign-up-form').once('value');
//         const data = response.val();

//         // Get the first user in the data object (assuming there's only one user)
//         const userId = Object.keys(data)[0];
//         const user = data[userId];

//         setUserData(user);
//         setFormData({
//           name: user.name,
//           email: user.email,
//           dateofbirth: user.dateofbirth,
//           address: user.address,
//           colony: user.colony,
//           city: user.city,
//           state: user.state,
//           country: user.country,
//           pincode: user.pincode,
//           phone: user.phone,
//         });
//       } catch (error) {
//         console.error('Error retrieving user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const goBack = () => {
//     navigate(-1); // Navigate back to the previous page
//   };

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await firebase.database().ref('Sign-up-form').once('value');
//       const data = response.val();
//       const userId = Object.keys(data)[0];

//       await firebase.database().ref(`Sign-up-form/${userId}`).update(formData);

//       setUserData(formData);
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Error updating user profile:', error);
//     }
//   };

//   return (

//     <Container>
//         {/* <Header/> */}
//      <div style={{height:'30px',width:'200px' ,marginTop:'8px'}}>
//      <IconButton  
//       color='secondary' 
//       onClick={goBack} 
//       style={{ fontSize:'20px',float:'left'  }}
//       >
 
//  Back
// </IconButton>
//       </div> 
    


//     <Box
//       width="100%"
//       backgroundColor="#F4F6F8"
//       height='80vh'
//       borderRadius={3}
//       padding={2}
//       paddingBottom={0.5}
//       marginTop={5}
//       textAlign="center"
//       boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)">

//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//   <Typography style={{ fontSize: '24px', textAlign: 'center' ,color:'green'}}>User Profile</Typography>
// </div>  
//     {userData && (
//         <Card>
//           <CardContent>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="name"
//                   label="Name"
//                   variant="outlined"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="email"
//                   label="email"
//                   variant="outlined"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="dateofbirth"
//                   label="Date of Birth"
//                   variant="outlined"
//                   value={formData.dateofbirth}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="address"
//                   label="Address"
//                   variant="outlined"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="colony"
//                   label="Colony"
//                   variant="outlined"
//                   value={formData.colony}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="city"
//                   label="City"
//                   variant="outlined"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="state"
//                   label="State"
//                   variant="outlined"
//                   value={formData.state}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="country"
//                   label="Country"
//                   variant="outlined"
//                   value={formData.country}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="pincode"
//                   label="Pin Code"
//                   variant="outlined"
//                   value={formData.pincode}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   name="phone"
//                   label="Phone Number"
//                   variant="outlined"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button  style={{float:'center'}}  variant="contained" color='secondary'  onClick={handleUpdate} >
//                   Update Profile
//                 </Button>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//     </Container>
//   );
// }





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

import {
  Container,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Sidebar from '../pages/Home/Sidebar';

export default function MyAccount() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateofbirth: '',
    address: '',
    colony: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phone: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Firebase configuration
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Retrieve user data from Firebase Realtime Database
    const fetchUserData = async () => {
      try {
        const response = await firebase.database().ref('Sign-up-form').once('value');
        const data = response.val();

        // Get the first user in the data object (assuming there's only one user)
        const userId = Object.keys(data)[0];
        const user = data[userId];

        setUserData(user);
        setFormData({
          name: user.name,
          email: user.email,
          dateofbirth: user.dateofbirth,
          address: user.address,
          colony: user.colony,
          city: user.city,
          state: user.state,
          country: user.country,
          pincode: user.pincode,
          phone: user.phone,
        });
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    openDialog();
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmUpdate = async () => {
    try {
      const response = await firebase.database().ref('Sign-up-form').once('value');
      const data = response.val();
      const userId = Object.keys(data)[0];

      await firebase.database().ref(`Sign-up-form/${userId}`).update(formData);

      setUserData(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }

    closeDialog();
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
      
      {/* <div style={{ height: '30px', width: '200px',  }}>
        <IconButton
          color="secondary"
          onClick={goBack}
          style={{ fontSize: '17px', float: 'left' , marginTop:'25px'}}
        >
          <KeyboardBackspaceIcon />
          Back
        </IconButton>
      </div> */}

      <Box
        width="auto"
        backgroundColor="#F4F6F8"
        height="75vh"
        borderRadius={3}
        padding={2}
        paddingBottom={0.5}
        marginTop={10}
        textAlign="center"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
     
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={{ fontSize: '24px', textAlign: 'center', color: 'green', marginBottom:'10px'}}>
            User Profile
          </Typography>
        </div>



        {userData && (
          <Card>
            <CardContent >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="dateofbirth"
                    label="Date of Birth"
                    variant="outlined"
                    value={formData.dateofbirth}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    value={formData.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="colony"
                    label="Colony"
                    variant="outlined"
                    value={formData.colony}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="city"
                    label="City"
                    variant="outlined"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="state"
                    label="State"
                    variant="outlined"
                    value={formData.state}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="country"
                    label="Country"
                    variant="outlined"
                    value={formData.country}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="pincode"
                    label="Pin Code"
                    variant="outlined"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    variant="outlined"
                    value={formData.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="success" onClick={handleUpdate}>
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}



      </Box>


      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to update your profile?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmUpdate} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>



    </Container>
    
    </>
  );
}
