import React from 'react';
import { Modal } from 'bootstrap';
import { useRef } from 'react';
import { useEffect } from 'react';

const FormModal = ({ onClose, children }) => {

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
