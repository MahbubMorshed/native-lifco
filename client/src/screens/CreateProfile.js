import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../App";
import { useNavigation } from "@react-navigation/native";
import RadioInput from "../components/RadioInput";
import { colors } from "../theme/colors";

const genderOptions = ["Male", "Female"];
const maritalStatus = ["Married", "Unmarried"];

const CreateProfile = ({ user }) => {
  const navigation = useNavigation();

  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [profession, setProfession] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dob, setDob] = useState("");
  const [religion, setReligion] = useState("");
  const [gender, setGender] = useState(null);
  const [married, setMarried] = useState(null);
  const [loading, setLoading] = useState(false);

  const crearteProfile = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        name: name,
        fatherName: fatherName,
        motherName: motherName,
        address: address,
        mobile: mobile,
        profession: profession,
        nidNumber: nidNumber,
        bloodGroup: bloodGroup,
        dob: dob,
        religion: religion,
        age: age,
        gender: gender,
        married: married,
        uid: user.uid,
      });
      setLoading(false);
    } catch (error) {
      //   showMessage({
      //     message: "Error",
      //     type: "danger",
      //   });
      setLoading(false);
    }
    navigation.navigate("Home");
  };

  return (
    <View style={styles.CreateProfile}>
      <Input
        placeholder="Full Name"
        autoCapitalize={"words"}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="Father Name"
        autoCapitalize={"words"}
        onChangeText={(text) => setFatherName(text)}
      />
      <Input
        placeholder="Mother Name"
        autoCapitalize={"words"}
        onChangeText={(text) => setMotherName(text)}
      />
      <Input
        placeholder="Address"
        autoCapitalize={"words"}
        onChangeText={(text) => setAddress(text)}
      />
      <Input
        placeholder="Mobile Number"
        autoCapitalize={"words"}
        onChangeText={(text) => setMobile(text)}
      />
      <Input
        placeholder="Profession"
        autoCapitalize={"words"}
        onChangeText={(text) => setProfession(text)}
      />
      <Input
        placeholder="NID Number"
        autoCapitalize={"words"}
        onChangeText={(text) => setNidNumber(text)}
      />
      <Input
        placeholder="Blood Group"
        autoCapitalize={"words"}
        onChangeText={(text) => setBloodGroup(text)}
      />
      <Input
        placeholder="Date Of Birth"
        autoCapitalize={"words"}
        onChangeText={(text) => setDob(text)}
      />
      <Input
        placeholder="Religion"
        autoCapitalize={"words"}
        onChangeText={(text) => setReligion(text)}
      />
      <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 15 }}>Select Your Gender</Text>
        {genderOptions.map((option, index) => (
          <RadioInput
            key={index}
            label={option}
            value={gender}
            setValue={setGender}
          />
        ))}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 15 }}>Marital Status</Text>
        {maritalStatus.map((option, index) => (
          <RadioInput
            key={index}
            label={option}
            value={married}
            setValue={setMarried}
          />
        ))}
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={"Submit"}
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
          onPress={() => {
            crearteProfile;
            navigation.navigate("Home");
          }}
        />
      )}
    </View>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  CreateProfile: {
    // backgroundColor: colors.black,
    color: colors.white,
  },
});
