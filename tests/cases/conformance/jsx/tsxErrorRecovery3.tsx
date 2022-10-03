//@jsx: react

//@filename: file1.tsx
declare namespace JSX { interface Element { } }

<div></div>
<div></div>

//@filename: file2.tsx
var x = <div></div><div></div>
