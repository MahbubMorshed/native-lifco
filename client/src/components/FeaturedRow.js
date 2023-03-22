import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../../sanity";
import Text from "./text/Text";
import { colors } from "../theme/colors";
import spacing from "../theme/spacing";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurents] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured" && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type[]->{
              name
            }
          },
        }[0]
        `,
        { id }
      )
      .then((data) => {
        setRestaurents(data?.restaurants);
      });
  }, []);
  return (
    <View>
      <View style={styles.titleRow}>
        <Text preset="h3" style={styles.title}>
          {title}
        </Text>
        <AntDesign name="rightcircleo" size={24} color="#00ccbb" />
      </View>
      <Text style={styles.description}>{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
        className="pt-4"
      >
        {restaurants?.map((restaurent) => (
          <RestaurantCard
            key={restaurent._id}
            id={restaurent._id}
            imgUrl={restaurent.image}
            title={restaurent.name}
            rating={restaurent.rating}
            genre={restaurent.type?.name}
            address={restaurent.address}
            short_description={restaurent.short_description}
            dishes={restaurent.dishes}
            long={restaurent.long}
            lat={restaurent.lat}
          />
        ))}
        {/* RestaurentCards */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({
  titleRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing[2],
    paddingHorizontal: spacing[2],
  },
  title: {
    color: colors.green,
  },
  description: {
    color: colors.white,
    paddingVertical: spacing[1],
    paddingHorizontal: spacing[2],
  },
});
