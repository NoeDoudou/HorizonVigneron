import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import { useLanguage } from '../../context/LanguageContext';
import { fr as frTranslations } from '../../translations/fr';
import { en as enTranslations } from '../../translations/en';

function BookingForm({ vineyard }) {
  const { language } = useLanguage();
  const translations = language === 'fr' ? frTranslations : enTranslations;

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
    lodgingType: '',
    lodgingDates: {
      checkIn: null,
      checkOut: null
    },
    numberOfGuests: 1,
    activities: {
      winetasting: false,
      tour: false,
      gourmet: false,
      wellness: false
    },
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleDateChange = (field) => (date) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleGuestsChange = (event) => {
    setFormData(prev => ({
      ...prev,
      numberOfGuests: event.target.value
    }));
  };

  const handleActivityChange = (activity) => (event) => {
    setFormData(prev => ({
      ...prev,
      activities: {
        ...prev.activities,
        [activity]: event.target.checked
      }
    }));
  };

  const handleLodgingTypeChange = (event) => {
    setFormData(prev => ({
      ...prev,
      lodgingType: event.target.value
    }));
  };

  const handleLodgingDatesChange = (field) => (date) => {
    setFormData(prev => ({
      ...prev,
      lodgingDates: {
        ...prev.lodgingDates,
        [field]: date
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!formData.startDate || !formData.endDate) {
      setError(translations.booking?.dateError || 'Veuillez sélectionner les dates de séjour');
      return;
    }

    if (formData.startDate >= formData.endDate) {
      setError(translations.booking?.dateRangeError || 'La date de départ doit être postérieure à la date d\'arrivée');
      return;
    }

    // TODO: Implement actual booking logic here
    console.log('Booking submitted:', { vineyard, ...formData });
    setSubmitted(true);
    setError('');
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          {translations.booking?.success || 'Votre réservation a été enregistrée avec succès !'}
        </Alert>
        <Button
          variant="contained"
          onClick={() => setSubmitted(false)}
          fullWidth
        >
          {translations.booking?.newBooking || 'Nouvelle réservation'}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{
        p: 5,
        minWidth: 600,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)'
        }
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{
            mb: 4,
            color: 'primary.main',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            textAlign: 'center',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '2px',
              backgroundColor: 'secondary.main',
              margin: '16px auto 0'
            }
          }}
        >
          {translations.booking?.title || 'Réserver votre séjour'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label={translations.booking?.startDate || 'Date d\'arrivée'}
                  value={formData.startDate}
                  onChange={handleDateChange('startDate')}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(195, 163, 67, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'secondary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'secondary.main',
                          },
                        },
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label={translations.booking?.endDate || 'Date de départ'}
                  value={formData.endDate}
                  onChange={handleDateChange('endDate')}
                  format="dd/MM/yyyy"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(195, 163, 67, 0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'secondary.main',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: 'secondary.main',
                          },
                        },
                      }
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="guests-label">
                    {translations.booking?.guests || 'Nombre de personnes'}
                  </InputLabel>
                  <Select
                    labelId="guests-label"
                    value={formData.numberOfGuests}
                    onChange={handleGuestsChange}
                    label={translations.booking?.guests || 'Nombre de personnes'}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>{num}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {translations.booking?.activities || 'Activités'}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.activities.winetasting}
                      onChange={handleActivityChange('winetasting')}
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label={translations.vineyard?.tastingTitle || 'Dégustation de vins'}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.activities.tour}
                      onChange={handleActivityChange('tour')}
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label={translations.vineyard?.tourTitle || 'Visite du domaine'}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.activities.gourmet}
                      onChange={handleActivityChange('gourmet')}
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label={translations.vineyard?.gourmetTitle || 'Expérience gastronomique'}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.activities.wellness}
                      onChange={handleActivityChange('wellness')}
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label={translations.vineyard?.wellnessTitle || 'Bien-être et relaxation'}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="lodging-type-label">
                    {translations.booking?.lodgingType || 'Type d\'hébergement'}
                  </InputLabel>
                  <Select
                    labelId="lodging-type-label"
                    value={formData.lodgingType}
                    onChange={handleLodgingTypeChange}
                    label={translations.booking?.lodgingType || 'Type d\'hébergement'}
                  >
                    <MenuItem value="none">{translations.booking?.none || 'Aucun'}</MenuItem>
                    <MenuItem value="hotel">{translations.booking?.hotel || 'Hôtel'}</MenuItem>
                    <MenuItem value="bnb">{translations.booking?.bnb || 'Chambre d\'hôtes'}</MenuItem>
                    <MenuItem value="cottage">{translations.booking?.cottage || 'Gîte'}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={translations.booking?.specialRequests || 'Demandes spéciales'}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(195, 163, 67, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'secondary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'secondary.main',
                      },
                    },
                  }}
                />
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mt: 3,
                    py: 1.5,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  {translations.booking?.submit || 'Réserver'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Paper>
    </Container>
  );
}

export default BookingForm;