import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import BookmarksContext from './BookmarksContext';
import EditBookmark from './EditBookmark/EditBookmark'

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };

  // setBookmarks = bookmarks => {
  //   this.setState({
  //     bookmarks,
  //     error: null,
  //   })
  // }

  // addBookmark = bookmark => {
  //   this.setState({
  //     bookmarks: [ ...this.state.bookmarks, bookmark ],
  //   })
  // }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(this.setBookmarks)
      .catch(error => this.setState({ error }))
  }

  updateBookmark = (updatedBookmark) => {
    const newBookmarks = this.bookmarks.map(bookmark =>
      (bookmark.id === updatedBookmark.id)
        ? updatedBookmark
        : bookmark
    )
    this.setState({
      bookmarks: newBookmarks
    })
  };

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark
    }
    return (
      <main className='App'>
        <BookmarksContext.Provider value={contextValue}>
          <h1>Bookmarks!</h1>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route 
              path='/add-bookmark'
              render={({ history }) => {
                return <AddBookmark
                onAddBookmark={this.addBookmark}
                onClickCancel={() => history.push('/')}
                />
              }}
            />
            <Route 
              exact
              path='/'
              render={() =>
                <BookmarkList
                  bookmarks={this.state.bookmarks}
                />}
            />
            <Route 
              path='/edit/:bookmarkId'
              component={EditBookmark}
            />
          </div>
        </BookmarksContext.Provider>
      </main>
    );
  }
}

export default App;
