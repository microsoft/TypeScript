//@jsx: react-jsx,react-jsxdev
//@jsxImportSource: /jsx
//@filename: /jsx.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    h1: { children: string }
  }

  type Element = string;
}

//@filename: /test.tsx
const Title = (props: { children: string }) => <h1>{props.children}</h1>;

const element = <Title>Hello, world!</Title>;

//@filename: /jsx/jsx-runtime.ts
export {};
//@filename: /jsx/jsx-dev-runtime.ts
export {};