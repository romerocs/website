import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header.jsx';
import Card from './card';
import Hr from './hr';

import Image from './image';
import SEO from './seo';

const shortcodes = { Image, SEO };

const Home = ({ children }) => (

  <MDXProvider components={shortcodes}>
    <StaticQuery
      query={graphql`
      query HomeQuery {
        allMdx(filter: {frontmatter: {posttype: {eq: "blog"}}}) {
          nodes {
            frontmatter {
              title,
              slug
            }
          }
        }
      }
    `}
      render={data => {

        const mdxContent = children;
        const posts = data.allMdx.nodes;
        return (
          <React.Fragment>
            <div className='l-stack not-footer' style={{ '--st-space': 'var(--vertical-rhythm)' }}>
              <Header />

              <section className='l-center' style={{ "--cr-align": "flex-start" }}>
                {mdxContent}
              </section>

              <div className='l-center' style={{ width: "100%" }}>
                <Hr />
              </div>

              <section className='l-center l-stack' style={{ "--cr-align": "flex-start" }}>
                <h2>Posts</h2>
                {
                  posts.map((post, i) => {
                    const { title } = post.frontmatter;
                    const { slug } = post.frontmatter;
                    return <Card title={title} slug={slug} key={i} />;

                  })
                }
              </section>
            </div>
            <footer className='footer'>
              <div className="l-center">

                <p>😀 Oh hi there!</p>
                <p>Where to find me:</p>
                <ul>
                  <li>https://www.twitter.com/csrcreative</li>
                  <li>https://codepen.io/romerocs</li>
                  <li>https://github.com/romerocs</li>
                </ul>
              </div>
            </footer>
          </React.Fragment>
        );
      }}
    />
  </MDXProvider>
);

Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Home;
