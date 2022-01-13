import React from 'react';
import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {AddField} from './components/AddField';
import {Item} from './components/Item';
import {useSelector, useDispatch} from 'react-redux';
import {Filter} from "./components/Filter";

function App() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);

    const [isToggleBtn, setToggleBtn] = React.useState(true);

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


    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField onClickAdd={onAddTask}/>
                <Filter/>
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
