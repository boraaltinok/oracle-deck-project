import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
function Modal({ handleSent, setRecieverMail }) {
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = React.useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value = ", value);
    setIsHuman(true);
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
                <ReCAPTCHA
                  sitekey="6Le3t7UhAAAAAPnMj1PLDagY08wZKC14HF3M67Ha"
                  onChange={handleCaptchaChange}
                />

                <button type="submit" className="btn-modal" disabled={!isHuman}>
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
