import { TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import Text from "./text/Text";
import spacing from "../theme/spacing";
import { colors } from "../theme/colors";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: imgUrl,
        }}
      />
      <Text preset="h4" style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    marginHorizontal: spacing[2],
    borderRadius: spacing[4],
    borderColor: colors.green,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    paddingVertical: spacing[2],
  },
});
