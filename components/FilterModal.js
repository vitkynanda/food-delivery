import React, { useEffect, useState } from "react";
import { Modal, Animated, TouchableWithoutFeedback, View } from "react-native";
import { COLORS, FONTS, SIZES, constants, icons } from "../constants";
import { useRef } from "react";
import { Text } from "react-native";
import IconButton from "./IconButton";
import { ScrollView } from "react-native";
import TwoPointSlider from "./TwoPointSlider";
import TextButton from "./TextButton";
import TextIconButton from "./TextIconButton";
import { TouchableOpacity } from "react-native-gesture-handler";

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({ isVisible, onClose }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState(1);
  const [ratings, setRatings] = useState(1);
  const [tags, setTags] = useState(1);

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

  const renderDistance = () => {
    return (
      <Section title="Distance" containerStyle={{}}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={console.log}
          />
        </View>
      </Section>
    );
  };

  const renderDeliveryTime = () => {
    return (
      <Section title="Delivery Time" containerStyle={{ marginTop: 40 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {constants.delivery_time.map((time, index) => (
              <TextButton
                key={index}
                label={time.label}
                labelStyle={{
                  color: time.id === deliveryTime ? COLORS.white : COLORS.gray,
                }}
                buttonContainerStyle={{
                  backgroundColor:
                    time.id === deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                  width: "30%",
                  margin: 5,
                  height: 50,
                  borderRadius: SIZES.base,
                }}
                onPress={() => setDeliveryTime(time.id)}
              />
            ))}
          </View>
        </View>
      </Section>
    );
  };

  const renderPricingRange = () => {
    return (
      <Section title="Price" containerStyle={{}}>
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[3, 500]}
            min={1}
            max={1000}
            prefix="$"
            onValuesChange={console.log}
          />
        </View>
      </Section>
    );
  };

  const renderRatings = () => {
    return (
      <Section title="Ratings" containerStyle={{ marginTop: 40 }}>
        <View style={{ alignItems: "center" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {constants.ratings.map((rating, index) => (
              <TextIconButton
                key={index}
                label={rating.label}
                labelStyle={{
                  color: rating.id === ratings ? COLORS.white : COLORS.gray,
                }}
                containerStyle={{
                  flex: 1,
                  backgroundColor:
                    rating.id === ratings ? COLORS.primary : COLORS.lightGray2,
                  width: "30%",
                  margin: 5,
                  height: 45,
                  borderRadius: SIZES.base,
                }}
                icon={icons.star}
                iconStyle={{
                  tintColor: rating.id === ratings ? COLORS.white : COLORS.gray,
                }}
                onPress={() => setRatings(rating.id)}
              />
            ))}
          </View>
        </View>
      </Section>
    );
  };

  const renderTags = () => {
    return (
      <Section title="Tags" containerStyle={{ marginTop: 40 }}>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {constants.tags.map((tag, index) => (
              <TextButton
                key={index}
                label={tag.label}
                labelStyle={{
                  color: tag.id === tags ? COLORS.white : COLORS.gray,
                }}
                buttonContainerStyle={{
                  backgroundColor:
                    tag.id === tags ? COLORS.primary : COLORS.lightGray2,
                  width: "30%",
                  margin: 5,
                  height: 50,
                  borderRadius: SIZES.base,
                }}
                onPress={() => setTags(tag.id)}
              />
            ))}
          </View>
        </View>
      </Section>
    );
  };
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
        >
          {/* Header  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              icon={icons.cross}
              containerStyle={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
          >
            {renderDistance()}
            {renderDeliveryTime()}
            {renderPricingRange()}
            {renderRatings()}
            {renderTags()}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              label="Apply Filters"
              labelStyle={{ color: COLORS.white, ...FONTS.body3 }}
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log("Apply Filters")}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
