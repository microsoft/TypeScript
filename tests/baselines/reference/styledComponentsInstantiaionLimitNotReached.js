//// [tests/cases/compiler/styledComponentsInstantiaionLimitNotReached.ts] ////

//// [styledComponentsInstantiaionLimitNotReached.ts]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface REACT_STATICS {
    childContextTypes: true;
    contextType: true;
    contextTypes: true;
    defaultProps: true;
    displayName: true;
    getDefaultProps: true;
    getDerivedStateFromError: true;
    getDerivedStateFromProps: true;
    mixins: true;
    propTypes: true;
    type: true;
}

interface KNOWN_STATICS {
    name: true;
    length: true;
    prototype: true;
    caller: true;
    callee: true;
    arguments: true;
    arity: true;
}

interface MEMO_STATICS {
    '$$typeof': true;
    compare: true;
    defaultProps: true;
    displayName: true;
    propTypes: true;
    type: true;
}

interface FORWARD_REF_STATICS {
    '$$typeof': true;
    render: true;
    defaultProps: true;
    displayName: true;
    propTypes: true;
}


type NonReactStatics<
    S extends React.ComponentType<any>,
    C extends {
        [key: string]: true
    } = {}
    > = {
        [key in Exclude<
            keyof S,
            S extends React.MemoExoticComponent<any>
            ? keyof MEMO_STATICS | keyof C
            : S extends React.ForwardRefExoticComponent<any>
            ? keyof FORWARD_REF_STATICS | keyof C
            : keyof REACT_STATICS | keyof KNOWN_STATICS | keyof C
        >]: S[key]
    };

export type AnyStyledComponent = StyledComponent<any, any, any, any> | StyledComponent<any, any, any>;
export type StyledComponent<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    T extends object,
    O extends object = {},
    A extends keyof any = never
    > = // the "string" allows this to be used as an object key
    // I really want to avoid this if possible but it's the only way to use nesting with object styles...
    string &
    StyledComponentBase<C, T, O, A> &
    NonReactStatics<C extends React.ComponentType<any> ? C : never>;

export type StyledComponentProps<
    // The Component from whose props are derived
    C extends string | React.ComponentType<any>,
    // The Theme from the current context
    T extends object,
    // The other props added by the template
    O extends object,
    // The props that are made optional by .attrs
    A extends keyof any
    > =
    // Distribute O if O is a union type
    O extends object
    ? WithOptionalTheme<
        Omit<
            ReactDefaultizedProps<
                C,
                React.ComponentPropsWithRef<
                    C extends IntrinsicElementsKeys | React.ComponentType<any> ? C : never
                >
            > &
            O,
            A
        > &
        Partial<
            Pick<
                React.ComponentPropsWithRef<
                    C extends IntrinsicElementsKeys | React.ComponentType<any> ? C : never
                > &
                O,
                A
            >
        >,
        T
    > &
    WithChildrenIfReactComponentClass<C>
    : never;

type Defaultize<P, D> = P extends any
    ? string extends keyof P
    ? P
    : Pick<P, Exclude<keyof P, keyof D>> &
    Partial<Pick<P, Extract<keyof P, keyof D>>> &
    Partial<Pick<D, Exclude<keyof D, keyof P>>>
    : never;

type ReactDefaultizedProps<C, P> = C extends { defaultProps: infer D } ? Defaultize<P, D> : P;

type WithChildrenIfReactComponentClass<C extends string | React.ComponentType<any>> = C extends React.ComponentClass<
    any
>
    ? { children?: React.ReactNode }
    : {};
export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;
type WithOptionalTheme<P extends { theme?: T }, T> = Omit<P, 'theme'> & {
    theme?: T;
};

type ForwardRefExoticBase<P> = Pick<React.ForwardRefExoticComponent<P>, keyof React.ForwardRefExoticComponent<any>>;

type StyledComponentPropsWithAs<
    C extends string | React.ComponentType<any>,
    T extends object,
    O extends object,
    A extends keyof any,
    F extends string | React.ComponentType<any> = C
    > = StyledComponentProps<C, T, O, A> & { as?: C; forwardedAs?: F };

export type StyledComponentInnerOtherProps<C extends AnyStyledComponent> = C extends StyledComponent<
    any,
    any,
    infer O,
    any
>
    ? O
    : C extends StyledComponent<any, any, infer O>
    ? O
    : never;
export type StyledComponentInnerAttrs<C extends AnyStyledComponent> = C extends StyledComponent<any, any, any, infer A>
    ? A
    : never;

export interface StyledComponentBase<
    C extends string | React.ComponentType<any>,
    T extends object,
    O extends object = {},
    A extends keyof any = never
    > extends ForwardRefExoticBase<StyledComponentProps<C, T, O, A>> {
    // add our own fake call signature to implement the polymorphic 'as' prop
    (props: StyledComponentProps<C, T, O, A> & { as?: never; forwardedAs?: never }): React.ReactElement<
        StyledComponentProps<C, T, O, A>
    >;
    <AsC extends string | React.ComponentType<any> = C, FAsC extends string | React.ComponentType<any> = AsC>(
        props: StyledComponentPropsWithAs<AsC, T, O, A, FAsC>,
    ): React.ReactElement<StyledComponentPropsWithAs<AsC, T, O, A, FAsC>>;

    withComponent<WithC extends AnyStyledComponent>(
        component: WithC,
    ): StyledComponent<
        StyledComponentInnerComponent<WithC>,
        T,
        O & StyledComponentInnerOtherProps<WithC>,
        A | StyledComponentInnerAttrs<WithC>
    >;
    withComponent<WithC extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(
        component: WithC,
    ): StyledComponent<WithC, T, O, A>;
}

export type StyledComponentInnerComponent<C extends React.ComponentType<any>> = C extends StyledComponent<
    infer I,
    any,
    any,
    any
>
    ? I
    : C extends StyledComponent<infer I, any, any>
    ? I
    : C;
export type StyledComponentPropsWithRef<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
    > = C extends AnyStyledComponent
    ? React.ComponentPropsWithRef<StyledComponentInnerComponent<C>> // shouldn't have an instantiation limit error
    : React.ComponentPropsWithRef<C>;

//// [styledComponentsInstantiaionLimitNotReached.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
