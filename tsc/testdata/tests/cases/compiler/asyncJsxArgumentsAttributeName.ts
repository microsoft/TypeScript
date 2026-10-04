// @target: es2015
// @jsx: preserve

// @filename: test.tsx
declare namespace JSX {
  interface IntrinsicElements { div: any; }
}

async function f() {
  return <div arguments={42} />;
}
