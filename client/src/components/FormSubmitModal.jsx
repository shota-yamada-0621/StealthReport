import { Modal } from "react-bootstrap";
import { Button } from 'react-bootstrap';

function FormSubmitModal(props) {
  const { showModal, handleCloseModal } = props;
  
  if (showModal = true)return (
      <div class="modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal()}>Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
  );
  else return(<></>);
  }

export default FormSubmitModal;