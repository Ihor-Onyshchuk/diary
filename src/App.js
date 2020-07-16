import React, { PureComponent } from 'react';

import Form from './components/Form/Form';
import ItemsList from './components/ItemsList/ItemList';
import CommentsList from './components/CommentsList/CommentsList';
import { createItem, createComments, getStorageItem, setStorageItem } from './utils';

export default class App extends PureComponent {
  state = {
    name: '',
    comment: '',
    isActive: false,
    commentColor: '#000',
    activeItem: {},
    items: [],
  }

  componentDidMount = () => {
    const items = getStorageItem('items');
    this.setState({ items });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleItemSubmit = (e) => {
    e.preventDefault();
    const { name, items } = this.state;
    if (name === '') return;
    const itemsList = [createItem(name), ...items];

    setStorageItem('items', itemsList);
    const storageItems = getStorageItem('items');

    this.setState({
      name: '',
      comment: '',
      items: storageItems,
      commentColor: '#000',
    })
  }

  handleItemDelete = (e, itemId) => {
    e.stopPropagation();
    const items = getStorageItem('items');
    const idx = items.findIndex(el => el.id === itemId);
    const newArray = [...items.slice(0, idx), ...items.slice(idx + 1)];

    setStorageItem('items', newArray);
    const updatedItems = getStorageItem('items');

    this.setState({
      comment: '',
      activeItem: {},
      items: updatedItems,
      commentColor: '#000'
    })
  }

  handleItemClick = (itemId) => {
    const activeItem = this.state.items.find(({ id }) => id === itemId);
    this.setState({
      activeItem,
      isActive: true
    });
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    const {
      items,
      comment,
      isActive,
      activeItem: { id: activeItemId, comments },
      commentColor,
    } = this.state;

    if (comment === '' || !isActive) return;

    const idx = items.findIndex(({ id }) => id === activeItemId);
    const activeStorageItem = items.find(({ id }) => id === activeItemId);

    activeStorageItem.comments = [
      createComments(comment, commentColor),
      ...comments
    ]
    setStorageItem('items', [
      ...items.slice(0, idx), activeStorageItem, ...items.slice(idx + 1)
    ])
    const updatedItems = getStorageItem('items');

    this.setState({
      comment: '',
      commentColor: '#000',
      items: updatedItems,
      activeItem: items[idx],
    })
  }

  render() {
    const {
      name,
      comment,
      items,
      isActive,
      commentColor,
      activeItem: { id, comments },
    } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-2 bg-dark">
            <h1 className="text-center text-light">Dialy app</h1>
          </div>
          <div className="col-10">
            <div className="d-flex justify-content-center flex-wrap my-3">
              <div className="m-3">
                <div className="shadow border p-3">
                  <h3>Items</h3>
                  <Form
                    name='name'
                    value={name}
                    onChange={this.handleInputChange}
                    onSubmit={this.handleItemSubmit}
                  />
                  <ItemsList
                    items={items}
                    activeItemId={id}
                    handleItemDelete={this.handleItemDelete}
                    handleItemClick={this.handleItemClick}
                  />
                </div>
              </div>
              <div className="m-3">
                <div className="shadow border p-3">
                  <h3>Comments {id}</h3>
                  <Form
                    name='comment'
                    value={comment}
                    isActive={isActive}
                    color={commentColor}
                    colorField='commentColor'
                    onChange={this.handleInputChange}
                    onSubmit={this.handleCommentSubmit}
                  />
                  <CommentsList comments={comments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}