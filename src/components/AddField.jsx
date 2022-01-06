import React from 'react';
import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({ onAdd }) => {
  const [completedNewTask, setCompletedNewTask] = React.useState(false);
  const [textNewTask, setTextNewTask] = React.useState('');

  function clickAddNewTask() {
    if (textNewTask.trim()) {
      onAdd(completedNewTask, textNewTask);
      setCompletedNewTask(false);
      setTextNewTask('');
    } else {
      alert('❌Введите текст задачи❗️');
    }
  }

  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onChange={(e) => setCompletedNewTask(e.target.checked)}
        checked={completedNewTask}
      />
      <TextField
        placeholder="Введите текст задачи..."
        onChange={(e) => setTextNewTask(e.target.value)}
        variant="standard"
        fullWidth
        value={textNewTask}
      />
      <Button onClick={clickAddNewTask}>
        <AddIcon />
      </Button>
    </div>
  );
};
