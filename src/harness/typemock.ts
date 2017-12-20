/// <reference path="./core.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./vfs.ts" />

// NOTE: The contents of this file are all exported from the namespace 'typemock'. This is to
//       support the eventual conversion of harness into a modular system.

// NOTE: The commented code below is intended to support loading 'typemock' as a private package.
//       However, this does not seem to work in Node 6. If this issue cannot be resolved, the
//       comment below will be removed.

//// // typemock library
//// namespace typemock {
////     const module = require("typemock");
////     typemock.Arg = module.Arg;
////     typemock.Times = module.Times;
////     typemock.Mock = module.Mock;
////     typemock.Spy = module.Spy;
////     typemock.Inject = module.Inject;
////     typemock.Timers = module.Timers;
////     typemock.spy = module.spy;
//// }
////
//// declare module "typemock_" {
////     import * as typemock_ from "typemock";
////     global {
////         namespace typemock {
////             export import Arg = typemock_.Arg;
////             export import Times = typemock_.Times;
////             export import Mock = typemock_.Mock;
////             export import Spy = typemock_.Spy;
////             export import Returns = typemock_.Returns;
////             export import Throws = typemock_.Throws;
////             export import ThisArg = typemock_.ThisArg;
////             export import Callback = typemock_.Callback;
////             export import Fallback = typemock_.Fallback;
////             export import Setup = typemock_.Setup;
////             export import Callable = typemock_.Callable;
////             export import Constructable = typemock_.Constructable;
////             export import Inject = typemock_.Inject;
////             export import Timers = typemock_.Timers;
////             export import Timer = typemock_.Timer;
////             export import Timeout = typemock_.Timeout;
////             export import Interval = typemock_.Interval;
////             export import Immediate = typemock_.Immediate;
////             export import AnimationFrame = typemock_.AnimationFrame;
////             export import spy = typemock_.spy;
////         }
////     }
//// }

// typemock library (original sources in scripts/typemock)
namespace typemock {
    /**
     * Represents an argument condition used during verification.
     */
    export class Arg {
        private _validate: (value: any) => boolean;
        private _message: string;
        private _rest: boolean;

        private constructor(condition: (value: any) => boolean, message: string, rest = false) {
            this._validate = condition;
            this._message = message;
            this._rest = rest;
        }

        /**
         * Allows any value.
         */
        public static any<T = any>(): T & Arg {
            return <any>new Arg(() => true, `any`);
        }

        /**
         * Allows a value that matches the specified condition.
         * @param match The condition used to match the value.
         */
        public static is<T = any>(match: (value: T) => boolean): T & Arg {
            return <any>new Arg(match, `is`);
        }

        /**
         * Allows only a null value.
         */
        public static null<T = any>(): T & Arg {
            return <any>new Arg(value => value === null, `null`);
        }

        /**
         * Allows only a non-null value.
         */
        public static notNull<T = any>(): T & Arg {
            return Arg.not(Arg.null());
        }

        /**
         * Allows only an undefined value.
         */
        public static undefined<T = any>(): T & Arg {
            return <any>new Arg(value => value === undefined, `undefined`);
        }

        /**
         * Allows only a non-undefined value.
         */
        public static notUndefined<T = any>(): T & Arg {
            return Arg.not(Arg.undefined());
        }

        /**
         * Allows only an undefined or null value.
         */
        public static nullOrUndefined<T = any>(): T & Arg {
            return Arg.or(Arg.null(), Arg.undefined());
        }

        /**
         * Allows only a non-undefined, non-null value.
         */
        public static notNullOrUndefined<T = any>(): T & Arg {
            return Arg.not(Arg.nullOrUndefined());
        }

        public static optional<T = any>(condition: T | T & Arg): T & Arg {
            return Arg.or(condition, Arg.undefined());
        }

        /**
         * Allows any value within the provided range.
         * @param min The minimum value.
         * @param max The maximum value.
         */
        public static between<T = any>(min: T, max: T): T & Arg {
            return <any>new Arg(value => min <= value && value <= max, `between ${min} and ${max}`);
        }

        /**
         * Allows any value in the provided array.
         */
        public static in<T = any>(values: T[]): T & Arg {
            return <any>new Arg(value => values.indexOf(value) > -1, `in ${values.join(", ")}`);
        }

        /**
         * Allows any value not in the provided array.
         */
        public static notIn<T = any>(values: T[]): T & Arg {
            return Arg.not(Arg.in(values));
        }

        /**
         * Allows any value that matches the provided pattern.
         */
        public static match<T = any>(pattern: RegExp): T & Arg {
            return <any>new Arg(value => pattern.test(value), `matches ${pattern}`);
        }

        public static startsWith(text: string): string & Arg {
            return <any>new Arg(value => typeof value === "string" && value.startsWith(text), `starts with ${text}`);
        }

        public static endsWith(text: string): string & Arg {
            return <any>new Arg(value => typeof value === "string" && value.endsWith(text), `ends with ${text}`);
        }

        public static includes(value: string): string & string[] & Arg;
        public static includes<T>(value: T): T[] & Arg;
        public static includes<T>(value: T): Arg {
            return new Arg(_value => Array.isArray(_value) ? _value.indexOf(value) >= 0 : typeof _value === "string" && _value.includes("" + value), `contains ${value}`);
        }

