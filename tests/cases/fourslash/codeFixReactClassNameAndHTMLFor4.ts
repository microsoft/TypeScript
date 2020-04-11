/// <reference path='fourslash.ts' />

// @jsx: react
// @Filename: /a.tsx
////declare namespace JSX {
////interface Element {}
////interface IntrinsicElements {
////div: { className?: string }
////label: { htmlFor?: string }
////}}
////<div class="a" />;
////<label for="a" />;
////<div class="a" />;
////<div class="a" id="a" />;
////<div id="b" />;

verify.codeFixAll({
    newFileContent: `declare namespace JSX {
interface Element {}
interface IntrinsicElements {
div: { className?: string }
label: { htmlFor?: string }
}}
<div className="a" />;
<label htmlFor="a" />;
<div className="a" />;
<div className="a" id="a" />;
<div id="b" />;`, fixId: "fixReactClassNameAndHTMLFor",
    fixAllDescription: "Fix all detected spelling errors"
});
