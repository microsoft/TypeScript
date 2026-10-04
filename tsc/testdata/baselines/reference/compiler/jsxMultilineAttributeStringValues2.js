//// [tests/cases/compiler/jsxMultilineAttributeStringValues2.tsx] ////

//// [jsxMultilineAttributeStringValues2.tsx]
const a = <div className= "foo

 bar" />;

const b = <div className=	"foo

 bar" />;

const c = <div className=
"foo

 bar" />;

const d = <div className=   "foo

 bar" />;


//// [jsxMultilineAttributeStringValues2.jsx]
"use strict";
const a = <div className="foo

 bar"/>;
const b = <div className="foo

 bar"/>;
const c = <div className="foo

 bar"/>;
const d = <div className="foo

 bar"/>;
