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
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  // const [totalHits, setTotalHits] = useState(1);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function getImages() {
      setIsLoading(true);
      setPage(1);
      setImages([]);

      try {
        // setImages(prevState => {});

        const totalImg = await searchImg(1, searchQuery);

        setImages(prevState => [...prevState, ...totalImg.hits]);
        // setTotalHits(totalImg.totalHits);
        if (totalImg.totalHits > 12) {
          setLoadMore(true);
        }
        console.log(totalImg.totalHits > 12);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    if (page === 1) {
      return;
    }
    async function foo() {
      try {
        const totalImg = await searchImg(page, searchQuery);
        console.log(totalImg);
        if (page * 12 < totalImg.totalHits) {
          setLoadMore(true);
        } else {
          // setPage(1);
          setLoadMore(false);
        }

        setImages(prevState => [...prevState, ...totalImg.hits]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    foo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = searchQuery => {
    setSearchQuery(searchQuery);
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
