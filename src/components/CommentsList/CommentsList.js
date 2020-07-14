import React from 'react';

const CommentsList = ({ comments }) => {
  const style = {
    width: '20px',
    height: '20px',
    background: '#000'
  }
  return (
    <div>
      <ul className="list-group">
        {comments && comments.map(({ text, color, id }) => (
          <li key={id} className="list-group-item">
            <div className="d-flex align-items-center">
              <span className="align-middle">
                <span className="mr-2 d-block" style={{
                  width: '20px',
                  height: '20px',
                  'background-color': color
                }} />
              </span>
              <div className="d-flex align-items-center">
                {text}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default CommentsList;