//@jsx: preserve

//@filename: file.tsx
declare module JSX {
  interface Element {}
  interface IntrinsicElements {
    [s: string]: any;
  }
}

// @filename: Error1.tsx
let x1 = <div>}</div>;

// @filename: Error2.tsx
let x2 = <div>></div>;

// @filename: Error3.tsx
let x3 = <div>{"foo"}}</div>;

// @filename: Error4.tsx
let x4 = <div>{"foo"}></div>;

// @filename: Error5.tsx
let x5 = <div>}{"foo"}</div>;

// @filename: Error6.tsx
let x6 = <div>>{"foo"}</div>;
