import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function apiRequest(searchInput, page = 1) {
  const optionsApi = {
    params: {
      key: '46272240-cb3616e4f216aad50124ac1b5',
      q: searchInput,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page,
    },
  };

  const responseApi = await axios(optionsApi);

  return responseApi.data;
}
