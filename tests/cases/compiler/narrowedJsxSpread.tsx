// @jsx: preserve
// @esModuleInterop: true
// @strict: true
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';
type Props = {
  foo?: string
}

const Component = ({ foo }: Required<Props>) => <p>{foo}</p>;
const Example = (props: Props) => (
  <>
    {props.foo && <Component {...props} />}
  </>
);

