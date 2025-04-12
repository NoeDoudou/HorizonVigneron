import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { en, fr } from '../../translations';
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';

function AuthNavigation() {
  const { language } = useLanguage();
  const { isAuthenticated, userType } = useAuth();
  const translations = language === 'fr' ? fr : en;

  if (isAuthenticated) {
    return null; // Ne pas afficher la navigation si l'utilisateur est déjà connecté
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {language === 'fr' ? 'Choisissez votre profil' : 'Choose your profile'}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              {language === 'fr' ? 'Vous êtes un visiteur ?' : 'Are you a visitor?'}
            </Typography>
            <ButtonGroup variant="outlined" fullWidth>
              <Button
                component={Link}
                to="/login"
              >
                {language === 'fr' ? 'Se connecter' : 'Login'}
              </Button>
              <Button
                component={Link}
                to="/signup"
              >
                {language === 'fr' ? 'S\'inscrire' : 'Sign up'}
              </Button>
            </ButtonGroup>

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              {language === 'fr' ? 'Vous êtes un domaine viticole ?' : 'Are you a vineyard domain?'}
            </Typography>
            <ButtonGroup variant="outlined" fullWidth>
              <Button
                component={Link}
                to="/domain/login"
              >
                {translations.header.domainLogin}
              </Button>
              <Button
                component={Link}
                to="/domain/signup"
              >
                {translations.header.domainSignup}
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthNavigation;