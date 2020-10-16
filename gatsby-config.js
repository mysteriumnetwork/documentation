/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const mainNavigation = require('./navigation/main')
const footerNavigation = require('./navigation/footer')

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Mysterium Network Documentation`,
    siteUrl: `https://docs-v2.mysterium.network`,
    description: ``,
  },
  plugins: [
    {
      resolve: 'gatsby-theme-apollo-docs',
      options: {
        root: __dirname,
        contentDir: 'content',
        baseDir: 'docs',
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
        sidebarCategories: {
          'How to earn': [
            'node-runners/index',
            'token/index',
            'token/bounty',
            'node-runners/setup/index',
          ],
          'Become a node runner': [
            'node-runners/setup/docker',
            'node-runners/setup/raspberry-pi',
            'node-runners/setup/linux',
            'node-runners/webui/index'
          ],
          Resources: [
            'troubleshooting/index',
            'resources/faq',
            '[MMN](https://my.mysterium.network)',
          ],
        }
      }
    }
  ]
}
