import React from 'react';

import styles from './TodoStatusFilter.module.scss';

const TodoStatusFilter = ({ filterClick, buttons }) => {
  return (
    <div className={`${styles.todo__status_filter} btn-group`}>
      {buttons.map(button => {
        return (
          <button
            key={button.id}
            onClick={() => filterClick(button.id)}
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
