// src/gatsby-theme-apollo-core/utils/colors.js
const { colors } = require("gatsby-theme-apollo-core/src/utils/colors")
const { colors: spaceKitColors } = require("@apollo/space-kit/colors")

exports.colors = {
  ...colors,
  primary: spaceKitColors.purple.darkest,
  primaryLight: spaceKitColors.purple.lighter,
}
