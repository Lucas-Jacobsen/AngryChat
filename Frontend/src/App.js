import React from "react";
import "./App.css";
import Main from "./components/Main";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();
  return (
    <div>
      <SignedIn>
        <Main user={user} />
      </SignedIn>
      {/* These components display if user is not signed-in with Clerk */}
      <SignedOut>
        <div style={{ width: '100vw', height: '100vh' }}>
          <div className='center'>
            <SignIn />
          </div>
        </div>
      </SignedOut>
    </div>
  );
}

export default App;