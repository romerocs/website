import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from "@reach/router";

import appleTouchIcon from "../../static/favicons/apple-touch-icon.png";
import favicon16 from "../../static/favicons/favicon-16x16.png";
import favicon32 from "../../static/favicons/favicon-32x32.png";
import icon192 from "../../static/favicons/android-chrome-192x192.png";
import icon512 from "../../static/favicons/android-chrome-512x512.png";


const Seo = ({ title, description, image, article, favicons }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(query);

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <link rel="apple-touch-icon" sizes="180x180" href={favicons.appleTouch} />
      <link rel="icon" type="image/png" sizes="32x32" href={favicons.favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicons.favicon16} />
      <link rel="icon" type="image/png" sizes="192x192" href={favicons.icon192} />
      <link rel="icon" type="image/png" sizes="512x512" href={favicons.icon512} />


      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

Seo.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
  favicons: {
    appleTouch: appleTouchIcon,
    favicon32: favicon32,
    favicon16: favicon16,
    icon192: icon192,
    icon512: icon512
  }
};

const query = graphql`
  query Seo {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
        defaultImage: image
      }
    }
  }
`;