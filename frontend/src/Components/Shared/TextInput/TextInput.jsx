import React from 'react';
import Styles from './TextInput.module.css';

const TextInput = ({ value = {}, onChange }) => {
  const { fullwidth = 'false', text = '' } = value;

  return (
    <div>
      <input
        className={Styles.input}
        style={{ width: fullwidth === 'true' ? '100%' : 'inherit' }}
        type="text"
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
