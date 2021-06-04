const KEY = '21935547-b3d05227bb87eef1eed42c097';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

const perPage = 12;

export default class PicturesApiService {
  constructor(searchQuery) {
    this.page = 1;
    this.searchQuery = searchQuery;
  }
  fetchImages() {
    return fetch(
      `${BASE_URL}q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${KEY}`,
    ).then(response => {
      if (response.ok) {
        this.page += 1;
        return response.json();
      }
      throw new Error('Error fatching data');
    });
  }
  resetPage() {
    this.page = 1;
  }
}
