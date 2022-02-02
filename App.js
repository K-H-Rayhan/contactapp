import * as React from "react";
import {
  BottomNavigation,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AccountRoute from "./account";
import ContactRoute from "./contacts";
import { StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "contacts", title: "Contacts", icon: "account" },
    { key: "account", title: "Account", icon: "key" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    account: AccountRoute,
    contacts: ContactRoute,
  });
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "white",
      accent: "white",
      background: "white",
    },
  };
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme} styles={styles.header}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  header: {
    marginTop: 30,
  },
});

export default MyComponent;
