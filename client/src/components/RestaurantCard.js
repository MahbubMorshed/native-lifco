import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Text from "./text/Text";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import spacing from "../theme/spacing";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurent", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        style={{ height: 100, width: 140 }}
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <View>
        <Text preset="h3" style={styles.title}>
          {title}
        </Text>
        <View style={styles.address}>
          <Ionicons name="ios-location" size={20} color="gray" opacity={0.4} />
          <Text>{address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
const styles = StyleSheet.create({
  title: {
    paddingVertical: spacing[2],
  },
  address: {
    flex: 1,
    flexDirection: "row",
  },
});
