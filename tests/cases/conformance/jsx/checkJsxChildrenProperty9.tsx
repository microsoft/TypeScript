// @filename: file.tsx
// @jsx: preserve
// @skipLibCheck: true
// @libFiles: react.d.ts

import React = require('react');

// OK
let k1 = <div> <h2> Hello </h2> <h1> world </h1></div>;
let k2 = <div> <h2> Hello </h2> {(user: any) => <h2>{user.name}</h2>}</div>;
let k3 = <div> {1} {"That is a number"} </div>;