"use client";
import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Box, Stack, Typography, Button, TextField, Modal } from '@mui/material';
import { collection, query, getDocs, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Ensure this import path is correct

const Modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const profile = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  useEffect(() => {
    updatePantry();
  }, []);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    // Check if exists
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      className="p-4"
      sx={{ backgroundColor: 'white', height: '100vh', overflowY: 'auto' }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Welcome, {user.displayName} - you are logged in to the profile page - a protected route.
          </Typography>
          <Box width="100vw" height="auto" display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={2}>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={Modalstyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Success!!
                </Typography>
                <Stack width="100%" direction={'row'} spacing={2} overflow={'auto'}>
                  <TextField
                    id="outlined-basic"
                    label='Item'
                    variant="outlined"
                    fullWidth
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => {
                      addItem(itemName);
                      setItemName('');
                      handleClose();
                    }} 
                  >Add</Button>
                </Stack>
              </Box>
            </Modal>
            <Button  variant="contained" onClick={handleOpen} sx={{color: "black" , fontWeight: "700"}} >ADD</Button>

            <Box border={'4px solid #333'}>
              <Box
                width="440px"
                height="100px"
                bgcolor="#ADD8E6"
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography variant={'h5'} color={'#333'} textAlign={'center'}>
                  Pantry Items
                </Typography>
              </Box>
              <Stack
                width="440px"
                height="300px"
                spacing={2}
                overflow={'auto'}
              >
                {
                  pantry.map((item) => (
                    <Box
                      key={item.name}
                      width="100%"
                      minHeight="150px"
                      display={'flex'}
                      justifyContent={'space-between'}
                      paddingX={2}
                      alignItems={'center'}
                      bgcolor={'#f0f0f0'}
                    >
                      <Typography variant={'h7'} color={'#333'} textAlign={'center'}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Typography>

                      <Typography variant={'h7'} color={'#333'} textAlign={'center'}>
                        Quantity: {item.count}
                      </Typography>

                      <Button variant="contained"  onClick={() => removeItem(item.name)} sx={{color: "black" , fontWeight: "700"}}  >Remove</Button>
                    </Box>
                  ))
                }
              </Stack>
            </Box>
          </Box>
        </>
      ) : (
        <p style={{ color: 'black' }}>
          You must be logged in to view this page - protected route.
        </p>
      )}
    </Box>
  );
};

export default profile;
