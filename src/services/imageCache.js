// Кэш для хранения предзагруженных изображений
const imageCache = new Map();

// Функция для предзагрузки изображения
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(src)) {
      resolve(imageCache.get(src));
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
};

// Функция для предзагрузки нескольких изображений
const preloadImages = async (sources) => {
  const promises = sources.map(src => preloadImage(src));
  return Promise.all(promises);
};

// Функция для очистки кэша
const clearImageCache = () => {
  imageCache.clear();
};

// Функция для получения изображения из кэша
const getImageFromCache = (src) => {
  return imageCache.get(src);
};

// Функция для проверки наличия изображения в кэше
const isImageCached = (src) => {
  return imageCache.has(src);
};

export {
  preloadImage,
  preloadImages,
  clearImageCache,
  getImageFromCache,
  isImageCached
}; 