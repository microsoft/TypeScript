// @filename: a.ts
export const texts: string[] = [];

/**
 @ts-ignore */
texts.push(100);

/**
 @ts-expect-error */
texts.push(100);

/**
 @ts-expect-error */
texts.push("100");

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
    <MyComponent foo={100} />

    {/*@ts-ignore*/}
    <MyComponent foo={100} />

    {/*
   @ts-expect-error */}
    <MyComponent foo={100} />

    {/*
   // @ts-expect-error */}
    <MyComponent foo={100} />

    {/*
   * @ts-expect-error */}
    <MyComponent foo={100} />

    {/*@ts-expect-error*/}
    <MyComponent foo={100} />

    {/*
   @ts-expect-error */}
    <MyComponent foo={"hooray"} />
  </div>
);
