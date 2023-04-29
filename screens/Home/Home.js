import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput } from "react-native";
import { COLORS, FONTS, SIZES, dummyData, icons } from "../../constants";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  HorizontalFoodCard,
  VerticalFoodCard,
  FilterModal,
} from "../../components";

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

const Home = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [popular, setPopular] = useState([]);
  const handleChangeCategory = (categoryId, menuTypeId) => {
    let selectedPopular = dummyData.menu.find(
      (menu) => menu.name === "Popular"
    );

    let selectedRecommend = dummyData.menu.find(
      (menu) => menu.name === "Recommended"
    );
    let selectedMenu = dummyData.menu.find((menu) => menu.id === menuTypeId);

    setPopular(
      selectedPopular?.list.filter((menu) =>
        menu.categories.includes(categoryId)
      )
    );
    setRecommends(
      selectedRecommend.list.filter((menu) =>
        menu.categories.includes(categoryId)
      )
    );
    setMenuList(
      selectedMenu?.list.filter((menu) => menu.categories.includes(categoryId))
    );
  };
  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  const renderSearch = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.base,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}
      >
        {/* Icon */}
        <Image
          source={icons.search}
          style={{
            tintColor: COLORS.black,
            height: 20,
            width: 20,
          }}
        />
        {/* Text Input */}
        <TextInput
          style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}
          placeholder="search food"
        />
        {/* Filter Button */}
        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
          <Image
            source={icons.filter}
            style={{ width: 20, height: 20, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderRecommendation = () => {
    return (
      <Section
        title="Recommendation"
        onPress={() => console.log("Show All Recommendation")}
      >
        <FlatList
          data={recommends}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <HorizontalFoodCard
                containerStyle={{
                  height: 180,
                  width: SIZES.width * 0.85,
                  marginLeft: index === 0 ? SIZES.padding : 10,
                  marginRight:
                    index === recommends.length - 1 ? SIZES.padding : 0,

                  padding: SIZES.radius,
                  alignItems: "center",
                }}
                imageStyle={{
                  marginTop: 35,
                  width: 150,
                  height: 150,
                }}
                item={item}
                onPress={() => console.log("HorizontalCard")}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index === dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType === item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderPopularSearch = () => {
    return (
      <Section
        title="Popular Search"
        onPress={() => console.log("Show Popular Search")}
      >
        <FlatList
          data={popular}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <VerticalFoodCard
                item={item}
                containerStyle={{
                  marginLeft: index === 0 ? SIZES.padding : 10,
                  marginRight: index === popular.length - 1 ? SIZES.padding : 0,
                  alignItems: "center",
                  height: 240,
                  width: 180,
                  padding: SIZES.radius,
                }}
                imageStyle={{
                  height: 100,
                  width: 100,
                }}
                onPress={() => console.log("VerticalCard")}
              />
            );
          }}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}
              style={{
                marginLeft: index === 0 ? SIZES.padding : 10,
                height: 50,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
                backgroundColor:
                  item.id === selectedCategoryId
                    ? COLORS.primary
                    : COLORS.lightGray2,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                marginTop: SIZES.padding,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={item?.icon}
                style={{ width: 40, height: 40, marginTop: 5 }}
              />
              <Text
                style={{
                  marginRight: 5,
                  color:
                    item.id === selectedCategoryId
                      ? COLORS.white
                      : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderDeliveryTo = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>DELIVERY TO</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{dummyData?.myProfile?.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{
              tintColor: COLORS.primary,
              height: 20,
              width: 20,
              marginLeft: SIZES.base,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Searchbar */}
      {renderSearch()}

      {/* Filter Modal */}
      <FilterModal
        isVisible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />

      {/* LList */}
      <FlatList
        data={menuList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Delivery To */}
            {renderDeliveryTo()}
            {/* Food Categories */}
            {renderFoodCategories()}
            {/* Popular Search */}
            {renderPopularSearch()}
            {/* Recommendation */}
            {renderRecommendation()}
            {/* Menu type */}
            {renderMenuTypes()}
          </View>
        }
        ListFooterComponent={<View style={{ height: 150 }} />}
        renderItem={({ item }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 145,
                alignItems: "center",
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.padding,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              item={item}
              onPress={() => console.log("HorizontalFoodCard")}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
