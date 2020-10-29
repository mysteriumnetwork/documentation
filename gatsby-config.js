/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const mainNavigation = require('./navigation/main')
const footerNavigation = require('./navigation/footer')
const sidebarNavigation = require('./navigation/sidebar')

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Mysterium Network Documentation`,
    siteUrl: `https://docs-v2.mysterium.network`,
    description: ``,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        contentDir: 'content',
        baseDir: '',
        siteName: 'Documentation',
        pageTitle: 'Mysterium Network Docs',
        menuTitle: 'Mysterium Platform',
        githubRepo: 'mysteriumnetwork/documentation',
        description: "An example of how to set up Apollo's documentation theme",
        navConfig: mainNavigation,
        footerNavConfig: footerNavigation,
        // defaultVersion: '1',
        // versions: {
        //   '1': 'version-1'
        // },
        gatsbyRemarkPlugins: [],
        sidebarCategories: sidebarNavigation
      }
    }
  ]
}
