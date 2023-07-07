import React, { useEffect, useState } from 'react';
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
  TableBody
} from '@mui/material';
import { getAuth, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

const messaging = getMessaging(app);

const Customer2 = () => {
  const [postData, setPostData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [editPostId, setEditPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isEmptyResults, setIsEmptyResults] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogAction, setConfirmDialogAction] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json');
      const data = await response.json();

      if (data) {
        const postsArray = Object.keys(data)
          .map((key) => ({
            id: key,
            ...data[key]
          }))
          .filter((post) =>
            post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.location.toLowerCase().includes(searchQuery.toLowerCase())
          );

        setPostData(postsArray);
        setIsEmptyResults(postsArray.length === 0);
      } else {
        setPostData([]);
        setIsEmptyResults(true);
      }
    } catch (error) {
      console.error('Error retrieving post data:', error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (editPostId) {
        // Edit existing post
        const response = await fetch(
          `https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${editPostId}.json`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              designation,
              company,
              location,
            }),
          }
        );
  
        if (response.ok) {
          setName('');
          setEmail('');
          setDesignation('');
          setCompany('');
          setLocation('');
          setEditPostId(null);
          setOpenDialog(false);
          fetchData();
        } else {
          console.error('Error editing post:', response);
        }
      } else {
        // Add new post
        const response = await fetch(
          'https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              designation,
              company,
              location,
            }),
          }
        );
  
        if (response.ok) {
          setName('');
          setEmail('');
          setDesignation('');
          setCompany('');
          setLocation('');
          setOpenDialog(false);
          fetchData();
        } else {
          console.error('Error adding post:', response);
        }
      }
    } catch (error) {
      console.error('Error adding/editing post:', error);
    }
  };
  
  const handleEdit = (post) => {
    setEditPostId(post.id);
    setName(post.name);
    setEmail(post.email);
    setDesignation(post.designation);
    setCompany(post.company);
    setLocation(post.location);
    setOpenDialog(true);
  };
  
  const handleOpenDialog = () => {
    setEditPostId(null);
    setName('');
    setEmail('');
    setDesignation('');
    setCompany('');
    setLocation('');
    setOpenDialog(true);
  };
  


  const handleDelete = async (id) => {
    setConfirmDialogOpen(false);

    try {
      const response = await fetch(`https://pwa-app-2b96d-default-rtdb.firebaseio.com/posts/${id}.json`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error deleting post:', response);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredData(
      postData.filter((post) =>
        post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setIsEmptyResults(filteredData.length === 0);
  }, [searchQuery, postData]);

  return (
    <>
    <div> 


    
    <Container maxWidth="md">
      <Box marginTop={4} marginBottom={2}>
      <Typography variant="h4" position="center" style={{ textAlign: 'center', display: 'inline', color: 'green' }} mb={2}>
            TableList View
          </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.name}</TableCell>
              <TableCell>{post.email}</TableCell>
              <TableCell>{post.designation}</TableCell>
              <TableCell>{post.company}</TableCell>
              <TableCell>{post.location}</TableCell>
              <TableCell>
                <BorderColorIcon
                  color="primary"
                  onClick={() => handleEdit(post)}
                />
                <DeleteOutlineIcon
                  color="error"
                  onClick={() => {
                    setEditPostId(post.id);
                    setConfirmDialogAction('delete');
                    setConfirmDialogOpen(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEmptyResults && (
        <Typography variant="body2" component="p" align="center" color="textSecondary">
          No results found.
        </Typography>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editPostId ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Designation"
              type="text"
              fullWidth
              required
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Company"
              type="text"
              fullWidth
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Location"
              type="text"
              fullWidth
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" color="primary">
              {editPostId ? 'Save' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          {confirmDialogAction === 'delete' && (
            <Typography>Are you sure you want to delete this customer?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (confirmDialogAction === 'delete') {
                handleDelete(editPostId);
              }
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Data
        </Button>
      </Box>
    </Container>

 
    </div> 
    </>
  );
};

export default Customer2;
