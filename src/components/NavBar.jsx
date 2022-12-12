import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Outlet } from 'react-router-dom';
import { Link } from '@mui/material';





const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar({ setSeleccion, seleccion }) {
  const pages = ['turnos', 'odontologos', 'pacientes'];
  const crud = ['Listar', 'Registrar'];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  // maneja vista movil
  const handleCloseNavMenu = (event, e) => {
    setAnchorElNav(null);
    setSeleccion(event)
    handleClick(e)
    console.log("este " + event);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  // -----------------------------

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <React.Fragment>
      <AppBar position="static" >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'roboto',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CLINICA
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {pages.map((page,index) => (
                <React.Fragment>
                  <Button
                    key={page}
                    onClick={(e) => handleCloseNavMenu(page, e)} //mapea botones del nav para pc 
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    //---------
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    {page}
                  </Button>
                  <Menu
                    key={index}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {crud.map(item => (
                      <MenuItem key={item}>
                        <Link
                          key={item}
                          href={`/${item}/${seleccion}`}
                          style={{ textDecoration: 'none' }}
                          onClick={handleClose}
                        >{item}
                        </Link>
                      </MenuItem>
                    ))}

                  </Menu>
                </React.Fragment>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* mapea menu usuario en las dos vistas */}
                {settings.map((setting) => (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography key={setting} textAlign="left">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </React.Fragment>
  );
}
export default ResponsiveAppBar;