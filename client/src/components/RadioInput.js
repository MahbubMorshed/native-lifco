import { View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Text from "./text/Text";
import spacing from "../theme/spacing";
import { colors } from "../theme/colors";

const RadioInput = ({ label, value, setValue, size = "small" }) => {
  const isSelected = value === label;
  return (
    <TouchableOpacity onPress={() => setValue(label)}>
      <View style={styles.container}>
        <View
          style={[
            styles.outerCircle,
            isSelected && styles.selectedOuterCircle,
            size === "big" && styles.bigOuterCircle,
          ]}
        >
          <View
            style={[
              styles.innerCircle,
              isSelected && styles.selectedInnerCircle,
              size === "big" && styles.bigInnerCircle,
            ]}
          />
        </View>
        <Text style={{ marginLeft: 10, fontWeight: "bold" }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RadioInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing[5],
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  bigOuterCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOuterCircle: {
    borderColor: colors.darkOrange,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },
  bigInnerCircle: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: colors.lightGreen,
  },

  selectedInnerCircle: {
    backgroundColor: colors.darkOrange,
    borderColor: colors.darkOrange,
  },
});
