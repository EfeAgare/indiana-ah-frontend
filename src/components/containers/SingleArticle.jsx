import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getSingleArticle
  from '../../redux/actions/getSingleArticleActions/getSingleArticleActions';
import { bookmarkLogo, twitter, facebook } from '../../assets/images/svg';
import LikeComponent from '../common/LikeComponent';
import DislikeComponent from '../common/DislikeComponent';
import CommentIconComponent from '../common/CommentIconComponent';
import Footer from '../common/footer.jsx';

class SingleArticle extends Component {
  componentDidMount() {
    const { match, history } = this.props;
    const { slug } = match.params;
    this.props.getSingleArticle(slug, history);
  }

  render() {
    let articleTags = null;
    let viewingUser;
    const delayDisplay = (
      <div
        className="carousel-spinner
      spinner-grow spinner-grow-lg text-primary"
      />
    );
    if (this.props.user.userData) {
      viewingUser = this.props.user.userData.username;
    }
    const {
      articleTitle,
      timeToRead,
      Comments,
      likes,
      dislikes,
      imageUrl,
      tags,
      author,
      createdAt,
      articleBody
    } = this.props.singleArticle.article;
    const createMarkup = () => ({ __html: articleBody });
    if (tags) {
      articleTags = tags.split(',').map((tag, index) => (
        <span className="article-tags" key={index}>
          {tag}
        </span>
      ));
    }
    const imageStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'none'
    };
    const dateCreated = new Date(createdAt);
    const displayedDate = `${dateCreated.getDate()}
    /${dateCreated.getMonth()}/${dateCreated.getFullYear()}`;
    if (
      this.props.singleArticle.isLoading
      || !this.props.singleArticle.article.articleBody
    ) return delayDisplay;

    return (
      <>
        <div className="SingleArticle">
          <div className="heading-section">
            <h1 className="heading-primary">{articleTitle}</h1>
            <div className="heading-info">
              <div className="article-info">
                <div className="author-image-box">
                  <p className="author"> written by {author.username}</p>
                  <img
                    src={author.imageUrl}
                    alt="user-image"
                    width="50"
                    height="50"
                    className="user-image"
                  />
                </div>
                {this.props.auth.isVerified && viewingUser !== author.username && (
                  <div className="follow-bookmark-box">
                    <button className="follow-btn">Follow</button>
                    <img src={bookmarkLogo} className="bookmarkLogo" />
                  </div>
                )}
              </div>
              <p className="date-created">{displayedDate}</p>
              <p className="time-to-read">{timeToRead}</p>
            </div>
          </div>
          {imageUrl && (
            <section className="article-image-container" style={imageStyle}>
            </section>
          )}
          <section className="article-body-container">
            <div className="article-body" dangerouslySetInnerHTML={createMarkup()} />
            <div className="tags-container">{articleTags}</div>
            <section className="reaction-share-section">
              <div className="reaction-container">
                <LikeComponent
                  className="reaction-logo"
                  likeCount={likes}
                  color="rgba(0,0,0,.5)"
                />
                <DislikeComponent
                  className="reaction-logo"
                  dislikeCount={dislikes}
                  color="rgba(0,0,0,.5)"
                />
                <CommentIconComponent className="reaction-logo" commentCount={Comments} />
              </div>
              <div className="share-container">
                <span className="social share-text">Share on</span>
                <img src={facebook} alt="facebook logo" className="social" />
                <img src={twitter} alt="twitter logo" className="social" />
              </div>
            </section>
          </section>
        </div>
        <Footer/>
      </>
    );
  }
}

SingleArticle.propTypes = {
  getSingleArticle: PropTypes.func.isRequired,
  singleArticle: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  singleArticle: state.singleArticle,
  auth: state.auth,
  user: state.user
});

export { SingleArticle };

export default connect(
  mapStateToProps,
  { getSingleArticle }
)(SingleArticle);