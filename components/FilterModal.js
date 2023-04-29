import React, { useEffect, useState } from "react";
import { Modal, Animated, TouchableWithoutFeedback, View } from "react-native";
import { COLORS, SIZES } from "../constants";
import { useRef } from "react";

const FilterModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);

  useEffect(() => {
    Animated.timing(modalAnimatedValue, {
      toValue: showFilterModal ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => !showFilterModal && onClose());
  }, [showFilterModal]);

  useEffect(() => {
    if (isVisible) setShowFilterModal(isVisible);
  }, [isVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 500],
  });

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowFilterModal(false);
          }}
        >
          <View
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              top: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        ></Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
