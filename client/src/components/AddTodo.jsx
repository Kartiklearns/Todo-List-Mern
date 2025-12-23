import React, { useState } from 'react';

const AddTodo = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form className="input-group" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="add-btn">
                Add
            </button>
        </form>
    );
};

export default AddTodo;
