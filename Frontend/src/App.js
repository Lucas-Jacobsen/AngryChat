import React from "react";
import "./App.css";
import Main from "./Main";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";

function App() {
  return (
    <ClerkProvider publishableKey={"pk_test_Y29vbC1yZWRiaXJkLTkwLmNsZXJrLmFjY291bnRzLmRldiQ"}>
      {/* These components display if user is signed-in with Clerk */}
			<SignedIn>
        <Main/>
			</SignedIn>
			{/* These components display if user is not signed-in with Clerk */}
			<SignedOut>
        <div style={{width: '100vw', height: '100vh'}}>
          <div className='center'>
            <SignIn/>
          </div>
        </div>
			</SignedOut>	
	</ClerkProvider>
  );
}

export default App;