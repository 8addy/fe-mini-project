import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Navigate, redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";

const Login = () => {
    const { user, handleLogin } = useContext(AuthContext);
    const [email, setEmail] = useState('');

    useEffect(() => {
      const loginEmail = sessionStorage.getItem('loginEmail');
      if (loginEmail) {
        setEmail(loginEmail);
        sessionStorage.removeItem('loginEmail');
      }
    }, []);

    if (user?.accessToken) {
        return <Navigate to="/" replace />;
    }


    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const response = await handleLogin(data);
      if (response) {
        redirect('/');
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}

export default Login;