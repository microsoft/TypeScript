// @strict: true
// @jsx: react
// @esModuleInterop: true
// @lib: esnext, dom
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

import React from "react";

// https://github.com/microsoft/TypeScript/issues/46680

type Action1 = { kind: "A"; payload: number } | { kind: "B"; payload: string };

function example1({ kind, ...rest }: Action1) {
  if (kind === "A") {
    rest.payload.toFixed();
  }
  if (kind === "B") {
    rest.payload.toUpperCase();
  }
}

type Action2 = [kind: "A", payload: number] | [kind: "B", payload: string];

function example2([kind, ...rest]: Action2) {
  if (kind === "A") {
    rest[0].toFixed();
  }
  if (kind === "B") {
    rest[0].toUpperCase();
  }
}

type Props1 =
  | ({ as: "div" } & React.ComponentPropsWithRef<"div">)
  | ({ as: "span" } & React.ComponentPropsWithRef<"span">);

function MyComponent1({ as, ...rest }: Props1) {
  if (as === "div") {
    return <div {...rest} />;
  }
  if (as === "span") {
    return <span {...rest} />;
  }
}

type Params1 = {
  foo: string;
} & ({ tag: "a"; type: number } | { tag: "b"; type: string });

const fn1 = <P extends Params1>(params: P) => {
  const { foo, ...rest } = params;

  if (rest.tag === "a") {
    rest.type.toFixed(); // ok
    return rest; // Omit<P, "foo">
  }

  return undefined;
};

const fn2 = <P extends Params1>({ foo, ...rest }: P) => {
  if (rest.tag === "a") {
    rest.type.toFixed(); // ok
    return rest; // Omit<P, "foo">
  }

  return undefined;
};

// https://github.com/microsoft/TypeScript/issues/53947

function ImageAvatar(props: { className?: string; src: string }) {
  return null;
}

function InitialsAvatar(props: { className?: string; name: string }) {
  return null;
}

type AvatarProps =
  | { type: "image"; src: string; className: string }
  | { type: "initials"; name: string; className: string };

const Avatar = ({ type, className, ...rest }: AvatarProps) => {
  if (type === "image") {
    return <ImageAvatar className={className} {...rest} />;
  }

  if (type === "initials") {
    return <InitialsAvatar className={className} {...rest} />;
  }

  throw new Error("");
};
