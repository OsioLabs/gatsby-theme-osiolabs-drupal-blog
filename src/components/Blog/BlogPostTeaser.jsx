import React from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from 'gatsby';

import { Item } from 'semantic-ui-react';

const BlogPostTeaser = props => (
  <Item className="blog--teaser" onClick={() => navigate(props.path)}>
    <Item.Content>
      <Item.Header>
        <Link to={props.path}>{props.title}</Link>
      </Item.Header>
      <Item.Description>
        <div dangerouslySetInnerHTML={{ __html: props.summary }} />
      </Item.Description>
      <Item.Extra>
        <Item.Meta>
          By {props.author} on {props.created}
          {props.timeToComplete && (
            <> // {props.timeToComplete} min to read</>
          )}
        </Item.Meta>
        <div className="read-more">
          <Link to={props.path}>read more &rarr;</Link>
        </div>
      </Item.Extra>
    </Item.Content>
  </Item>
);

BlogPostTeaser.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timeToComplete: PropTypes.number,
};

BlogPostTeaser.defaultProps = {
  timeToComplete: null,
};

export default BlogPostTeaser;
