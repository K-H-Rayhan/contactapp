import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import {
  Modal,
  Text,
  Provider as PaperProvider,
  Button,
  TextInput,
  Card,
  Avatar,
  Title,
  Paragraph,
  Portal,
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
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
export default function AccountRoute() {
  const [signUp, setSignUp] = useState(true);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [user, setUser] = useState();
  const [message, setMessage] = useState(null);
  const [notes, setNotes] = useState("");
  const submit = async (e) => {
    fetch("http://192.168.0.126:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (data.msg == "Wrong") setMessage("Wrong Credentials");
        else {
          try {
            await AsyncStorage.setItem("userEmail", data.user.email);
            await AsyncStorage.setItem("userName", data.user.name);
            await AsyncStorage.setItem("userPhone", data.user.phone);
            setUser({
              name: data.user.name,
              email: data.user.email,
              phone: data.user.phone,
            });
          } catch (e) {
            // saving error
          }
          setMessage("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const theme = {
    roundness: 7,
    colors: {
      primary: "gray",
      accent: "gray",
    },
    outline: "none",
  };

  useEffect(async () => {
    try {
      const email = await AsyncStorage.getItem("userEmail");
      const name = await AsyncStorage.getItem("userName");
      const phone = await AsyncStorage.getItem("userPhone");
      setUser({
        name: name,
        email: email,
        phone: phone,
      });
    } catch (e) {}
  }, []);

  return user && user.phone != null ? (
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
                  <Text style={tw`text-left text-blue-500`}>{user.phone}</Text>
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
                  <Text style={tw`text-left text-blue-500 pb-2`} icon="camera">
                    {user.email}
                  </Text>
                </Paragraph>
              </Card.Content>
            </Card>
            <Card
              theme={{ roundness: 9 }}
              style={styles.card}
              onPress={showModal}
            >
              <Card.Content>
                <Paragraph style={tw`text-left font-bold`}>
                  <FontAwesome name="pencil" size={15} color="black" />{" "}
                  <Text style={tw`mb-2 text-left font-bold text-base`}>
                    Notes
                  </Text>
                  {" \n"}
                  <Text style={tw`text-left text-black font-semibold`}>
                    {notes}
                  </Text>
                </Paragraph>
              </Card.Content>
            </Card>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.containerStyle}
              >
                <TextInput
                  mode="outlined"
                  placeholder="Type Note"
                  value={notes}
                  multiline
                  onChangeText={setNotes}
                />
              </Modal>
            </Portal>
          </View>
          <Text
            style={styles.signOut}
            onPress={async () => {
              try {
                await AsyncStorage.removeItem("userEmail");
                await AsyncStorage.removeItem("userPhone");
                await AsyncStorage.removeItem("userName");
                return setUser(null);
              } catch (exception) {
                return false;
              }
            }}
          >
            Sign Out
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  ) : (
    //Without Login
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
        {signUp ? (
          <View style={styles.Xpop}>
            <MaterialCommunityIcons
              name="login"
              size={30}
              color="black"
              style={tw`self-center`}
            />
            <Text style={tw`text-lg text-center font-bold mb-6 `}>
              Login into your account
            </Text>
            <View>
              <TextInput2
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, email: val }));
                }}
                label="Email"
                placeholder="Email"
                style={tw`mt-1 h-14 rounded-none relative  w-full px-3 py-2 text-gray-900 rounded-t-md border border-gray-100 `}
              />
              <TextInput2
                label="Password"
                placeholder="Password"
                secureTextEntry
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, password: val }));
                }}
                style={tw` h-14 rounded-none relative  w-full px-3 py-2  text-gray-900 rounded-b-md border border-gray-100 `}
              />

              <Text
                style={tw`text-center self-center rounded-full text-red-500 my-2`}
              >
                {message}
              </Text>
              <Button
                mode="contained"
                style={tw`w-40 text-center self-center rounded-full bg-black`}
                onPress={submit}
              >
                <Text style={tw`text-white text-base`}>Login</Text>
              </Button>
              <Text
                style={tw`text-blue-600 text-base text-center mt-2`}
                onPress={() => setSignUp(!signUp)}
              >
                {signUp ? "SignUp" : "Login"}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.Xpop2}>
            <MaterialCommunityIcons
              name="account-multiple-outline"
              size={30}
              color="black"
              style={tw`self-center`}
            />
            <Text style={tw`text-lg text-center font-bold mb-6 `}>
              Register a new account
            </Text>
            <View>
              <TextInput2
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, email: val }));
                }}
                label="Email"
                placeholder="Email"
                style={tw`mt-1 h-14 rounded-none relative  w-full px-3 py-2 text-gray-900 rounded-t-md border border-gray-100 `}
              />
              <TextInput2
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, email: val }));
                }}
                label="Name"
                placeholder="Name"
                style={tw` h-14 rounded-none relative  w-full px-3 py-2 text-gray-900  border border-gray-100 `}
              />
              <TextInput2
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, email: val }));
                }}
                label="Phone"
                placeholder="Phone"
                style={tw` h-14 rounded-none relative  w-full px-3 py-2 text-gray-900  border border-gray-100 `}
              />
              <TextInput2
                label="Password"
                placeholder="Password"
                secureTextEntry
                onChangeText={(val) => {
                  setInputs((values) => ({ ...values, password: val }));
                }}
                style={tw` h-14 rounded-none relative  w-full px-3 py-2  text-gray-900 rounded-b-md border border-gray-100`}
              />

              <Text
                style={tw`text-center self-center rounded-full text-red-500 my-2`}
              >
                {message}
              </Text>
              <Button
                mode="contained"
                style={tw`w-40 text-center self-center rounded-full bg-black `}
                onPress={submit}
              >
                <Text style={tw`text-white text-base`}>SignUp Now</Text>
              </Button>
              <Text
                style={tw`text-blue-600 text-base text-center mt-2`}
                onPress={() => setSignUp(!signUp)}
              >
                {signUp ? "SignUp" : "Login"}
              </Text>
            </View>
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  signOut: {
    position: "absolute",
    alignSelf: "center",
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    bottom: 10,
  },
  containerStyle: {
    padding: 20,
  },
  pictureHolder: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 24,
  },
  card: {
    marginBottom: 7,
  },
  Xpop: {
    textAlign: "center",
    fontSize: 40,
    marginTop: Dimensions.get("screen").height / 5,
    padding: 40,
  },
  Xpop2: {
    textAlign: "center",
    fontSize: 40,
    marginTop: Dimensions.get("screen").height / 8,
    padding: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FF5236",
  },
});
