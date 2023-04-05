import Form from "../component/Form";
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Todo form', () => {
    test("Testing if the Todo List is rendering", async() =>{
        render(<Form/>);
        expect(screen.getByTestId('headerField')).toHaveTextContent('BOURNE Digital - TODO List');
        const k = screen.getByTestId('searchField').querySelector('input')
        fireEvent.change(k , {target: { value: 'le'}});
        expect(k.value).toBe('le');
    })
})