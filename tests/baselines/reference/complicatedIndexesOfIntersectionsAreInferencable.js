//// [tests/cases/compiler/complicatedIndexesOfIntersectionsAreInferencable.ts] ////

//// [complicatedIndexesOfIntersectionsAreInferencable.ts]
interface FormikConfig<Values> {
    initialValues: Values;
    validate?: (props: Values) => void;
    validateOnChange?: boolean;
}

declare function Func<Values = object, ExtraProps = {}>(
    x: (string extends "validate" | "initialValues" | keyof ExtraProps
        ? Readonly<FormikConfig<Values> & ExtraProps>
        : Pick<Readonly<FormikConfig<Values> & ExtraProps>, "validate" | "initialValues" | Exclude<keyof ExtraProps, "validateOnChange">>
        & Partial<Pick<Readonly<FormikConfig<Values> & ExtraProps>, "validateOnChange" | Extract<keyof ExtraProps, "validateOnChange">>>)
): void;

Func({
    initialValues: {
        foo: ""
    },
    validate: props => {
        props.foo;
    }
});

//// [complicatedIndexesOfIntersectionsAreInferencable.js]
"use strict";
Func({
    initialValues: {
        foo: ""
    },
    validate: function (props) {
        props.foo;
    }
});
