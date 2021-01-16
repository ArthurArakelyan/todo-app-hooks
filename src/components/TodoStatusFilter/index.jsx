import React from 'react';

import { useTheme } from '../../contexts/ThemeProvider';

import styles from './TodoStatusFilter.module.scss';

const TodoStatusFilter = ({ filterClick, buttons }) => {
  const theme = useTheme();

  return (
    <div className={`${styles.todo__status_filter} btn-group`}>
      {buttons.map(button => {
        return (
          <button
            key={button.id}
            onClick={() => filterClick(button.id)}
            style={{color: theme.theme === 'dark' ? 'white' : null}}
            className={`btn ${styles.todo__filter_button} ${button.active ? 'btn-info' : 'btn-outline-secondary'}`}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
}

export default TodoStatusFilter;
