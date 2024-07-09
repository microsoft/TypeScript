// @strict: true
// @filename: node_modules/prop-types/index.d.ts
export const nominalTypeHack: unique symbol;

export type IsOptional<T> = undefined | null extends T ? true : undefined extends T ? true : null extends T ? true : false;

export type RequiredKeys<V> = { [K in keyof V]-?: Exclude<V[K], undefined> extends Validator<infer T> ? IsOptional<T> extends true ? never : K : never }[keyof V];
export type OptionalKeys<V> = Exclude<keyof V, RequiredKeys<V>>;
export type InferPropsInner<V> = { [K in keyof V]-?: InferType<V[K]>; };

export interface Validator<T> {
    (props: object, propName: string, componentName: string, location: string, propFullName: string): Error | null;
    [nominalTypeHack]?: T;
}

export interface Requireable<T> extends Validator<T> {
    isRequired: Validator<NonNullable<T>>;
}

export type ValidationMap<T> = { [K in keyof T]?: Validator<T[K]> };

export type InferType<V> = V extends Validator<infer T> ? T : any;
export type InferProps<V> =
    & InferPropsInner<Pick<V, RequiredKeys<V>>>
    & Partial<InferPropsInner<Pick<V, OptionalKeys<V>>>>;

export const any: Requireable<any>;
export const array: Requireable<any[]>;
export const bool: Requireable<boolean>;
export const string: Requireable<string>;
export const number: Requireable<number>;
export function shape<P extends ValidationMap<any>>(type: P): Requireable<InferProps<P>>;
export function oneOfType<T extends Validator<any>>(types: T[]): Requireable<NonNullable<InferType<T>>>;


// @filename: file.ts
import * as PropTypes from "prop-types";
interface Props {
    any?: any;
    array: string[];
    bool: boolean;
    shape: {
        foo: string;
        bar?: boolean;
        baz?: any
    };
    oneOfType: string | boolean | {
        foo?: string;
        bar: number;
    };
}

type PropTypesMap = PropTypes.ValidationMap<Props>;

const innerProps = {
    foo: PropTypes.string.isRequired,
    bar: PropTypes.bool,
    baz: PropTypes.any
};

const arrayOfTypes = [PropTypes.string, PropTypes.bool, PropTypes.shape({
    foo: PropTypes.string,
    bar: PropTypes.number.isRequired
})];

// TS checking
const propTypes: PropTypesMap = {
    any: PropTypes.any,
    array: PropTypes.array.isRequired,
    bool: PropTypes.bool.isRequired,
    shape: PropTypes.shape(innerProps).isRequired,
    oneOfType: PropTypes.oneOfType(arrayOfTypes).isRequired,
};

// JS checking
const propTypesWithoutAnnotation = {
    any: PropTypes.any,
    array: PropTypes.array.isRequired,
    bool: PropTypes.bool.isRequired,
    shape: PropTypes.shape(innerProps).isRequired,
    oneOfType: PropTypes.oneOfType(arrayOfTypes).isRequired,
};

type ExtractedProps = PropTypes.InferProps<typeof propTypes>;

type ExtractedPropsWithoutAnnotation = PropTypes.InferProps<typeof propTypesWithoutAnnotation>;

type ExtractPropsMatch = ExtractedProps extends ExtractedPropsWithoutAnnotation ? true : false;
const x: true = (null as any as ExtractPropsMatch);