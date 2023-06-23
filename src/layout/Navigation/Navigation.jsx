import React, { useContext } from 'react'
import { AppBar, Badge, Box, Button, Container, Divider, IconButton, Toolbar, Typography, styled } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Navigation.css'
import NavLinkBtn from '../../components/navigation/NavLinkBtn';
import { redirect, useLocation } from 'react-router-dom';
import { AuthContext } from 'context/AuthContext';
import { CartContext } from 'context/CartContext';
import { GlobalContext } from 'context/GlobalContext';
import CartDrawer from 'components/navigation/CartDrawer/CartDrawer';
import SearchIcon from '@mui/icons-material/Search';
import SearchModal from 'components/navigation/SearchModal/SearchModal';
import { ADMIN_ROLE_ID, CLIENT_ROLE_ID } from 'constants/constants';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Navigation = (props) => {
  const { handleLogout } = useContext(AuthContext);
  const { handleDrawer, searchModalHandler, isSearchModalOpen, searchingHandler } = useContext(GlobalContext);
  const { cart } = useContext(CartContext);
  let location = useLocation();

  const { isAuth, roleId } = props;

  const showLoginLink = !isAuth && location.pathname !== "/login";

  const badgeContent = cart?.articlesCart?.length > 0 ? cart?.articlesCart?.length : null;

  const logoutHandler = () => {
    handleLogout();
    return redirect("/login")
  }

  return (
    <>
      {roleId === CLIENT_ROLE_ID && <CartDrawer />}
      {isSearchModalOpen && <SearchModal open={isSearchModalOpen} searchModalHandler={searchModalHandler} searchingHandler={searchingHandler} />}
      <AppBar position="sticky" className='navigation_container'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Mini project
              </Typography>
              { isAuth &&
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <NavLinkBtn label="Home" path="/" />
                  <NavLinkBtn label="About" path="/about" />
                  <Divider orientation="vertical" flexItem sx={{ background: '#6aa3ea' }} />
                  <Button sx={{ mr: 2, ml: 4 }} endIcon={<SearchIcon />} color="inherit" onClick={searchModalHandler}>Search</Button>
                  <Button sx={{ mr: 2 }} endIcon={<LogoutIcon />} color="inherit" onClick={logoutHandler}>Logout</Button>
                  {roleId === CLIENT_ROLE_ID && (
                    <IconButton aria-label="cart" onClick={handleDrawer}>
                      <StyledBadge badgeContent={badgeContent} color="secondary">
                        <ShoppingCartIcon className='cart_icon' />
                      </StyledBadge>
                    </IconButton>
                    )
                  }
                </>
              }
              {
                showLoginLink && <NavLinkBtn label="Login" path="/login" />
              }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navigation