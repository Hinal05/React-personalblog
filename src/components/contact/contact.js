import React from 'react';
import "./contact.scss";

const contactUs = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className='contact-wrapper'>
      <div className="quote_form" id="quote_form" >
        <h2 className="block-title">Get Free Quote</h2>
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
          <input id="edit-name" className="form-control" type="text" placeholder="Name" aria-label="Name" name="name" />
          <input id="edit-email" className="form-control" type="email" placeholder="Email" aria-label="Email" name="email"  />
          <textarea  className="form-textarea form-control resize-vertical" id="edit-comment" name="comment" rows="5" cols="60" placeholder="Comment"></textarea>

          <button className="webform-button--submit button button--primary js-form-submit form-submit btn-primary btn" type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default contactUs;
