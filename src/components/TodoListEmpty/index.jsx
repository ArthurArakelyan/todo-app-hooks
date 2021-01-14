import React, { useEffect, useState } from 'react';

import styles from './TodoListEmpty.module.scss';

const TodoListEmpty = ({todoListEmpty}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <h3 className={styles.todo__list_empty} style={{ opacity: show ? 1 : 0 }}>
      Your todo list is empty, <span onClick={todoListEmpty}>Create new todo</span>
    </h3>
  );
}

export default TodoListEmpty;
