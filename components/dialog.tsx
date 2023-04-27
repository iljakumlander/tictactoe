import React from 'react';
import AriaModal from '../vendor/react-aria-modal';

export default function Dialog ({ title, focus, children }: { title: string, focus?: string, children?: React.ReactNode }): JSX.Element {
    return (
        <AriaModal titleText={title} initialFocus={focus}>
            <div className="dialog">
                {children}
            </div>
        </AriaModal> 
    );
}

/*
const modal = <AriaModal
titleText="demo one"
onExit={() => null}
initialFocus="#demo-one-deactivate"
underlayStyle={{ paddingTop: '2em' }}
>
<div id="demo-one-modal" className="modal">
  <div className="modal-body">
    <p>
      Here is a modal
      {' '}
      <a href="#">with</a>
      {' '}
      <a href="#">some</a>
      {' '}
      <a href="#">focusable</a>
      {' '}
      parts.
    </p>
  </div>
  <footer className="modal-footer">
    <button id="demo-one-deactivate" onClick={() => setVisible(false)}>
      deactivate modal
    </button>
  </footer>
</div>
</AriaModal>;
*/