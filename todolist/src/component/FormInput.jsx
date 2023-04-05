import  React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormHelperText } from '@mui/material';
import { FormControl } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import "../styles/FormInput.css";
import PropTypes from 'prop-types';

const TodoCreator = ({ theme, todo, setTodo, clearInput, isInputEmpty, preventSubmit }) => {
    return (
        <div className="formInput">
            <ThemeProvider theme={theme}>
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
                            <FormHelperText id="component-error-text">Task can't be empty</FormHelperText>
                        </>
                    }
                </FormControl>
                
                <Button
                    type="submit"
                    alt="add-note"
                    className= "button"
                    onKeyPress={preventSubmit}
                >
                    Add task
                </Button>
                </div>
            </ThemeProvider>
        </div>
    )

}

TodoCreator.propTypes = {
    theme: PropTypes.string, 
    todo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setTodo: PropTypes.func.isRequired, 
    clearInput: PropTypes.func.isRequired, 
    isInputEmpty: PropTypes.bool.isRequired, 
    preventSubmit: PropTypes.func.isRequired
};

export  default TodoCreator;