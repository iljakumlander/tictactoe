import React, { useState } from 'react';
import { config } from '../config';
import Dialog from './dialog';

export default function Prompt ({ onSubmit, onCancel, action, single, title }: { onSubmit: (values: string[]) => void, onCancel?: (event: React.MouseEvent) => void, action?: string, single?: boolean, title?: string }): JSX.Element {
    const [values, setValues] = useState(['', '']);
    const { path } = config;

    const submit = (event) => {
      event.preventDefault();

      if (single && values[0].trim() === '' || !single && values.find(value => value.trim() === '') === '') {
          return;
      }

      onSubmit([...values.map(value => value.trim())]);
    }

    const cancel = (event) => {
      onCancel(event);
    }

    return (
      <Dialog title={title || 'Prompt'} focus='input'>
        <form onSubmit={submit}>
            <fieldset>
              <legend>
                <label>Player 1</label>
              </legend>
              <input placeholder="Name" type="text" value={values[0]} onChange={event => setValues([event.target.value, values[1]])} />
            </fieldset>
            {!single && <fieldset>
              <legend>
                <label>Player 2</label>
              </legend>
              <input placeholder="Name" type="text" value={values[1]} onChange={event => setValues([values[0], event.target.value])} />
            </fieldset>}
            <fieldset className="bar">
              <button type="submit">{action || 'Submit'}</button>
              <a href="../" className="button" onClick={cancel}>Cancel</a>
            </fieldset>
        </form>
        </Dialog>
    );
}