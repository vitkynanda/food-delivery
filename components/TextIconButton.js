import React from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../constants";
import { color } from "react-native-reanimated";

const TextIconButton = ({
  label,
  labelStyle,
  containerStyle,
  onPress,
  iconStyle,
  icon,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
      <Image
        source={icon}
        style={{
          marginLeft: 5,
          width: 18,
          height: 18,
          tintColor: COLORS.black,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;
