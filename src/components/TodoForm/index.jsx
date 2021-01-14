import React from 'react';

import styles from './TodoForm.module.scss';

const TodoForm = ({ value, maxValue, inputRef, todosLength, valueChange, todoFormSubmit }) => {
  return (
    <form className={styles.todo__form} onSubmit={todoFormSubmit}>
      <input
        type="text"
        value={value}
        onChange={valueChange}
        ref={inputRef}
        placeholder={todosLength ? 'Name...' : 'First do this, then add more'}
        disabled={!todosLength}
        className={`${styles.todo__form_input} form-control`}
      />
      <button
        className={`${styles.todo__form_button} btn btn-success`}
      >
        <i className="fas fa-plus"></i>
      </button>
      <p className={styles.todo__form_max}>
        {value.length} / {maxValue}
      </p>
    </form>
  );
}

export default TodoForm;
