import React from "react";
<<<<<<< HEAD
import "./App.css";
import Main from "./components/Main";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
=======
import Main from "./new_components/Main";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Box, CssBaseline } from "@mui/material";
>>>>>>> 0f3555f90a99cdd7292d724dcb5b190df0bf28db

function App() {
  const { user } = useUser();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <SignedIn>
        <Main user={user} />
      </SignedIn>
      {/* These components display if user is not signed-in with Clerk */}
      <SignedOut>
        <Box style={{ width: '100vw', height: '100vh' }}>
          <Box className='center'>
            <SignIn />
          </Box>
        </Box>
      </SignedOut>
    </ThemeProvider>
  );
}

export default App;