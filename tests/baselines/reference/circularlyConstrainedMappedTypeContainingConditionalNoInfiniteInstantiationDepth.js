//// [tests/cases/compiler/circularlyConstrainedMappedTypeContainingConditionalNoInfiniteInstantiationDepth.ts] ////

//// [circularlyConstrainedMappedTypeContainingConditionalNoInfiniteInstantiationDepth.ts]
declare class Component<P> {
    constructor(props: Readonly<P>);
    constructor(props: P, context?: any);
    readonly props: Readonly<P> & Readonly<{ children?: {} }>;
}
interface ComponentClass<P = {}> {
    new (props: P, context?: any): Component<P>;
    propTypes?: WeakValidationMap<P>;
    defaultProps?: Partial<P>;
    displayName?: string;
}
interface FunctionComponent<P = {}> {
    (props: P & { children?: {} }, context?: any): {} | null;
    propTypes?: WeakValidationMap<P>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

export declare const nominalTypeHack: unique symbol;
export interface Validator<T> {
    (props: object, propName: string, componentName: string, location: string, propFullName: string): Error | null;
    [nominalTypeHack]?: T;
}
type WeakValidationMap<T> = {
    [K in keyof T]?: null extends T[K]
        ? Validator<T[K] | null | undefined>
        : undefined extends T[K]
        ? Validator<T[K] | null | undefined>
        : Validator<T[K]>
};
type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>;

export type Shared<
    InjectedProps,
    DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
    > = {
        [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never;
    };

// Infers prop type from component C
export type GetProps<C> = C extends ComponentType<infer P> ? P : never;

export type ConnectedComponentClass<
    C extends ComponentType<any>,
    P
> = ComponentClass<P> & {
    WrappedComponent: C;
};

export type Matching<InjectedProps, DecorationTargetProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
        ? InjectedProps[P] extends DecorationTargetProps[P]
            ? DecorationTargetProps[P]
            : InjectedProps[P]
        : DecorationTargetProps[P];
};

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type InferableComponentEnhancerWithProps<TInjectedProps, TNeedsProps> =
    <C extends ComponentType<Matching<TInjectedProps, GetProps<C>>>>(
        component: C
    ) => ConnectedComponentClass<C, Omit<GetProps<C>, keyof Shared<TInjectedProps, GetProps<C>>> & TNeedsProps>;


//// [circularlyConstrainedMappedTypeContainingConditionalNoInfiniteInstantiationDepth.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
