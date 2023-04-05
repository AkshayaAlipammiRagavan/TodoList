import React, { useState, useEffect, useRef } from 'react';
import TodoCreator from './FormInput';
import TodoList from './List';
import { createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import '../styles/Form.css';

const theme = createTheme({
    palette: {
        primary: { main: '#000000' }
    }
});

const Form = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([
        {
            text: "Learn about React",
            isEditing: false,
            subTaskText: ["Props", "Context"]
        },
        {
            text: "State management in React",
            isEditing: false,
            subTaskText: ["redux"]
        },
        {
            text: "Build really cool todo app",
            isEditing: false,
            subTaskText: []
        }
    ]);
    const noteRef = useRef({});
    const [isInputEmpty, setInputEmpty] = useState(false);
    const [subTask, setSubTask] = React.useState("");
    const [subTaskIndex, setviewTaskIndex] = React.useState(null);
    const [subOpen, setSubOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState("");

    const handleSubmit = e => {
        e.preventDefault();
        addTodo(newTodo);
        clearInput();
    };

    const preventSubmit = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const addSubTask = (taskIndex) => {
        todos.at(taskIndex).subTaskText.push(subTask);
    }
    const addTodo = text => {
        if (text !== '' && text !== ' ') {
            const newTodos = [...todos, { text, subTaskText: [] }]
            setNewTodo('');
            setTodos(newTodos);
        } else {
            setInputEmpty(true);
        }
    };

    const removeTodo = inx => {
        const newArr = [...todos];
        newArr.splice(inx, 1);
        setTodos(newArr);
        setviewTaskIndex(null);
        setSubOpen(false);
    };

    const removeSubTodo = (inx, subInx) => {
        const newArr = [...todos];
        newArr.at(inx).subTaskText.splice(subInx, 1);
        setTodos(newArr);
    };

    const editTodo = inx => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        setTodos(newTodos);
    };

    const saveTodo = (inx) => {
        const newTodos = [...todos];
        newTodos[inx].isEditing = !newTodos[inx].isEditing;
        newTodos[inx].text = (noteRef.current[inx].value !== '' && noteRef.current[inx].value !== ' ' ) ? noteRef.current[inx].value : newTodos[inx].text;
        setTodos(newTodos);
    };

    const clearInput = () => {
        setNewTodo('');
    };

    const setTodo = todo => {
        setInputEmpty(false);
        setNewTodo(todo);
    };

    useEffect(() => {
    }, [todos]);

    return (
        <StyledEngineProvider injectFirst>
            <header>
                <div className='todoTitle'>
                BOURNE Digital - TODO List
                </div>
                <div>
                    <TextField
                        id="taskSearch"
                        label="Search Task" // better accessibility with Material UI
                        value={searchInput}
                        variant="outlined"
                        onChange={(e) => setSearchInput(e.target.value)}
                        aria-describedby="component-error-text"
                        className="searchInput"
                    />
                </div>
                </header>
            <form onSubmit={handleSubmit} className="formTask">
                <TodoCreator
                    theme={theme}
                    todo={newTodo}
                    setTodo={setTodo}
                    clearInput={clearInput}
                    isInputEmpty={isInputEmpty}
                    preventSubmit={preventSubmit}
                />
                <TodoList
                    theme={theme}
                    todos={todos}
                    editTodo={editTodo}
                    deleteTodo={removeTodo}
                    saveTodo={saveTodo}
                    noteRef={noteRef}
                    addSubTask={addSubTask}
                    setSubTask={setSubTask}
                    subAddDisable={subTask === ""}
                    preventSubmit={preventSubmit}
                    subTaskIndex={subTaskIndex}
                    setviewTaskIndex={setviewTaskIndex}
                    subOpen={subOpen}
                    setSubOpen={setSubOpen}
                    searchInput={searchInput}
                    removeSubTodo={removeSubTodo}
                />
            </form>
        </StyledEngineProvider>
    );
};

export default Form;
