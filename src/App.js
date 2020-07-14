import React, { PureComponent } from 'react';

import Form from './components/Form/Form';
import ItemsList from './components/ItemsList/ItemList';
import CommentsList from './components/CommentsList/CommentsList';

const getStorageItem = key => {
  const storageItem = localStorage.getItem(key);
  return storageItem ? JSON.parse(storageItem) : [];
};

const itemId = () => `#${Date.now().toString(16)}`;

export default class App extends PureComponent {
  state = {
    name: '',
    comment: '',
    commentColor: '#000',
    activeItem: {},
    items: []
  }

  createItem = (name) => {
    return {
      id: itemId(),
      name,
      comments: []
    }
  }

  createComments = (text, color) => {
    return {
      id: itemId(),
      text,
      color
    }
  }

  componentDidMount = () => {
    const items = getStorageItem('items');
    this.setState({ items });
    console.log('storage Items', items)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleItemSubmit = (e) => {
    e.preventDefault();
    const { name, items } = this.state;
    const itemsList = [this.createItem(name), ...items];
    localStorage.setItem('items', JSON.stringify(itemsList));

    const storageItems = getStorageItem('items');

    this.setState({
      name: '',
      items: storageItems
    })
  }

  handleItemDelete = (itemId) => {
    const items = getStorageItem('items');
    const idx = items.findIndex(el => el.id === itemId);
    const newArray = [...items.slice(0, idx), ...items.slice(idx + 1)];
    localStorage.setItem('items', JSON.stringify(newArray));

    this.setState({
      activeItem: {},
      items: getStorageItem('items')
    })
  }

  handleItemClick = (itemId) => {
    const activeItem = this.state.items.find(({ id }) => id === itemId);
    this.setState({ activeItem });
  }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    const {
      items,
      comment,
      activeItem,
      commentColor,
    } = this.state;

    const idx = items.findIndex(({ id }) => id === activeItem.id)
    const activeStorageItem = items.find(({ id }) => id === activeItem.id);

    activeStorageItem.comments = [
      this.createComments(comment, commentColor),
      ...activeItem.comments
    ]
    const updatedItems = [
      ...items.slice(0, idx), activeStorageItem, ...items.slice(idx + 1)
    ]

    localStorage.setItem('items', JSON.stringify(updatedItems));

    this.setState({
      comment: '',
      activeItem: activeStorageItem,
      items: getStorageItem('items'),
    })
  }

  render() {
    const { name, comment, items, activeItem, commentColor } = this.state;
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-2 bg-dark">
            <h1 className="text-center text-light">Dialy app</h1>
          </div>
          <div className="col-10">
            <div className="d-flex justify-content-center flex-wrap my-3">
              <div className="shadow border p-3 m-3">
                <h3>Items</h3>
                <Form
                  value={name}
                  name='name'
                  onChange={this.handleInputChange}
                  onSubmit={this.handleItemSubmit}
                />
                <ItemsList
                  items={items}
                  activeItemId={activeItem.id}
                  handleItemDelete={this.handleItemDelete}
                  handleItemClick={this.handleItemClick}
                />
              </div>
              <div className="shadow border p-3 m-3">
                <h3>Comments: {activeItem.id}</h3>
                <Form
                  name='comment'
                  value={comment}
                  colorField='commentColor'
                  color={commentColor}
                  onChange={this.handleInputChange}
                  onSubmit={this.handleCommentSubmit}
                />
                <CommentsList comments={activeItem.comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}