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
                Your Card reading is one step closer to being saved in your
                inbox!
              </p>
              <form
                onSubmit={() => {
                  if (checked === true) {
                    handleSent();
                    toggleModal();
                  }
                }}
              >
                <div
                  className="t"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                    marginBottom: 5,
                  }}
                >
                  <input
                    type="email"
                    onChange={(e) => setRecieverMail(e.target.value)}
                    placeholder="mail address"
                    autoFocus
                  ></input>
                </div>
                <label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 0,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <a href="https://holistichealingbyhannah.com/terms-and-conditions">
                    <u>I agree to the Terms and Conditions</u>
                  </a>
                </label>

                <ReCAPTCHA
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                  sitekey="6LdHWs8lAAAAAKoD3qvUKo-4ADpwlMMqtz2T__Af"
                  onChange={handleCaptchaChange}
                />

                <button
                  type="submit"
                  className="btn-modal"
                  disabled={!isHuman || !checked}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
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
