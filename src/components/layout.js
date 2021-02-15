import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header.jsx';
import './layout.css';


import Image from './image';
import SEO from './seo';

const shortcodes = { Image, SEO };
const stackSpace = "var(s0)";
const Layout = ({ children }) => (

  <MDXProvider components={shortcodes}>
    <StaticQuery
      query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
      render={data => (
        <div className='l-stack' style={{ '--st-space': 'var(--vertical-rhythm)' }}>
          <Header />
          <div className='l-center'>
            <div>
              {children}
            </div>
          </div>
        </div>
      )}
    />
  </MDXProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
