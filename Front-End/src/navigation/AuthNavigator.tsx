import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login/LoginScreen.tsx";
import RegisterEmailScreen from "../screens/Register/RegisterEmailScreen.tsx";
import VerificationScreen from "../screens/Register/VerificationScreen.tsx";
import UserDetailsScreen from "../screens/Register/UserDetailsScreen.tsx";
import CreatePasswordScreen from "../../src/screens/Register/CreatePasswordScreen.tsx";

const Stack = createNativeStackNavigator();

export default function AuthNavigator({ setIsLoggedIn }: { setIsLoggedIn: (loggedIn: boolean) => void }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
      <Stack.Screen
        name="CreatePassword"
        component={CreatePasswordScreen}
        initialParams={{ setIsLoggedIn }}
      />
    </Stack.Navigator>
  );
}
