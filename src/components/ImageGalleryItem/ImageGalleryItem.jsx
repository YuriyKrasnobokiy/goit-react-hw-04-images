import { GalleryImg } from 'components/ImageGallery/ImageGallery.Styled';
import { ModalImage } from 'components/Modal/Modal';
// import React, { Component } from 'react';
import { useState } from 'react';

// export class ImageGalleryItem extends Component {
//   state = {
//     isModalOpen: false,
//   };

export const ImageGalleryItem = ({ image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryImg
        src={image.webformatURL}
        alt={image.tags}
        onClick={openModal}
      />
      <ModalImage
        isOpenModal={isModalOpen}
        largeImg={image.largeImageURL}
        isCloseModal={closeModal}
        tags={image.tags}
      />
    </>
  );
};
