import { TextField, Button, Checkbox } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({
  onChangeCompleted,
  onChangeInput,
  clickAddNewTask,
  completedNewTask,
  textNewTask,
}) => {
  return (
    <div className="field">
      <Checkbox
        className="checkbox"
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        onChange={(e) => onChangeCompleted(e)}
        checked={completedNewTask}
      />
      <TextField
        placeholder="Введите текст задачи..."
        onChange={(e) => onChangeInput(e.target.value)}
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
