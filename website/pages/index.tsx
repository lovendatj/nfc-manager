import type { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";


import WithAuth from '../library/utils/withAuth';

const Home: NextPage = () => {
  return (<><h1>This is a protected path</h1></>);
};

export default WithAuth(Home);
