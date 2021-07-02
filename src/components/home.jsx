import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import NotFooter from "./NotFooter.jsx";
import Header from './header.jsx';
import Footer from './footer.jsx';

import Card from './card';
import Hr from './hr';

import Image from './image';
import Seo from './seo';

const shortcodes = { Image };

const Home = ({ children }) => (

  <MDXProvider components={shortcodes}>
    <Seo />
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
            <NotFooter>
              <Header />
              <main className='l-stack u-margin-top-0'>
                <section className='l-center introduction' style={{ "--cr-align": "flex-start" }}>
                  {mdxContent}
                </section>

                <section className='l-center l-stack' style={{ "--cr-align": "flex-start" }}>
                  <Hr />
                  <h2>Posts</h2>
                  {
                    posts.map((post, i) => {
                      const { title } = post.frontmatter;
                      const { slug } = post.frontmatter;
                      return <Card title={title} slug={slug} key={i} />;

                    })
                  }
                </section>
              </main>
            </NotFooter>
            <Footer />
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
