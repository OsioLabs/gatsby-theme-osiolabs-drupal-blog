import React from 'react';
import { navigate } from 'gatsby';
import { Item, Pagination } from 'semantic-ui-react';
import BlogPostTeaser from './BlogPostTeaser';

const BlogListTemplate = props => {
  const posts = props.data.allNodeBlogPost.edges;
  const { currentPage, numPages } = props.pageContext;

  return (
    <>
      <Item.Group>
        {posts.map(({node}) => (
          <BlogPostTeaser
            title={node.title}
            summary={node.summary.processed}
            author={node.relationships.uid.name}
            path={node.path.alias}
            created={node.created}
            timeToComplete={600}
          />
        ))}
      </Item.Group>

      <Pagination
        boundaryRange={0}
        defaultActivePage={currentPage}
        firstItem={null}
        lastItem={null}
        prevItem="&larr; Previous"
        nextItem="Next &rarr;"
        siblingRange={1}
        secondary
        totalPages={numPages}
        onPageChange={(event, data) => {
          if (data.activePage === 1) {
            navigate('/blog');
          }
          else {
            navigate(`/blog/p/${data.activePage}`);
          }
        }}
      />
    </>
  );
};

export default BlogListTemplate;
