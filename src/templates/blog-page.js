import React from 'react';
import { graphql } from 'gatsby';

import BlogPostTemplate from '../components/Blog/BlogPostTemplate';

/**
 * Wrapper around the <BlogPostTemplate /> component to message the data we get
 * from Drupal before passing it along. The intent is that you should not need
 * to override this component and if you want to change the way a blog post
 * looks you can shadow the template component.
 */
const BlogPostTemplateWithData = props => {
  if (props.data.post.relationships.image == null) {
    props.data.post.relationships.image = [];
  }

  // Look for any images in the body of the blog post that were added using
  // Drupal entity embeds. They'll look something like this:
  // <article data-media-source-value=\"42">...</article>
  // Where the ID is the Drupal ID of the image file entity.
  //
  // Note: This doesn't work with Drupal out of the box and requires some code
  // on the Drupal side to add the `data-media-source-value` attribute used
  // here.
  const re = /data-media-source-value=\"(\d+)"/gm;
  let imageIds = [];
  let match;
  while ((match = re.exec(props.data.post.body.processed)) != null) {
    imageIds.push(parseInt(match[1]));
  }

  let bodyImages = null;
  if (imageIds.length && props.data.allImages.edges.length) {
    bodyImages = props.data.allImages.edges
      .filter(item => {
        if (
          imageIds.includes(
            item.node.relationships.imageFile.drupal_internal__fid
          )
        ) {
          return item.node.relationships.imageFile.drupal_internal__fid;
        }
        return false;
      })
      .map(item => item.node.relationships.imageFile);
  }

  const post = {
    title: props.data.post.title,
    author: props.data.post.relationships.uid.display_name,
    path: props.data.post.path.alias,
    summary: props.data.post.summary.processed,
    body: props.data.post.body.processed,
    bodyImages: bodyImages,
    created: props.data.post.created,
    images: props.data.post.relationships.image,
    timeToComplete: null,
  };

  let previousPost;
  if (props.data.previousPost) {
    previousPost = {
      title: props.data.previousPost.title,
      author: props.data.previousPost.relationships.uid.display_name,
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
      author: props.data.nextPost.relationships.uid.display_name,
      path: props.data.nextPost.path.alias,
      summary: props.data.nextPost.summary.processed,
      created: props.data.nextPost.created,
      timeToComplete: null,
    };
  }

  return (
    <BlogPostTemplate
      previousPost={previousPost ? previousPost : false}
      nextPost={nextPost ? nextPost : false}
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
    created(formatString: "MMM. Do, YYYY")
    path {
      alias
    }
    summary {
      processed
    }
    relationships {
      uid {
        display_name
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
    allImages: allImages {
      edges {
        node {
          relationships {
            imageFile {
              drupal_internal__fid
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
    }
  }
`;
