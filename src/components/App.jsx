import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageGallery } from './ImageGallery/ImageGallery';
import toast, { Toaster } from 'react-hot-toast';
import { searchImg } from './api/api';
import { MyLoader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(Number(1));
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    } else {
      async function getImages() {
        setIsLoading(true);
        try {
          const totalImg = await searchImg(page, searchQuery);

          setImages(prevState => {
            console.log(prevState);
            return [...prevState, ...totalImg.hits];
          });
          if (page * 12 < totalImg.totalHits) {
            setLoadMore(true);
          }
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
      getImages();
    }
  }, [page, searchQuery]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handlerClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {isError &&
        toast.error('Whoops, something went wrong', {
          duration: 3000,
          position: 'top-right',
        })}

      {isLoading && <MyLoader />}

      {images.length > 0 && <ImageGallery images={images} />}

      {loadMore && <LoadMoreBtn handlerClick={handlerClick} />}
      <Toaster />
    </>
  );
};
