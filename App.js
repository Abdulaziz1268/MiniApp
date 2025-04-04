import { Text } from "react-native"
import StackNavigator from "./apps/route/routes"
import { StatusBar } from "expo-status-bar"
import AppSafeAreaView from "./apps/components/AppSafeAreaView"

export default function App() {
  return (
    <AppSafeAreaView>
      <StackNavigator />
      <StatusBar style="dark" backgroundColor="white" />
    </AppSafeAreaView>
  )
}
