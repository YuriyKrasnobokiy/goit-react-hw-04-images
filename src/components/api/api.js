import axios from 'axios';

export const searchImg = async (startPage, value) => {
  const BASE_URL = 'https://pixabay.com/api/?';
  const serchQueryParams = new URLSearchParams({
    key: '39207627-8a410277f132e49ffdfa9ce97',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: startPage,
    q: value,
  });
  const resp = await axios.get(`${BASE_URL}${serchQueryParams}`);
  return resp.data;
};
