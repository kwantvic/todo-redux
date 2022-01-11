import React from 'react';
import { IconButton, Checkbox, ListItem, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({
  text,
  completed,
  onClickRemove,
  onClickCheckbox,
  onClickRemoveTask,
  onClickEdit,
}) => {
  function onClickRemoveTask() {
    if (window.confirm('❗️Вы действителоьно хотите удалить задачу?')) {
      onClickRemove();
    }
  }
  return (
    <ListItem>
      <div className="d-flex item">
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          checked={completed}
          onChange={onClickCheckbox}
        />
        <Typography className="item-text">{text}</Typography>
        <div className="item-buttons d-flex">
          <IconButton onClick={onClickEdit}>
            <EditIcon style={{ fontSize: 20 }} />
          </IconButton>
          <IconButton onClick={onClickRemoveTask}>
            <DeleteOutlineIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </div>
    </ListItem>
  );
};
