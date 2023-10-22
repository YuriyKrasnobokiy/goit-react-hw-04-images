import styled from 'styled-components';

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  justify-content: center;
  background-color: #daf6ff;
  list-style: none;
  padding: 10px;
  margin: 0;
`;

export const GalleryImg = styled.img`
  display: block;
  width: 350px;
  height: 300px;
`;
