import _ from "lodash";
import placeHolder from "../apis/jsonPlaceholder";

export const fetchPostsandUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  /*ALTERNATIVE 
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
  */

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => {
  return async (dispatch) => {
    /*Returning a function in shorthand*/
    const response = await placeHolder.get("/posts");
    /*const userIds = _.uniq(_.map(response.data, "userId"));
    let promises = [];
    userIds.forEach((id) => {
      promises.push(placeHolder.get(`/users/${id}`));
    });
    const postUserHash = {};
    var newResponse = {};
    Promise.all(promises).then((result) => {
      result.map((res) => {
        postUserHash[res.data.id] = res.data.name;
      });
      response.data.map((res) => {
        newResponse = { userID: postUserHash[res.userId] };
      });
    });*/
    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    /*Returning a function in shorthand*/
    const response = await placeHolder.get(`/users/${id}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};
