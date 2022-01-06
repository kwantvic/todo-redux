import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';

function reducer(state, action) {
  console.log(state.length, '🩸myTest🧩');
  switch (action.type) {
    case 'ADD_TASK': {
      return [
        ...state,
        {
          id: `${state.length + 1}`,
          text: action.textNewTask,
          completed: action.completedNewTask,
        },
      ];
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

  const [completedNewTask, setCompletedNewTask] = React.useState(false);
  const [textNewTask, setTextNewTask] = React.useState('');

  function onChangeCompleted() {
    setCompletedNewTask(!completedNewTask);
  }

  function onChangeInput(text) {
    setTextNewTask(text);
  }

  function clickAddNewTask() {
    if (textNewTask.trim()) {
      dispatch({
        type: 'ADD_TASK',
        textNewTask: textNewTask,
        completedNewTask: completedNewTask,
      });
      setCompletedNewTask(false);
      setTextNewTask('');
    } else {
      alert('❌Введите текст задачи❗️');
    }
  }

  return (
    <div className="App">
      <Paper className="wrapper">
        <Paper className="header" elevation={0}>
          <h4>Список задач</h4>
        </Paper>
        <AddField
          onChangeCompleted={onChangeCompleted}
          onChangeInput={onChangeInput}
          clickAddNewTask={clickAddNewTask}
          completedNewTask={completedNewTask}
          textNewTask={textNewTask}
        />
        <Divider />
        <Tabs value={0}>
          <Tab label="Все" />
          <Tab label="Активные" />
          <Tab label="Завершённые" />
        </Tabs>
        <Divider />
        <List>
          {state.map((obj) => (
            <Item key={obj.id} text={obj.text} completed={obj.completed} />
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
