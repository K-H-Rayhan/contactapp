import React, { useState } from "react";
import { View, Text } from "react-native";
import ContactPage from "./views/ContactPage";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./views/Profile";
const Stack = createNativeStackNavigator();

const Contacts = () => {
  const [addContact, setAddContact] = useState(true);
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: "white",
          accent: "white",
          background: "white",
        },
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Contact"
          component={ContactPage}
          options={{ title: "Contact", headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: "Profile", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(Contacts);
