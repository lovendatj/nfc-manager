import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import StandardSignIn from "../../library/components/signin/signin.standard";

const SignIn: NextPage = () => {
  const router = useRouter();

  const [error, _setError] = useState(router.query.error ?? "");
  const [callback, _setCallback ] = useState(router.query.callback ?? "/");

  const handleSubmit = async (email: string, password: string) => {
    await signIn("credentials", { email, password }).then((session) => {
      if (window !== undefined) {
        window.location.href = String(callback);
      }
    });
  };

  return (
    <StandardSignIn
      title="Sign In"
      handleSignIn={handleSubmit}
      error={String(error)}
    />
  );
};

export default SignIn;
