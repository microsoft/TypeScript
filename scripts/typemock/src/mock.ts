import { Times } from "./times";
import { Arg } from "./arg";

const weakHandler = new WeakMap<object, MockHandler<object>>();

function noop() {}

function getHandler(value: object) {
    return weakHandler.get(value);
}

export interface Returns<U> {
    returns: U;
}

export interface Throws {
    throws: any;
}

/**
 * A mock version of another oject
 */
export class Mock<T extends object> {
    private _target: T;
    private _handler = new MockHandler<T>();
    private _proxy: T;
    private _revoke: () => void;

    /**
     * A mock version of another object
     * @param target The object to mock.
     * @param setups Optional setups to use
     */
    constructor(target: T = <T>{}, setups?: Partial<T>) {
        this._target = target;

        const { proxy, revoke } = Proxy.revocable<T>(this._target, this._handler);
        this._proxy = proxy;
        this._revoke = revoke;

        weakHandler.set(proxy, this._handler);

        if (setups) {
            this.setup(setups);
        }
    }

    /**
     * Gets the mock version of the target
     */
    public get value(): T {
        return this._proxy;
    }

    /**
     * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
     * @param callback A function used to set up a method result.
     * @param result An object used to describe the result of the method.
     * @returns This mock instance.
     */
    public setup<U = any>(callback: (value: T) => U, result?: Returns<U> | Throws): Mock<T>;
    /**
     * Performs setup of the mock object, overriding the target object's functionality with that provided by the setup
     * @param setups An object whose members are used instead of the target object.
     * @returns This mock instance.
     */
    public setup(setups: Partial<T>): Mock<T>;
    public setup<U>(setup: Partial<T> | ((value: T) => U), result?: Returns<U> | Throws): Mock<T> {
        if (typeof setup === "function") {
            this._handler.setupCall(setup, result);
        }
        else {
            this._handler.setupMembers(setup);
        }
        return this;
    }

    /**
     * Performs verification that a specific action occurred.
     * @param callback A callback that simulates the expected action.
     * @param times The number of times the action should have occurred.
     * @returns This mock instance.
     */
    public verify(callback: (value: T) => any, times: Times): Mock<T> {
        this._handler.verify(callback, times);
        return this;
    }

    public revoke() {
        this._handler.revoke();
        this._revoke();
    }
}

class Setup {
    public recording: Recording;
    public result: Partial<Returns<any> & Throws> | undefined;

    constructor (recording: Recording, result?: Returns<any> | Throws) {
        this.recording = recording;
        this.result = result;
    }

    public static evaluate(setups: ReadonlyArray<Setup> | undefined, trap: string, args: any[], newTarget?: any) {
        if (setups) {
            for (let i = setups.length - 1; i >= 0; i--) {
                const setup = setups[i];
                if (setup.recording.trap === trap &&
                    setup.recording.newTarget === newTarget &&
                    setup.matchArguments(args)) {
                    return setup.getResult();
                }
            }
        }
        throw new Error("No matching setups.");
    }

    public matchArguments(args: any[]) {
        return this.recording.matchArguments(args);
    }

    public getResult() {
        if (this.result) {
            if (this.result.throws) {
                throw this.result.throws;
            }
            return this.result.returns;
        }
        return undefined;
    }
}

class Recording {
    public readonly trap: string;
    public readonly name: PropertyKey | undefined;
    public readonly args: ReadonlyArray<any>;
    public readonly newTarget: any;

    private _conditions: ReadonlyArray<Arg> | undefined;

    constructor(trap: string, name: PropertyKey | undefined, args: ReadonlyArray<any>, newTarget?: any) {
        this.trap = trap;
        this.name = name;
        this.args = args || [];
        this.newTarget = newTarget;
    }

    public get conditions() {
        return this._conditions || (this._conditions = this.args.map(Arg.from));
    }

    public toString(): string {
        return `${this.trap} ${this.name || ""}(${this.conditions.join(", ")})${this.newTarget ? ` [${this.newTarget.name}]` : ``}`;
    }

    public matchRecording(recording: Recording) {
        if (recording.trap !== this.trap ||
            recording.name !== this.name ||
            recording.newTarget !== this.newTarget) {
            return false;
        }

        return this.matchArguments(recording.args);
    }

    public matchArguments(args: ReadonlyArray<any>) {
        let argi = 0;
        while (argi < this.conditions.length) {
            const condition = this.conditions[argi];
            const { valid, next } = Arg.validate(condition, args, argi);
            if (!valid) {
                return false;
            }
            argi = typeof next === "number" ? next : argi + 1;
        }
        if (argi < args.length) {
            return false;
        }
        return true;
    }
}

class MockHandler<T extends object> implements ProxyHandler<T> {
    private readonly overrides = Object.create(null);
    private readonly recordings: Recording[] = [];
    private readonly selfSetups: Setup[] = [];
    private readonly memberSetups = new Map<PropertyKey, Setup[]>();
    private readonly methodTargets = new WeakMap<Function, Function>();
    private readonly methodProxies = new Map<PropertyKey, Function>();
    private readonly methodRevocations = new Set<() => void>();

