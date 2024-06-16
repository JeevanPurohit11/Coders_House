import React from 'react'
import Styles from './TextInput.module.css'

const TextInput = ({ value, onChange }) => {
  return (
    <div>
      <input
        className={Styles.input}
        type='text'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};


export default TextInput