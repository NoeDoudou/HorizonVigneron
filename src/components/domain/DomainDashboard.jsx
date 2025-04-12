import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { en, fr } from '../../translations';
import {
  Container,
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Event as EventIcon,
  LocalActivity as ActivityIcon,
  Home as HomeIcon,
  Wine as WineIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';

function DomainDashboard() {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const translations = language === 'fr' ? fr : en;

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openActivityDialog, setOpenActivityDialog] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [domainInfo, setDomainInfo] = useState({
    name: 'Domaine Example',
    description: 'Description du domaine...',
    activities: [
      { id: 1, name: 'Dégustation Premium', price: '50€', duration: '2h' },
      { id: 2, name: 'Visite des Caves', price: '30€', duration: '1h30' },
    ],
    upcomingBookings: [
      { id: 1, date: '2024-03-20', activity: 'Dégustation Premium', guests: 4 },
      { id: 2, date: '2024-03-22', activity: 'Visite des Caves', guests: 6 },
    ],
  });

  const handleEditDomain = () => {
    setOpenEditDialog(true);
  };

  const handleAddActivity = () => {
    setSelectedActivity(null);
    setOpenActivityDialog(true);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setOpenActivityDialog(true);
  };

  const handleSaveActivity = (activityData) => {
    // TODO: Implement save activity logic
    setOpenActivityDialog(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" component="h1">
              {language === 'fr' ? 'Tableau de Bord du Domaine' : 'Domain Dashboard'}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEditDomain}
            >
              {language === 'fr' ? 'Modifier le Profil' : 'Edit Profile'}
            </Button>
          </Paper>
        </Grid>

        {/* Informations du domaine */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="div"
              sx={{
                height: 200,
                bgcolor: 'grey.300',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCameraIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </CardMedia>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {domainInfo.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {domainInfo.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Activités proposées */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {language === 'fr' ? 'Activités Proposées' : 'Available Activities'}
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddActivity}
              >
                {language === 'fr' ? 'Ajouter' : 'Add'}
              </Button>
            </Box>
            <List>
              {domainInfo.activities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" onClick={() => handleEditActivity(activity)}>
                        <EditIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <ActivityIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.name}
                      secondary={`${activity.price} - ${activity.duration}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Réservations à venir */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {language === 'fr' ? 'Réservations à Venir' : 'Upcoming Bookings'}
            </Typography>
            <List>
              {domainInfo.upcomingBookings.map((booking) => (
                <React.Fragment key={booking.id}>
                  <ListItem>
                    <ListItemIcon>
                      <EventIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${booking.date} - ${booking.activity}`}
                      secondary={`${booking.guests} ${language === 'fr' ? 'personnes' : 'guests'}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog pour modifier les activités */}
      <Dialog open={openActivityDialog} onClose={() => setOpenActivityDialog(false)}>
        <DialogTitle>
          {selectedActivity
            ? (language === 'fr' ? 'Modifier l\'Activité' : 'Edit Activity')
            : (language === 'fr' ? 'Nouvelle Activité' : 'New Activity')}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label={language === 'fr' ? 'Nom de l\'activité' : 'Activity Name'}
              margin="normal"
            />
            <TextField
              fullWidth
              label={language === 'fr' ? 'Prix' : 'Price'}
              margin="normal"
            />
            <TextField
              fullWidth
              label={language === 'fr' ? 'Durée' : 'Duration'}
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenActivityDialog(false)}>
            {language === 'fr' ? 'Annuler' : 'Cancel'}
          </Button>
          <Button onClick={handleSaveActivity} variant="contained">
            {language === 'fr' ? 'Enregistrer' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DomainDashboard;