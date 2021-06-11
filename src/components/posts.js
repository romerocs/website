import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from 'gatsby';

import NotFooter from "./NotFooter.jsx";
import Header from './header.jsx';
import Footer from './footer.jsx';
import CodeBlock from './codeBlock';

import Image from './image';
import Seo from './seo';

const pre = props => <div {...props}></div>;

const components = {
  Image,
  Seo,
  pre: pre,
  code: CodeBlock
};

const Post = ({ data }) => {

  const { body } = data.mdx;

  return (
    <MDXProvider components={components}>
      <NotFooter>
        <Header />
        <main className='l-center'>
          <div className="l-stack">
            <MDXRenderer>
              {body}
            </MDXRenderer>
          </div>
        </main>
      </NotFooter>
      <Footer />
    </MDXProvider>
  );
};

export default Post;

export const query = graphql`
  query MDXQuery($id: String!) {
    mdx(id: {eq: $id }) {
    id
      body
    }
  }
`;