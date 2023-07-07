import { TextField, Grid, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAuth from "../../components/hooks/useAuth";
import useAlert from "../../components/hooks/useAlert";
import Stack from "@mui/material/Stack";
import {
  GoogleLoginButton,
 } from "react-social-login-buttons";
import Divider from "../../components/Divider";
import Container from "../../components/Container";




function SignIn() {

  const { setMessage } = useAlert();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, googleLogin, forgotPassword } = useAuth();






  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }




  const forgotPasswordHandler = () => {
    const { email } = formData;
  
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }
  
    forgotPassword(email)
      .then(() => {
        setMessage({
          type: "success",
          text: "Password reset email has been sent. Please check your inbox.",
        });
        setFormData({ ...formData, email: "" });
      })
      .catch((error) => {
        if (error.response) {
          setMessage({
            type: "error",
            text: error.response.data,
          });
        } else {
          setMessage({
            type: "error",
            text: "An error occurred. Please try again later.",
          });
        }
      });
  };
  
  





  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!formData?.email || !formData?.password) {
      setMessage({ type: "error", text: " Invalid password or Email " });
      return;
    }

    const { email, password } = formData;

    const emailPattern = /^\w+@gmail\.com$/;
    // const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      setMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // password validation
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      setMessage({
        type: "error",
        text: "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number.",
      });
      return;
    }

    try {
      await login({ email, password });
 
const userData=localStorage.getItem('userdata')
console.log('uid from signin',userData)
      navigate("/", { formData: formData });

    } catch (error) {
      if (error.response) {
        setMessage({
          type: "error",
          text: error.response.data,
        });
        return;
      }

      setMessage({
        type: "error",
        text: "Error, Please enter correct Password or Email !",
      });
    }
  }

  async function handleGoogleLogin() {
    try {
      await googleLogin();
      navigate("/");
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

 

  return (
    <>
      <div className="container parents">
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <div
              className="child1"
              // class="row align-items-center pt-5 pt-sm-4 pt-md-0 px-3 px-sm-4 px-lg-0 "
              style={{
                backgroundImage: `url(./images2/cartoon2.gif)`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                height: "100vh",
                // position: "relative",
              }}
            ></div>{" "}
          </Grid>
          <Grid item xs={8}>
            <div className="child2" style={{textAlign:'center',alignContent:'center', marginTop:50  }}>
              <Form onSubmit={handleSubmit} >
                
                  <Container>
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "green",
                        marginTop: "-90px",
                        marginRight: "190px",
                      }}
                      fontSize={25}
                      component="h1"
                      fontWeight={400}
                    >
                      Sign-In To Your Website
                    </Typography>
                    <br />
                    <Typography
                      sx={{
                        marginBottom: "20px",
                        color: "#637381",
                        marginTop: "-30px",
                        marginRight: "290px",
                      }}
                      fontSize={15}
                      component="h1"
                    >
                      Enter your details below.{" "}
                    </Typography>

                    <TextField
                      name="email"
                      sx={{ marginBottom: "19px" }}
                      label="Email address"
                      type="email"
                      variant="outlined"
                      onChange={handleInputChange}
                      value={formData.email}
                      //  InputProps={{
                      //   style: { backgroundColor: 'white' }
                      // }}
                    />

                    <PasswordInput
                      name="password"
                      sx={{ marginBottom: "19px" }}
                      label="Password"
                      onChange={handleInputChange}
                      value={formData.password}
                      InputProps={{
                        style: { backgroundColor: "white" },
                      }}
                    />

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        marginTop: 2,
                        marginBottom: "16px",
                        maxWidth: "500px",
                        backgroundColor: "green",
                        "&:hover": {
                          backgroundColor: "#3CB371		",
                        },
                      }}
                    >
                      Log In
                    </Button>
                    <Stack direction="row" spacing={28} marginTop={-1}>
                      <Link component={RouterLink} to="/sign-up">
                        <Typography
                          // marginTop={-1}
                          fontSize={16}
                          color={"green"}
                          // marginRight={-45}
                          sx={{ textDecoration: "none" }}
                        >
                          SIGN UP ?
                        </Typography>
                      </Link>
                      <Typography
                        // marginTop={-1}
                        fontSize={18}
                        color={"green"}
                        // marginRight={33}
                        sx={{ textDecoration: "none" }}
                      >
                        <Button  onClick={forgotPasswordHandler} sx={{ color: "green", textDecoration: "none" }}>
                          {" "}
                          forgotPassword?
                        </Button>
                      </Typography>
                    </Stack>

                    <div>
                      <Divider />
                    </div>

                    {/* <Divider  style={{ backgroundColor: 'white'  }} /> */}

                    <Box
                      sx={{
                        marginTop: -1,
                        marginLeft: "-5px",
                        display: { md: "flex", width: "470px" },
                      }}
                    >
                      <GoogleLoginButton onClick={handleGoogleLogin} />
                      {/* <FacebookLoginButton
                    onClick={handleFacebookLogin}
                    style={{ width: "500px", height: "50px" }}
                  /> */}
                      {/* <GoogleButton onClick={handleFacebookLogin}/> */}
                    </Box>
                  </Container>       
             
              </Form>
            </div>{" "}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
export default SignIn;




