const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions
    
    // you only want to operate on `Mdx` nodes
    if (node.internal.type === "Mdx") {

      const fileNode = getNode(node.parent)
      const slug = createFilePath({ node, getNode, basePath: fileNode.relativeDirectory })
      
      createNodeField({
        // Name of the field you are adding
        name: "slug",
        // Individual MDX node
        node,
        // Generated value based on filepath with "blog" prefix. 
        value: `${slug}`,
      })
    }
  }

  exports.createPages = (({ graphql, actions }) => {
    // Destructure the createPage function from the actions object
    const { createPage } = actions
    
    return new Promise((resolve, reject) => {
      const blogPostTemplate = path.resolve(`./src/templates/blogPost.js`)

      resolve(
        graphql(`
          query {
            allMdx(
              sort:{
                fields:[frontmatter___date]
                order: DESC
              }
            ){
              edges {
                node {
                  id
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `).then(result => {
            // Create blog post pages.
            const posts = result.data.allMdx.edges
            // you'll call `createPage` for each result
            posts.forEach(({ node }, index) => {
              //must grab the display slug so we can create the page at the right url
              const path = node.fields.slug
              createPage({
                path,
                // This component will wrap our MDX content
                component: blogPostTemplate,
                // You can use the values in this context in
                // our page layout component
                context: { 
                  pathSlug: path,
                  id: node.id, 
                  mdx: node, 
                  next: index === 0 ? null : posts[index - 1].node,
                  prev: index === (posts.length - 1) ? null : posts[index + 1].node
                },
              })
              resolve()
            })
          }).catch(error => {
            reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query ' + error)
          })
      )    
  })
})