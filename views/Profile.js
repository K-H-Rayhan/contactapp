import React from "react";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  Provider as PaperProvider,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as TextInput2,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const Profile = () => {
  return user ? (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          onPress={
            Platform.OS === "ios" || Platform.OS === "android"
              ? Keyboard.dismiss
              : ""
          }
        >
          <View style={tw`px-3  h-full bg-gray-50`}>
            <Text style={tw`text-3xl text-center font-bold`}>Profile</Text>
            <View>
              <View
                style={tw`w-20 h-20 bg-gray-300 self-center rounded-full mt-6`}
              >
                <MaterialIcons
                  style={styles.pictureHolder}
                  name="account-circle"
                  size={30}
                  color="white"
                />
              </View>
              <Title style={tw`text-center font-bold text-2xl my-6`}>
                {user.name}
              </Title>
              <Card theme={{ roundness: 9 }} style={styles.card}>
                <Card.Content>
                  <Paragraph style={tw`text-left font-bold`}>
                    <FontAwesome name="phone" size={15} color="black" />{" "}
                    <Text style={tw`mb-2 text-left font-bold text-base`}>
                      Phone
                    </Text>
                    {"\n"}
                    <Text style={tw`text-left text-blue-500`}>
                      {user.phone}
                    </Text>
                  </Paragraph>
                </Card.Content>
              </Card>
              <Card theme={{ roundness: 9 }} style={styles.card}>
                <Card.Content>
                  <Paragraph style={tw`text-left font-bold`}>
                    <Ionicons name="ios-mail" size={15} color="black" />{" "}
                    <Text style={tw`mb-2 text-left font-bold text-base`}>
                      Email
                    </Text>
                    {"\n"}
                    <Text
                      style={tw`text-left text-blue-500 pb-2`}
                      icon="camera"
                    >
                      {user.email}
                    </Text>
                  </Paragraph>
                </Card.Content>
              </Card>
              <Card theme={{ roundness: 9 }} style={styles.card}>
                <Card.Content>
                  <Text style={tw`text-left font-bold text-base`}>
                    <FontAwesome name="pencil" size={15} color="black" /> Notes
                  </Text>
                  <TextInput2
                    style={{ fontWeight: "bold", fontSize: 13, marginTop: 5 }}
                    onChangeText={setNotes}
                    value={notes}
                    placeholder="Type Your Note"
                    keyboardType="default"
                  />
                </Card.Content>
              </Card>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  ) : (
    <View><Text>User Profile</Text></View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
