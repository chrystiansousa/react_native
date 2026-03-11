import { SafeAreaProvider } from "react-native-safe-area-context"
import CustomModalScreen from

export default function App() {
  return (
    <SafeAreaProvider>
      <CustomModalScreen>
        CustomModalScreen
      </CustomModalScreen>
    </SafeAreaProvider>
  );
}