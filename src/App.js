import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      function generateNewId(state) {
        return state.length ? state[state.length - 1].id + 1 : 1;
      }
      return [
        ...state,
        {
          id: generateNewId(state),
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item.id !== action.payload.id);
    }
    case 'TOGGLE_COMPLETED': {
      return state.map((obj) => {
        if (obj.id === action.payload.id) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      });
    }
    case 'REMOVE_ALL': {
      return [];
    }
    case 'SELECT_ALL': {
      return state.map((obj) => {
        return {
          ...obj,
          completed: true,
        };
      });
    }
    case 'SELECT_NOTHING': {
      return state.map((obj) => {
        return {
          ...obj,
          completed: false,
        };
      });
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
      setToggleBtn(state.map((obj) => obj.completed).includes(false));
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
    if (isToggleBtn) {
      dispatch({
        type: 'SELECT_ALL',
      });
    } else {
      dispatch({
        type: 'SELECT_NOTHING',
      });
    }
  }

  function getComponentItem(obj) {
    return (
      <Item
        key={obj.id}
        text={obj.text}
        completed={obj.completed}
        onClickRemove={() => onDelTask(obj.id)}
        onClickCheckbox={() => toggleComplete(obj.id)}
      />
    );
  }

  function isVisibleBtn() {
    if (state.length) {
      return false;
    } else {
      return true;
    }
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
          <Button onClick={onSelect} disabled={isVisibleBtn()}>
            {isToggleBtn ? 'Отметить всё' : 'Снять отметки'}
          </Button>
          <Button onClick={onDelAll} disabled={isVisibleBtn()}>
            Очистить
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
