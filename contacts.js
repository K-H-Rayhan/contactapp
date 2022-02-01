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
  SafeAreaView,
} from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import DATA from "./MOCK_DATA.json";
const Item = ({ first_name, last_name }) => (
  <View style={styles.item}>
    <Text style={styles.first_name}>
      {first_name} {last_name}
    </Text>
  </View>
);

const KeyboardAvoidingComponent = () => {
  const [searchItem, setSearchItem] = useState("");
  const [addContact, setAddContact] = useState(true);
  const renderItem = ({ item }) => (
    <Item first_name={item.first_name} last_name={item.last_name} />
  );
  return addContact ? (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <StatusBar StatusBarStyle="dark-content"/>
        <View onPress={Keyboard.dismiss}>
          <Text style={styles.header}>Contacts</Text>
          <Searchbar
            iconColor="gray"
            placeholderTextColor="lightgray"
            placeholder="Search"
            style={styles.xpop}
            onChangeText={setSearchItem}
            caretHidden={false}
          />
          <FlatList
            data={DATA.filter((e) => {
              if (
                e.first_name.toLowerCase().startsWith(searchItem.toLowerCase())
              ) {
                return e;
              }
            })}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled
            style={{
              height:
                Dimensions.get("screen").height < 900
                  ? Dimensions.get("screen").height -
                    Dimensions.get("screen").height / 4
                  : Dimensions.get("screen").height-
                  Dimensions.get("screen").height / 7,
            }}
          />
          <FAB
            style={styles.fab}
            small={false}
            icon="plus"
            onPress={() => setAddContact(!addContact)}
          />
          {console.log(Dimensions.get("screen").height)}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View>
        <Text onPress={() => setAddContact(!addContact)}>Done</Text>
      </View>
    </SafeAreaView>
  );
};
// tw`bottom-14 right-3 absolute bg-gray-100 font-bold p-4 rounded-full`
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: Platform.OS === "ios" ? 30 : 50,
  },
  xpop: {
    borderRadius: 100,
    margin: 16,
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    color: "black",
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

export default KeyboardAvoidingComponent;
