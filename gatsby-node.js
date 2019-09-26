// @file

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
    {
      allNodeBlogPost(sort: {fields: [created], order: DESC}) {
        edges {
          node {
            drupal_id
            drupal_internal__nid
            title
            path {
              alias
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for blog posts.`);
    return
  }

  // Create blog-list pages
  const posts = result.data.allNodeBlogPost.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  const blogListPageComponent = require.resolve('./src/templates/blog-list-page.js');

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/p/${i + 1}`,
      component: blogListPageComponent,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  });

  // Create individual blog pages, and any required redirects.
  const redirects = await graphql(`
    {
      allRedirectRedirect {
        edges {
          node {
            redirect_source {
              path
            }
            redirect_redirect {
              uri
            }
          }
        }
      }
    }
  `).then(result => {
    const data = [];
    if (!result.errors) {
      result.data.allRedirectRedirect.edges.forEach(({ node }) => {
        // Redirect paths will take one of two forms depending on how they were
        // created in Drupal. entity:node/42 or internal:/node/42, this
        // normalizes them both to /node/42.
        data[node.redirect_redirect.uri.replace(/^entity:|internal:\//, '/')] = node;
      });
    }

    return data;
  });

  const blogPageComponent = require.resolve('./src/templates/blog-page.js');

  posts.forEach(({ node }, index) => {
    // Handle generating redirects as needed.
    const path = node.path.alias;

    if (redirects[`/node/${node.drupal_internal__nid}`]) {
      createRedirect({
        fromPath:
        redirects[`/node/${node.drupal_internal__nid}`].redirect_source
          .path,
        toPath: path,
        isPermanent: true,
        redirectInBrowser: true,
      });
    }

    // Figure out previous and next posts and add them to the pageContext so
    // we can provide navigation.
    const nextPost = index === 0 ? false : posts[index - 1].node;
    const previousPost = index === posts.length - 1 ? false : posts[index + 1].node;

    createPage({
      path,
      component: blogPageComponent,
      context: {
        drupal_id: node.drupal_id,
        previous_id: previousPost.drupal_id,
        next_id: nextPost.drupal_id,
      },
    });
  });
};
