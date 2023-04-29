import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import {
  constants,
  icons,
  dummyData,
  COLORS,
  SIZES,
  FONTS,
} from "../constants";
import { MainLayout } from "../screens";
import { useGlobalStore } from "../stores";

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderRadius: SIZES.base,
        paddingLeft: SIZES.radius,
        marginBottom: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />
      <Text
        style={{
          marginLeft: 15,
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation, ...props }) => {
  const { setSelectedTab, selectedTab } = useGlobalStore();

  return (
    <DrawerContentScrollView
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ flex: 1 }}
      {...props}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        {/* Close */}
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.cross}
              style={{
                height: 35,
                width: 35,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.radius,
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            source={dummyData.myProfile.profile_image}
            style={{ width: 50, height: 50, borderRadius: SIZES.radius }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {dummyData.myProfile.name}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              View Your Profile
            </Text>
          </View>
        </TouchableOpacity>

        {/* DrawerItem */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          {constants.screenData.map((screen) => (
            <CustomDrawerItem
              key={screen.name}
              label={screen.name}
              icon={screen.icon}
              isFocused={selectedTab === screen.name}
              onPress={() => {
                setSelectedTab(screen.name);
                navigation.navigate("MainLayout");
              }}
            />
          ))}

          {/* Line Divider */}
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />
          {/* <CustomDrawerItem label="Track Your Order" icon={icons.location} />
          <CustomDrawerItem label="Coupuns" icon={icons.coupon} />
          <CustomDrawerItem label="Settings" icon={icons.setting} />
          <CustomDrawerItem label="Invite a Friend" icon={icons.profile} />
          <CustomDrawerItem label="Help Center" icon={icons.help} /> */}
        </View>
        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label="Logout" icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = () => {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            flex: 1,
            width: "65%",
            paddingRight: 20,
            backgroundColor: "transparent",
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
        }}
        drawerContent={(props) => {
          return <CustomDrawerContent {...props} />;
        }}
        initialRouteName="MainLayout"
      >
        <Drawer.Screen name="MainLayout">
          {(props) => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawer;
