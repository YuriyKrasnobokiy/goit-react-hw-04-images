import React from 'react';
import { LoadMoreBtnStyled } from './LoadMoreBtn.Styled';

export const LoadMoreBtn = ({ handlerClick }) => {
  return (
    <LoadMoreBtnStyled onClick={handlerClick}>Load More</LoadMoreBtnStyled>
  );
};
