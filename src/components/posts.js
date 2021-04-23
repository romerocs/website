import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from 'gatsby';

import Header from './header.jsx';
import Stack from './stack';
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
      <Stack>
        <Header />
        <div className='l-center'>
          <Stack>
            <MDXRenderer>
              {body}
            </MDXRenderer>
          </Stack>
        </div>
      </Stack>

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