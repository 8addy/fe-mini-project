import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

const Register = (props) => {
    const { user, handleRegister } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user?.accessToken) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const password = data.get("password");
      const passwordConfirmation = data.get("passwordConfirmation");
      if (password?.length < 8 || password !== passwordConfirmation) {
        return;
      }
      const response = await handleRegister(data);
      if (response) {
        sessionStorage.setItem("loginEmail", data.get('email'));
        navigate('/login');
      } else {
        console.log(response);
      }
    };
  
    return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="text"
              id="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="prenom"
              label="Prenom"
              type="text"
              id="prenom"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              type="text"
              id="city"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone number"
              type="tel"
              id="phone"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm password"
              type="password"
              id="passwordConfirmation"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}

export default Register;