// @target: es2015
// @strict: true
// @jsx: preserve
// @noEmit: true

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    div: any;
  }
}

function Component() {
  return (
    <div>
      <dov></dov>
      <dav></dav>
    </div>
  );
}
const components = {
    div: 'div',
} as const;

function ComponentWithPropertyAccess() {
    return <components.dov />;
}
function ComponentWithValidOpeningTag() {
    return <div></dov>;
}