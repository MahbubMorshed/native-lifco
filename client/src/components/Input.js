import { StyleSheet, TextInput } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import spacing from "../theme/spacing";

const Input = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  autoCapitalize,
  multiline,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 24,
    borderWidth: 1,
    borderBottomColor: colors.white,
    marginBottom: spacing[6],
    // color: colors.white,
  },
});
