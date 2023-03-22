import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { urlFor } from "../../sanity";
import DishRow from "../components/DishRow";
import Text from "../components/text/Text";
import { colors } from "../theme/colors";
import spacing from "../theme/spacing";

const RestaurentScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerShown: false,
  //     });
  //   }, []);
  return (
    <ScrollView>
      <View style={styles.banner}>
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          style={styles.image}
        />
        <TouchableOpacity onPress={navigation.goBack} style={styles.icon}>
          <Entypo name="arrow-with-circle-left" size={40} color="#00ccbb" />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: colors.black }}>
        <View style={styles.description}>
          <Text preset="h2">{title}</Text>
          <Text>{short_description}</Text>
          <View style={styles.address}>
            <Ionicons
              name="ios-location"
              size={20}
              color="gray"
              opacity={0.4}
            />
            <Text>{address}</Text>
          </View>
        </View>
      </View>

      <View>
        <Text preset="h3" style={styles.itemText}>
          Offers
        </Text>

        {/* dish row */}

        {dishes.map((dish) => (
          <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurentScreen;

const styles = StyleSheet.create({
  banner: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: colors.grey,
    padding: spacing[2],
  },
  icon: {
    position: "absolute",
    marginTop: spacing[10],
    marginLeft: spacing[2],
    padding: spacing[1],
    backgroundColor: colors.darkgrey,
    borderRadius: spacing[6],
  },
  description: {
    paddingHorizontal: spacing[2],
    paddingTop: spacing[2],
  },
  address: {
    flexDirection: "row",
    paddingBottom: spacing[3],
  },
  itemText: {
    backgroundColor: colors.darkgrey,
    color: colors.white,
    textAlign: "center",
    paddingVertical: spacing[2],
  },
});
// className = "px-4 pt-4";
// className="flex-row items-center space-x-1"
// className="px-4 pt-6 mb-3 font-bold text-xl"
