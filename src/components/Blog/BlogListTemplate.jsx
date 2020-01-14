import React from 'react';
import { navigate } from 'gatsby';
import { Item, Pagination } from 'semantic-ui-react';
import BlogPostTeaser from './BlogPostTeaser';

const BlogListTemplate = props => {
  const posts = props.data.allNodeBlogPost.edges;
  const { currentPage, numPages, limit } = props.pageContext;

  return (
    <>
      <Item.Group>
        {posts.map(({node}) => (
          <BlogPostTeaser
            title={node.title}
            summary={node.summary.processed}
            author={node.relationships.uid.display_name}
            path={node.path.alias}
            created={node.created}
            timeToComplete={null}
          />
        ))}
      </Item.Group>

      {numPages > limit && (
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
      )}
    </>
  );
};

export default BlogListTemplate;
