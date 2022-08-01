import "../styles/globals.css";
import "../styles/App.css";
import "../styles/ErrorModal.css";
import "../styles/Card.css";
// import "../styles/Form.css";
import "../styles/TopBar.css";
import "../styles/NewList.css";
import AuthContext from "../context/auth.context";
import { getUser } from "../api";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // eslint-disable-line
import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import Loading from "../components/Loading";
function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();

      setUser(user);
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  return !isLoading ? (
    <SnackbarProvider>
      <AuthContext.Provider value={{ user }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </SnackbarProvider>
  ) : (
    <Loading />
  );
}

export default MyApp;