    constructor() {
    }

    public apply(target: T | Function, thisArg: any, argArray: any[]): any {
        if (typeof target === "function") {
            this.recordings.push(new Recording("apply", undefined, argArray));
            return this.selfSetups.length > 0
                ? Setup.evaluate(this.selfSetups, "apply", argArray)
                : Reflect.apply(target, thisArg, argArray);
        }
        return undefined;
    }

    public construct(target: T | Function, argArray: any[], newTarget?: any): any {
        if (typeof target === "function") {
            this.recordings.push(new Recording("construct", undefined, argArray, newTarget));
            return this.selfSetups.length > 0
                ? Setup.evaluate(this.selfSetups, "construct", argArray, newTarget)
                : Reflect.construct(target, argArray, newTarget);
        }
        return undefined;
    }

    public get(target: T, name: PropertyKey, receiver: any): any {
        this.recordings.push(new Recording("get", name, []));
        const value = Reflect.get(this.getTarget(target, name), name, receiver);
        return typeof value === "function" ? this.getMethod(name, value) : value;
    }

    public set(target: T, name: PropertyKey, value: any, receiver: any): boolean {
        this.recordings.push(new Recording("set", name, [value]));
        if (typeof value === "function" && this.methodTargets.has(value)) {
            value = this.methodTargets.get(value);
        }

        return Reflect.set(this.getTarget(target, name), name, value, receiver);
    }

    public invoke(proxy: T, name: PropertyKey, method: Function, argArray: any[]): any {
        this.recordings.push(new Recording("invoke", name, argArray));
        return Reflect.apply(method, proxy, argArray);
    }

    public setupCall(callback: (value: any) => any, result: Returns<any> | Throws | undefined) {
        const recording = capture(callback);
        if (recording.name === undefined) {
            this.selfSetups.push(new Setup(recording, result));
        }
        else {
            let setups = this.memberSetups.get(recording.name);
            if (!setups) {
                this.memberSetups.set(recording.name, setups = []);
                if (recording.trap === "invoke") {
                    this.defineMethod(recording.name);
                }
                else {
                    this.defineAccessor(recording.name);
                }
            }
            else {
                if ((setups[0].recording.trap === "invoke") !== (recording.trap === "invoke")) {
                    throw new Error(`Cannot mix method and acessor setups for the same property.`);
                }
            }

            setups.push(new Setup(recording, result));
        }
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

    public verify(callback: (value: T) => any, times: Times): void {
        const expectation = capture(callback);

        let count: number = 0;
        for (const recording of this.recordings) {
            if (expectation.matchRecording(recording)) {
                count++;
            }
        }

        times.check(count, `An error occured when verifying expectation: ${expectation}`);
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

    private defineMethod(name: PropertyKey) {
        const setups = this.memberSetups;
        this.setupMembers({
            [name](...args: any[]) {
                return Setup.evaluate(setups.get(name), "invoke", args);
            }
        });
    }

    private defineAccessor(name: PropertyKey) {
        const setups = this.memberSetups;
        this.setupMembers({
            get [name]() {
                return Setup.evaluate(setups.get(name), "get", []);
            },
            set [name](value: any) {
                Setup.evaluate(setups.get(name), "set", [value]);
            }
        });
    }
}

class MethodHandler {
    public name: PropertyKey;

    constructor(name: PropertyKey) {
        this.name = name;
    }

    public apply(target: Function, thisArgument: any, argumentsList: any[]): any {
        const handler = getHandler(thisArgument);
        return handler
            ? handler.invoke(thisArgument, this.name, target, argumentsList)
            : Reflect.apply(target, thisArgument, argumentsList);
    }
}

class CapturingHandler {
    public recording: Recording | undefined;

    private _name: PropertyKey;
    private _method: Function;

    constructor() {
        this._method = (...args: any[]) => {
            this.recording = new Recording("invoke", this._name, args);
        };
    }

    public apply(_target: object, _thisArg: any, argArray: any[]): any {
        this.recording = new Recording("apply", /*name*/ undefined, argArray);
        return undefined;
    }

    public construct(_target: object, argArray: any[], newTarget?: any): any {
        this.recording = new Recording("construct", /*name*/ undefined, argArray, newTarget);
        return undefined;
    }

    public get(_target: object, name: PropertyKey, _receiver: any): any {
        this.recording = new Recording("get", name, []);
        this._name = name;
        return this._method;
    }

    public set(_target: object, name: PropertyKey, value: any, _receiver: any): boolean {
        this.recording = new Recording("set", name, [value]);
        return true;
    }
}

function capture<T, U>(callback: (value: T) => U): Recording {
    const handler = new CapturingHandler();
    const { proxy, revoke } = Proxy.revocable<any>(noop, handler);
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