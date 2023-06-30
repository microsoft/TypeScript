// @jsx: preserve
// @strict: true
// @filename: a.tsx
namespace JSX {
    export interface IntrinsicElements { [key: string]: any }
}

const a = {} as never;
const b = null;
const c = undefined;

const d = <div { ...a } />
const e = <div { ...b } />
const f = <div { ...c } />
