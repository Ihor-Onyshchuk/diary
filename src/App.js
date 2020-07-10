import React, { PureComponent } from 'react';
import Comments from './components/Comment/Comment';
import Items from './components/Items/Items';
import ItemsList from './components/ItemsList/ItemList';
import Form from './components/Form/Form';

const getStorageItem = key => {
  const storageItem = localStorage.getItem(key);
  return storageItem ? JSON.parse(storageItem) : [];
};

const itemId = () => `#${Date.now().toString(16)}`;

export default class App extends PureComponent {
  state = {
    name: '',
    comment: '',
    activeItemId: '',
    items: []
  }

  createItem = (name) => {
    return {
      id: itemId(),
      name,
      comments: []
    }
  }

  componentDidMount = () => {
    const items = getStorageItem('items');
    this.setState({
      items
    })
    console.log('storageItem', items)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleItemSubmit = (e) => {
    e.preventDefault();
    const { name, items } = this.state;
    const ItemsList = [this.createItem(name), ...items];
    localStorage.setItem('items', JSON.stringify(ItemsList));

    const storageItems = getStorageItem('items');

    this.setState({
      name: '',
      items: storageItems
    })
  }

  handleItemDelete = (itemId) => {
    const items = getStorageItem('items');
    console.log('items', items);
    const idx = items.findIndex(el => el.id === itemId);
    const newArray = [...items.slice(0, idx), ...items.slice(idx + 1)];
    localStorage.setItem('items', JSON.stringify(newArray));

    this.setState({ items: getStorageItem('items') })
  }

  handleItemClick = (itemId) => {
    this.setState({ activeItemId: itemId })
  }

  render() {
    const { name, items, activeItemId } = this.state;
    return (
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-4 bg-dark">
            <h1 className="text-center text-light">Dialy app</h1>
          </div>
          <div className="col-8">
            <div className="d-flex">
              <div>
                <h2>Items</h2>
                <Form
                  name={name}
                  onChange={this.handleInputChange}
                  onSubmit={this.handleItemSubmit}
                />
                <ItemsList
                  items={items}
                  activeItemId={activeItemId}
                  handleItemDelete={this.handleItemDelete}
                  handleItemClick={this.handleItemClick}
                />
              </div>
              <div>
                <h2>Comments</h2>
                {/* <Form /> */}
                {/* <CommentsList /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}