import React, { useState, useEffect } from 'react';

import styles from './TodosNotFound.module.scss';

const TodosNotFound = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <p style={{ opacity: show ? 1 : 0 }} className={styles.todos__not_found}>
      Todo is not found
    </p>
  );
}

export default TodosNotFound;
