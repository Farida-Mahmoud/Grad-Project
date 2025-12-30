import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator.tsx";

export default function AppEntry() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
