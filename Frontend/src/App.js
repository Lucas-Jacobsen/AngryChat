import React from "react";
import Main from "./new_components/Main";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";
import { Box, CssBaseline } from "@mui/material";

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