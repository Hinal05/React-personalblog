import constants from "./constants";

export const getArticle = async () => {
  if (localStorage.getItem('access-token') != null) {
    var obj = JSON.parse(localStorage.getItem('access-token'));
    var token = obj.access_token;
  }
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.NODE}${constants.ARTICLE}${constants.INCLUDED}`
  );
  let headers_auth = {};
  if (token) {
    headers_auth = {
      Authorization: `Bearer ${token}`,
    }
  }
  // Required fields adding.
  // var params = [
  //   ["include","uid"],
  //   [
  //     "fields[node--article]",
  //     "body,title"
  //   ]
  // ];
  // url.search = new URLSearchParams(params).toString();
  const opts = {
    method: "GET",
    headers: headers_auth
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

export const getTags = async () => {
  if (localStorage.getItem('access-token') != null) {
    var obj = JSON.parse(localStorage.getItem('access-token'));
    var token = obj.access_token;
  }
  const url = new URL(
    `${constants.BASE_URL}${constants.JSONAPI}${constants.TAXONOMY}${constants.TAGS}`
  );
  let headers_auth = {};
  if (token) {
    headers_auth = {
      Authorization: `Bearer ${token}`,
    }
  }
  const opts = {
    method: "GET",
    headers: headers_auth
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



// export function transnformJsonGetTags(obj, id) {
//   let tagName;
//   obj.included.forEach(function (item) {
//     if (item.id == id && item.type === 'taxonomy_term--tags') {
//       tagName = item.attributes.name;
//     }
//   });
//   return tagName;
// }
