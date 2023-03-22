import { ActivityIndicator, Pressable, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import Text from "../components/text/Text";
import RadioInput from "../components/RadioInput";
import Button from "../components/Button";
import { showMessage } from "react-native-flash-message";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../App";
import { useNavigation } from "@react-navigation/native";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const signup = async () => {
    setLoading(true);
    try {
      // 1. create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 2. add user profile to database
      await addDoc(collection(db, "users"), {
        email: email,
        uid: result.user.uid,
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: "Error",
        type: "danger",
      });
      setLoading(false);
    }
    // old user  if(email+SecretCode) --> navigate to Home screen
    // new user  if(!email+SecretCode) --> navigate to CreateProfile screen
    navigation.navigate("CreateProfile");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize={"none"}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title={"Signup"}
            customStyles={{ alignSelf: "center", marginBottom: 60 }}
            onPress={() => {
              signup;
              navigation.navigate("CreateProfile");
            }}
          />
        )}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable>
          <Text>
            Already have an account?{" "}
            <Text
              style={{ color: "green", fontWeight: "bold", marginLeft: 10 }}
            >
              Login
            </Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
