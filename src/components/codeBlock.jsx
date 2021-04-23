import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import synthwave84 from 'prism-react-renderer/themes/synthwave84';

const CodeBlock = ({ children, className }) => {
  // Pull the className
  const language = className.replace(/language-/, '') || "";
  const theme = synthwave84;

  return (
    <Highlight {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} code-block`} style={{ ...style }}>
          <code>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index });
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key}{...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            }
            )}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;