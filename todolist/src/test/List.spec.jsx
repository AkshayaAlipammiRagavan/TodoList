import TodoList from "../component/List";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Todo list display', () => {
    test("Testing if the todo list is rendering", async() =>{
       const comp = render(<TodoList
           todos= {[]}
           editTodo= {jest.fn()}
           searchInput= ""
           removeSubTodo= {jest.fn()}
           subOpen={false}
           setSubOpen={jest.fn()}
           deleteTodo={jest.fn()}
           saveTodo={jest.fn()}
           subTaskIndex= {null}
           setviewTaskIndex= {jest.fn()} 
           noteRef={""}
           preventSubmit= {jest.fn()} 
           addSubTask= {jest.fn()} 
           setSubTask= {jest.fn()} 
           subAddDisable = {false}
        />);
        expect(comp).toBeTruthy();
    })
})