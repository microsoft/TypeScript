// @jsx: react-jsx
// @target: esnext
/// <reference path="/.lib/react16.d.ts" />

declare module "react" {
    interface Attributes {
        [key: `do-${string}`]: Function;
        "ns:thing"?: string;
    }
}

export const tag = <div ns:thing="a"/>