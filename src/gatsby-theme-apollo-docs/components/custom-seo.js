// src/gatsby-theme-apollo-docs/components/seo.js

import PropTypes from 'prop-types';
import React from 'react';
import {SEO} from 'gatsby-theme-apollo-core';
import {withPrefix} from 'gatsby';

export default function CustomSeo({image, baseUrl, twitterHandle, ...props}) {
  const imagePath = withPrefix('/' + image);
  return (
    <SEO {...props} twitterCard="summary_large_image">
      <meta property="og:image" content="/cover.png" />
      {baseUrl && <meta name="twitter:image" content={baseUrl + imagePath} />}
      {twitterHandle && (
        <meta name="twitter:site" content={`@${twitterHandle}`} />
      )}
    </SEO>
  );
}

CustomSeo.propTypes = {
  baseUrl: PropTypes.string,
  image: PropTypes.string.isRequired,
  twitterHandle: PropTypes.string
};
