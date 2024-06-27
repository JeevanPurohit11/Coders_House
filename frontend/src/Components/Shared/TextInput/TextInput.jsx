import React from 'react';
import Styles from './TextInput.module.css';

const TextInput = ({ value = '', fullwidth = 'false', onChange }) => {
  return (
    <div>
      <input
        className={Styles.input}
        style={{ width: fullwidth === 'true' ? '100%' : 'inherit' }}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
