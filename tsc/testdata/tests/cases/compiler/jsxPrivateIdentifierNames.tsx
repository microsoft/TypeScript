// @target: es2015
// @jsx: preserve,react

declare const React: any;
declare namespace JSX {
    interface IntrinsicElements {
        [name: string]: any;
    }
}

const a = <#a></#a>;
const b = <#b />;
const c = <div #c />;
const d = <div #d="d" />;
const e = <div #e:f />;
const f = <div f:#g />;
const g = <a:#h />;
const h = <#i:j />;
const i = <a.#k />;
