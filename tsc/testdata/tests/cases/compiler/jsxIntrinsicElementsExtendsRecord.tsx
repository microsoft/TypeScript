// @target: es2015
// @jsx: preserve

// @filename: index.tsx
declare namespace JSX {
  interface IntrinsicElements extends Record<string, any> {}
}

<a />;
