// @target: esnext
// @jsx: preserve,react

declare const React: any;
declare namespace JSX {
    interface IntrinsicElements {
        [name: string]: any;
    }
}

const a = <#a></#a>;
const b = <div #b />;
const c = <div #c="" />;
const d = <div #d:e />;
const e = <a:#f />;
const f = <a.#g />;
const g = <#h:i />;
const h = <div j:#k />;
const i = <#l-m></#l-m>;
const j = <div #n-o={1} />;
const k = <div #p #q="" r="" />;
const l = <# />;
