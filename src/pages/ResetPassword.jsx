import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

const ResetPassword = () => {
    const { user, handleResetPassword } = useContext(AuthContext);
    const navigate = useNavigate();

    if (user?.accessToken) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const password = data.get("newPassword");
      const oldPassword = data.get("oldPassword");
      const passwordConfirmation = data.get("passwordConfirmation");
      if (password?.length < 8 || oldPassword?.length < 8  || password !== passwordConfirmation) {
        return;
      }
      const response = await handleResetPassword(data);
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
            Change Password
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
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm your password"
              type="password"
              id="passwordConfirmation"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    );
}

export default ResetPassword;