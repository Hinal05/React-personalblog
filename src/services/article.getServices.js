import constants from "./constants";

export const getArticle = async () => {
  var obj = JSON.parse(localStorage.getItem('access-token'));
  const token = obj.access_token;
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}`
  );
  const opts = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return fetch(url, opts)
    .then(async (res) => {
      const data = await res.json();
      if (res.status === 200) {
        return data;
      }
      return;
    })
    .catch((err) => {
      return err;
    });
};

//view edit post
// export const getCurrentArticle = async (id) => {
//   debugger
//   const token = await localStorage.getItem("token");
//   if (!token) return;

//   const url = new URL(
//     `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}/${id}`
//   );
//   var params = [
//     [
//       "fields[node--fd_post]",
//       "title,field_location,field_post_content,field_post_link,field_tags,field_topics,uid",
//     ],

//     ["fields[user--user]", "field_profile_image"],

//     ["include", "uid,uid.field_profile_image,uid.field_fellow_profile"],
//     ["fields[node--fellow]", "drupal_internal__nid,title"], //to get fellow drupal_internal__nid and title
//     ["fields[media--image]", "thumbnail"],
//   ];
//   url.search = new URLSearchParams(params).toString();

//   const opts = {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return fetch(url, opts)
//     .then(async (res) => {
//       const data = await res.json();
//       if (res.status === 200) return data;
//       return;
//     })
//     .catch((err) => {
//       return err;
//     });
// };