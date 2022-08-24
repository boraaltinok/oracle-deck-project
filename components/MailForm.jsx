import React, { useState } from "react";

function MailForm() {
  const [recieverMail, setRecieverMail] = useState("");
  return (
    <div>
      <form onSubmit="">
        <input
          type="text"
          onChange={(e) => setRecieverMail(e.target.value)}
        ></input>
      </form>
      <button type="submit">Send the cards</button>
    </div>
  );
}

export default MailForm;
