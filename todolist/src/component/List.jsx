import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CircleIcon from '@mui/icons-material/Circle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/List.css";
import Tooltip from '@mui/material/Tooltip';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';

const TodoList = ({ todos, editTodo, searchInput, removeSubTodo, subOpen, setSubOpen, deleteTodo, saveTodo, subTaskIndex, setviewTaskIndex, noteRef, preventSubmit, addSubTask, setSubTask, subAddDisable }) => {
    let UniqKey = 123;
    let subTaskKey = 10;

    const [open, setOpen] = React.useState(false);
    const [taskIndex, setTaskIndex] = React.useState(null);
    const [currentViewTaskIndex, setcurrentViewTaskIndex] = React.useState(null);
    const displayTodo = React.useMemo(() => {
        return (todos.filter(item => {
            if (item.text.toLowerCase().includes(searchInput.toLowerCase().trim())) {
                return item;
            }
        })
        );
    }, [searchInput, todos]);

    const handleClick = (ind) => {
        if (currentViewTaskIndex === ind) {
            setviewTaskIndex(ind);
            setSubOpen(!subOpen);
            setcurrentViewTaskIndex(ind);
        } else {
            setviewTaskIndex(ind);
            setSubOpen(true);
            setcurrentViewTaskIndex(ind);
        }
    };

    const handleClickOpen = (ind) => {
        setOpen(true);
        setTaskIndex(ind);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const subTaskAdd = () => {
        addSubTask(taskIndex);
        handleClose();
    };
    console.log(searchInput)
    return (
        
        <List>
            {
                displayTodo.map((todo, inx) => {
                    const labelId = `list-todo-${todo}`;

                    return (
                        <>
                            <ListItem
                                key={`todo-${UniqKey++}`}
                                role={undefined}
                                dense
                                button
                                className='listDetail'
                            >
                                <ListItemIcon>
                                    <CircleIcon />
                                </ListItemIcon>
                                {
                                    (!todo.isEditing) ?
                                        <>
                                            <ListItemText
                                                id={labelId}
                                                primary={`${todo.text}`}
                                            />
                                            {(searchInput.trim() === "") &&
                                                <ListItemIcon>
                                                    <Tooltip title="Edit Task">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="edit"
                                                            onClick={() => editTodo(inx)}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemIcon>
                                            }
                                        </>
                                        :
                                        <>
                                            <input
                                                className="formEditInput"
                                                defaultValue={todo.text}
                                                ref={(element) => noteRef.current[inx] = element}
                                                onKeyPress={preventSubmit}
                                                id="task"
                                            />
                                            {(searchInput.trim() === "") &&
                                                <>
                                                    <ListItemIcon>
                                                        <Tooltip title="Save Task">
                                                            <IconButton onClick={() => saveTodo(inx)} edge="end" aria-label="save">
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ListItemIcon>
                                                    <ListItemIcon>
                                                        <Tooltip title="clear Task">
                                                            <IconButton onClick={() => editTodo(inx)} edge="end" aria-label="save">
                                                                <ClearIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </ListItemIcon>
                                                </>
                                            }
                                        </>
                                }
                                {
                                (searchInput.trim() === "") && <>
                                    <Tooltip title="Add Sub Task">
                                        <IconButton edge="end" aria-label="add" onClick={() => handleClickOpen(inx)}>
                                            <PlaylistAddIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {(todo.subTaskText.length > 0) && <Button onClick={() => handleClick(inx)} className='viewSubTask'> View sub task </Button>}
                                    <Button onClick={() => deleteTodo(inx)} edge="end" aria-label="delete" className='done'>
                                        Done
                                    </Button>
                                </>
                                }
                            </ListItem>
                            {
                                ((subTaskIndex === inx) && subOpen) &&
                                <List component="div" disablePadding>
                                    {
                                        todo.subTaskText.map((subTodo) => {
                                            return (
                                                <ListItemButton sx={{ pl: 4 }} key={`subTodo-${subTaskKey++}`}>
                                                    <IconButton>
                                                        <ArrowRightIcon />
                                                    </IconButton>
                                                    <ListItemText primary={`${subTodo}`} />
                                                    <Tooltip title="Delete Sub Task">
                                                        <IconButton edge="end" aria-label="add">
                                                            <DeleteIcon onClick={() => removeSubTodo(todo.text, subTodo)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </ListItemButton>
                                            );
                                        })
                                    }

                                </List>
                            }
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Add Sub Task</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Please enter the subtask"
                                        type="text"
                                        fullWidth
                                        onChange={(e) => setSubTask(e.target.value)}
                                        variant="standard"
                                        required
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>close</Button>
                                    <Button disabled={subAddDisable} onClick={() => subTaskAdd()}>Add</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    );
                })}
        </List>
    );
};

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    searchInput: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    removeSubTodo: PropTypes.func.isRequired,
    subOpen: PropTypes.bool.isRequired,
    setSubOpen: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired,
    subTaskIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setviewTaskIndex: PropTypes.func.isRequired,
    preventSubmit: PropTypes.func.isRequired,
    addSubTask: PropTypes.func.isRequired,
    setSubTask: PropTypes.func.isRequired,
    subAddDisable: PropTypes.bool.isRequired
};

export default TodoList;
