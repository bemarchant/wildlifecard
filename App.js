import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WildLifeCard } from "./components/WildLifeCard";
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  console.log("App");
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "black" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "black" },
          }}
        >
          <Stack.Screen name="WildLifeCard" component={WildLifeCard} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
