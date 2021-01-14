import React, { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import TodoHeader from '../TodoHeader';
import TodoForm from '../TodoForm';
import TodoListItem from '../TodoListItem';
import TodoListEmpty from '../TodoListEmpty';
import Modal from '../common/Modal';

import styles from './TodoList.module.scss';

const TodoList = () => {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [edittingTodo, setEdittingTodo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const maxValue = 50;
  const maxTodos = 15;
  const inputRef = useRef(null);

  const todoFormSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      setTodos([...todos, createTodo(value)]);
      setValue('');
    }
  }
  
  const todoFormFocus = () => {
    if(inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  const createTodo = (value, id = nanoid(), completed = false) => {
    return {
      value,
      id,
      completed
    }
  }

  const todoListEmpty = (e) => {
    if(value.trim()) {
      todoFormSubmit(e);
    } else {
      todoFormFocus();
    }
  }

  const valueChange = (e) => {
    const targetValue = e.target.value;
    // setValue(targetValue.length <= maxValue ? targetValue : targetValue.slice(0, maxValue));
    setValue(value => {
      if (targetValue.length <= maxValue) {
        return targetValue;
      }

      return value;
    });
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
      setModalIsOpen(false);
    }
  }

  return (
    <>
      <div className={styles.todo__list}>
        <TodoHeader todos={todos} />
        <TodoFormgit
          value={value}
          maxValue={maxValue}
          inputRef={inputRef}
          todosLength={todos.length < maxTodos}
          valueChange={valueChange}
          todoFormSubmit={todoFormSubmit}
        />

        {todos.length ? <ul className={`${styles.todo__list_todos} list-group`}>
          {todos.map(todo => {
            return (
              <TodoListItem
                key={todo.id}
                todo={todo}
                todoRemove={(id) => setTodos(todos.filter(todo => todo.id !== id))}
                todoEdit={todoEdit}
                todoComplete={todoComplete}
              />
            );
          })}
        </ul> : <TodoListEmpty todoListEmpty={todoListEmpty} />}
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        edittingTodo={edittingTodo}
        modalClose={() => setModalIsOpen(false)}
        modalInputChange={modalInputChange}
        modalSubmit={modalSubmit}
        maxValue={maxValue}
      />
    </>
  );
}

export default TodoList;
