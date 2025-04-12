import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Paper,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';

function Profile() {
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    winePreferences: '',
    bio: '',
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
    // TODO: Implement profile creation logic
    console.log('Form data:', formData);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }} />
          <Typography component="h1" variant="h4" gutterBottom>
            {translations.profile?.title || 'Créer votre profil'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  required
                  fullWidth
                  label={translations.profile?.firstName || 'Prénom'}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="lastName"
                  required
                  fullWidth
                  label={translations.profile?.lastName || 'Nom'}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  required
                  fullWidth
                  type="email"
                  label={translations.profile?.email || 'Email'}
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
                  label={translations.profile?.password || 'Mot de passe'}
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="winePreferences"
                  fullWidth
                  label={translations.profile?.winePreferences || 'Préférences de vin'}
                  value={formData.winePreferences}
                  onChange={handleChange}
                  placeholder={translations.profile?.winePreferencesPlaceholder || 'Rouge, Blanc, Rosé...'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="bio"
                  fullWidth
                  multiline
                  rows={4}
                  label={translations.profile?.bio || 'Bio'}
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder={translations.profile?.bioPlaceholder || 'Parlez-nous de vous et de votre passion pour le vin...'}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {translations.profile?.submit || 'Créer le profil'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Profile;