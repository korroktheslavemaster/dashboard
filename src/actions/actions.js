import axios from "axios";

const notice_urls = ["acad_ug", "acad_pg", "bcrth", "public"];
const veritas_url = "https://hermes.mykgp.com/";

var updateNotices = notices => ({
  type: "UPDATE_NOTICES",
  value: notices
});

export var fetchNotices = noticeType => (dispatch, getState) => {
  var notices = { ...getState().notices };
  var currentTypeNotices = notices[noticeType];
  const { allFetched, nextPage } = currentTypeNotices;
  if (!allFetched) {
    var url = `${veritas_url}${notice_urls[noticeType]}/`;
    if (nextPage) {
      url = `${url}page/${nextPage}`;
    }
    axios
      .get(url)
      .then(response => {
        const { data, allFetched, nextPage } = currentTypeNotices;
        notices[noticeType] = {
          data: Object.entries({ ...data, ...response["data"]["data"] }).map(
            ([key, val]) => val
          ),
          allFetched:
            nextPage === response["data"]["next_cursor"] && !allFetched,
          nextPage: response["data"]["next_cursor"]
        };
        dispatch(updateNotices(notices));
      })
      .catch(error => {
        console.log(error);
      });
  }
};
