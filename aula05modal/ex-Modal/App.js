import { SafeAreaProvider } from "react-native-safe-area-context"
import CustomModalScreen from ".components/CustomModal";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigatior 
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#000",
            tabBarLabelStyle: { fontSize: 13, fontWeight: "bold" }
          }}
        >
          <Tab.Screen name="SLIDE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen>

          <Tab.Screen name="FADE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen>

          <Tab.Screen name="NONE">
            {() => <CustomModalScreen animation="slide" themeColor="#2196F3" />}
          </Tab.Screen>

        </Tab.Navigatior>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}