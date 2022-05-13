import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./signin.standard.module.css";

type StandardSignInProps = {
  title: string;
  error?: string;
  handleSignIn: (email: string, password: string) => void;
};

const StandardSignIn = (props: StandardSignInProps) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(props.error ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    props.handleSignIn(email, password);
  };

  useEffect(() => {
    switch (error) {
      case "SessionRequired":
        setError("You need to be logged in to view this page.");
        break;
      default:
        setError("");
        break;
    }
  }, [error]);

  return (
    <div>
      <h1>{props.title}</h1>
      { error.length > 0 && <p>{error}</p> }
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email..."
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password..."
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <button type="submit">Sign In</button>
        </fieldset>
      </form>
    </div>
  );
};

export default StandardSignIn;