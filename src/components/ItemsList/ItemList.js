import React from 'react';

import '../../index.scss';

const ItemsList = ({ items, handleItemDelete, handleItemClick, activeItemId }) => (
  <ul className="list-group">
    {items.map(({ name, id, comments }) => {
      const isActive = activeItemId === id;
      return (
        <li
          key={id}
          onClick={() => (isActive ? null : handleItemClick(id))}
          className={`list-group-item ${isActive ? 'active' : ''}`}
        >
          <div className="d-flex justify-content-between align-items-center">
            <span className="align-middle">
              {name}
            </span>
            <div className="d-flex align-items-center">
              <i className="fa fa-commenting-o mx-2"> {comments.length}</i>
              <button
                type="button"
                onClick={() => handleItemDelete(id)}
                className="btn btn-outline-danger btn-sm float-right"
              >
                <i className="fa fa-trash-o" />
              </button>
            </div>
          </div>
        </li >
      )
    })}
  </ul>
);

export default ItemsList;