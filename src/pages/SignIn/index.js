import { TextField, Grid, Card, Typography, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import PasswordInput from "../../components/PasswordInput";
import useAuth from "../../components/hooks/useAuth";
import useAlert from "../../components/hooks/useAlert";
import Stack from "@mui/material/Stack";
import { GoogleLoginButton } from "react-social-login-buttons";
import Divider from "../../components/Divider";
import Container from "../../components/Container";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

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

      const userData = localStorage.getItem("userdata");
      console.log("uid from signin", userData);
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
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        padding={10}
        height={"100%"}
      >
        {/* Left Side Card for Image */}
        <Card
          sx={{
            maxWidth: 700,
            minWidth: 300,
            margin: 2,
            display: { xs: "none", sm: "block" },
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image="./images2/cartoon2.gif"
            alt="Image"
          />
        </Card>

        {/* Right Side Card for Data and Form */}
        <Card
          sx={{ maxWidth: 700, minWidth: 300, margin: 2, boxShadow: "none" }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "green",
              }}
            >
              Sign-In To Your Website
            </Typography>
            <br />
            <Typography
              sx={{
                color: "#637381",
              }}
              component="h1"
            >
              Enter your details below.{" "}
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                type="email"
                onChange={handleInputChange}
                value={formData.email}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                required
                type="password"
                onChange={handleInputChange}
                value={formData.password}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "green",
                  "&:hover": {
                    backgroundColor: "#3CB371		",
                  },
                }}
              >
                Login
              </Button>
            </form>
            <Stack direction="row">
              <Link component={RouterLink} to="/sign-up">
                <Typography sx={{ color: "green", textDecoration: "none" }}>
                  SIGN UP ?
                </Typography>
              </Link>
              <Typography>
                <Button
                  onClick={forgotPasswordHandler}
                  sx={{ color: "green", textDecoration: "none" }}
                >
                  forgotPassword?
                </Button>
              </Typography>
            </Stack>
            <Divider />
            <Box>
              <GoogleLoginButton onClick={handleGoogleLogin} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
export default SignIn;





