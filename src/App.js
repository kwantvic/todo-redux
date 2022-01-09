import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      return [
        ...state,
        {
          id: state.length ? state[state.length - 1].id + 1 : 1,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item.id !== action.payload.id);
    }
    case 'EDIT_TASK': {
      return state.map((obj) =>
        obj.id === action.payload.id
          ? {
              ...obj,
              text: action.payload.text,
            }
          : obj,
      );
    }
    case 'TOGGLE_COMPLETED': {
      return state.map((obj) =>
        obj.id === action.payload.id
          ? {
              ...obj,
              completed: !obj.completed,
            }
          : obj,
      );
    }
    case 'REMOVE_ALL': {
      return [];
    }
    case 'SELECT_ALL': {
      return state.map((obj) => ({
        ...obj,
        completed: true,
      }));
    }
    case 'DESELECT_ALL': {
      return state.map((obj) => ({
        ...obj,
        completed: false,
      }));
    }
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, []);

  const [isToggleBtn, setToggleBtn] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState(0);

  React.useEffect(() => {
    if (state.length) {
      setToggleBtn(!state.every((obj) => obj.completed));
    }
  }, [state]);

  function onAddTask(completedNewTask, textNewTask) {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        text: textNewTask,
        completed: completedNewTask,
      },
    });
  }

  function onDelTask(idTask) {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        id: idTask,
      },
    });
  }

  function toggleComplete(idTask) {
    dispatch({
      type: 'TOGGLE_COMPLETED',
      payload: {
        id: idTask,
      },
    });
  }

  function onDelAll() {
    if (window.confirm('❗️Вы действительно хотите удалить все задачи?')) {
      dispatch({
        type: 'REMOVE_ALL',
      });
    }
  }

  function onSelect() {
    dispatch({
      type: isToggleBtn ? 'SELECT_ALL' : 'DESELECT_ALL',
    });
  }

  function onEditTask(idTask) {
    let newText = window.prompt('Отредактируйте задачу');
    !newText || !newText.trim()
      ? alert('❌Задача не отредактирована!')
      : dispatch({
          type: 'EDIT_TASK',
          payload: {
            id: idTask,
            text: newText,
          },
        });
  }

  function getComponentItem(obj) {
    return (
      <Item
        key={obj.id}
        text={obj.text}
        completed={obj.completed}
        onClickRemove={() => onDelTask(obj.id)}
        onClickEdit={() => onEditTask(obj.id)}
        onClickCheckbox={() => toggleComplete(obj.id)}
      />
    );
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onClickAdd={onAddTask} />
        <Divider />
        <Tabs value={activeItem}>
          <Tab onClick={() => setActiveItem(0)} label="Все" />
          <Tab onClick={() => setActiveItem(1)} label="Активные" />
          <Tab onClick={() => setActiveItem(2)} label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => {
            if (activeItem === 0) {
              return getComponentItem(obj);
            }
            if (activeItem === 1) {
              if (obj.completed) {
                return null;
              } else {
                return getComponentItem(obj);
              }
            } else {
              if (obj.completed) {
                return getComponentItem(obj);
              } else {
                return null;
              }
            }
          })}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={onSelect} disabled={!state.length}>
            {isToggleBtn ? 'Отметить всё' : 'Снять отметки'}
          </Button>
          <Button onClick={onDelAll} disabled={!state.length}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
