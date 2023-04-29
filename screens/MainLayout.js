import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import React, { useRef, useEffect } from "react";
import {
  Animated,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import { COLORS, SIZES, constants, dummyData, icons } from "../constants";
import { useGlobalStore } from "../stores";
import { Header, TabButton } from "../components";
import { LinearGradient } from "expo-linear-gradient";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CartTab from "./Cart/CartTab";
import Search from "./Search/Search";
import Favourite from "./Favourite/Favourite";
import Notification from "./Notification/Notification";
import { Text } from "react-native";
import Home from "./Home/Home";

const MainLayout = ({ navigation }) => {
  const { selectedTab, setSelectedTab } = useGlobalStore();
  const isDrawerOpen = useDrawerStatus() === "open";
  const animation = useRef(new Animated.Value(0))?.current;
  const flatListRef = useRef(null);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale }],
  };

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  const homeFlexStyle = useAnimatedStyle(() => ({ flex: homeTabFlex.value }));
  const homeColorStyle = useAnimatedStyle(() => ({
    backgroundColor: homeTabColor.value,
  }));

  const searchFlexStyle = useAnimatedStyle(() => ({
    flex: searchTabFlex.value,
  }));
  const searchColorStyle = useAnimatedStyle(() => ({
    backgroundColor: searchTabColor.value,
  }));

  const cartFlexStyle = useAnimatedStyle(() => ({ flex: cartTabFlex.value }));
  const cartColorStyle = useAnimatedStyle(() => ({
    backgroundColor: cartTabColor.value,
  }));

  const favouriteFlexStyle = useAnimatedStyle(() => ({
    flex: favouriteTabFlex.value,
  }));
  const favouriteColorStyle = useAnimatedStyle(() => ({
    backgroundColor: favouriteTabColor.value,
  }));

  const notificationFlexStyle = useAnimatedStyle(() => ({
    flex: notificationTabFlex.value,
  }));
  const notificationColorStyle = useAnimatedStyle(() => ({
    backgroundColor: notificationTabColor.value,
  }));

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  useEffect(() => {
    if (selectedTab === constants.screens.home) {
      flatListRef?.current?.scrollToIndex({ index: 0, animated: false });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
    if (selectedTab === constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({ index: 1, animated: false });
      cartTabFlex.value = withTiming(4, { duration: 300 });
      cartTabColor.value = withTiming(COLORS.primary, { duration: 300 });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 300 });
      cartTabColor.value = withTiming(COLORS.white, { duration: 300 });
    }
    if (selectedTab === constants.screens.search) {
      flatListRef?.current?.scrollToIndex({ index: 2, animated: false });
      searchTabFlex.value = withTiming(4, { duration: 300 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 300 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 300 });
      searchTabColor.value = withTiming(COLORS.white, { duration: 300 });
    }
    if (selectedTab === constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({ index: 3, animated: false });
      favouriteTabFlex.value = withTiming(4, { duration: 300 });
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 300 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 300 });
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 300 });
    }
    if (selectedTab === constants.screens.notification) {
      flatListRef?.current?.scrollToIndex({ index: 4, animated: false });
      notificationTabFlex.value = withTiming(4, { duration: 300 });
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 300,
      });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 300 });
      notificationTabColor.value = withTiming(COLORS.white, { duration: 300 });
    }
  }, [selectedTab]);

  const animatedStyledView = StyleSheet.flatten([
    animatedStyle,
    {
      flex: 1,
      backgroundColor: COLORS.white,
    },
  ]);

  return (
    <Animated.View style={animatedStyledView}>
      {/* Header */}
      <Header
        containerStyle={{
          height: 50,
          marginTop: 40,
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
        title={selectedTab}
        leftComponent={
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: COLORS.gray2,
              borderRadius: SIZES.radius,
            }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity
            style={{
              borderRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={dummyData?.myProfile?.profile_image}
              style={{ height: 40, width: 40, borderRadius: SIZES.radius }}
            />
          </TouchableOpacity>
        }
      />

      {/* Content */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ height: SIZES.height, width: SIZES.width }}>
                {item.label === constants.screens.home && <Home />}
                {item.label === constants.screens.cart && <Search />}
                {item.label === constants.screens.search && <CartTab />}
                {item.label === constants.screens.favourite && <Favourite />}
                {item.label === constants.screens.notification && (
                  <Notification />
                )}
              </View>
            );
          }}
        />
      </View>

      {/* Footer */}

      <View style={{ height: 100, justifyContent: "flex-end" }}>
        {/* Shadow */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={{
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            height: 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
        />
        {/* Tabs */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SIZES.radius,
            borderBottomLeftRadius: isDrawerOpen ? 20 : 0,
            borderBottomRightRadius: isDrawerOpen ? 20 : 0,
            backgroundColor: COLORS.white,
          }}
        >
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
            onPress={() => {
              setSelectedTab(constants.screens.home);
            }}
          />
          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab === constants.screens.cart}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
            onPress={() => {
              setSelectedTab(constants.screens.cart);
            }}
          />
          <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab === constants.screens.search}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
            onPress={() => {
              setSelectedTab(constants.screens.search);
            }}
          />
          <TabButton
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
            onPress={() => {
              setSelectedTab(constants.screens.favourite);
            }}
          />
          <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
            onPress={() => {
              setSelectedTab(constants.screens.notification);
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default MainLayout;