        public static array<T>(values: (T | T & Arg)[]): T[] & Arg {
            const conditions = values.map(Arg.from);
            return <any>new Arg(value => value.length === conditions.length && Arg.validateAll(conditions, value), `array [${conditions.join(", ")}]`);
        }

        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "string"): string & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "number"): number & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "boolean"): boolean & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "symbol"): symbol & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "object"): object & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "function"): ((...args: any[]) => any) & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof(tag: "undefined"): undefined & Arg;
        /**
         * Allows any value with the provided `typeof` tag.
         */
        public static typeof<T = any>(tag: string): T & Arg;
        public static typeof(tag: string): any {
            return <any>new Arg(value => typeof value === tag, `typeof ${tag}`);
        }

        public static string() { return this.typeof("string"); }
        public static number() { return this.typeof("number"); }
        public static boolean() { return this.typeof("boolean"); }
        public static symbol() { return this.typeof("symbol"); }
        public static object() { return this.typeof("object"); }
        public static function() { return this.typeof("function"); }

        /**
         * Allows any value that is an instance of the provided function.
         * @param type The expected constructor.
         */
        public static instanceof<TClass extends { new (...args: any[]): object; prototype: object; }>(type: TClass): TClass["prototype"] & Arg {
            return <any>new Arg(value => value instanceof type, `instanceof ${type.name}`);
        }

        /**
         * Allows any value that has the provided property names in its prototype chain.
         */
        public static has<T>(...names: string[]): T & Arg {
            return <any>new Arg(value => names.filter(name => name in value).length === names.length, `has ${names.join(", ")}`);
        }

        /**
         * Allows any value that has the provided property names on itself but not its prototype chain.
         */
        public static hasOwn<T>(...names: string[]): T & Arg {
            return <any>new Arg(value => names.filter(name => Object.prototype.hasOwnProperty.call(value, name)).length === names.length, `hasOwn ${names.join(", ")}`);
        }

        /**
         * Allows any value that matches the provided condition for the rest of the arguments in the call.
         * @param condition The optional condition for each other element.
         */
        public static rest<T>(condition?: T | (T & Arg)): T & Arg {
            if (condition === undefined) {
                return <any>new Arg(() => true, `rest`, /*rest*/ true);
            }

            const arg = Arg.from(condition);
            return <any>new Arg(value => arg._validate(value), `rest ${arg._message}`, /*rest*/ true);
        }

        /**
         * Negates a condition.
         */
        public static not<T = any>(value: T | (T & Arg)): T & Arg {
            const arg = Arg.from(value);
            return <any>new Arg(value => !arg._validate(value), `not ${arg._message}`);
        }

        /**
         * Combines conditions, where all conditions must be `true`.
         */
        public static and<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
            const conditions = args.map(Arg.from);
            return <any>new Arg(value => conditions.every(condition => condition._validate(value)), conditions.map(condition => condition._message).join(" and "));
        }

        /**
         * Combines conditions, where any conditions may be `true`.
         */
        public static or<T = any>(...args: ((T & Arg) | T)[]): T & Arg {
            const conditions = args.map(Arg.from);
            return <any>new Arg(value => conditions.some(condition => condition._validate(value)), conditions.map(condition => condition._message).join(" or "));
        }

        /**
         * Ensures the value is a `Condition`
         * @param value The value to coerce
         * @returns The condition
         */
        public static from<T>(value: T): T & Arg {
            return value instanceof Arg ? value :
                value === undefined ? Arg.undefined() :
                value === null ? Arg.null() :
                <any>new Arg(v => is(v, value), JSON.stringify(value));
        }

        /**
         * Validates an argument against a condition
         * @param condition The condition to validate.
         * @param arg The argument to validate against the condition.
         */
        public static validate(condition: Arg, arg: any): boolean {
            return condition._validate(arg);
        }

        /**
         * Validates the arguments against the condition.
         * @param conditions The conditions to validate.
         * @param args The arguments for the execution.
         */
        public static validateAll(conditions: ReadonlyArray<Arg>, args: ReadonlyArray<any>): boolean {
            const length = Math.max(conditions.length, args.length);
            let conditionIndex = 0;
            let argIndex = 0;
            while (argIndex < length) {
                const condition = conditionIndex < conditions.length ? conditions[conditionIndex] : undefined;
                const arg = argIndex < args.length ? args[argIndex] : undefined;
                if (!condition) return false;
                if (argIndex >= args.length && condition._rest) return true;
                if (!condition._validate(arg)) return false;
                if (!condition._rest) conditionIndex++;
                argIndex++;
            }
            return true;
        }

        /**
         * Gets a string that represents this condition.
         */
        public toString(): string {
            return `<${this._message}>`;
        }
    }

    /**
     * SameValueZero (from ECMAScript spec), which has stricter equality sematics than "==" or "===".
     */
    function is(x: any, y: any) {
        return (x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y);
    }


    /**
     * Defines the number of times an action must have been executed during verification of a Mock.
     */
    export class Times {
        private static _none: Times | undefined;
        private static _once: Times | undefined;
        private static _atLeastOnce: Times | undefined;
        private static _atMostOnce: Times | undefined;

        private _min: number;
        private _max: number;
        private _message: string;

        private constructor(min: number, max: number, message: string) {
            this._min = min;
            this._max = max;
            this._message = message;
        }

        /**
         * Expects that an action was never executed.
         * @returns A new `Times` instance.
         */
        public static none(): Times {
            return this._none || (this._none = new Times(0, 0, `never`));
        }

        /**
         * Expects that an action was executed exactly once.
         * @returns A new `Times` instance.
         */
        public static once(): Times {
            return this._once || (this._once = new Times(1, 1, `exactly once`));
        }

        /**
         * Expects that an action was executed at least once.
         * @returns A new `Times` instance.
         */
        public static atLeastOnce(): Times {
            return this._atLeastOnce || (this._atLeastOnce = new Times(1, Number.MAX_SAFE_INTEGER, `at least once`));
        }

        /**
         * Expects that an action was executed at least the specified number of times.
         * @param count The number of times.
         * @returns A new `Times` instance.
         */
        public static atLeast(count: number): Times {
            return new Times(count, Number.MAX_SAFE_INTEGER, `at least ${count} time(s)`);
        }

        /**
         * Expects that an action was executed exactly the specified number of times.
         * @param count The number of times.
         * @returns A new `Times` instance.
         */
        public static exactly(count: number): Times {
            return new Times(count, count, `exactly ${count} time(s)`);
        }

        /**
         * Expects that an action was executed at most the specified number of times.
         * @param count The number of times.
         * @returns A new `Times` instance.
         */
        public static atMost(count: number): Times {
            return new Times(0, count, `at most ${count} time(s)`);
        }

        /**
         * Expects that an action was executed at most once.
         * @returns A new `Times` instance.
         */
        public static atMostOnce(): Times {
            return this._atMostOnce || (this._atMostOnce = new Times(0, 1, `at most once`));
        }

        /**
         * Expects that an action was executed between a range of times, inclusive.
         * @param min The minimum number of times, inclusive.
         * @param max The maximum number of times, inclusive.
         * @returns A new `Times` instance.
         */
        public static between(min: number, max: number): Times {
            return new Times(min, max, `between ${min} and ${max} time(s)`);
        }

        /**
         * Validates the number of times an action was executed.
         * @param count The number of times the action was executed.
         * @returns `true` if the provided count was valid; otherwise, `false`.
         */
        public validate(count: number): boolean {
            if (count < this._min) return false;
            if (count > this._max) return false;
            return true;
        }

        /**
         * Checks the number of times an action was executed, throwing an error if the count was not valid.
         * @param count The number of times the action was executed.
         * @param message The message to use to begin the check.
         */
        public check(count: number, message: string): void {
            if (!this.validate(count)) {
                const expectedMessage = this._message === `never`
                    ? `Expected to never be executed.`
                    : `Expected to be executed ${this._message}.`;
                throw new Error(`${message}\n${expectedMessage} Actually executed ${count} time(s).`);
            }
        }

        /**
         * Gets the string representation of this object.
         */
        public toString(): string {
            return `<${this._message}>`;
        }
    }

    const weakHandler = new WeakMap<object, MockHandler<object>>();
    const weakMock = new WeakMap<object, Mock<object>>();

    function noop() { /*does nothing*/ }
    const empty = {};

    export type Callable = (...args: any[]) => any;

    export type Constructable = new (...args: any[]) => any;

    export interface ThisArg {
        this: any;
    }

    export interface Returns<U> {
        return: U;
    }

    export interface Fallback {
        fallback: true;
    }

    export interface Throws {
        throw: any;
    }

    export interface Callback {
        callback: Callable;
    }

    export type Setup<U> =
        | Returns<U> & (ThisArg & Callback | ThisArg | Callback)
        | Returns<U>
        | Throws & (ThisArg & Callback | ThisArg | Callback)
        | Throws
        | Fallback & (ThisArg & Callback | ThisArg | Callback)
        | Fallback
        | ThisArg & Callback
        | ThisArg
        | Callback;

    /**
     * A mock version of another oject
     */
    export class Mock<T extends object> {
        private _handler: MockHandler<T>;
        private _proxy: T;
        private _revoke: () => void;

        /**
         * A mock version of another object
         * @param target The object to mock.
         * @param setups Optional setups to use
         */
        constructor(target: T = <T>{}, setups?: Partial<T>) {
            this._handler = typeof target === "function"
                ? new MockFunctionHandler<T & (Callable | Constructable)>()
                : new MockHandler<T>();

            const { proxy, revoke } = Proxy.revocable<T>(target, this._handler);
            this._proxy = proxy;
            this._revoke = revoke;

            weakHandler.set(proxy, this._handler);
            weakMock.set(proxy, this);

            if (setups) {
                this.setup(setups);
            }
        }

        /**
         * Gets the mock version of the target
         */
        public get proxy(): T {
            return this._proxy;
        }

        /**
         * Creates an empty Mock object.
         */
        public static object<T extends object = any>() {
            return new Mock(<T>{});
        }

        /**
         * Creates an empty Mock function.
         */
        public static function<T extends Callable | Constructable = Callable & Constructable>() {
            // arrow functions don't have a [[Construct]]
            return new Mock(<T>function () { /*does nothing*/ }); // tslint:disable-line:only-arrow-functions
        }

        /**
         * Creates a function spy.
         */
        public static spy<T extends Callable | Constructable = Callable & Constructable>(): Mock<T>;
        /**
         * Creates a spy on an object or function.
         */
        public static spy<T extends object>(target: T): Mock<T>;
        /**
         * Installs a spy on a method of an object. Use `revoke()` on the result to reset the spy.
         * @param object The object containing a method.
         * @param propertyKey The name of the method on the object.
         */
        public static spy<T extends { [P in K]: (...args: any[]) => any }, K extends keyof T>(object: T, propertyKey: K): Spy<T, K>;
        public static spy<T extends { [P in K]: (...args: any[]) => any }, K extends keyof T>(object?: T, propertyKey?: K) {
            return object !== undefined && propertyKey !== undefined
                ? new Spy(object, propertyKey)
                : new Mock(object || noop);
        }

        /**
         * Gets the mock for an object.
         * @param target The target.
         */
        public static from<T extends object>(target: T) {
            return <Mock<T> | undefined>weakMock.get(target);
        }

        /**
         * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
         * @param callback A function used to set up a method result.
         * @param result An object used to describe the result of the method.
         * @returns This mock instance.
         */
        public setup<U = any>(callback: (value: T) => U, result?: Setup<U>): this;
        /**
         * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
         * @param setups An object whose members are used instead of the target object.
         * @returns This mock instance.
         */
        public setup(setups: Partial<T>): this;
        public setup<U>(setup: Partial<T> | ((value: T) => U), result?: Setup<U>): this {
            if (typeof setup === "function") {
                this._handler.setupCall(setup, result);
            }
            else {
                this._handler.setupMembers(setup);
            }
            return this;
        }

        /**
         * Performs verification that a specific action occurred at least once.
         * @param callback A callback that simulates the expected action.
         * @param message An optional message to use if verification fails.
         * @returns This mock instance.
         */
        public verify<U>(callback: (value: T) => U, message?: string): this;
        /**
         * Performs verification that a specific action occurred.
         * @param callback A callback that simulates the expected action.
         * @param times The number of times the action should have occurred.
         * @param message An optional message to use if verification fails.
         * @returns This mock instance.
         */
        public verify<U>(callback: (value: T) => U, times: Times, message?: string): this;
        /**
         * Performs verification that a specific action occurred.
         * @param callback A callback that simulates the expected action.
         * @param times The number of times the action should have occurred.
         * @returns This mock instance.
         */
        public verify<U>(callback: (value: T) => U, times?: Times | string, message?: string): this {
            if (typeof times === "string") {
                message = times;
                times = undefined;
            }
            if (times === undefined) {
                times = Times.atLeastOnce();
            }
            this._handler.verify(callback, <Times>times, message);
            return this;
        }

        public revoke() {
            weakMock.delete(this._proxy);
            weakHandler.delete(this._proxy);
            this._handler.revoke();
            this._revoke();
        }
    }

    export class Spy<T extends { [P in K]: (...args: any[]) => any }, K extends keyof T> extends Mock<T[K]> {
        private _spy: Inject<any, any> | undefined;

        constructor(target: T, propertyKey: K) {
            super(target[propertyKey]);
            this._spy = new Inject(target, propertyKey, this.proxy);
            this._spy.install();
        }

        public get installed() {
            return this._spy ? this._spy.installed : false;
        }

        public install() {
            if (!this._spy) throw new Error("Cannot install a revoked spy.");
            this._spy.install();
            return this;
        }

        public uninstall() {
            if (this._spy) this._spy.uninstall();
            return this;
        }

        public revoke() {
            if (this._spy) {
                this._spy.uninstall();
                this._spy = undefined;
            }
            super.revoke();
        }
    }

    class Recording {
        public static readonly noThisArg = {};
        public readonly trap: string;
        public readonly name: PropertyKey | undefined;
        public readonly thisArg: any;
        public readonly argArray: ReadonlyArray<any>;
        public readonly newTarget: any;
        public readonly result: Partial<Returns<any> & Throws & Fallback> | undefined;
        public readonly callback: Callable | undefined;

        private _thisCondition: Arg | undefined;
        private _newTargetCondition: Arg | undefined;
        private _conditions: ReadonlyArray<Arg> | undefined;

        constructor(trap: string, name: PropertyKey | undefined, thisArg: any, argArray: ReadonlyArray<any>, newTarget: any, result: Partial<Returns<any> & Throws & Fallback> | undefined, callback: Callable | undefined) {
            this.trap = trap;
            this.name = name;
            this.thisArg = thisArg;
            this.argArray = argArray || [];
            this.newTarget = newTarget;
            this.result = result;
            this.callback = callback;
        }

        public get thisCondition() {
            return this._thisCondition || (this._thisCondition = this.thisArg === Recording.noThisArg ? Arg.any() : Arg.from(this.thisArg));
        }

        public get newTargetCondition() {
            return this._newTargetCondition || (this._newTargetCondition = Arg.from(this.newTarget));
        }

        public get argConditions() {
            return this._conditions || (this._conditions = this.argArray.map(Arg.from));
        }

        public get kind() {
            switch (this.trap) {
                case "apply": return "function";
                case "construct": return "function";
                case "invoke": return "method";
                case "get": return "property";
                case "set": return "property";
            }
        }

        public static select(setups: ReadonlyArray<Recording>, kind: Recording["kind"], name: PropertyKey | undefined) {
            return setups.filter(setup => setup.kind === kind && setup.name === name);
        }

        public static evaluate(setups: ReadonlyArray<Recording> | undefined, trap: string, name: PropertyKey | undefined, thisArg: any, argArray: any[], newTarget: any, fallback: () => any) {
            if (setups && setups.length > 0) {
                for (const setup of setups) {
                    if (setup.match(trap, name, thisArg, argArray, newTarget)) {
                        const callback = setup.callback;
                        if (callback) {
                            Reflect.apply(callback, thisArg, argArray);
                        }

                        const result = setup.getResult(fallback);
                        return trap === "set" ? true : result;
                    }
                }
                return trap === "set" ? false : undefined;
            }
            return fallback();
        }

        public toString(): string {
            return `${this.trap} ${this.name || ""}(${this.argConditions.join(", ")})${this.newTarget ? ` [${this.newTarget.name}]` : ``}`;
        }

        public match(trap: string, name: PropertyKey | undefined, thisArg: any, argArray: any, newTarget: any) {
            return this.trap === trap
                && this.name === name
                && this.matchThisArg(thisArg)
                && Arg.validateAll(this.argConditions, argArray)
                && Arg.validate(this.newTargetCondition, newTarget);
        }

        public matchRecording(recording: Recording) {
            return this.match(recording.trap, recording.name, recording.thisArg, recording.argArray, recording.newTarget)
                && this.matchResult(recording.result);
        }

        private matchThisArg(thisArg: any) {
            return thisArg === Recording.noThisArg
                || Arg.validate(this.thisCondition, thisArg);
        }

        private matchResult(result: Partial<Returns<any> & Throws> | undefined) {
            return !this.result
                || this.result.return === (result && result.return)
                && this.result.throw === (result && result.throw);
        }

        private getResult(fallback: () => any) {
            if (hasOwn(this.result, "throw")) throw this.result.throw;
            if (hasOwn(this.result, "return")) return this.result.return;
            if (hasOwn(this.result, "fallback")) return this.result.fallback ? fallback() : undefined;
            return undefined;
        }
    }

    class MockHandler<T extends object> implements ProxyHandler<T> {
        protected readonly overrides = Object.create(/*o*/ null); // tslint:disable-line:no-null-keyword
        protected readonly recordings: Recording[] = [];
        protected readonly setups: Recording[] = [];
        protected readonly methodTargets = new WeakMap<Function, Function>();
        protected readonly methodProxies = new Map<PropertyKey, Function>();
        protected readonly methodRevocations = new Set<() => void>();

        public get(target: T, name: PropertyKey, receiver: any = target): any {
            const setups = Recording.select(this.setups, "property", name);
            const result: Partial<Returns<any> & Throws> = {};
            const recording = new Recording("get", name, target, [], /*newTarget*/ undefined, result, /*callback*/ undefined);
            this.recordings.push(recording);
            try {
                const value = Recording.evaluate(setups, "get", name, receiver, [], /*newTarget*/ undefined,
                    () => Reflect.get(this.getTarget(target, name), name, receiver));
                return typeof value === "function" ? this.getMethod(name, value) : value;
            }
            catch (e) {
                throw result.throw = e;
            }
        }

        public set(target: T, name: PropertyKey, value: any, receiver: any = target): boolean {
            if (typeof value === "function" && this.methodTargets.has(value)) {
                value = this.methodTargets.get(value);
            }

            const setups = Recording.select(this.setups, "property", name);
            const result: Partial<Returns<any> & Throws> = {};
            const recording = new Recording("set", name, target, [value], /*newTarget*/ undefined, result, /*callback*/ undefined);
            this.recordings.push(recording);
            try {
                const success = Recording.evaluate(setups, "set", name, receiver, [value], /*newTarget*/ undefined,
                    () => Reflect.set(this.getTarget(target, name), name, value, receiver));
                result.return = undefined;
                return success;
            }
            catch (e) {
                throw result.throw = e;
            }
        }

        public invoke(proxy: T, name: PropertyKey, method: Function, argArray: any[]): any {
            const setups = Recording.select(this.setups, "method", name);
            const result: Partial<Returns<any> & Throws> = {};
            const recording = new Recording("invoke", name, proxy, argArray, /*newTarget*/ undefined, result, /*callback*/ undefined);
            this.recordings.push(recording);
            try {
                return Recording.evaluate(setups, "invoke", name, proxy, argArray, /*newTarget*/ undefined,
                    () => Reflect.apply(method, proxy, argArray));
            }
            catch (e) {
                throw result.throw = e;
            }
        }

        public setupCall(callback: (value: any) => any, result: Setup<any> | undefined) {
            const recording = this.capture(callback, result);
            const existing = this.setups.find(setup => setup.name === recording.name);
            if (existing) {
                if (existing.kind !== recording.kind) {
                    throw new Error(`Cannot mix method and property setups for the same member name.`);
                }
            }
            else if (recording.name !== undefined) {
                if (recording.kind === "method") {
                    this.defineMethod(recording.name);
                }
                else if (recording.kind === "property") {
                    this.defineAccessor(recording.name);
                }
            }

            this.setups.push(recording);
        }

        public setupMembers(setup: object) {
            for (const propertyKey of Reflect.ownKeys(setup)) {
                const descriptor = Reflect.getOwnPropertyDescriptor(setup, propertyKey);
                if (descriptor) {
                    if (propertyKey in this.overrides) {
                        throw new Error(`Property '${propertyKey.toString()}' already exists.`);
                    }
                    Reflect.defineProperty(this.overrides, propertyKey, descriptor);
                }
            }
        }

        public verify<U>(callback: (value: T) => U, times: Times, message?: string): void {
            const expectation = this.capture(callback, /*result*/ undefined);

            let count = 0;
            for (const recording of this.recordings) {
                if (expectation.matchRecording(recording)) {
                    count++;
                }
            }

            times.check(count, message || `An error occured when verifying expectation: ${expectation}`);
        }

        public getTarget(target: T, name: PropertyKey) {
            return name in this.overrides ? this.overrides : target;
        }

        public getMethod(name: PropertyKey, value: Function): Function {
            const proxy = this.methodProxies.get(name);
            if (proxy && this.methodTargets.get(proxy) === value) {
                return proxy;
            }
            else {
                const { proxy, revoke } = Proxy.revocable(value, new MethodHandler(name));
                this.methodProxies.set(name, proxy);
                this.methodRevocations.add(revoke);
                this.methodTargets.set(proxy, value);
                return proxy;
            }
        }

        public revoke() {
            this.methodRevocations.forEach(revoke => { revoke(); });
        }

        protected capture<U>(callback: (value: T) => U, result: Setup<any> | undefined) {
            return this.captureCore(<T>empty, new CapturingHandler<T, U>(result), callback);
        }

        protected captureCore<T extends object, U>(target: T, handler: CapturingHandler<T, U>, callback: (value: T) => U): Recording {
            const { proxy, revoke } = Proxy.revocable<T>(target, handler);
            try {
                callback(proxy);
                if (!handler.recording) {
                    throw new Error("Nothing was captured.");
                }
                return handler.recording;
            }
            finally {
                revoke();
            }
        }

        private defineMethod(name: PropertyKey) {
            const setups = this.setups;
            this.setupMembers({
                [name](...argArray: any[]) {
                    return Recording.evaluate(setups, "invoke", name, this, argArray, /*newTarget*/ undefined, noop);
                }
            });
        }

        private defineAccessor(name: PropertyKey) {
            const setups = this.setups;
            this.setupMembers({
                get [name]() {
                    return Recording.evaluate(setups, "get", name, this, [], /*newTarget*/ undefined, noop);
                },
                set [name](value: any) {
                    Recording.evaluate(setups, "set", name, this, [value], /*newTarget*/ undefined, noop);
                }
            });
        }
    }

    class MockFunctionHandler<T extends Callable | Constructable> extends MockHandler<T> {
        public apply(target: T, thisArg: any, argArray: any[]): any {
            const setups = Recording.select(this.setups, "function", /*name*/ undefined);
            const result: Partial<Returns<any> & Throws> = {};
            const recording = new Recording("apply", /*name*/ undefined, thisArg, argArray, /*newTarget*/ undefined, result, /*callback*/ undefined);
            this.recordings.push(recording);
            try {
                return Recording.evaluate(setups, "apply", /*name*/ undefined, thisArg, argArray, /*newTarget*/ undefined,
                    () => Reflect.apply(target, thisArg, argArray));
            }
            catch (e) {
                throw result.throw = e;
            }
        }

        public construct(target: T, argArray: any[], newTarget?: any): any {
            const setups = Recording.select(this.setups, "function", /*name*/ undefined);
            const result: Partial<Returns<any> & Throws> = {};
            const recording = new Recording("construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget, result, /*callback*/ undefined);
            this.recordings.push(recording);
            try {
                return Recording.evaluate(setups, "construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget,
                    () => Reflect.construct(target, argArray, newTarget));
            }
            catch (e) {
                throw result.throw = e;
            }
        }

        protected capture<U>(callback: (value: T) => U, result: Returns<any> & ThisArg | Returns<any> | Throws & ThisArg | Throws | ThisArg | undefined) {
            return this.captureCore(<T>noop, new CapturingFunctionHandler<T, U>(result), callback);
        }
    }

    class MethodHandler {
        public name: PropertyKey;

        constructor(name: PropertyKey) {
            this.name = name;
        }

        public apply(target: Function, thisArgument: any, argumentsList: any[]): any {
            const handler = weakHandler.get(thisArgument);
            return handler
                ? handler.invoke(thisArgument, this.name, target, argumentsList)
                : Reflect.apply(target, thisArgument, argumentsList);
        }
    }

    class CapturingHandler<T extends object, U> implements ProxyHandler<T> {
        public recording: Recording | undefined;

        protected readonly callback: Callable | undefined;
        protected readonly thisArg: any;
        protected readonly result: Returns<U> | Throws | Fallback | undefined;

        constructor(result: Partial<Returns<U> & Throws & ThisArg & Callback & Fallback> | undefined) {
            this.thisArg = hasOwn(result, "this") ? result.this : Recording.noThisArg;
            this.callback = hasOwn(result, "callback") ? result.callback : undefined;
            this.result = hasOwn(result, "return") ? { return: result.return } :
                hasOwn(result, "throw") ? { throw: result.throw } :
                hasOwn(result, "fallback") && result.fallback ? { fallback: true } :
                undefined;
        }

        public get(_target: T, name: PropertyKey, _receiver: any): any {
            this.recording = new Recording("get", name, this.thisArg, [], /*newTarget*/ undefined, this.result, this.callback);
            return (...argArray: any[]) => { this.recording = new Recording("invoke", name, this.thisArg, argArray, /*newTarget*/ undefined, this.result, this.callback); };
        }

        public set(_target: T, name: PropertyKey, value: any, _receiver: any): boolean {
            this.recording = new Recording("set", name, this.thisArg, [value], /*newTarget*/ undefined, this.result, this.callback);
            return true;
        }
    }

    class CapturingFunctionHandler<T extends Callable | Constructable, U> extends CapturingHandler<T, U> {
        public apply(_target: T, _thisArg: any, argArray: any[]): any {
            this.recording = new Recording("apply", /*name*/ undefined, this.thisArg, argArray, /*newTarget*/ undefined, this.result, this.callback);
            return undefined;
        }

        public construct(_target: T, argArray: any[], newTarget?: any): any {
            this.recording = new Recording("construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget, this.result, this.callback);
            return undefined;
        }
    }

    function hasOwn<T extends object, K extends keyof T>(object: Partial<T> | undefined, key: K): object is (T | T & never) & { [P in K]: T[P] } {
        return object !== undefined
            && Object.prototype.hasOwnProperty.call(object, key);
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

    export type Timer = Immediate | Timeout | Interval | AnimationFrame;

    type NonImmediateTimer = Timeout | Interval | AnimationFrame;

    interface Due<T extends Timer> {
        timer: T;
        due: number;
        depth?: number;
        enabled?: boolean;
        timeline?: boolean;
    }

    const MAX_INT32 = 2 ** 31 - 1;
    const MIN_TIMEOUT_VALUE = 4;
    const CLAMP_TIMEOUT_NESTING_LEVEL = 5;

    /**
     * Programmatic control over timers.
     */
    export class Timers {
        public static readonly MAX_DEPTH = MAX_INT32;

        private _nextHandle = 1;
        private _immediates = new Map<number, Due<Immediate>>();
        private _timeouts = new Map<number, Due<Timeout>>();
        private _intervals = new Map<number, Due<Interval>>();
        private _frames = new Map<number, Due<AnimationFrame>>();
        private _timeline: Due<NonImmediateTimer>[] = [];
        private _time: number;
        private _depth = 0;

        constructor() {
            this._time = 0;

            // bind each timer method so that it can be detached from this instance.
            this.setImmediate = this.setImmediate.bind(this);
            this.clearImmedate = this.clearImmedate.bind(this);
            this.setTimeout = this.setTimeout.bind(this);
            this.clearTimeout = this.clearTimeout.bind(this);
            this.setInterval = this.setInterval.bind(this);
            this.clearInterval = this.clearInterval.bind(this);
            this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
            this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this);
        }

        /**
         * Get the current time.
         */
        public get time(): number {
            return this._time;
        }

        /**
         * Gets the time of the last scheduled timer (not including repeating intervals).
         */
        public get endTime(): number {
            return this._timeline && this._timeline.length > 0
                ? this._timeline[this._timeline.length - 1].due
                : this._time;
        }

        /**
         * Gets the estimated time remaining.
         */
        public get remainingTime(): number {
            return this.endTime - this.time;
        }

        public getPending(options: { kind: "immediate", ms?: number }): Immediate[];
        public getPending(options: { kind: "timeout", ms?: number }): Timeout[];
        public getPending(options: { kind: "interval", ms?: number }): Interval[];
        public getPending(options: { kind: "frame", ms?: number }): AnimationFrame[];
        public getPending(options?: { kind?: Timer["kind"], ms?: number }): Timer[];
        public getPending(options: { kind?: Timer["kind"], ms?: number } = {}): Timer[] {
            const { kind, ms = 0 } = options;
            if (ms < 0) throw new TypeError("Argument 'ms' out of range.");

            const dueTimers: Due<Timer>[] = [];

            if (!kind || kind === "immediate") {
                this.copyImmediates(dueTimers);
            }

            if (kind !== "immediate") {
                this.copyTimelineBefore(dueTimers, this._time + ms, kind);
            }

            return dueTimers.map(dueTimer => dueTimer.timer);
        }

        /**
         * Advance the current time and trigger callbacks, returning the number of callbacks triggered.
         * @param ms The number of milliseconds to advance.
         * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
         * - Use `0` (default) to disable processing of nested `setImmediate` calls.
         * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
         */
        public advance(ms: number, maxDepth = 0): number {
            if (ms < 0) throw new TypeError("Argument 'ms' out of range.");
            if (maxDepth < 0) throw new TypeError("Argument 'maxDepth' out of range.");
            let count = 0;
            const endTime = this._time + (ms | 0);
            while (true) {
                if (maxDepth >= 0) {
                    count += this.executeImmediates(maxDepth);
                    maxDepth--;
                }

                const dueTimer = this.dequeueIfBefore(endTime);
                if (dueTimer) {
                    this._time = dueTimer.due;
                    this.executeTimer(dueTimer);
                    count++;
                }
                else {
                    this._time = endTime;
                    return count;
                }
            }
        }

        /**
         * Advance the current time to the estimated end time and trigger callbacks, returning the number of callbacks triggered.
         * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
         * - Use `0` (default) to disable processing of nested `setImmediate` calls.
         * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
         */
        public advanceToEnd(maxDepth = 0) {
            return this.advance(this.remainingTime, maxDepth);
        }

        /**
         * Execute any pending immediate timers, returning the number of timers triggered.
         * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
         * - Use `0` (default) to disable processing of nested `setImmediate` calls.
         * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
         */
        public executeImmediates(maxDepth = 0): number {
            if ((maxDepth |= 0) < 0) throw new TypeError("Argument 'maxDepth' out of range.");
            const dueTimers: Due<Timer>[] = [];
            this.copyImmediates(dueTimers);
            let count = this.executeTimers(dueTimers);
            for (let depth = 0; depth < maxDepth && this._immediates.size > 0; depth++) {
                count += this.executeImmediates();
            }
            return count;
        }

        public setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
            if (this._depth >= Timers.MAX_DEPTH) {
                throw new Error("callback nested too deeply.");
            }

            const timer: Immediate = { kind: "immediate", handle: this._nextHandle++, callback, args };
            const dueTimer: Due<Immediate> = { timer, due: -1 };
            this.addTimer(this._immediates, dueTimer);
            return timer.handle;
        }

        public clearImmedate(timerId: any): void {
            const dueTimer = this._immediates.get(timerId);
            if (dueTimer) {
                this.deleteTimer(this._immediates, dueTimer);
            }
        }

        public setTimeout(callback: (...args: any[]) => void, timeout: number, ...args: any[]): any {
            if (this._depth >= Timers.MAX_DEPTH) {
                throw new Error("callback nested too deeply.");
            }

            if ((timeout |= 0) < 0) timeout = 0;

            if (this._depth >= CLAMP_TIMEOUT_NESTING_LEVEL && timeout < MIN_TIMEOUT_VALUE) {
                timeout = MIN_TIMEOUT_VALUE;
            }

            const timer: Timeout = { kind: "timeout", handle: this._nextHandle++, callback, args };
            const dueTimer: Due<Timeout> = { timer, due: this._time + timeout };
            this.addTimer(this._timeouts, dueTimer);
            this.addToTimeline(dueTimer);
            return timer.handle;
        }

        public clearTimeout(timerId: any): void {
            const dueTimer = this._timeouts.get(timerId);
            if (dueTimer) {
                this.deleteTimer(this._timeouts, dueTimer);
                this.removeFromTimeline(dueTimer);
            }
        }

        public setInterval(callback: (...args: any[]) => void, interval: number, ...args: any[]): any {
            if (this._depth >= Timers.MAX_DEPTH) {
                throw new Error("callback nested too deeply.");
            }

            if ((interval |= 0) < 10) interval = 10;
            const timer: Interval = { kind: "interval", handle: this._nextHandle++, callback, args, interval };
            const dueTimer: Due<Interval> = { timer, due: this._time + interval };
            this.addTimer(this._intervals, dueTimer);
            this.addToTimeline(dueTimer);
            return timer.handle;
        }

        public clearInterval(timerId: any): void {
            const dueTimer = this._intervals.get(timerId);
            if (dueTimer) {
                this.deleteTimer(this._intervals, dueTimer);
                this.removeFromTimeline(dueTimer);
            }
        }

        public requestAnimationFrame(callback: (time: number) => void): any {
            if (this._depth >= Timers.MAX_DEPTH) {
                throw new Error("callback nested too deeply.");
            }

            const timer: AnimationFrame = { kind: "frame", handle: this._nextHandle++, callback };
            const dueTimer: Due<AnimationFrame> = { timer, due: this.nextFrameDueTime() };
            this.addTimer(this._frames, dueTimer);
            this.addToTimeline(dueTimer);
            return timer.handle;
        }

        public cancelAnimationFrame(timerId: any): void {
            const dueTimer = this._frames.get(timerId);
            if (dueTimer) {
                this.deleteTimer(this._frames, dueTimer);
                this.removeFromTimeline(dueTimer);
            }
        }

        private nextFrameDueTime() {
            return this._time + this.nextFrameDelta();
        }

        private nextFrameDelta() {
            return 16 - this._time % 16;
        }

        private addTimer<T extends Timer>(timers: Map<number, Due<T>>, dueTimer: Due<T>) {
            if (dueTimer.enabled) return;
            timers.set(dueTimer.timer.handle, dueTimer);
            dueTimer.depth = this._depth + 1;
            dueTimer.enabled = true;
        }

        private deleteTimer<T extends Timer>(timers: Map<number, Due<T>>, dueTimer: Due<T>) {
            if (!dueTimer.enabled) return;
            timers.delete(dueTimer.timer.handle);
            dueTimer.enabled = false;
        }

        private executeTimers(dueTimers: Due<Timer>[]) {
            let count = 0;
            for (const dueTimer of dueTimers) {
                this.executeTimer(dueTimer);
                count++;
            }
            return count;
        }

        private executeTimer(dueTimer: Due<Timer>) {
            switch (dueTimer.timer.kind) {
                case "immediate": return this.executeImmediate(<Due<Immediate>>dueTimer);
                case "timeout": return this.executeTimeout(<Due<Timeout>>dueTimer);
                case "interval": return this.executeInterval(<Due<Interval>>dueTimer);
                case "frame": return this.executeAnimationFrame(<Due<AnimationFrame>>dueTimer);
            }
        }

        private executeImmediate(dueTimer: Due<Immediate>) {
            if (!dueTimer.enabled) return;

            this.deleteTimer(this._immediates, dueTimer);
            this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
        }

        private executeTimeout(dueTimer: Due<Timeout>) {
            if (!dueTimer.enabled) return;

            this.deleteTimer(this._timeouts, dueTimer);
            this.removeFromTimeline(dueTimer);
            this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
        }

        private executeInterval(dueTimer: Due<Interval>) {
            if (!dueTimer.enabled) return;

            this.removeFromTimeline(dueTimer);
            this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);

            if (dueTimer.enabled) {
                dueTimer.due += dueTimer.timer.interval;
                this.addToTimeline(dueTimer);
            }
        }

        private executeAnimationFrame(dueTimer: Due<AnimationFrame>) {
            if (!dueTimer.enabled) return;

            this.deleteTimer(this._frames, dueTimer);
            this.removeFromTimeline(dueTimer);
            this.executeCallback(dueTimer.depth, dueTimer.timer.callback, this._time);
        }

        private executeCallback(depth = 0, callback: (...args: any[]) => void, ...args: any[]) {
            const savedDepth = this._depth;
            this._depth = depth;
            try {
                callback(...args);
            }
            finally {
                this._depth = savedDepth;
            }
        }

        private dequeueIfBefore(dueTime: number) {
            if (this._timeline.length > 0) {
                const dueTimer = this._timeline[0];
                if (dueTimer.due <= dueTime) {
                    this._timeline.shift();
                    dueTimer.timeline = false;
                    return dueTimer;
                }
            }
        }

        private copyImmediates(dueTimers: Due<Timer>[]) {
            this._immediates.forEach(dueTimer => { dueTimers.push(dueTimer); });
        }

        private copyTimelineBefore(dueTimers: Due<Timer>[], dueTime: number, kind?: Timer["kind"]) {
            for (const dueTimer of this._timeline) {
                if (dueTimer.due <= dueTime && (!kind || dueTimer.timer.kind === kind)) {
                    dueTimers.push(dueTimer);
                }
            }
        }

        private addToTimeline(dueTimer: Due<NonImmediateTimer>) {
            if (dueTimer.timeline) return;

            let index = binarySearch(this._timeline, dueTimer, getDueTime, compareTimestamps);
            if (index < 0) {
                index = ~index;
            }
            else {
                while (index < this._timeline.length) {
                    if (this._timeline[index].due > dueTimer.due) {
                        break;
                    }
                    index++;
                }
            }

            insertAt(this._timeline, index, dueTimer);
            dueTimer.timeline = true;
        }

        private removeFromTimeline(dueTimer: Due<NonImmediateTimer>) {
            if (dueTimer.timeline) {
                let index = binarySearch(this._timeline, dueTimer, getDueTime, compareTimestamps);
                if (index >= 0) {
                    while (index < this._timeline.length) {
                        const event = this._timeline[index];
                        if (event === dueTimer) {
                            removeAt(this._timeline, index);
                            dueTimer.timeline = false;
                            return true;
                        }
                        if (event.due > dueTimer.due) {
                            break;
                        }
                        index++;
                    }
                }
            }
            return false;
        }
    }

    function getDueTime(v: Due<Timer>) {
        return v.due;
    }

    function compareTimestamps(a: number, b: number) {
        return a - b;
    }

    function binarySearch<T, U>(array: ReadonlyArray<T>, value: T, keySelector: (v: T) => U, keyComparer: (a: U, b: U) => number): number {
        if (array.length === 0) {
            return -1;
        }

        let low = 0;
        let high = array.length - 1;
        const key = keySelector(value);
        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midKey = keySelector(array[middle]);
            const result = keyComparer(midKey, key);
            if (result < 0) {
                low = middle + 1;
            }
            else if (result > 0) {
                high = middle - 1;
            }
            else {
                return middle;
            }
        }

        return ~low;
    }

    function removeAt<T>(array: T[], index: number): void {
        if (array.length === 0) {
            return;
        }
        else if (index === 0) {
            array.shift();
        }
        else if (index === array.length - 1) {
            array.pop();
        }
        else {
            for (let i = index; i < array.length - 1; i++) {
                array[i] = array[i + 1];
            }
            array.length--;
        }
    }

    function insertAt<T>(array: T[], index: number, value: T): void {
        if (index === 0) {
            array.unshift(value);
        }
        else if (index === array.length) {
            array.push(value);
        }
        else {
            for (let i = array.length; i > index; i--) {
                array[i] = array[i - 1];
            }
            array[index] = value;
        }
    }

    /**
     * Temporarily injects a value into an object property
     */
    export class Inject<T extends object, K extends keyof T> {
        private _target: T;
        private _key: K;
        private _value: any;
        private _originalValue: any;
        private _installed = false;

        /**
         * Temporarily injects a value into an object property
         * @param target The target object into which to inject a property
         * @param propertyKey The name of the property to inject
         * @param value The value to inject
         */
        constructor(target: T, propertyKey: K, value?: T[K]) {
            this._target = target;
            this._key = propertyKey;
            this._value = arguments.length === 2 ? target[propertyKey] : value;
        }

        public get target() {
            return this._target;
        }

        public get key() {
            return this._key;
        }

        public get injectedValue(): T[K] {
            return this._installed ? this.currentValue : this._value;
        }

        public set injectedValue(value: T[K]) {
            if (this._installed) {
                this._target[this._key] = value;
            }
            this._value = value;
        }

        public get originalValue(): T[K] {
            if (this._installed) {
                return this._originalValue;
            }
            else {
                return this.currentValue;
            }
        }

        public get currentValue(): T[K] {
            return this._target[this._key];
        }

        /**
         * Gets a value indicating whether the Stub is currently installed.
         */
        public get installed(): boolean {
            return this._installed;
        }

        /**
         * Installs the stub
         */
        public install(): void {
            if (this._installed) return;
            this._originalValue = this._target[this._key];
            this._target[this._key] = this._value;
            this._installed = true;
        }

        /**
         * Uninstalls the stub
         */
        public uninstall(): void {
            if (!this._installed) return;
            this._target[this._key] = this._originalValue;
            this._installed = false;
            this._originalValue = undefined;
        }

        public static exec<T extends object, K extends keyof T, V>(target: T, propertyKey: K, value: T[K], action: () => V) {
            const stub = new Inject<T, K>(target, propertyKey, value);
            return stub.exec(action);
        }

        /**
         * Executes `action` with the stub installed.
         */
        public exec<V>(action: () => V): V {
            if (this._installed) {
                return action();
            }
            try {
                this.install();
                return action();
            }
            finally {
                this.uninstall();
            }
        }
    }

    /**
     * Creates a spy on an object or function.
     */
    export function spy<T extends Callable | Constructable = Callable & Constructable>(): Mock<T>;
    /**
     * Creates a spy on an object or function.
     */
    export function spy<T extends object>(target: T): Mock<T>;
    /**
     * Installs a spy on a method of an object. Use `revoke()` on the result to reset the spy.
     * @param object The object containing a method.
     * @param propertyKey The name of the method on the object.
     */
    export function spy<T extends { [P in K]: (...args: any[]) => any }, K extends keyof T>(object: T, propertyKey: K): Spy<T, K>;
    export function spy<T extends { [P in K]: (...args: any[]) => any }, K extends keyof T>(object?: T, propertyKey?: K) {
        return object === undefined ? Mock.spy() : propertyKey === undefined ? Mock.spy(object) : Mock.spy(object, propertyKey);
    }
}