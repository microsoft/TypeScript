import { Times } from "./times";
import { Arg } from "./arg";
import { Inject } from "./inject";

const weakHandler = new WeakMap<object, MockHandler<object>>();
const weakMock = new WeakMap<object, Mock<object>>();

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
        return new Mock(<T>function () {});
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
            : new Mock(object || function () {});
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
        this._handler.verify(callback, times, message);
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
    public readonly trap: "apply" | "construct" | "invoke" | "get" | "set";
    public readonly name: PropertyKey | undefined;
    public readonly thisArg: any;
    public readonly argArray: ReadonlyArray<any>;
    public readonly newTarget: any;
    public readonly result: Partial<Returns<any> & Throws & Fallback> | undefined;
    public readonly callback: Callable | undefined;

    private _thisCondition: Arg | undefined;
    private _newTargetCondition: Arg | undefined;
    private _conditions: ReadonlyArray<Arg> | undefined;

    constructor(trap: "apply" | "construct" | "invoke" | "get" | "set", name: PropertyKey | undefined, thisArg: any, argArray: ReadonlyArray<any>, newTarget: any, result: Partial<Returns<any> & Throws & Fallback> | undefined, callback: Callable | undefined) {
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
    protected readonly overrides = Object.create(null);
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

        let count: number = 0;
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
        for (const revoke of this.methodRevocations) {
            revoke();
        }
    }

    protected capture<U>(callback: (value: T) => U, result: Setup<any> | undefined) {
        return this.captureCore(<T>{}, new CapturingHandler<T, U>(result), callback);
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
                return Recording.evaluate(setups, "invoke", name, this, argArray, /*newTarget*/ undefined, () => {});
            }
        });
    }

    private defineAccessor(name: PropertyKey) {
        const setups = this.setups;
        this.setupMembers({
            get [name]() {
                return Recording.evaluate(setups, "get", name, this, [], /*newTarget*/ undefined, () => {});
            },
            set [name](value: any) {
                Recording.evaluate(setups, "set", name, this, [value], /*newTarget*/ undefined, () => {});
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
        return this.captureCore(<T>function() {}, new CapturingFunctionHandler<T, U>(result), callback);
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