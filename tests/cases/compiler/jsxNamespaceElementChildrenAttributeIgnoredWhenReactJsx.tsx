//@jsx: react-jsx,react-jsxdev
//@jsxImportSource: /jsx
//@filename: /jsx.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    h1: { children: string }
  }

  type Element = string;

  interface ElementChildrenAttribute {
    offspring: any;
  }
}

//@filename: /test.tsx
const Title = (props: { children: string }) => <h1>{props.children}</h1>;

<Title>Hello, world!</Title>;

const Wrong = (props: { offspring: string }) => <h1>{props.offspring}</h1>;

<Wrong>Byebye, world!</Wrong>

//@filename: /jsx/jsx-runtime.ts
export {};
//@filename: /jsx/jsx-dev-runtime.ts
export {};
