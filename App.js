import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WildLifeCardEditScreen } from "./screens/WildLifeCardEditScreen";
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen
            name="WildLifeCardEditScreen"
            component={WildLifeCardEditScreen}
            options={{ title: "Editor" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
