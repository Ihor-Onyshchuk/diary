import React from 'react';
import cx from 'classnames';

const ItemsList = ({ items, handleItemDelete, handleItemClick, activeItemId }) => {
  return (
    <div>
      <ul className="list-group">
        {items.map(({ name, id, comments }) => {
          const isActive = activeItemId === id;
          return (
            <li
              key={id}
              onClick={() => (isActive ? null : handleItemClick(id))}
              // className={cx('list-group-item', { active: 'isActive' })}
              className={`list-group-item ${isActive ? 'active' : ''}`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="align-middle">
                  {name}
                </span>
                <div className="d-flex align-items-center">
                  <i className="fa fa-commenting-o mr-2">{comments.length}</i>
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
    </div>
  )
};

export default ItemsList;