import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import EditBookmark from './EditBookmark';

it('renders without crashing', () => {
  const addBookmarkRender = withRouter(<AddBookmark />)
  const div = document.createElement('div');
  ReactDOM.render(addBookmarkRender, div);
  ReactDOM.unmountComponentAtNode(div);
});
