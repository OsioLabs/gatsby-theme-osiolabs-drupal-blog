import React from 'react';
import PropTypes from "prop-types";
import { Container, Header, Item } from "semantic-ui-react";
import Img from 'gatsby-image';
import BlogPostTeaser from "./BlogPostTeaser";

const BlogPostTemplate = props => {
  const {
    title,
    created,
    author,
    body,
    images,
    timeToComplete,
    previousPost,
    nextPost,
  } = props;

  return (
    <>
      <Container as="article" className="blog-post">
        {images[0] && (
          <Img
            fluid={images[0].relationships.imageFile.localFile.childImageSharp.fluid}
          />
        )}
        <Header as="h2">{title}</Header>
        <div className="meta">
          By {author} on {created}
          {timeToComplete && (
            <> // {timeToComplete} min to read</>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </Container>
      <Item.Group className="blog-navigation">
        {previousPost && (
          <>
            Previous post:
            <BlogPostTeaser {...previousPost} />
          </>
        )}
        {nextPost && (
          <>
            Next post:
            <BlogPostTeaser {...nextPost} />
          </>
        )}
      </Item.Group>
    </>
  );
};

BlogPostTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  images: PropTypes.array,
  timeToComplete: PropTypes.number,
  previousPost: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      timeToComplete: PropTypes.number,
    }),
  ]),
};

BlogPostTemplate.propTypes.nextPost = BlogPostTemplate.propTypes.previousPost;

BlogPostTemplate.defaultProps = {
  timeToComplete: null,
  previousPost: false,
  nextPost: false,
  images: [],
};

export default BlogPostTemplate;
