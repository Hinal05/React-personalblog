import constants from "./constants";

//Api for delete post
export const deleteArticle = async (id) => {
  var obj = JSON.parse(localStorage.getItem('access-token'));
  const token = obj.access_token;
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}/${id}`
  );
  const opts = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json",
    },
  };
  fetch(url, opts).then(async (res) => {
    if (res.status === 204) {
      return {
        status: true,
        msg: "Article deleted",
      };
    }
  })
  .catch((err) => {
    console.log("Error :", err);
    return { status: false, msg: "Could not remove the Article" };
  });
}

export const createArticle = async (createArticleData) => {
  var obj = JSON.parse(localStorage.getItem('access-token'));
  const token = obj.access_token;
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}`
  );
  const data = {
    data: {
      type: "node--article",
      attributes: {
        ...createArticleData,
      }
    },
  };
  const opts = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, opts).then(async (res) => {
    const data = await res.json();
    if (res.status === 201) {
      return data;
    }
    throw new Error(data?.errors?.title);
  });
};

// api for Update post
// export const updateExistingPost = async (
//   postId,
//   updatePostData,
//   finalfData,
//   finaltData
// ) => {
//   const token = await localStorage.getItem("token");
//   if (!token) return;
//   const url = new URL(
//     `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.FD_POST}/${postId}`
//   );
//   const data = {
//     data: {
//       type: "node--fd_post",
//       id: postId,
//       attributes: {
//         ...updatePostData,
//       },
//       relationships: {
//         field_topics: {
//           data: finalfData,
//         },
//         field_tags: {
//           data: finaltData,
//         },
//       },
//     },
//   };
//   const opts = {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/vnd.api+json",
//     },
//     body: JSON.stringify(data),
//   };
//   return fetch(url, opts).then(async (res) => {
//     const data = await res.json();
//     if (res.status === 200) {
//       return data;
//     }
//     throw new Error(data?.errors?.title);
//   });
// };

//api for save post
// export const saveThePost = async (fellowId, postId) => {
//   const token = await localStorage.getItem("token");
//   if (!token) return;
//   const url = new URL(
//     `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.FELLOW}/${fellowId}${constants.RELATIONSHIPS}/field_fd_saved_posts`
//   );
//   const data = {
//     data: [
//       {
//         type: "node--fd_post",
//         id: postId,
//       },
//     ],
//   };
//   const opts = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/vnd.api+json",
//     },
//     body: JSON.stringify(data),
//   };
//   return fetch(url, opts).then(async (res) => {
//     // const data = await res.json();
//     if (res.status === 204) {
//       return res;
//     }
//   });
// };