import { createStackNavigator } from "@react-navigation/stack"
import ToDoApp from "../to-do-app/todoApp"
import ExpenseApp from "../expense-app/expenseApp"
import { NavigationContainer } from "@react-navigation/native"
import Apps from "./Apps"
import SqlitePractice from "../sqlite/SqlitePractice"

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppRoutes" component={Apps} />
        <Stack.Screen name="ToDoApp" component={ToDoApp} />
        <Stack.Screen name="ExpenseApp" component={ExpenseApp} />
        <Stack.Screen name="SqlitePractice" component={SqlitePractice} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
