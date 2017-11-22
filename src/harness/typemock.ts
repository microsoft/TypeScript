/// <reference path="./core.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./vfs.ts" />

// NOTE: The contents of this file are all exported from the namespace 'typemock'. This is to
//       support the eventual conversion of harness into a modular system.

// typemock library
namespace typemock {
    type Imported<T extends Function> = T["prototype"];

    function unwrap<T>(module: any, _: () => PromiseLike<T>): T { return module; }

    const module = unwrap(require("../../scripts/typemock"), () => import("../../scripts/typemock"));

    export const Arg = module.Arg;

    export interface Arg extends Imported<typeof Arg> {
    }

    export interface Returns<U> {
        returns: U;
    }

    export interface Throws {
        throws: any;
    }

    export const Mock = module.Mock;

    export interface Mock<T> extends Imported<typeof Mock> {
        readonly value: T;
        setup<U = any>(callback: (value: T) => U, result?: Returns<U> | Throws): Mock<T>;
        setup(setups: Partial<T>): Mock<T>;
        verify(callback: (value: T) => any, times: Times): Mock<T>;
    }

    export type Callable = ((...args: any[]) => any);

    export type Constructable = (new (...args: any[]) => any);

    export const Spy = module.Spy;

    export interface Spy<T extends Callable | Constructable = Callable & Constructable> extends Imported<typeof Spy> {
        readonly value: T;
        verify(callback: (value: T) => any, times: Times): this;
    }

    export const Times = module.Times;

    export interface Times extends Imported<typeof Times> {
    }

    export interface Immediate {
        readonly kind: "immediate";
        readonly handle: number;
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
    }

    export interface Timeout {
        readonly kind: "timeout";
        readonly handle: number;
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
    }

    export interface Interval {
        readonly kind: "interval";
        readonly handle: number;
        readonly callback: (...args: any[]) => void;
        readonly args: ReadonlyArray<any>;
        readonly interval: number;
    }

    export interface AnimationFrame {
        readonly kind: "frame";
        readonly handle: number;
        readonly callback: (time: number) => void;
    }

    export declare type Timer = Immediate | Timeout | Interval | AnimationFrame;

    export const Timers = module.Timers;

    export interface Timers extends Imported<typeof Timers> {
    }

    export const Stub = module.Stub;

    export interface Stub<T, K extends keyof T> extends Imported<typeof Stub> {
        readonly target: T;
        readonly key: K;
        stubValue: T[K];
        readonly originalValue: T[K];
        readonly currentValue: T[K];
    }
}