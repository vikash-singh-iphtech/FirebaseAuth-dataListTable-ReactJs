import { TextField, Typography, Grid, Link, Button,Box } from "@mui/material";
// import { Box } from "@mui/system"; 
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAlert from "../../components/hooks/useAlert";
import useAuth from "../../components/hooks/useAuth";
import Container from "../../components/Container";

import "./Signup.css";

function SignUp() {
  const { setMessage } = useAlert();
  const navigate = useNavigate();
  
 
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateofbirth: "",
    address: "",
    colony: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
    passwordConfirmation: "",
  });

  const { register } = useAuth();

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData?.name ||
      !formData?.email ||
      !formData?.password ||
      !formData?.passwordConfirmation ||
      !formData?.dateofbirth ||
      !formData?.address ||
      !formData?.colony ||
      !formData?.city ||
      !formData?.state ||
      !formData?.country ||
      !formData?.pincode ||
      !formData?.phone
    ) 

     
    {
      setMessage({ type: "error", text: "All fields are mandatory!" });
      return;
    }

    const {
      name,
      email,
      password,
      passwordConfirmation,
      dateofbirth,
      address,
      colony,
      city,
      state,
      country,
      pincode,
      phone
    } = formData;

    const emailPattern = /^\w+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage({
        type: "error",
        text: "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    if (password !== passwordConfirmation) {
      setMessage({ type: "error", text: "Passwords must be the same!" });
      return;
    }

    try {
      await register({
        name,
        email,
        password,
        passwordConfirmation,
        dateofbirth,
        address,
        colony,
        city,
        state,
        country,
        pincode,
        phone,
      });

      await postDataToFirebase({
        name,
        email,
        password,
        passwordConfirmation,
        dateofbirth,
        address,
        colony,
        city,
        state,
        country,
        pincode,
        phone,
      });
      navigate('/profile', { state: { userData: formData } });


      setMessage({
        type: "success",
        text: "Registration successfully complete!",
      });
      navigate("/sign-in");
    } catch (error) {
      if (error.message) {
        setMessage({
          type: "error",
          text: error.message,
        });
        return;
      }
      setMessage({
        type: "error",
        text: "Error, try again in a few seconds!",
      });
    }
  }






  async function postDataToFirebase(data) {
    try {
      const res = await fetch(
        "https://pwa-app-2b96d-default-rtdb.firebaseio.com/Sign-up-form.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to store data in the database");
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "Error storing data in the database",
      });
    }
  }


  const maxDate = "2023-12-31";


  return (
    <>


<Box className="container parents">


<Grid container spacing={2} columns={16}>
  <Grid item xs={8}>
        <Box className="child1"
          style={{
            backgroundImage: `url(./images2/typing2.gif)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            minHeight: "100vh",
            // position: "relative",
          }}
        />
          
        
    </Grid>
  <Grid item xs={8}>


  <Box className="child2" >

<Form onSubmit={handleSubmit}>
  <Container >
    <Typography
      sx={{
        marginBottom: "30px",
        color: "green",
        marginTop: "-125px",
      }}
      variant="h4"
      component="h1"
       
    >
      Create account
    </Typography>

   

    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Name</Typography> */}
        <TextField
        
          name="name"
          sx={{ marginBottom: "10px" }}
          label="Name"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.name }
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Email</Typography> */}
        <TextField
          name="email"
          sx={{ marginBottom: "10px" }}
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.email}
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Password</Typography> */}
        <PasswordInput
          name="password"
          sx={{ marginBottom: "10px", width:'200px'  }}
          label="Password"
          onChange={handleInputChange}
          value={formData.password}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        <PasswordInput
          name="passwordConfirmation"
          sx={{ marginBottom: "10px" , width:'200px'  }}
          label="Confirm your password"
          onChange={handleInputChange}
          value={formData.passwordConfirmation}
        />{" "}
      </Grid>

      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Date of birth</Typography> */}
        <TextField
      name="dateofbirth"
      sx={{ marginBottom: "10px" , width:'200px' }}
      label="Date of birth"
      type="date"
      variant="outlined"
      onChange={handleInputChange}
      value={formData.dateofbirth}
      inputProps={{
        style: { backgroundColor: "white" },
        max: maxDate

      }}
    />
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Address</Typography> */}
        <TextField
          name="address"
          sx={{ marginBottom: "10px" }}
          label="Address"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.address}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Colony</Typography> */}
        <TextField
          name="colony"
          sx={{ marginBottom: "10px" }}
          label="Colony"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.colony}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> City</Typography> */}
        <TextField
          name="city"
          sx={{ marginBottom: "10px" }}
          label="City"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.city}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>

      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> State</Typography> */}
        <TextField
          name="state"
          sx={{ marginBottom: "10px" }}
          label="State"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.state}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Country</Typography> */}
        <TextField
          name="country"
          sx={{ marginBottom: "10px" }}
          label="Country"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.country}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Pin code</Typography> */}
        <TextField
          name="pincode"
          sx={{ marginBottom: "10px" }}
          label="Pin code"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.pincode}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>
      <Grid item xs={6} md={6}>
        {/* <Typography variant="h6" color={'black'} textAlign={'left'}> Phone</Typography> */}
        <TextField
          name="phone"
          sx={{ marginBottom: "10px" }}
          label="Phone No"
          type="text"
          variant="outlined"
          onChange={handleInputChange}
          value={formData.phone}
          inputProps={{
            style: { backgroundColor: "white" },
          }}
        />{" "}
      </Grid>


    </Grid>

    <Button
      variant="contained"
      type="submit"
     
      sx={{
        marginBottom: "10px",
        marginLeft:'10px',
        width:'440px',
        backgroundColor: "green", "&:hover": {backgroundColor: "#3CB371"},
      }}
      // onClick={PostData}
    >
      Sign Up
    </Button>
    <Link component={RouterLink} to="/sign-in">
      <Typography variant="h6" sx={{ color: "green",  marginTop: 1 }}>
        Already have an account ? Log in here !
      </Typography>
    </Link>
  </Container>
</Form>
</Box>  </Grid>
</Grid>
      
   
   </Box>
    </>
  );
}

export default SignUp;
















 
       
  