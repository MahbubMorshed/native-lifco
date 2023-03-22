import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Text from "../components/text/Text";
import spacing from "../theme/spacing";
import { colors } from "../theme/colors";
import LifcoHeader from "../components/LifcoHeader";
import Input from "../components/Input";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type[]->{
          name
        }
      },
    }
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LifcoHeader />
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={{ height: 40, width: 40, backgroundColor: colors.grey }}
        />
        <Text preset="h4">
          Current Location
          <Entypo name="chevron-down" size={20} color="#00ccbb" />
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={styles.icon}
        >
          <AntDesign name="user" size={35} color="#00ccbb" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: spacing[2],
          marginHorizontal: spacing[2],
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginRight: spacing[2],
            backgroundColor: colors.grey,
            padding: spacing[2],
          }}
        >
          <AntDesign name="search1" size={20} color="gray" />
          <Input placeholder="Restaurants and Cuisine" keyboardType="default" />
        </View>
        <Feather name="sliders" size={24} color="#00ccbb" />
      </View> */}

      {/* body */}

      <ScrollView className="bg-gray-100 flex-1">
        {/* Categories */}
        <Categories />

        {/* Featured */}
        {featuredCategories.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
});
