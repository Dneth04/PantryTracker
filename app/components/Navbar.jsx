import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <Box
      sx={{
        height: "80px",
        width: "100%",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "rgba(255, 255, 255, 0)", // Semi-transparent background
        boxShadow: "0 2px 4px rgba(0, 0, 0, 4)", // Light shadow
        backdropFilter: "blur(10px)" // Optional: Blurred background effect
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 500, marginRight: '30px'}}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </Typography>
        {user && (
          <Typography variant="h6" component="h1" sx={{ fontWeight: 500, marginRight: '30px'}}>
            <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              Product
            </Link>
          </Typography>
        )}
      </Box>

      {loading ? null : !user ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={handleSignIn} variant="outlined" sx={{ marginLeft: 1, fontWeight: "bold"}}>
            Login
          </Button>
          <Button onClick={handleSignIn} variant="outlined" sx={{ marginLeft: 1 , fontWeight: "bold"}}>
            Sign up
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 500, marginRight: 2 }}>
            Welcome, {user.displayName}
          </Typography>
          <Button onClick={handleSignOut} variant="outlined" sx={{ marginLeft: 1 }}>
            Sign out
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
