import React from 'react';
import Styles from './TextInput.module.css';

const TextInput = ({ value = '', fullWidth = 'false', onChange }) => {
  return (
    <div>
      <input
        className={Styles.input}
        style={{ width: fullWidth === 'true' ? '100%' : 'inherit' }}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
