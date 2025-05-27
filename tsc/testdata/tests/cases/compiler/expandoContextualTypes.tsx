// @strict: true
// @target: esnext
// @noEmit: true
// @jsx: preserve

// https://github.com/microsoft/typescript-go/issues/921

/// <reference path="/.lib/react16.d.ts" />

import type { ComponentType } from "react";

export type Page<P = NonNullable<unknown>> = ComponentType<P> & {
    getLayout?: (component: JSX.Element) => JSX.Element;
}

export const FooPage: Page = () => {
    return (
        <div>
            <p>Foo</p>
        </div>
    )
};

FooPage.getLayout = () => {
    return <></>
};
