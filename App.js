import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Photo } from "./src/Photo";
import PhotosList from "./src/PhotosList";
console.disableYellowBox = true;
const queryClient = new QueryClient();


const Stack = createNativeStackNavigator();
const RootRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Collections" component={PhotosList} />
      <Stack.Screen
        name="Photo"
        component={Photo}
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: "#fff",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootRoute />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
