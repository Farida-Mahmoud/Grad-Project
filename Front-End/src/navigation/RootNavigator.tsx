import { useState, useEffect } from "react";
import AuthNavigator from "./AuthNavigator.tsx";
import AppNavigator from "./AppNavigator.tsx";
import SplashScreen from "../screens/Splash/SplashScreen.tsx";


export default function RootNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }


  return isLoggedIn ? (
    <AppNavigator />
  ) : (
    <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
  );
}
