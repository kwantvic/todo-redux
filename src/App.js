import React from 'react';
import {Paper, Button} from '@mui/material';
import {AddField} from './components/AddField';
import {useSelector, useDispatch} from 'react-redux';
import {Filter} from "./components/Filter";
import {addTask, dellAll, select} from "./redux/actions/tasks";

function App() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    const [isToggleBtn, setToggleBtn] = React.useState(true);

    React.useEffect(() => {
        if (tasks.length) {
            setToggleBtn(!tasks.every((obj) => obj.completed));
        }
    }, [tasks]);

    function onAddTask(text, completed) {
        dispatch(addTask(text, completed));
    }

    function onDelAll() {
        if (window.confirm('❗️Вы действительно хотите удалить все задачи?')) {
            dispatch(dellAll());
        }
    }

    function onSelect(isToggleBtn) {
        dispatch(select(isToggleBtn));
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
                    <Button onClick={() => onSelect(isToggleBtn)} disabled={!tasks.length}>
                        {isToggleBtn ? 'Отметить всё' : 'Снять отметки'}
                    </Button>
                    <Button onClick={onDelAll} disabled={!tasks.length}>
                        Очистить
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
