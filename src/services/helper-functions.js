export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  if (data) return data;
  return;
};

export const transformJsonGetUser = (obj, id) => {
  let userName;
  obj.included.forEach(function (item) {
    if (item.id === id && item.type === 'user--user') {
      userName = item.attributes.display_name;
    }
  })
  return userName;
}
