import React from 'react';

import styles from './TodoSearch.module.scss';

const TodoSearch = ({searchValue, maxValue, searchChange}) => {
  return (
    <input
      type="text"
      value={searchValue}
      onChange={searchChange}
      maxLength={maxValue}
      className={`${styles.todo__search} form-control form-control-sm`}
      placeholder="type to search..."
    />
  );
}

export default TodoSearch;
