import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import { featuredVineyards } from '../data/vineyards';
import WineBarIcon from '@mui/icons-material/WineBar';
import EventIcon from '@mui/icons-material/Event';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SpaIcon from '@mui/icons-material/Spa';
import BookingForm from './booking/BookingForm';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

// Custom Google Maps-like marker
const googleMapsIcon = new L.Icon({
  iconUrl: '/images/google-maps-marker.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'google-maps-marker'
});

L.Marker.prototype.options.icon = googleMapsIcon;

function VineyardDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;
  const [showBookingForm, setShowBookingForm] = useState(false);

  const vineyard = featuredVineyards.find(v => v.id === parseInt(id));

  if (!vineyard) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h1">
          {translations.vineyard?.notFound || 'Vignoble non trouvé'}
        </Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* En-tête du vignoble */}
      <Box
        sx={{
          backgroundImage: `url(${vineyard.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            position: 'relative',
            color: 'white',
            pb: 4,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom
          sx={{ 
            color: 'var(--color-bordeaux)', // Modifiez cette valeur
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 700
          }}>
            
            {vineyard.name}
          </Typography>
          <Typography variant="h5" sx={{ fontStyle: 'italic' }}>
            {vineyard.location}
          </Typography>
        </Container>
      </Box>

      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Description du vignoble */}
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              {translations.vineyard?.about || 'À propos du domaine'}
            </Typography>
            
            <Typography paragraph>{vineyard.description}</Typography>

            {/* Section images spécifiques au domaine */}
            <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
              {vineyard.id === 1 && ( // Romanée-Conti
                <>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/romaneeContiCave.jpg" 
                      alt="Cave de la Romanée Conti"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/romaneeContiExterieur.jpg" 
                      alt="Extérieur de la Romanée Conti"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                </>
              )}
              {vineyard.id === 2 && ( // Château Margaux
                <>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/chateauPommard.png" 
                      alt="Chateau Pommard"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/chateauPommardVin.jpg" 
                      alt="Vins du Château Pommard"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                </>
              )}
              {vineyard.id === 3 && ( // Domaine de la Romanée
                <>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/domaineLeflaive.jpg" 
                      alt="Domaine Leflaive"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <img 
                      src="/images/domaineLeflaiveVin.jpg" 
                      alt="Vin du domaine Leflaive"
                      style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {/* Section des activités */}
            <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
              {translations.vineyard?.activities || 'Nos activités'}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <WineBarIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={translations.vineyard?.tastingTitle || 'Dégustation de vins'}
                  secondary={translations.vineyard?.tastingDescription || 'Découvrez notre sélection de vins d\'exception guidé par nos experts.'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EventIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={translations.vineyard?.tourTitle || 'Visite du domaine'}
                  secondary={translations.vineyard?.tourDescription || 'Explorez nos vignes et nos caves historiques lors d\'une visite guidée.'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalDiningIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={translations.vineyard?.gourmetTitle || 'Expérience gastronomique'}
                  secondary={translations.vineyard?.gourmetDescription || 'Savourez des plats locaux accompagnés de nos meilleurs vins.'}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SpaIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={translations.vineyard?.wellnessTitle || 'Bien-être et relaxation'}
                  secondary={translations.vineyard?.wellnessDescription || 'Profitez de nos installations de spa et de relaxation.'}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Carte et informations pratiques */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {translations.vineyard?.practicalInfo || 'Informations pratiques'}
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={translations.vineyard?.address || 'Adresse'}
                    secondary={vineyard.location}
                  />
                </ListItem>
              </List>
            </Paper>
            <MapContainer center={[vineyard.latitude, vineyard.longitude]} zoom={13} style={{ height: '300px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
              />
              <Marker position={[vineyard.latitude, vineyard.longitude]}>
                <Popup>
                  {vineyard.name}
                </Popup>
              </Marker>
            </MapContainer>
            
            {/* Section des vins produits */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                {translations.vineyard?.winesTitle || 'Nos vins'}
              </Typography>
              <List>
                {vineyard.wines?.map((wine, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${wine.name} (${wine.year})`}
                      secondary={`${wine.type} - ${wine.description}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => setShowBookingForm(true)}
            >
              {translations.booking?.bookNow || 'Réserver maintenant'}
            </Button>
          </Grid>
        </Grid>
      </Container>

      <Modal
  open={showBookingForm}
  onClose={() => setShowBookingForm(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  closeAfterTransition
  BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.8)' } }}
>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto'
  }}>
    <BookingForm vineyard={vineyard} />
  </Box>
</Modal>
    </Box>
  );
}

export default VineyardDetail;