// @strict: true
// @jsx: react
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
function SomeComponent<T extends 'button' | 'a'>(props: { element?: T } & JSX.IntrinsicElements[T]): JSX.Element {
    // Just so the return value is RectElement, the rendered element doesnt matter
    return <div />
}

function Test<T extends 'button' | 'a'>(el: T) {
    return <SomeComponent element={el} />
}