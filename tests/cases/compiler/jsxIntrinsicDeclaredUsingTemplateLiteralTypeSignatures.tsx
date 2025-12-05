// @jsx: preserve
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55240

declare namespace JSX {
  interface IntrinsicElements {
    [k: `foo${string}`]: { prop: string };
    [k: `foobar${string}`]: { prop: 'literal' };
  }
}

<foobaz prop="smth" />;
<foobaz prop={10} />;

<foobarbaz prop="literal"/>;
<foobarbaz prop="smth"/>;
