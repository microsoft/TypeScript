// @target: es2015
// @strict: true
// @jsx: react
// @esModuleInterop: true
// @noEmit: true

/// <reference path="/.lib/react16.d.ts" />

// https://github.com/microsoft/typescript-go/issues/2802

import * as React from 'react';

declare const TestComponentWithChildren: <T, TParam>(props: {
  state: T;
  selector?: (state: NoInfer<T>) => TParam;
  children?: (state: NoInfer<TParam>) => React.ReactElement<any> | null;
}) => React.ReactElement<any>;

declare const TestComponentWithoutChildren: <T, TParam>(props: {
  state: T;
  selector?: (state: NoInfer<T>) => TParam;
  notChildren?: (state: NoInfer<TParam>) => React.ReactElement<any> | null;
}) => React.ReactElement<any>;

const App = () => {
  return (
    <>
      <TestComponentWithChildren state={{ foo: 123 }} selector={(state) => state.foo}>
        {(selected) => <div>{Math.max(selected, 0)}</div>}
      </TestComponentWithChildren>

      <TestComponentWithoutChildren
        state={{ foo: 123 }}
        selector={(state) => state.foo}
        notChildren={(selected) => <div>{Math.max(selected, 0)}</div>}
      />
    </>
  );
};

// https://github.com/microsoft/typescript-go/issues/2797

interface State {
  value: boolean
}

declare const Subscribe: <TSelected = State>(props: {
  selector?: (state: State) => TSelected
  children: (state: TSelected) => void
}) => React.ReactElement<any>

const _result = (
  <Subscribe
    selector={(state) => {
      return [state.value]
    }}
  >
    {([value = false]) => {
      console.log(value)
    }}
  </Subscribe>
)
