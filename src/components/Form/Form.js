import React from "react";

const Form = ({ name, value, onChange, onSubmit, color, colorField }) => {
  return (
    <div className="mb-2">
      <form className="form-inline" onSubmit={onSubmit}>
        <div className="form-group my-3">
          {name === 'comment' && (
            <input
              type="color"
              value={color}
              className="mr-2"
              name={colorField}
              onChange={onChange}
            />
          )}
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary ml-2">
          Add {name === 'comment' ? 'Comment' : 'New'}
        </button>
      </form>
    </div>
  )
}

export default Form;