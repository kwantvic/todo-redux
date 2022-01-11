import React from 'react';
import { Paper, Divider, Button, List, Tabs, Tab } from '@mui/material';
import { AddField } from './components/AddField';
import { Item } from './components/Item';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [activeItemFilter, setActiveItemFilter] = React.useState(0);

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
      type: isSelectItems() ? 'SELECT_ALL' : 'DESELECT_ALL',
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

  function renderTasks() {
    return state.map((obj) => {
      if (activeItemFilter === 0) {
        return getComponentItem(obj);
      }

      if (activeItemFilter === 1 && !obj.completed) {
        return getComponentItem(obj);
      }

      if (activeItemFilter === 2 && obj.completed) {
        return getComponentItem(obj);
      }

      return null;
    });
  }

  function isSelectItems() {
    return !state.every((obj) => obj.completed);
  }

  function toggleSelectTasksBtn() {
    if (!isSelectItems() && state.length) {
      return 'Снять отметки';
    } else {
      return 'Отметить всё';
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
        <Tabs value={activeItemFilter}>
          <Tab onClick={() => setActiveItemFilter(0)} label="Все" />
          <Tab onClick={() => setActiveItemFilter(1)} label="Активные" />
          <Tab onClick={() => setActiveItemFilter(2)} label="Завершённые" />
        </Tabs>
        <Divider />
        <List>{renderTasks()}</List>
        <Divider />
        <div className="check-buttons">
          <Button onClick={onSelect} disabled={!state.length}>
            {toggleSelectTasksBtn()}
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
