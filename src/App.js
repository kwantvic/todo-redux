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
          id: state[state.length - 1].id + 1,
          text: action.payload.text,
          completed: action.payload.completed,
        },
      ];
    }
    case 'REMOVE_TASK': {
      return state.filter((item) => item.id !== action.payload.id);
    }
  }
  return state;
}

function App() {
  const [state, dispatch] = React.useReducer(reducer, [
    {
      id: 1,
      text: 'Задача №1',
      completed: false,
    },
  ]);

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

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField onClickAdd={onAddTask} />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item
              key={obj.id}
              text={obj.text}
              completed={obj.completed}
              onClickRemove={() => onDelTask(obj.id)}
            />
          ))}
        </List>
        <Divider />
        <div className="check-buttons">
          <Button>Отметить всё</Button>
          <Button>Очистить</Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
