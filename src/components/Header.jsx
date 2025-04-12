import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import MenuIcon from '@mui/icons-material/Menu';
import WineBarIcon from '@mui/icons-material/WineBar';
import ClassicStays from './ClassicStays';
import RoadTrip from './RoadTrip';

const pages = ['vineyards', 'road-trip'];
const settings = ['profile', 'myBookings', 'logout'];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const translations = language === 'fr' ? fr : en;

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

  return (
    <AppBar position="static" sx={{ 
      bgcolor: 'primary.main',
      boxShadow: '0 8px 32px rgba(139, 13, 55, 0.12)',
      backdropFilter: 'blur(8px)',
      py: 1.5,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 8px 32px rgba(139, 13, 55, 0.18)'
      }
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <WineBarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase'
            }}
          >
            HORIZON VIGNERON
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
              <MenuIcon />
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
                '& .MuiPaper-root': {
                  backgroundColor: 'background.paper',
                  boxShadow: '0 8px 32px rgba(139, 13, 55, 0.12)',
                  borderRadius: '8px',
                  mt: 1.5
                },
                '& .MuiMenuItem-root': {
                  typography: 'body1',
                  py: 1.5,
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: 'rgba(195, 163, 67, 0.08)'
                  }
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{translations.header[page]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WineBarIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              textTransform: 'uppercase'
            }}
          >
            HORIZON VIGNERON
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(`/${page}`);
                }}
                sx={{ 
                  my: 2, 
                  color: 'white', 
                  display: 'block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '0%',
                    height: '2px',
                    bottom: '6px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'secondary.main',
                    transition: 'width 0.3s ease-in-out'
                  },
                  '&:hover::after': {
                    width: '80%'
                  }
                }}
              >
                {translations.header[page] || page.replace('-', ' ')}
              </Button>
            ))}
            <Button
              onClick={toggleLanguage}
              sx={{ 
                my: 2, 
                color: 'white', 
                display: 'block',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '4px',
                px: 2,
                ml: 'auto',
                
                marginLeft: '350px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderColor: 'white'
                }
              }}
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </Button>
            <Button 
              color="inherit" 
              onClick={() => navigate('/profile')}
              sx={{ 
                ml: 'auto',
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                } 
              }}
            >
              {translations.header.signup || 'S\'inscrire'}
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{translations.header[setting]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;