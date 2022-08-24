import React, { useState, useEffect } from "react";
function Modal({ handleSent, setRecieverMail }) {
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <button className="btn-modal" onClick={toggleModal}>
        MAIL MY CARDS
      </button>
      {modal && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
              <h2>Mail Form</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Soluta, reiciendis hic quidem iusto earum doloremque ducimus,
                sit, quaerat magnam aperiam esse labore magni impedit animi
                cumque adipisci dolorem deserunt voluptatum asperiores
                dignissimos. Necessitatibus, voluptatibus illo. Et voluptates
                excepturi libero harum modi, architecto ipsam nesciunt
                perspiciatis, asperiores consequatur illum laudantium dolor?
              </p>
              <form
                onSubmit={() => {
                  if (checked === true) {
                    handleSent();
                    toggleModal();
                  }
                }}
              >
                <div className="t">
                  <input
                    type="email"
                    onChange={(e) => setRecieverMail(e.target.value)}
                    placeholder="mail address"
                    autoFocus
                  ></input>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                  I agree to the Privacy Policy
                </label>

                <button type="submit" className="btn-modal">
                  Send the cards
                </button>
              </form>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
