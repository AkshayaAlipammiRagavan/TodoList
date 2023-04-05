import  React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import { FormControl } from '@mui/material';
import "../styles/FormInput.css";
import PropTypes from 'prop-types';

const TodoCreator = ({todo, setTodo, clearInput, isInputEmpty, preventSubmit }) => {
    return (
        <div className="formInput">
                <div>
                <FormControl className='taskInput'>
                    <TextField
                        id="addTaskTodo"
                        label="What's need to be done?" // better accessibility with Material UI
                        value={todo}
                        variant="outlined"
                        onChange={(e) => setTodo(e.target.value)}
                        onFocus={clearInput}
                        aria-describedby="component-error-text"
                        onKeyPress={preventSubmit}
                    />

                    { !isInputEmpty ?
                        <></>
                        :
                        <>
                            <FormHelperText id="component-error-text">Task can't be empty or duplicated</FormHelperText>
                        </>
                    }
                </FormControl>
                <span>
                <Button
                    id= "taskButton"
                    type="submit"
                    alt="add-note"
                    className= "button"
                    onKeyPress={preventSubmit}
                >
                    Add task
                </Button>
                </span>
                </div>
        </div>
    )

}

TodoCreator.propTypes = {
    todo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setTodo: PropTypes.func.isRequired, 
    clearInput: PropTypes.func.isRequired, 
    isInputEmpty: PropTypes.bool.isRequired, 
    preventSubmit: PropTypes.func.isRequired
};

export  default TodoCreator;