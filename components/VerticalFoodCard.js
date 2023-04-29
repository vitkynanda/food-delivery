import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTS, SIZES, icons } from "../constants";

const VerticalFoodCard = ({ containerStyle, imageStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Image source={icons.calories} style={{ width: 30, height: 30 }} />
          <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
            {item.calories} calories
          </Text>
        </View>
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.red : null,
          }}
        />
      </View>
      {/* Image */}
      <Image source={item.image} style={imageStyle} />
      {/* Info */}
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Name */}
        <Text style={{ ...FONTS.h3, fontSize: 14 }}>{item.name}</Text>
        {/* Description */}
        <Text
          style={{
            color: COLORS.darkGray,
            ...FONTS.body5,
            textAlign: "center",
          }}
        >
          {item.description}
        </Text>
        {/* Price */}
        <Text style={{ marginTop: SIZES.base, ...FONTS.h4 }}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
