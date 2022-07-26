import React, { useState, useEffect, useMemo } from 'react';

import {
  KeyboardBackButon,
  KeyboardButton,
  KeyboardText,
  KeyboardContainer
} from './styles';
export default function Keyboard({ setValue }) {
  const [localValue, setLocalValue] = useState('');
  const valueToRender = useMemo(() => {
    let f = '0';
    if (localValue.length > 2) {
      f = localValue.substring(0, localValue.length - 2);
    }
    const l = localValue.substring(localValue.length - 2, localValue.length);
    return parseFloat(`${f}.${l}`);
  }, [localValue]);

  useEffect(() => {
    setValue(valueToRender);
  }, [valueToRender]);

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '<'];
  return (
    <KeyboardContainer>
      {numbers.map((number, index) => (
        <KeyboardButton
          disabled={number === ''}
          key={index}
          onLongPress={() => {
            setLocalValue('0');
          }}
          onPress={() => {
            if (number === '<') {
              return setLocalValue(
                localValue.substring(0, localValue.length - 1)
              );
            }
            setLocalValue(`${localValue}${number}`);
          }}
        >
          <KeyboardText>
            {number === '<' ? <KeyboardBackButon /> : number}
          </KeyboardText>
        </KeyboardButton>
      ))}
    </KeyboardContainer>
  );
}
