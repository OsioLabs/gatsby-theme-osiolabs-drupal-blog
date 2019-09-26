# gatsby-theme-osiolabs-drupal-blog

This is a [Gatsby theme](https://www.gatsbyjs.org/docs/themes) that encapsulates the code necessary to interact with the members.osiolabs.com API to retrieve and display blog posts.

This requires either the `gatsby-theme-osiolabs-drupal` theme, or the `gatsby-source-drupal` plugin are in-use by any site that implements this theme. The expectation is that something else is configured to pull in data from the members.osiolabs.com API into Gatsby's GraphQL store, and we can therefore assume that the blog_post content is there.


## Usage

You should use this as part of another Gatsby site.

```
yarn add https://github.com/OsioLabs/gatsby-theme-osiolabs-drupal-blog
```

Then add it to your projects _gatsby-config.js_:

```javascript
module.exports = {
  plugins: [
    'gatsby-theme-osiolabs-drupal-blog',
  ],
};
```

The code in _gatsby-node.js_ creates both a `/blog` listing page with pagination, and individual `/blog/*` pages for each blog post.

The code in _src/templates/_ gets the necessary blog post data out of GraphQL, does a bit of clean up, and passes it to the _src/components/_ components for display. The intent is for the code in _src/components/_ to be an example, and you will almost always override it in your specific site.

To learn more about how Gatsby theme's work, and especially how to use component shadowing to override components provided by this package checkout the [official docs](https://www.gatsbyjs.org/docs/themes).

## How to do development on this package

If you want to make updates to this package the easiest thing to do is to copy the repo locally and then link it into an existing project.

Use `npm link` to replace the *web/node_modules/gatsby-themes-osiolabs-drupal-blog/* with a link to *themes/gatsby-theme-osiolabs-drupal-blog/*.

```bash
cd themes/gatsby-theme-osiolabs-drupal-blog/
npm link
cd ../web/
npm link gatsby-theme-osiolabs-drupal-blog
``` 

After that, any changes you make in *themes/gatsby-theme-osiolabs-drupal-blog/* will be reflected in *web/node_modules/gatsby-theme-osiolabs-drupal-blog/*.

Note: Anytime you remove the *web/node_modules/* directory you'll need to run `npm link gatsby-theme-osiolabs-drupal-blog` again.
