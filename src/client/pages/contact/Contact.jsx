import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import "./contact.css";
import address from "../../images/icons8-home.svg";
import mail from "../../images/icons8-mail.svg";
import phone from "../../images/icon-person.svg";
import ok from "../../images/icons8-ok.gif";
import fail from "../../images/icons8-cancel.svg";

function Contact() {
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ekugxrk",
        "template_civoqfh",
        formRef.current,
        "user_ulU2Coc8FRUJvDtFU8XTx"
      )
      .then(
        (result) => {
          console.log(result.text);
          setName("");
          setSubject("");
          setEmail("");
          setMessage("");
          setDone(true);
          setTimeout(() => {
            setDone(false);
          }, 5000);
        },
        (error) => {
          setFailed(true);
          setTimeout(() => {
            setFailed(false);
          }, 5000);
          console.log(error);
        }
      );
  };
  return (
    <div className='contact'>
      <div className='contact_top'>
        <h1>Contact us</h1>
      </div>
      <div className='contact_main'>
        <div className='contact_text'>
          <div className='contact_text_container'>
            <div className='contact_item'>
              <img className='svg_img' src={address} alt='' />
              <p className='text'>4, olamide street, ifako Ijaiye, Lagos</p>
            </div>
            <div className='contact_item'>
              <img src={mail} alt='' className='svg_img' />
              <p className='text'>ileri@gmail.com</p>
            </div>
            <div className='contact_item'>
              <img src={phone} alt='' className='svg_img' />
              <p className='text'>0902324282</p>
            </div>
            <div className='sidebar_item'>
              <span className='sidebar_title title'>FOLLOW US</span>
              <div className='sidebar_social'>
                <i className='fab fa-facebook-square sidebar_icon icon'></i>
                <i className='fab fa-twitter-square sidebar_icon icon'></i>
                <i className='fab fa-pinterest-square sidebar_icon icon'></i>
                <i className='fab fa-whatsapp-square sidebar_icon icon'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='contact_form'>
          <div className='form_container'>
            <form ref={formRef} onSubmit={handleSubmit}>
              <input
                type='text'
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                placeholder='Name.....'
                name='name'
                required
              />
              <input
                type='text'
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                value={subject}
                placeholder='Subject.....'
                name='subject'
                required
              />
              <input
                type='email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                placeholder='Email.....'
                name='email'
                required
              />
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
                name='message'
                placeholder='Message.....'
                cols='30'
                rows='10'
                required
              ></textarea>

              <button>SEND</button>
            </form>
            {done && (
              <div className='notification ok'>
                <img src={ok} alt='' />
                <p>SENT</p>
              </div>
            )}
            {failed && (
              <div className='notification fail'>
                <img src={fail} alt='' />
                <p>Something Went Wrong</p>
                <p>Try Again</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
