const initNotices = Array(4)
  .fill()
  .map(() => ({
    data: [],
    nextPage: null,
    allFetched: false
  }));

export var noticesReducer = (state = initNotices, action) => {
  switch (action.type) {
    case "UPDATE_NOTICES":
      return action.value;
    default:
      return state;
  }
};
