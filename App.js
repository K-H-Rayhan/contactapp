import * as React from "react";
import {
  BottomNavigation,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AccountRoute from "./account";
import ContactRoute from "./contacts";
import { StyleSheet, SafeAreaView, View } from "react-native";
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
      <PaperProvider theme={theme} styles={styles.header}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
  );
};
const styles = StyleSheet.create({
  header: {
    marginTop: 30,
  },
});

export default MyComponent;
