import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import AddBookmark from './AddBookmark';

it('renders without crashing', () => {
  const addBookmarkRender = withRouter(<AddBookmark />)
  const div = document.createElement('div');
  ReactDOM.render(addBookmarkRender, div);
  ReactDOM.unmountComponentAtNode(div);
});
