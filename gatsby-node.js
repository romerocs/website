const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.frontmatter !== undefined) {
    const { frontmatter } = node;
    const { posttype } = frontmatter;

    if (posttype === 'blog') {
      const slug = frontmatter.slug || createFilePath({ node, getNode, basePath: `posts` });

      createNodeField({
        node,
        name: `slug`,
        value: `${slug}`,
      });
    }
    else {
      const slug = frontmatter.slug || createFilePath({ node, getNode, basePath: `` });

      createNodeField({
        node,
        name: `slug`,
        value: slug,
      });
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              posttype
            }
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {

    const { posttype } = node.frontmatter;

    const blogTemplate = path.resolve(`./src/components/posts.js`);

    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        slug: node.fields.slug,
        id: node.id
      },
    });
  });
};