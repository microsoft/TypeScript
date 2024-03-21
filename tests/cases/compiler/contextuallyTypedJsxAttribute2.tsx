// @strict: true
// @jsx: react
// @esModuleInterop: true
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

import React from "react";
import { ComponentPropsWithRef, ElementType } from "react";

function UnwrappedLink<T extends ElementType = ElementType>(
  props: Omit<ComponentPropsWithRef<ElementType extends T ? "a" : T>, "as">,
) {
  return <a></a>;
}

<UnwrappedLink onClick={(e) => {}} />;

function UnwrappedLink2<T extends ElementType = ElementType>(
  props: Omit<ComponentPropsWithRef<ElementType extends T ? "a" : T>, "as"> & {
    as?: T;
  },
) {
  return <a></a>;
}

<UnwrappedLink2 onClick={(e) => {}} />;
<UnwrappedLink2 as="button" onClick={(e) => {}} />;
