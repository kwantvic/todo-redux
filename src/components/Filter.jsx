import React from 'react';
import {Divider, List, Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Item} from "./Item";


export const Filter = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [activeItem, setActiveItem] = React.useState(0);

    function onDelTask(idTask) {
        dispatch({
            type: 'REMOVE_TASK',
            payload: {
                id: idTask,
            },
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

    function toggleComplete(idTask) {
        dispatch({
            type: 'TOGGLE_COMPLETED',
            payload: {
                id: idTask,
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
        <>
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

        </>
    );
};
