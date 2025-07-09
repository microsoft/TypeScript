// @removeComments: true, false
// @jsx: react, react-jsx, preserve

// @filename: file.tsx
let x = "hi";
const eg1 = <div>{x}/*mid*/{x}</div>;
const eg2 = <div>/*pre*/{x}/*post*/</div>;
const eg3 = <div>/*pre*/{x}/*mid*/{x}/*post*/</div>;
const eg4 = <div>/*pre*/<span/>*post*/</div>;
const eg5 = <div>/*pre*/{/*keep me*/}/*post*/</div>;
