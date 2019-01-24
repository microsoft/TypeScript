// @jsx: react
// @strict: true
/// <reference path="/.lib/react16.d.ts" />

import * as React from 'react';

const myHoc = <ComposedComponentProps extends any>(
    ComposedComponent: React.ComponentClass<ComposedComponentProps>,
) => {
    type WrapperComponentProps = ComposedComponentProps & { myProp: string };
    const WrapperComponent: React.ComponentClass<WrapperComponentProps> = null as any;

    const props: ComposedComponentProps = null as any;

    // Expected no error, got none - good
    <WrapperComponent {...props} myProp={'1000000'} />;
    // Expected error, but got none - bad!
    <WrapperComponent {...props} myProp={1000000} />;
};
