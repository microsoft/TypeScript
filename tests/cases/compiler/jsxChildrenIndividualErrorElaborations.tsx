// @jsx: react
// @strict: true
// @filename: index.tsx
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface Props {
  children: (x: number) => string;
}

export function Blah(props: Props) {
  return <></>;
}

// Incompatible child.
var a = <Blah>
  {x => x}
</Blah>

// Blah components don't accept text as child elements
var a = <Blah>
  Hello unexpected text!
</Blah>

// Blah components don't accept multiple children.
var a = <Blah>
  {x => "" + x}
  {x => "" + x}
</Blah>

interface PropsArr {
  children: ((x: number) => string)[];
}

export function Blah2(props: PropsArr) {
  return <></>;
}

// Incompatible child.
var a = <Blah2>
  {x => x}
</Blah2>

// Blah2 components don't accept text as child elements
var a = <Blah2>
  Hello unexpected text!
</Blah2>

// Blah2 components don't accept multiple children of the wrong type.
var a = <Blah2>
  {x => x}
  {x => x}
</Blah2>

type Cb = (x: number) => string;
interface PropsMixed {
  children: Cb | Cb[];
}

export function Blah3(props: PropsMixed) {
  return <></>;
}

// Incompatible child.
var a = <Blah3>
  {x => x}
</Blah3>

// Blah3 components don't accept text as child elements
var a = <Blah3>
  Hello unexpected text!
</Blah3>

// Blah3 components don't accept multiple children of the wrong type.
var a = <Blah3>
  {x => x}
  {x => x}
</Blah3>
