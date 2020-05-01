// @filename: a.ts
/**
 @ts-ignore */
export let x: string = 100;

/**
 @ts-expect-error */
export let y: string = 100;

/**
 @ts-expect-error */
export let ok = 100;

// @filename: b.tsx
// @jsx: react
// @libFiles: react.d.ts,lib.d.ts
import * as React from "react";

export function MyComponent(props: { foo: string }) {
  return <div />;
}

let x = (
  <div>
    {/*
   @ts-ignore */}
    <MyComponent foo={100} />;
  </div>
);

let y = (
  <div>
    {/*
   @ts-expect-error */}
    <MyComponent foo={100} />;
  </div>
);

let ok = (
  <div>
    {/*
   @ts-expect-error */}
    <MyComponent foo={"hooray"} />;
  </div>
);
