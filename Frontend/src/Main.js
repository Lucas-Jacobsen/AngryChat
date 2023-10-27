import React from "react";
import "./App.css";
import { useUser } from "@clerk/clerk-react";

export default function Main() {

    const { user } = useUser();

    return(
        <div>
            <h1>You are signed in</h1>
            <p>{user.firstName} {user.lastName}</p>
            <p>UserId: {user.id}</p>
        </div>
    );
}