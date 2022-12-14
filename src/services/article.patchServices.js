import constants from "./constants";

//Api for delete post.
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

// Api for create post.
export const createArticle = async (createArticleData, tagData) => {
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
      },
      relationships: {
        field_tags: {
          data: tagData,
        },
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
    throw new Error(data?.errors?.name);
  });
};

// Api for edit post.
export const editArticle = async (createArticleData, id, tagData) => {
  var obj = JSON.parse(localStorage.getItem('access-token'));
  const token = obj.access_token;
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}/${id}`
  );
  const data = {
    data: {
      type: "node--article",
      id: id,
      attributes: {
        ...createArticleData,
      },
      relationships: {
        field_tags: {
          data: tagData,
        },
      }
    }
  };
  const opts = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify(data),
  };
  return fetch(url, opts).then(async (res) => {
    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
  });
};
