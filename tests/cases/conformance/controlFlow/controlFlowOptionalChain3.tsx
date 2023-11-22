// @strict: true
// @noEmit: true
// @esModuleInterop: true
// @jsx: react

/// <reference path="/.lib/react16.d.ts" />

// https://github.com/microsoft/TypeScript/issues/56482

import React from "react";

interface Foo {
  bar: boolean;
}

function test1(foo: Foo | undefined) {
  if (foo?.bar === false) {
    foo;
  }
  foo;
}

function test2(foo: Foo | undefined) {
  if (foo?.bar === false) {
    foo;
  } else {
    foo;
  }
}

function Test3({ foo }: { foo: Foo | undefined }) {
  return (
    <div>
      {foo?.bar === false && "foo"}
      {foo.bar ? "true" : "false"}
    </div>
  );
}

function test4(options?: { a?: boolean; b?: boolean }) {
  if (options?.a === false || options.b) {
    options;
  }
}
