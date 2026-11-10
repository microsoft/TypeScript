// @target: esnext
// @jsx: react
// @noEmit: true
// @noTypesAndSymbols: true

declare const React: any;

const a = <#a></#a>;
const b = <div #b />;
const c = <div #c="" />;
const d = <div #d:e />;
const e = <a:#f />;
