import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { HasChildren } from "../_types";

interface WithAuthProps extends HasChildren {
  required?: boolean;
}

const WithAuth = (WrappedComponent: any) => {
  const withAuth = (props: WithAuthProps) => {
    const { data: session, status } = useSession({
      required: props.required ?? true,
    });
    const router = useRouter();

    if (status === "loading") {
      return <div>Loading...</div>;
    } else if (
      session &&
      status === "authenticated"
    ) {
      return <WrappedComponent {...props} />;
    } else {
      router.push("/auth/signin?error=SessionRequired");
    }
    return (
      <div>
        <p>
          You are not logged in. Please click <a href="/auth/signin">here</a> to
          log in.
        </p>
      </div>
    );
  };
  return withAuth;
};

export default WithAuth;
