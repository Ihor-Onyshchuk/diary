import React from "react";

const Form = ({ name, onChange, onSubmit }) => {
  return (
    <div>
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group mr-3 mb-2">
          <input
            type="text"
            name="name"
            value={name}
            className="form-control"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-2">Add New</button>
      </form>
    </div>
  )
}

export default Form;