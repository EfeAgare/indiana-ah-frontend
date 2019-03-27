import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import userReducer from './userReducer';
import bookmarkReducer from './bookmarkReducer';
import userArticlesReducer from './userArticlesReducer';
import getSingleArticleReducer from './getSingleArticleReducer';

export default combineReducers({
  auth: authReducer,
  articles: articleReducer,
  user: userReducer,
  bookmarkedArticles: bookmarkReducer,
  allUserArticles: userArticlesReducer,
  singleArticle: getSingleArticleReducer
});
