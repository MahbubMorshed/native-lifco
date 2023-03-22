import { View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../../sanity";
import { AntDesign } from "@expo/vector-icons";
import Text from "./text/Text";
import { colors } from "../theme/colors";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${
          isPressed && "border-gray-200"
        }`}
      >
        <View style={{ backgroundColor: colors.black }}>
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400">Price: ${price}</Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
                height: 80,
                width: 80,
                padding: 4,
                backgroundColor: colors.gray,
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {/* {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity>
              <AntDesign name="minuscircleo" size={40} color="#00ccbb" />
            </TouchableOpacity>
            <Text>0</Text>
            <TouchableOpacity>
              <AntDesign name="pluscircleo" size={40} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )} */}
    </>
  );
};

export default DishRow;
