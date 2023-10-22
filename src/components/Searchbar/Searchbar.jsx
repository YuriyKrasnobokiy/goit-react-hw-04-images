import React from 'react';
import { SearchBar, SearchBtn } from './SearchBar.Styled';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = evt => {
    setQuery(evt.target.value.toLowerCase());
  };

  const handleSearchSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      toast.error('Введіть пошуковий запит!', {
        duration: 3000,
        position: 'top-right',
      });
    } else {
      onSubmit(query);
    }
  };

  return (
    <header>
      <SearchBar onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="searchQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />

        <SearchBtn type="submit">
          <span>Search</span>
        </SearchBtn>
      </SearchBar>
      <Toaster />
    </header>
  );
};
