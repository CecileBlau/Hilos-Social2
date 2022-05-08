import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom"
import '../App.css'

const pages = ['home', 'login', 'register', 'profile'];
const pagesTwo = ['login', 'register']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { user_email } = props;
  return (
    <>
      <div>
        {
          user_email ?
            <AppBar position="static" className='appbar' color="secondary">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                  >
                    Hilos
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >

                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            <Link to={`/${page}`}>
                              {page}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                  >
                    Hilos
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={'appbar'}>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        <Link to={`/${page}`} style={{ textDecoration: 'none', color: 'white' }}>
                          {page}
                        </Link>

                      </Button>

                    ))}

                  </Box>


                </Toolbar>
              </Container>
            </AppBar>
            : 
            //second part II
            <AppBar position="static" className='appbar' color="secondary">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    variant="h4"
                    noWrap
                    component="div"
                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                  >
                    Hilos
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >

                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {pagesTwo.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">
                            <Link to={`/${page}`}>
                              {page}
                            </Link>
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                  >
                    Hilos
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={'appbar'}>
                    {pagesTwo.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        <Link to={`/${page}`} style={{ textDecoration: 'none', color: 'white' }}>
                          {page}
                        </Link>

                      </Button>

                    ))}

                  </Box>


                </Toolbar>
              </Container>
            </AppBar>
        }
      </div>

    </>
  );
};
export default ResponsiveAppBar;