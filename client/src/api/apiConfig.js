const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '16fbaa0e8bf2debb209f0e3dfdbe8290',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};
export default apiConfig;




