import { StyleSheet, Text as RNText } from "react-native";
import { presets } from "./text.preset";
import React from "react";

const Text = ({ children, preset = "default", style }) => {
  const textStyles = StyleSheet.compose(presets[preset], style);
  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
