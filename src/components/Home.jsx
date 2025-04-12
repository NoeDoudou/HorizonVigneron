import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import SearchIcon from '@mui/icons-material/Search';
import { featuredVineyards } from '../data/vineyards';
import { useNavigate, Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';



function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/images/banniere_Comprendre_les_vignes_hybrides_et_leur_role_dans_l_industrie_viticole4_f353113c-6472-4a62-8971-3eed421e1a83.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom sx={{ 
            mb: 3, 
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0)',
            color: 'white' // Ajoutez cette ligne
          }}>
            {translations.home.title}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', mb: 4 }}>
            {translations.home.subtitle}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              mt: 4,
              display: 'flex',
              gap: 1,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
            }}
          >
            <TextField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={translations.home.searchPlaceholder}
              variant="outlined"
              sx={{
                width: { xs: '100%', sm: '400px' },
                bgcolor: 'white',
                borderRadius: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'secondary.main', width: { xs: '100%', sm: 'auto' } }}
              startIcon={<SearchIcon />}
            >
              {translations.home.searchButton}
            </Button>
            <Button
              component={Link}
              to="/domain/signup"
              variant="contained"
              color="primary"
              sx={{ mt: { xs: 2, sm: 0 }, ml: { xs: 0, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
            >
              {language === 'fr' ? 'Inscrire votre domaine' : 'Register your domain'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Tutorial Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {language === 'fr' ? 'Comment réserver votre séjour' : 'How to Book Your Stay'}
        </Typography>
        <Grid container spacing={4}>
          {[{
            step: language === 'fr' ? 'Imaginez votre séjour de rêve' : 'Imagine Your Dream Stay',
            description: language === 'fr' ? 'Visualisez votre séjour idéal au cœur des vignobles.' : 'Visualize your ideal stay in the heart of the vineyards.'
          }, {
            step: language === 'fr' ? 'Sélectionnez votre destination' : 'Select Your Destination',
            description: language === 'fr' ? 'Choisissez parmi les meilleurs vignobles de Bourgogne.' : 'Choose from the finest vineyards in Bourgogne.'
          }, {
            step: language === 'fr' ? 'Personnalisez vos activités' : 'Customize Your Activities',
            description: language === 'fr' ? 'Ajoutez des dégustations, des visites et plus encore.' : 'Add tastings, tours, and more.'
          }, {
            step: language === 'fr' ? 'Profitez de votre séjour' : 'Enjoy Your Stay',
            description: language === 'fr' ? 'Vivez une expérience inoubliable au cœur des vignobles.' : 'Experience an unforgettable stay in the vineyards.'
          }].map((tutorial, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: '1.5rem' }}>
                    {tutorial.step}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Lato", sans-serif' }}>
                    {tutorial.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          component={Link}
          to="/vineyards"
          variant="contained"
          color="primary"
          sx={{ mt: 0, mb: 2 }}
          
        >
          {language === 'fr' ? 'Découvrir nos vignobles' : 'Discover our vineyards'}
        </Button>
      </Box>

{/* Featured Vineyards */}
<Container sx={{ py: 8, bgcolor: 'rgba(114, 47, 55, 0.05)' }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {translations.home.featuredVineyards}
        </Typography>
        <Grid container spacing={4}>
          {featuredVineyards.map((vineyard) => (
            <Grid item key={vineyard.id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea onClick={() => navigate(`/vineyard/${vineyard.id}`)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={vineyard.image}
                    alt={vineyard.name}
                  />
                  
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, fontSize: '1.5rem' }}>
                      {vineyard.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {[...Array(5)].map((_, i) => (
                        i < Math.floor(vineyard.rating || 0) ? 
                          <StarIcon key={i} color="primary" /> : 
                          <StarBorderIcon key={i} color="primary" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({(vineyard.rating || 0).toFixed(1)})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontFamily: '"Lato", sans-serif', fontStyle: 'italic' }}>
                      {vineyard.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Lato", sans-serif' }}>
                      {vineyard.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
 
      {/* Road Trip Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {language === 'fr' ? 'Découvrez nos road trip' : 'Discover Our Road Trips'}
        </Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            component={Link}
            to="/road-trip"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            {language === 'fr' ? 'Voir les road trip' : 'View Road Trips'}
          </Button>
        </Box>
      </Container>
      {/* Experiences Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {language === 'fr' ? 'Nos Expériences' : 'Our Experiences'}
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: language === 'fr' ? 'Dégustations Privées' : 'Private Tastings',
              description: language === 'fr' ? 'Découvrez nos vins d\'exception lors de séances de dégustation personnalisées.' : 'Discover our exceptional wines during personalized tasting sessions.',
              icon: '🍷'
            },
            {
              title: language === 'fr' ? 'Visites des Caves' : 'Cellar Tours',
              description: language === 'fr' ? 'Explorez nos caves historiques et découvrez les secrets de la vinification.' : 'Explore our historic cellars and discover the secrets of winemaking.',
              icon: '🏰'
            },
            {
              title: language === 'fr' ? 'Ateliers Œnologiques' : 'Wine Workshops',
              description: language === 'fr' ? 'Participez à nos ateliers pour approfondir vos connaissances du vin.' : 'Join our workshops to deepen your wine knowledge.',
              icon: '📚'
            },
            {
              title: language === 'fr' ? 'Séjours Immersifs' : 'Immersive Stays',
              description: language === 'fr' ? 'Vivez une expérience unique en séjournant au cœur des vignobles.' : 'Experience a unique stay in the heart of the vineyards.',
              icon: '🌅'
            }
          ].map((experience, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h1" component="div" sx={{ fontSize: '3rem', mb: 2 }}>
                    {experience.icon}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                    {experience.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Lato", sans-serif' }}>
                    {experience.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Partners Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 6, position: 'relative', '&::after': { content: '""', position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '2px', bgcolor: 'primary.main' } }}>
          {language === 'fr' ? 'Nos Partenaires' : 'Our Partners'}
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              name: language === 'fr' ? 'Restaurants Gastronomiques' : 'Gourmet Restaurants',
              description: language === 'fr' ? 'Découvrez une cuisine raffinée en accord avec nos vins.' : 'Experience refined cuisine paired with our wines.',
              icon: '🍽️'
            },
            {
              name: language === 'fr' ? 'Hôtels de Luxe' : 'Luxury Hotels',
              description: language === 'fr' ? 'Séjournez dans des établissements d\'exception.' : 'Stay in exceptional establishments.',
              icon: '🏨'
            },
            {
              name: language === 'fr' ? 'Services de Transport' : 'Transportation Services',
              description: language === 'fr' ? 'Voyagez en toute sérénité entre les domaines.' : 'Travel seamlessly between estates.',
              icon: '🚗'
            },
            {
              name: language === 'fr' ? 'Artisans Locaux' : 'Local Artisans',
              description: language === 'fr' ? 'Rencontrez les artisans de notre terroir.' : 'Meet the artisans of our terroir.',
              icon: '🎨'
            }
          ].map((partner, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography variant="h1" component="div" sx={{ fontSize: '3rem', mb: 2 }}>
                    {partner.icon}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h3" sx={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}>
                    {partner.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Lato", sans-serif' }}>
                    {partner.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      
    </Box>
  );
}

export default Home;