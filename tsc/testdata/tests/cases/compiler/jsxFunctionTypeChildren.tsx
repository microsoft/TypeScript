// @strict: true
// @target: esnext
// @noEmit: true
// @jsx: preserve

// https://github.com/microsoft/typescript-go/issues/2703

/// <reference path="/.lib/react.d.ts" />

import * as React from 'react';

type BaseProps = { locale: string };

type Props<T extends BaseProps> = {
    children: (props: T) => React.ReactNode;
} & T;

declare function Comp<T extends BaseProps>(props: Props<T>): JSX.Element;

const bp: BaseProps = { locale: 'en' };

// Error in ts-go: Type '(props: ...) => Element' is not assignable to
// type '((props: ...) => ReactNode) & {}'.
const el = <Comp {...bp}>{(props) => <div>{props.locale}</div>}</Comp>;

// But the equivalent non-JSX call works fine:
Comp({ ...bp, children: (props) => <div>{props.locale}</div> });
