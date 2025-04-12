import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  TextField,
  InputAdornment,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { fr } from '../translations/fr';
import { en } from '../translations/en';
import { featuredVineyards } from '../data/vineyards';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

function Vineyards() {
  const { language } = useLanguage();
  const translations = language === 'fr' ? fr : en;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVineyards = featuredVineyards.filter(
    (vineyard) =>
      vineyard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vineyard.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" gutterBottom sx={{ 
        textAlign: 'center', 
        mb: 6, 
        position: 'relative', 
        '&::after': { 
          content: '""', 
          position: 'absolute', 
          bottom: '-16px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '60px', 
          height: '2px', 
          bgcolor: 'primary.main' 
        } 
      }}>
        {translations.vineyard?.allVineyards || 'Tous nos vignobles'}
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder={translations.vineyard?.searchPlaceholder || 'Rechercher un vignoble...'}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Grid container spacing={4}>
        {filteredVineyards.map((vineyard) => (
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
                  <Typography gutterBottom variant="h5" component="h3" sx={{ 
                    fontFamily: '"Cormorant Garamond", serif', 
                    fontWeight: 600, 
                    fontSize: '1.5rem' 
                  }}>
                    {vineyard.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom sx={{ 
                    fontFamily: '"Lato", sans-serif', 
                    fontStyle: 'italic' 
                  }}>
                    {vineyard.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    fontFamily: '"Lato", sans-serif' 
                  }}>
                    {vineyard.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Vineyards;