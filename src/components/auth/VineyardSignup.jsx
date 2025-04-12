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
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function VineyardSignup() {
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;

  const [formData, setFormData] = useState({
    domainName: '',
    ownerName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    region: '',
    description: '',
    activities: {
      winetasting: false,
      tours: false,
      accommodation: false,
      events: false,
      gourmet: false,
      wellness: false,
    },
    photos: [],
    website: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        activities: {
          ...prevState.activities,
          [name]: checked
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      photos: [...prevState.photos, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement domain registration logic
    console.log('Domain registration data:', formData);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom>
            {language === 'fr' ? 'Inscription Domaine Viticole' : 'Vineyard Domain Registration'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="domainName"
                  required
                  fullWidth
                  label={language === 'fr' ? 'Nom du Domaine' : 'Domain Name'}
                  value={formData.domainName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="ownerName"
                  required
                  fullWidth
                  label={language === 'fr' ? 'Nom du Propriétaire' : 'Owner Name'}
                  value={formData.ownerName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  label={language === 'fr' ? 'Téléphone' : 'Phone'}
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  label={language === 'fr' ? 'Adresse' : 'Address'}
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="region"
                  required
                  fullWidth
                  label={language === 'fr' ? 'Région' : 'Region'}
                  value={formData.region}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  fullWidth
                  multiline
                  rows={4}
                  label={language === 'fr' ? 'Description du Domaine' : 'Domain Description'}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={language === 'fr' ? 'Décrivez votre domaine, son histoire, ses spécialités...' : 'Describe your domain, its history, specialties...'}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {language === 'fr' ? 'Activités Proposées' : 'Available Activities'}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.winetasting}
                          onChange={handleChange}
                          name="winetasting"
                        />
                      }
                      label={language === 'fr' ? 'Dégustation de Vins' : 'Wine Tasting'}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.tours}
                          onChange={handleChange}
                          name="tours"
                        />
                      }
                      label={language === 'fr' ? 'Visites Guidées' : 'Guided Tours'}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.accommodation}
                          onChange={handleChange}
                          name="accommodation"
                        />
                      }
                      label={language === 'fr' ? 'Hébergement' : 'Accommodation'}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.events}
                          onChange={handleChange}
                          name="events"
                        />
                      }
                      label={language === 'fr' ? 'Événements' : 'Events'}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.gourmet}
                          onChange={handleChange}
                          name="gourmet"
                        />
                      }
                      label={language === 'fr' ? 'Expérience Gastronomique' : 'Gourmet Experience'}
                    />
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.activities.wellness}
                          onChange={handleChange}
                          name="wellness"
                        />
                      }
                      label={language === 'fr' ? 'Bien-être et Relaxation' : 'Wellness and Relaxation'}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="website"
                  fullWidth
                  label={language === 'fr' ? 'Site Web' : 'Website'}
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  {language === 'fr' ? 'Photos du Domaine' : 'Domain Photos'}
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {language === 'fr' ? 'Ajouter des Photos' : 'Add Photos'}
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                </Button>
                {formData.photos.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {formData.photos.map((photo, index) => (
                      <Box key={index} sx={{ width: 100, height: 100, position: 'relative' }}>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}
                <Typography variant="caption" display="block" sx={{ color: formData.photos.length > 0 ? 'text.secondary' : 'text.disabled' }}>
                  {formData.photos.length > 0
                    ? `${formData.photos.length} ${language === 'fr' ? 'photo(s) sélectionnée(s)' : 'photo(s) selected'}`
                    : language === 'fr' ? 'Aucune photo sélectionnée' : 'No photos selected'}
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {language === 'fr' ? 'Inscrire le Domaine' : 'Register Domain'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default VineyardSignup;