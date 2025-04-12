import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Vineyards from './components/Vineyards';
import VineyardDetail from './components/VineyardDetail';
import VineyardSignup from './components/auth/VineyardSignup';
import RoadTrip from './components/RoadTrip';
import ClassicStays from './components/ClassicStays';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B0D37',
      light: '#B30D47',
      dark: '#660D27',
    },
    secondary: {
      main: '#C3A343',
      light: '#D4B456',
      dark: '#A88F35',
    },
    background: {
      default: '#FDF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#5F4B42',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      color: '#2C1810',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      letterSpacing: '0.01em',
      color: '#2C1810',
    },
    h3: {
      fontFamily: '"Cormorant Garamond", serif',
      fontWeight: 600,
      color: '#2C1810',
    },
    body1: {
      fontFamily: '"Lato", "Helvetica", sans-serif',
      lineHeight: 1.6,
      color: '#5F4B42',
    },
    body2: {
      fontFamily: '"Lato", "Helvetica", sans-serif',
      lineHeight: 1.6,
      color: '#5F4B42',
    },
    button: {
      fontFamily: '"Lato", "Helvetica", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vineyards" element={<Vineyards />} />
          <Route path="/vineyard/:id" element={<VineyardDetail />} />
          <Route path="/experiences" element={<div>Experiences Page Coming Soon</div>} />
          <Route path="/about" element={<div>About Page Coming Soon</div>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<VineyardSignup />} />
          <Route path="/domain/signup" element={<VineyardSignup />} />
          <Route path="/roadtrip" element={<RoadTrip />} />
          <Route path="/road-trip" element={<RoadTrip />} />
          <Route path="/classic-stays" element={<ClassicStays />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
