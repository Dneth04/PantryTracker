"use client"
import { Box, Typography, IconButton, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter


export default function Home() {
  const router = useRouter(); // Initialize useRouter

  // Function to handle button click and navigate to /about
  const handleGetStarted = () => {
    router.push('/profile');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url(/Gro.png)', // Update with your background image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        fontFamily: 'Poppins, sans-serif', // Set the font family here
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the opacity here
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          color: 'white',
          textAlign: 'left',
          p: 4,
          fontFamily: 'Poppins, sans-serif', // Set the font family here as well
        }}
      >
        <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 600 }} >
          WELCOME TO STOCK UP
          
        </Typography>
        <Typography variant="h6" component="p" gutterBottom sx={{ fontWeight: 600 , color: "Black"}}>
          Simplify your daily life! Effortlessly track your grocery items and ensure you never run out of essentials.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleGetStarted}
          sx={{ mt: 2 }}
        >
          <br></br>
          <Typography variant="h6" component="p" gutterBottom sx={{ fontWeight: 600 }}>
            GET STARTED
          </Typography>
        </Button>

        <Typography variant="body1" component="p"  sx={{ fontWeight: 600, color: "Black"}}>
          <br></br>
          App is still being coded, Exciting updates and improvements are coming soon!
        </Typography>
      </Box>
    </Box>
  );
}
