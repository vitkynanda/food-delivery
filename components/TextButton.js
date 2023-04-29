import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

const TextButton = ({ label, labelStyle, buttonContainerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        ...buttonContainerStyle,
      }}
      onPress={onPress}
    >
      <Text style={{ ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
