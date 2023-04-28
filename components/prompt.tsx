import React, { useState } from 'react';
import Dialog from './dialog';

export default function Prompt ({ onSubmit, action, single, title }: { onSubmit: (values: string[]) => void, action?: string, single?: boolean, title?: string }): JSX.Element {
    const [values, setValues] = useState(['', '']);

    const submit = (event) => {
      event.preventDefault();

      if (single && values[0].trim() === '' || !single && values.find(value => value.trim() === '') === '') {
          console.log('values', values)
          return;
      }

      onSubmit([...values.map(value => value.trim())]);
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
            <p>
            <button type="submit">{action || 'Submit'}</button>
            </p>
        </form>
        </Dialog>
    )
}