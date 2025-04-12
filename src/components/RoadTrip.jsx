import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import { featuredVineyards } from '../data/vineyards';

function RoadTrip() {
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVineyards, setSelectedVineyards] = useState([]);
  const [vineyardDetails, setVineyardDetails] = useState({});
  const [duration, setDuration] = useState('');

  const handleVineyardDetailChange = (vineyardId, field, value) => {
    setVineyardDetails(prev => ({
      ...prev,
      [vineyardId]: {
        ...prev[vineyardId],
        [field]: value
      }
    }));
  };

  const steps = [
    language === 'fr' ? 'Sélection des domaines' : 'Select Vineyards',
    language === 'fr' ? 'Récapitulatif' : 'Summary',
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleVineyardSelection = (vineyardId) => {
    setSelectedVineyards((prev) =>
      prev.includes(vineyardId)
        ? prev.filter((id) => id !== vineyardId)
        : [...prev, vineyardId]
    );
    
    // Réinitialiser les détails pour ce domaine si désélectionné
    if (!selectedVineyards.includes(vineyardId)) {
      setVineyardDetails(prev => {
        const newDetails = {...prev};
        delete newDetails[vineyardId];
        return newDetails;
      });
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {featuredVineyards.map((vineyard) => (
              <Grid item key={vineyard.id} xs={12} sm={6} md={4}>
                <Card
                  onClick={(e) => {
                    // Empêche la désélection si le clic provient des champs de formulaire
                    if (!e.target.closest('.MuiTextField-root, .MuiSelect-root, .MuiChip-root')) {
                      handleVineyardSelection(vineyard.id);
                    }
                  }}
                  sx={{
                    cursor: 'pointer',
                    border: selectedVineyards.includes(vineyard.id) ? '2px solid #722F37' : 'none',
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{vineyard.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {vineyard.location}
                    </Typography>
                    {selectedVineyards.includes(vineyard.id) && (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          label={language === 'fr' ? 'Date d\'arrivée' : 'Check-in date'}
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          margin="normal"
                          value={vineyardDetails[vineyard.id]?.checkIn || ''}
                          onChange={(e) => handleVineyardDetailChange(vineyard.id, 'checkIn', e.target.value)}
                        />
                        <TextField
                          label={language === 'fr' ? 'Date de départ' : 'Check-out date'}
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          fullWidth
                          margin="normal"
                          value={vineyardDetails[vineyard.id]?.checkOut || ''}
                          onChange={(e) => handleVineyardDetailChange(vineyard.id, 'checkOut', e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                          <InputLabel>{language === 'fr' ? 'Type d\'hébergement' : 'Accommodation Type'}</InputLabel>
                          <Select
                            value={vineyardDetails[vineyard.id]?.accommodation || ''}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleVineyardDetailChange(vineyard.id, 'accommodation', e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            label={language === 'fr' ? 'Type d\'hébergement' : 'Accommodation Type'}
                          >
                            <MenuItem value="standard">{language === 'fr' ? 'Chambre Standard' : 'Standard Room'}</MenuItem>
                            <MenuItem value="deluxe">{language === 'fr' ? 'Chambre Deluxe' : 'Deluxe Room'}</MenuItem>
                            <MenuItem value="suite">{language === 'fr' ? 'Suite' : 'Suite'}</MenuItem>
                          </Select>
                        </FormControl>
                        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                          {language === 'fr' ? 'Activités' : 'Activities'}
                        </Typography>
                        <Grid container spacing={1}>
                          {['Dégustation', 'Visite guidée', 'Repas gastronomique', 'Atelier vin'].map((activity) => (
                            <Grid item key={activity}>
                              <Chip
                                label={activity}
                                onClick={() => {
                                  const currentActivities = vineyardDetails[vineyard.id]?.activities || [];
                                  const newActivities = currentActivities.includes(activity)
                                    ? currentActivities.filter(a => a !== activity)
                                    : [...currentActivities, activity];
                                  handleVineyardDetailChange(vineyard.id, 'activities', newActivities);
                                }}
                                color={vineyardDetails[vineyard.id]?.activities?.includes(activity) ? 'primary' : 'default'}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              {language === 'fr' ? 'Récapitulatif des domaines sélectionnés' : 'Selected Vineyards Summary'}
            </Typography>
            {selectedVineyards.map((vineyardId) => {
              const vineyard = featuredVineyards.find(v => v.id === vineyardId);
              return (
                <Card key={vineyardId} sx={{ mb: 3, p: 2 }}>
                  <Typography variant="h6">{vineyard?.name}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        {language === 'fr' ? 'Dates de séjour' : 'Stay Dates'}:
                      </Typography>
                      <Typography>
                        {language === 'fr' ? 'Arrivée' : 'Check-in'}: {vineyardDetails[vineyardId]?.checkIn || '-'}
                      </Typography>
                      <Typography>
                        {language === 'fr' ? 'Départ' : 'Check-out'}: {vineyardDetails[vineyardId]?.checkOut || '-'}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        {language === 'fr' ? 'Hébergement' : 'Accommodation'}: {
                          vineyardDetails[vineyardId]?.accommodation === 'standard' ? (language === 'fr' ? 'Chambre Standard' : 'Standard Room') :
                          vineyardDetails[vineyardId]?.accommodation === 'deluxe' ? (language === 'fr' ? 'Chambre Deluxe' : 'Deluxe Room') :
                          vineyardDetails[vineyardId]?.accommodation === 'suite' ? 'Suite' : '-'
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        {language === 'fr' ? 'Activités sélectionnées' : 'Selected Activities'}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {(vineyardDetails[vineyardId]?.activities || []).map((activity) => (
                          <Chip key={activity} label={activity} color="primary" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              {language === 'fr' ? 'Récapitulatif de votre Road Trip' : 'Road Trip Summary'}
            </Typography>
            {selectedVineyards.map((id) => {
              const vineyard = featuredVineyards.find((v) => v.id === id);
              const details = vineyardDetails[id] || {};
              return (
                <Card key={id} sx={{ mb: 3, p: 2 }}>
                  <Typography variant="h6">{vineyard?.name}</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        {language === 'fr' ? 'Dates de séjour' : 'Stay Dates'}:
                      </Typography>
                      <Typography>
                        {language === 'fr' ? 'Arrivée' : 'Check-in'}: {details.checkIn || '-'}
                      </Typography>
                      <Typography>
                        {language === 'fr' ? 'Départ' : 'Check-out'}: {details.checkOut || '-'}
                      </Typography>
                      <Typography sx={{ mt: 1 }}>
                        {language === 'fr' ? 'Hébergement' : 'Accommodation'}: {
                          details.accommodation === 'standard' ? (language === 'fr' ? 'Chambre Standard' : 'Standard Room') :
                          details.accommodation === 'deluxe' ? (language === 'fr' ? 'Chambre Deluxe' : 'Deluxe Room') :
                          details.accommodation === 'suite' ? 'Suite' : '-'
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1">
                        {language === 'fr' ? 'Activités sélectionnées' : 'Selected Activities'}:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                        {(details.activities || []).map((activity) => (
                          <Chip key={activity} label={activity} color="primary" />
                        ))}
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Description Section */}
      <Container sx={{ py: 8, bgcolor: 'rgba(114, 47, 55, 0.05)' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {language === 'fr' ? 'Découvrez nos Road Trips Viticoles' : 'Discover our Wine Road Trips'}
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
              {language === 'fr' ? 'Une expérience unique à travers les vignobles' : 'A unique experience through the vineyards'}
            </Typography>
            <Typography variant="body1" paragraph>
              {language === 'fr' ? 
                'Partez à l\'aventure avec nos road trips viticoles personnalisés. Visitez plusieurs domaines, rencontrez les vignerons et découvrez les secrets de leurs terroirs. Une expérience immersive qui combine le plaisir de la route et la passion du vin.' :
                'Embark on an adventure with our customized wine road trips. Visit multiple estates, meet winemakers, and discover the secrets of their terroirs. An immersive experience that combines the pleasure of the road with the passion for wine.'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: 300, 
              backgroundImage: 'url(/images/road-trip-vignoble.jpg)', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 2,
              boxShadow: 3
            }} />
          </Grid>
        </Grid>
      </Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        {language === 'fr' ? 'Créez votre Road Trip Viticole' : 'Create Your Wine Road Trip'}
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          {language === 'fr' ? 'Précédent' : 'Back'}
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? undefined : handleNext}
          sx={{ bgcolor: 'primary.main' }}
        >
          {activeStep === steps.length - 1
            ? (language === 'fr' ? 'Réserver' : 'Book')
            : (language === 'fr' ? 'Suivant' : 'Next')}
        </Button>
      </Box>
    </Container>
  );
}

export default RoadTrip;