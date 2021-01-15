import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';

import TodoHeader from '../TodoHeader';
import TodoForm from '../TodoForm';
import TodoListItem from '../TodoListItem';
import TodoListEmpty from '../TodoListEmpty';
import TodoSearch from '../TodoSearch';
import TodoStatusFilter from '../TodoStatusFilter';
import Modal from '../common/Modal';

import styles from './TodoList.module.scss';

// const todoSearch = (setArr, arr, searchValue) => {
//   setArr(arr.map(todo => {
//     const todoValue = todo.value.toLowerCase();
//     const result = todoValue.includes(searchValue);

//     if(result) {
//       return {
//         ...todo,
//         searched: true
//       }
//     }

//     return {
//       ...todo,
//       searched: false
//     }
//   }));
// }

const TodoList = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [edittingTodo, setEdittingTodo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttons, setButtons] = useState([
    { id: 1, label: 'All', name: 'all', active: true },
    { id: 2, label: 'Active', name: 'active', active: false },
    { id: 3, label: 'Done', name: 'done', active: false }
  ]);
  const [searchValue, setSearchValue] = useState('');

  const [isValid, setIsValid] = useState(true);
  const [modalIsValid, setModalIsValid] = useState(true);

  const maxValue = 50;
  const maxTodos = 15;
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isValid || !modalIsValid) {
      setTimeout(() => {
        setIsValid(true);
        setModalIsValid(true);
      }, 10000);
    }
  }, [isValid, modalIsValid]);

  useEffect(() => {
    todoSearch();
  }, [searchValue]);

  const todoFormSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && value.length <= maxValue) {
      setTodos([...todos, createTodo(value)]);
      setIsValid(true);
      setValue('');
    } else {
      setIsValid(false);
    }
  }

  const todoFormFocus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  const createTodo = (value, id = nanoid(), completed = false, searched = true) => {
    return {
      value,
      id,
      completed,
      searched
    }
  }

  const todoListEmpty = (e) => {
    if (value.trim()) {
      todoFormSubmit(e);
    } else {
      todoFormFocus();
    }
  }

  const valueChange = (e) => {
    // const targetValue = e.target.value;
    // setValue(value => targetValue.length <= maxValue ? targetValue : value);
    setValue(e.target.value);
  }

  const todoEdit = (id) => {
    setEdittingTodo(todos.find(todo => todo.id === id));
    setModalIsOpen(true);
  }

  const todoComplete = (id) => {
    setTodos(todos.map(todo => {
      return {
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed
      }
    }));
  }

  const modalInputChange = (e) => {
    const targetValue = e.target.value;

    setEdittingTodo(todo => {
      return {
        ...todo,
        value: targetValue.length <= maxValue ? targetValue : todo.value
      }
    });
  }

  const modalSubmit = (e) => {
    e.preventDefault();
    if (edittingTodo.value.trim()) {
      setTodos(todos.map(todo => todo.id === edittingTodo.id ? edittingTodo : todo));
      setModalIsValid(true);
      setModalIsOpen(false);
    } else {
      setModalIsValid(false);
    }
  }

  const filterClick = (id) => {
    setButtons(buttons.map(btn => {
      return {
        ...btn,
        active: btn.id === id ? true : false
      }
    }));
  }

  const todoSearch = () => {
    setTodos(todos.map(todo => {
      const todoValue = todo.value.toLowerCase();
      const result = todoValue.includes(searchValue);

      if (result) {
        return {
          ...todo,
          searched: true
        }
      }

      return {
        ...todo,
        searched: false
      }
    }));
  }

  return (
    <>
      <div className={styles.todo__list}>
        <TodoHeader todos={todos} />
        <TodoForm
          value={value}
          maxValue={maxValue}
          inputRef={inputRef}
          isValid={isValid}
          todosLength={todos.length < maxTodos}
          valueChange={valueChange}
          todoFormSubmit={todoFormSubmit}
        />

        {todos.length ? <ul className={`${styles.todo__list_todos} list-group`}>
          {todos.map(todo => {
            const item = (
              <TodoListItem
                key={todo.id}
                todo={todo}
                todoRemove={(id) => setTodos(todos.filter(todo => todo.id !== id))}
                todoEdit={todoEdit}
                todoComplete={todoComplete}
              />
            );

            const findButton = buttons.find(btn => btn.active);
            const filtered = findButton.name;

            if (filtered === 'all') {
              return item;
            } else if (filtered === 'active') {
              return !todo.completed && item;
            } else if (filtered === 'done') {
              return todo.completed && item;
            } else {
              return item;
            }
          })}
        </ul> : <TodoListEmpty todoListEmpty={todoListEmpty} />}

        <TodoSearch
          searchValue={searchValue}
          maxValue={maxValue}
          searchChange={(e) => setSearchValue(e.target.value)}
        />
        <TodoStatusFilter
          buttons={buttons}
          filterClick={filterClick}
        />
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        edittingTodo={edittingTodo}
        modalIsValid={modalIsValid}
        modalClose={() => setModalIsOpen(false)}
        modalInputChange={modalInputChange}
        modalSubmit={modalSubmit}
        maxValue={maxValue}
      />
    </>
  );
}

export default TodoList;
