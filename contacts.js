import React, { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Searchbar } from "react-native-paper";

const KeyboardAvoidingComponent = () => {
  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Contacts</Text>
            <Searchbar style={styles.xpop} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  xpop: {
    borderRadius: 100,
    margin: 16,
  },
  header: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default KeyboardAvoidingComponent;
