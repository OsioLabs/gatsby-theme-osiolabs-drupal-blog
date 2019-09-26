import { graphql } from "gatsby"
import BlogListTemplate from '../components/Blog/BlogListTemplate';

export default BlogListTemplate;

export const query = graphql`
  query BlogListTemplate($skip: Int!, $limit: Int!) {
    allNodeBlogPost(
      sort: { fields: [created], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          summary {
            processed
          }
          path {
            alias
          }
          relationships {
            uid {
              name
            }
          }
          created(formatString: "MMM. Mo, YYYY")
        }
      }
    }
  }
`;
