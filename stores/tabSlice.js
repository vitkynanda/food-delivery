const initialState = {
  selectedTab: "Home",
};

export default (set, get) => ({
  ...initialState,
  setSelectedTab: (payload) =>
    set({
      selectedTab: payload,
    }),
});
