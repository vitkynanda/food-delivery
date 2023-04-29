import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZES, COLORS, FONTS } from "../constants";
import { Text } from "react-native";

const TwoPointSlider = ({
  values,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) => {
  return (
    <View>
      <MultiSlider
        values={values}
        sliderLength={SIZES.width - SIZES.padding * 2 - 20}
        min={min}
        max={max}
        step={1}
        markerOffsetY={20}
        selectedStyle={{
          backgroundColor: COLORS.primary,
        }}
        trackStyle={{
          height: 10,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray2,
        }}
        minMarkerOverlapDistance={50}
        customMarker={(e) => {
          return (
            <View
              style={{
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  borderWidth: 4,
                  borderColor: COLORS.white,
                  backgroundColor: COLORS.primary,
                  ...styles.shadows,
                }}
              />

              <Text
                style={{
                  marginTop: 5,
                  color: COLORS.darkGray,
                  ...FONTS.body3,
                }}
              >
                {prefix}
                {e.currentValue}
                {postfix}
              </Text>
            </View>
          );
        }}
        onValuesChange={onValuesChange}
      />
    </View>
  );
};

export default TwoPointSlider;

const styles = StyleSheet.create({
  shadows: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});
