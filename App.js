import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WildLifeCardEditScreen } from "./screens/WildLifeCardEditScreen";
import { PopUpMenu } from "./components/PopUpMenu";
import PopMenuContextProvider from "./store/context/popMenu-context";
const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <PopMenuContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "white" },
              headerTintColor: "gray",
              contentStyle: { backgroundColor: "black" },
            }}
          >
            <Stack.Screen
              name="WildLifeCardEditScreen"
              component={WildLifeCardEditScreen}
              options={{ title: "Editor" }}
            />
            <Stack.Screen
              name="PopUpMenu"
              component={PopUpMenu}
              options={{ title: "PopUpMenu" }}
            />
          </Stack.Navigator>
        </PopMenuContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
