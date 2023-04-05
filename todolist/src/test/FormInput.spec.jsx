import TodoCreator from "../component/FormInput";
import {render} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Todo list task addition', () => {
    test("Testing if the Todo task addition is rendering", async() =>{
        const mockpreventSubmit = jest.fn();
       const comp = render(<TodoCreator
                    todo= ""
                    setTodo= {jest.fn()}
                    clearInput={jest.fn()}
                    isInputEmpty= {true}
                    preventSubmit={mockpreventSubmit}
        />);
        expect(comp).toBeTruthy();
    })
})