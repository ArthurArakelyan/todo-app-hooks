import React from 'react'
import ReactModal from 'react-modal';

import './styles.scss';

ReactModal.setAppElement('#root');

const Modal = ({ modalIsOpen, edittingTodo, modalClose, modalInputChange, modalSubmit, maxValue }) => {
  return (
    <ReactModal
      closeTimeoutMS={400}
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={modalClose}
      style={
        {
          content: { color: 'black', width: '500px', height: 'fit-content', margin: '0 auto', padding: '0' }
        }
      }
    >
      <div className="modal__header">
        <h2 className="modal__title">
          Editting
        </h2>
      </div>

      <div className="modal__body">
        <form className="modal__form" onSubmit={modalSubmit}>
          <input
            type="text"
            className="modal__form_input form-control"
            value={edittingTodo.value}
            autoFocus
            onChange={modalInputChange}
          />
        </form>
        <p className="modal__form_max">
          {edittingTodo.value ? edittingTodo.value.length : 0} / {maxValue}
        </p>
      </div>

      <div className="modal__footer">
        <button onClick={modalSubmit} className="btn btn-outline-success btn-sm">OK</button>
        <button onClick={modalClose} className="btn btn-outline-danger btn-sm ml-2">Close</button>
      </div>
    </ReactModal>
  );
}

export default Modal;
