import React from 'react';
import {Divider, List, Tab, Tabs} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Item} from "./Item";
import {complete, delTask, editTask} from "../redux/actions/tasks";
import {setFilter} from "../redux/actions/filter";


export const Filter = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);
    const filterBy = useSelector((state) => state.filter);

    function onDelTask(idTask) {
        dispatch(delTask(idTask));
    }

    function onEditTask(idTask) {
        let newText = window.prompt('Отредактируйте задачу');
        !newText || !newText.trim()
            ? alert('❌Задача не отредактирована!')
            : dispatch(editTask(idTask, newText));
    }

    function toggleComplete(idTask) {
        dispatch(complete(idTask));
    }

    function setActiveFilter(num) {
        dispatch(setFilter(num))
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

    function getListTasks() {
        return tasks.map((obj) => {
                if (filterBy === 0) {
                    return getComponentItem(obj);
                }
                if (filterBy === 1) {
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
            })

    }

    return (
        <>
            <Divider/>
            <Tabs value={filterBy}>
                <Tab onClick={() => setActiveFilter(0)} label="Все"/>
                <Tab onClick={() => setActiveFilter(1)} label="Активные"/>
                <Tab onClick={() => setActiveFilter(2)} label="Завершённые"/>
            </Tabs>
            <Divider/>
            <List>
                {getListTasks()}
            </List>
            <Divider/>

        </>
    );
};
