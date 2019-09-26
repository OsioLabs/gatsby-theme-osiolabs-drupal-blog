import React from 'react';
import { graphql } from 'gatsby';

import BlogPostTemplate from '../components/Blog/BlogPostTemplate';

/**
 * Wrapper around the <BlogPostTemplate /> component to message the data we get
 * from Drupal before passing it along. The intent is that you should not need
 * to override this component and if you want to change the way a blog post
 * looks you can shadow the template component.
 */
const BlogPostTemplateWithData = (props) => {
  const post = {
    title: props.data.post.title,
    author: props.data.post.relationships.uid.name,
    path: props.data.post.path.alias,
    summary: props.data.post.summary.processed,
    body: props.data.post.body.processed,
    created: props.data.post.created,
    images: props.data.post.relationships.image,
    timeToComplete: null,
  };

  let previousPost;
  if (props.data.previousPost) {
    previousPost = {
      title: props.data.previousPost.title,
      author: props.data.previousPost.relationships.uid.name,
      path: props.data.previousPost.path.alias,
      summary: props.data.previousPost.summary.processed,
      created: props.data.previousPost.created,
      timeToComplete: null,
    };
  }

  let nextPost;
  if (props.data.nextPost) {
    nextPost = {
      title: props.data.nextPost.title,
      author: props.data.nextPost.relationships.uid.name,
      path: props.data.nextPost.path.alias,
      summary: props.data.nextPost.summary.processed,
      created: props.data.nextPost.created,
      timeToComplete: null,
    };
  }

  return (
    <BlogPostTemplate
      previousPost={(previousPost ? previousPost : false)}
      nextPost={(nextPost ? nextPost :false)}
      {...post}
    />
  );
};

export default BlogPostTemplateWithData;

export const query = graphql`
  fragment drupalFields on node__blog_post {
    drupal_id
    drupal_internal__nid
    title
    created(formatString: "MMM. Mo, YYYY")
    path {
      alias
    }
    summary {
      processed
    }
    relationships {
      uid {
        name
      }
    }
  }
  query BlogPost($drupal_id: String!, $next_id: String, $previous_id: String) {
    post: nodeBlogPost(drupal_id: { eq: $drupal_id }) {
      body {
        processed
      }
      relationships {
        image {
          relationships {
            imageFile {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 1280) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
      ...drupalFields
    }
    nextPost: nodeBlogPost(drupal_id: { eq: $next_id }) {
      ...drupalFields
    }
    previousPost: nodeBlogPost(drupal_id: { eq: $previous_id }) {
      ...drupalFields
    }
  }
`;
