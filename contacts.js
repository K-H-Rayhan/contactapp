import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import ContactPage from "./views/ContactPage";

const KeyboardAvoidingComponent = () => {
  const [addContact, setAddContact] = useState(true);
  return addContact ? (
    <SafeAreaView>
      <ContactPage addContact={addContact} setAddContact={setAddContact}/>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View>
        <Text onPress={() => setAddContact(!addContact)}>Done</Text>
      </View>
    </SafeAreaView>
  );
};

export default KeyboardAvoidingComponent;
