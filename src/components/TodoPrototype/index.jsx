import React from 'react';

import styles from './TodoPrototype.module.scss';

const TodoPrototype = ({value}) => {
  return (
    value && <li style={{ opacity: 0.5 }} className={`${styles.todo__prototype} list-group-item`}>
      <p className={styles.todo__prototype_name}>{value}</p>

      <div className={styles.todo__prototype_buttons}>
        <button
          className="btn btn-outline-danger btn-sm disabled"
        >
          <i className="far fa-trash-alt" />
        </button>
        <button
          className="btn btn-outline-primary btn-sm disabled"
        >
          <i className="fas fa-pencil-alt" />
        </button>
      </div>
    </li>
  );
}

export default TodoPrototype;
