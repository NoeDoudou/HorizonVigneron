import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { en, fr } from '../../translations';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from '@mui/material';

function VineyardLogin() {
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement domain login logic
    console.log('Domain login data:', formData);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom>
            {language === 'fr' ? 'Connexion Domaine Viticole' : 'Vineyard Domain Login'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  type="password"
                  label={language === 'fr' ? 'Mot de passe' : 'Password'}
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {language === 'fr' ? 'Se connecter' : 'Login'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default VineyardLogin;