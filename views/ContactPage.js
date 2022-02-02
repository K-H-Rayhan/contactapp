import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  Keyboard,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-web";
import DATA from "../MOCK_DATA.json";
import Profile from "./Profile";

const ContactPage = ({ addContact, setAddContact }) => {
  const Item = ({ first_name, last_name }) => (
    <View style={styles.item}>
      <Text
        style={styles.first_name}
        onPress={() => {
          <Profile />;
        }}
      >
        {first_name} {last_name}
      </Text>
    </View>
  );
  const [searchItem, setSearchItem] = useState("");
  const renderItem = ({ item }) => (
    <Item first_name={item.first_name} last_name={item.last_name} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      animated={true}
    >
      <View onPress={Keyboard.dismiss}>
        <View>
          <Text style={styles.header}>Contacts</Text>
          <Searchbar
            iconColor="gray"
            placeholderTextColor="lightgray"
            placeholder="Search"
            style={styles.searchBar}
            onChangeText={setSearchItem}
            caretHidden={false}
            selectionColor="#06c"
          />
        </View>
        <FlatList
          scrollToOverflowEnabled={true}
          data={DATA.filter((e) => {
            const name = e.first_name + " " + e.last_name;
            if (
              name.split(" ").filter((e) => {
                if (e.toLowerCase().startsWith(searchItem.toLowerCase()))
                  return true;
              }).length != 0
            )
              return e;
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
        <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() => setAddContact(!addContact)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(ContactPage);
const styles = StyleSheet.create({
  flatList: {
    height:
      Dimensions.get("screen").height -
      (Dimensions.get("screen").height - Dimensions.get("window").height) -
      105 -
      (Platform.OS == "ios"
        ? Dimensions.get("screen").height < 900
          ? 134
          : 73
        : 80),
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  searchBar: {
    borderRadius: 100,
    margin: 16,
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
    height: 25,
  },

  item: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderBottomColor: "#DCDCDC",
  },
  first_name: {
    fontSize: 17,
  },
});
