import React from 'react';

import styles from './TodoHeader.module.scss';

const TodoHeader = ({ todos }) => {
  const completedTodos = todos.filter(todo => todo.completed).length;
  const notCompletedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className={styles.todo__header}>
      <h1>Todo List</h1>
      <h2>{completedTodos} Todo completed, {notCompletedTodos} more</h2>
    </div>
  );
}

export default TodoHeader;
