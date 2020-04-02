// @filename: foo.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

import React = require('react');

type TypeProps = { foo?: boolean; };
interface InterfaceProps { foo?: boolean; }

function Foo<T>() {
    return null;
}

<>
    <Foo<unknown> />
    <Foo<string> />
    <Foo<boolean> />
    <Foo<object> />
    <Foo<null> />
    <Foo<any> />
    <Foo<never> />
    <Foo<undefined> />
    <Foo<TypeProps> />
    <Foo<InterfaceProps> />
</>