import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Text from "./text/Text";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import spacing from "../theme/spacing";

const LifcoHeader = ({ backBtn, title = "LIFCO BD" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {backBtn && (
        <Pressable
          style={{ marginRight: spacing[4] }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={18} color="white" />
        </Pressable>
      )}
      <Text preset="h2">{title}</Text>
    </View>
  );
};

export default LifcoHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing[3],
    borderBottomWidth: 0.2,
    borderBottomColor: colors.white,
  },
});
