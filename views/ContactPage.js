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
  TextInput,
} from "react-native";
import { Searchbar, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import DATA from "../MOCK_DATA.json";

const ContactPage = ({ navigation }) => {
  const Item = ({ first_name, last_name, email, gender, ip_address }) => (
    <View style={styles.item}>
      <Text
        style={styles.first_name}
        onPress={() => {
          navigation.navigate("Profile", {
            first_name,
            last_name,
            email,
            gender,
            ip_address,
          });
        }}
      >
        {first_name} {last_name}
      </Text>
    </View>
  );
  const [searchItem, setSearchItem] = useState("");
  const renderItem = ({ item }) => (
    <Item
      first_name={item.first_name}
      last_name={item.last_name}
      email={item.email}
      gender={item.gender}
      ip_address={item.ip_address}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
          data={DATA.slice(0, 50).filter((e) => {
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
        <FAB style={styles.fab} small={false} icon="plus" />
      </View>
    </SafeAreaView>
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
    borderBottomColor: "#DCDCDC",
  },
  first_name: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 17,
  },
});
