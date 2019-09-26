import React from 'react';
import { render } from '@testing-library/react';
import BlogPostTemplateWithData from './blog-page';

// This mocks the results of the GraphQL query in ./blog-page.js.
const exampleData = {
  post: {
    body: {
      processed: "<p>Blog post body</p>\n"
    },
    drupal_id: "4675f421-ab2a-41db-9946-0dad9343b06b",
    drupal_internal__nid: 274,
    title: "Current blog post title",
    created: "Sep. 9th, 2019",
    path: {
      alias: "/blog/tue-09242019-1631/abico-ibidem-oppeto-uxor"
    },
    summary: {
      processed: "<p>Blog post summary.</p>\n"
    },
    relationships: {
      uid: {
        name: "Current blog author"
      },
      image: [
        {
          relationships: {
            imageFile: {
              localFile: {
                childImageSharp: {
                  fluid: {
                    base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAABrklEQVQoz52RvW4TQRSF9xlBQlQICqCi4g1okChQOoQoKHgBGkpSBIlIkaLgOItSRMZiFdu73v/dmVlbjr/cmVnHq3RQfLpnZvacuXM30FcTzOkvzHlI9+OY7vDI158nqLKi1RrVtiilHO097dmvA2vYoboOZQztDmu+M3njUGvxWHyg7ElosDMoOSjynLIsnd511fbdePbdadFpmrIUrHahtkMXKN2YRYx+e4B5/wEtoY3sN02DElrB6kZMtV3LWVEp3n1refO1ZZ5pjPahgTOs15jfl/DwGTx+gYmuSbOMJJZLqopUarJMKWvFXC4u8oxoaXj0CR58hDAyrLvWXSiBkrxaoSdTtk9fcfPyNSYvSCRwMZ+jpfuZ1NlsRic6jhPKIiOvDM+/3PDk85bJQrMyfaAfdD8ruV0lSzcj+8S6rp22teq1e3rjZxnnioU81/9h1T/ZDbqnMx7R2g5e+x9h6512P8TrTubWmYFfCKpas0f1+HU5qOXgu/Le2TAjCKMt/8NhCMcjxdHFhu+jDeeXivAagvFf+FcuIjibwunVhtF0y9mfLePphrHs3wJGBzn7XXcIlQAAAABJRU5ErkJggg==",
                    aspectRatio: 1.7777777777777777,
                    src: "/static/1e96bf19ddb341300e3a0fbb3db66c92/91f24/diagram-etl-pipeline.png",
                    srcSet: "/static/1e96bf19ddb341300e3a0fbb3db66c92/a79b5/diagram-etl-pipeline.png 320w,\n/static/1e96bf19ddb341300e3a0fbb3db66c92/cff51/diagram-etl-pipeline.png 640w,\n/static/1e96bf19ddb341300e3a0fbb3db66c92/91f24/diagram-etl-pipeline.png 1280w,\n/static/1e96bf19ddb341300e3a0fbb3db66c92/ec873/diagram-etl-pipeline.png 1920w",
                    sizes: "(max-width: 1280px) 100vw, 1280px"
                  }
                }
              }
            }
          }
        },
        {
          relationships: {
            imageFile: {
              localFile: {
                childImageSharp: {
                  fluid: {
                    base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsSAAALEgHS3X78AAAA7klEQVQoz4WQC0+DMBSF9/9/2ZY5txnFiOPRZhQYrowBofR1hBpJNIgnvbk3J71fT7rqug5VVaFtW3DO3VzXDcqydB7scKz9UaO++2+tRiAlFIQQ+O8+ojgCoQTeqweWstmlv2AOOF3SFkYMgwG0+JqNtBBND9kp9K1Ed+9htFlM6oBS9fjIrjitE8T7DKdN4ip8YAi3DNEuRbBhiB8zSKEm0FxSB1Ra4cbvCNYMwQCgxxzkkDvY+MAIDLcpMp9DDElFI5cTaq1RVw3iXYbzSwH2dsUluuH8XIDsc+clXgH6dJk8rcw8cOmD/9Pc7icWbBz+vZwIagAAAABJRU5ErkJggg==",
                    aspectRatio: 2.827067669172932,
                    src: "/static/3b4fdb60936e9067d1bec35fab1ee0e1/4020c/recipelist-component-example.png",
                    srcSet: "/static/3b4fdb60936e9067d1bec35fab1ee0e1/a79b5/recipelist-component-example.png 320w,\n/static/3b4fdb60936e9067d1bec35fab1ee0e1/4020c/recipelist-component-example.png 376w",
                    sizes: "(max-width: 376px) 100vw, 376px"
                  }
                }
              }
            }
          }
        },
      ]
    }
  },
  nextPost: {
    drupal_id: "8f43eeeb-247c-4f77-8d60-e807a47cdc94",
    drupal_internal__nid: 275,
    title: "Next post title",
    created: "Sep. 10th, 2019",
    path: {
      alias: "/blog/tue-09242019-1631/abluo-diam-dolore-metuo-quia-quibus"
    },
    summary: {
      processed: "<p>Next post summary</p>\n"
    },
    relationships: {
      uid: {
        name: "Next post author"
      }
    }
  },
  previousPost: {
    drupal_id: "74947894-d6e8-4816-b981-5df620d01928",
    drupal_internal__nid: 273,
    title: "Previous post title",
    created: "Sep. 8th, 2019",
    path: {
      alias: "/blog/tue-09242019-1631/eros"
    },
    summary: {
      processed: "<p>Previous post summary.</p>\n"
    },
    relationships: {
      uid: {
        name: "Previous post author"
      }
    }
  }
};

/**
 * The most important thing here is to verify that the format of the data from
 * <BlogPostTemplateWithData /> doesn't chant as sites implementing this theme
 * are relying on that component to get the blog post data from Drupal, clean
 * it up, and pass it along.
 */
describe('Component: <BlogPostTemplateWithData />', () => {
  it('Correctly prepares data from GraphQL for Blog* components.', () => {
    // Basic snapshot test.
    const { asFragment } = render(
      <BlogPostTemplateWithData
        data={exampleData}
      />
    );
    const firstRender = asFragment();
    expect(firstRender).toMatchSnapshot();
  });
});
