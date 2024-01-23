import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './Button.jsx';

export function Form(props) {
    const { disabled, handleUpdateItem } = props;

    const onSubmit = (values, form) => {

            const todoItem = {
                id: uuidv4(),
                checked: false,
                text: values.inputTodo,
            };
            const todos = localStorage.getItem('todos');
            const newItems = todos === null ? [todoItem] : [...JSON.parse(todos), todoItem];
            localStorage.setItem('todos', JSON.stringify(newItems));
            handleUpdateItem(newItems);
            form.reset();

    };

    const validate = (values) => {
        const errors = {};
        if (!values.inputTodo) {
            errors.inputTodo = '';
        } else if (values.inputTodo.trim().length < 5) {
            errors.inputTodo = 'Field must contain at least 5 characters';
        }
        return errors;
    };

    return (
        <FinalForm onSubmit={onSubmit} validate={validate}>
            {({ handleSubmit, invalid }) => (
                <form onSubmit={handleSubmit} >
                    <Field name="inputTodo">
                        {({ input, meta }) => (
                            <div className='w-100'>
                                <input
                                    {...input}
                                    className="form-control"
                                    type="text"
                                />
                                {meta.touched && meta.error && (
                                    <div style={{ color: 'red', marginTop: '5px'}}>
                                        {meta.error}
                                    </div>
                                )}
                            </div>
                        )}
                    </Field>
                    <Button
                        className="btn-outline-success my-3"
                        type="submit"
                        disabled={disabled || invalid}
                    >
                        <span>Send</span>
                    </Button>
                </form>
            )}
        </FinalForm>
    );
}
