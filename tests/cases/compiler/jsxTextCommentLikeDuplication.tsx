// @jsx: preserve
// @module: none
// @filename: jsxTextCommentLikeDuplication.tsx

function App() {}
const jsx = <App>/* no */{/* 1 */ 123 /* 2 */}/* no */</App>;