"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const times_1 = require("./times");
const arg_1 = require("./arg");
const inject_1 = require("./inject");
const weakHandler = new WeakMap();
const weakMock = new WeakMap();
/**
 * A mock version of another oject
 */
class Mock {
    /**
     * A mock version of another object
     * @param target The object to mock.
     * @param setups Optional setups to use
     */
    constructor(target = {}, setups) {
        this._handler = typeof target === "function"
            ? new MockFunctionHandler()
            : new MockHandler();
        const { proxy, revoke } = Proxy.revocable(target, this._handler);
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
    get proxy() {
        return this._proxy;
    }
    /**
     * Creates an empty Mock object.
     */
    static object() {
        return new Mock({});
    }
    /**
     * Creates an empty Mock function.
     */
    static function() {
        return new Mock(function () { });
    }
    static spy(object, propertyKey) {
        return object !== undefined && propertyKey !== undefined
            ? new Spy(object, propertyKey)
            : new Mock(object || function () { });
    }
    /**
     * Gets the mock for an object.
     * @param target The target.
     */
    static from(target) {
        return weakMock.get(target);
    }
    setup(setup, result) {
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
    verify(callback, times, message) {
        if (typeof times === "string") {
            message = times;
            times = undefined;
        }
        if (times === undefined) {
            times = times_1.Times.atLeastOnce();
        }
        this._handler.verify(callback, times, message);
        return this;
    }
    revoke() {
        weakMock.delete(this._proxy);
        weakHandler.delete(this._proxy);
        this._handler.revoke();
        this._revoke();
    }
}
exports.Mock = Mock;
class Spy extends Mock {
    constructor(target, propertyKey) {
        super(target[propertyKey]);
        this._spy = new inject_1.Inject(target, propertyKey, this.proxy);
        this._spy.install();
    }
    get installed() {
        return this._spy ? this._spy.installed : false;
    }
    install() {
        if (!this._spy)
            throw new Error("Cannot install a revoked spy.");
        this._spy.install();
        return this;
    }
    uninstall() {
        if (this._spy)
            this._spy.uninstall();
        return this;
    }
    revoke() {
        if (this._spy) {
            this._spy.uninstall();
            this._spy = undefined;
        }
        super.revoke();
    }
}
exports.Spy = Spy;
class Recording {
    constructor(trap, name, thisArg, argArray, newTarget, result, callback) {
        this.trap = trap;
        this.name = name;
        this.thisArg = thisArg;
        this.argArray = argArray || [];
        this.newTarget = newTarget;
        this.result = result;
        this.callback = callback;
    }
    get thisCondition() {
        return this._thisCondition || (this._thisCondition = this.thisArg === Recording.noThisArg ? arg_1.Arg.any() : arg_1.Arg.from(this.thisArg));
    }
    get newTargetCondition() {
        return this._newTargetCondition || (this._newTargetCondition = arg_1.Arg.from(this.newTarget));
    }
    get argConditions() {
        return this._conditions || (this._conditions = this.argArray.map(arg_1.Arg.from));
    }
    get kind() {
        switch (this.trap) {
            case "apply": return "function";
            case "construct": return "function";
            case "invoke": return "method";
            case "get": return "property";
            case "set": return "property";
        }
    }
    static select(setups, kind, name) {
        return setups.filter(setup => setup.kind === kind && setup.name === name);
    }
    static evaluate(setups, trap, name, thisArg, argArray, newTarget, fallback) {
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
    toString() {
        return `${this.trap} ${this.name || ""}(${this.argConditions.join(", ")})${this.newTarget ? ` [${this.newTarget.name}]` : ``}`;
    }
    match(trap, name, thisArg, argArray, newTarget) {
        return this.trap === trap
            && this.name === name
            && this.matchThisArg(thisArg)
            && arg_1.Arg.validateAll(this.argConditions, argArray)
            && arg_1.Arg.validate(this.newTargetCondition, newTarget);
    }
    matchRecording(recording) {
        return this.match(recording.trap, recording.name, recording.thisArg, recording.argArray, recording.newTarget)
            && this.matchResult(recording.result);
    }
    matchThisArg(thisArg) {
        return thisArg === Recording.noThisArg
            || arg_1.Arg.validate(this.thisCondition, thisArg);
    }
    matchResult(result) {
        return !this.result
            || this.result.return === (result && result.return)
                && this.result.throw === (result && result.throw);
    }
    getResult(fallback) {
        if (hasOwn(this.result, "throw"))
            throw this.result.throw;
        if (hasOwn(this.result, "return"))
            return this.result.return;
        if (hasOwn(this.result, "fallback"))
            return this.result.fallback ? fallback() : undefined;
        return undefined;
    }
}
Recording.noThisArg = {};
class MockHandler {
    constructor() {
        this.overrides = Object.create(null);
        this.recordings = [];
        this.setups = [];
        this.methodTargets = new WeakMap();
        this.methodProxies = new Map();
        this.methodRevocations = new Set();
    }
    get(target, name, receiver = target) {
        const setups = Recording.select(this.setups, "property", name);
        const result = {};
        const recording = new Recording("get", name, target, [], /*newTarget*/ undefined, result, /*callback*/ undefined);
        this.recordings.push(recording);
        try {
            const value = Recording.evaluate(setups, "get", name, receiver, [], /*newTarget*/ undefined, () => Reflect.get(this.getTarget(target, name), name, receiver));
            return typeof value === "function" ? this.getMethod(name, value) : value;
        }
        catch (e) {
            throw result.throw = e;
        }
    }
    set(target, name, value, receiver = target) {
        if (typeof value === "function" && this.methodTargets.has(value)) {
            value = this.methodTargets.get(value);
        }
        const setups = Recording.select(this.setups, "property", name);
        const result = {};
        const recording = new Recording("set", name, target, [value], /*newTarget*/ undefined, result, /*callback*/ undefined);
        this.recordings.push(recording);
        try {
            const success = Recording.evaluate(setups, "set", name, receiver, [value], /*newTarget*/ undefined, () => Reflect.set(this.getTarget(target, name), name, value, receiver));
            result.return = undefined;
            return success;
        }
        catch (e) {
            throw result.throw = e;
        }
    }
    invoke(proxy, name, method, argArray) {
        const setups = Recording.select(this.setups, "method", name);
        const result = {};
        const recording = new Recording("invoke", name, proxy, argArray, /*newTarget*/ undefined, result, /*callback*/ undefined);
        this.recordings.push(recording);
        try {
            return Recording.evaluate(setups, "invoke", name, proxy, argArray, /*newTarget*/ undefined, () => Reflect.apply(method, proxy, argArray));
        }
        catch (e) {
            throw result.throw = e;
        }
    }
    setupCall(callback, result) {
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
    setupMembers(setup) {
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
    verify(callback, times, message) {
        const expectation = this.capture(callback, /*result*/ undefined);
        let count = 0;
        for (const recording of this.recordings) {
            if (expectation.matchRecording(recording)) {
                count++;
            }
        }
        times.check(count, message || `An error occured when verifying expectation: ${expectation}`);
    }
    getTarget(target, name) {
        return name in this.overrides ? this.overrides : target;
    }
    getMethod(name, value) {
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
    revoke() {
        for (const revoke of this.methodRevocations) {
            revoke();
        }
    }
    capture(callback, result) {
        return this.captureCore({}, new CapturingHandler(result), callback);
    }
    captureCore(target, handler, callback) {
        const { proxy, revoke } = Proxy.revocable(target, handler);
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
    defineMethod(name) {
        const setups = this.setups;
        this.setupMembers({
            [name](...argArray) {
                return Recording.evaluate(setups, "invoke", name, this, argArray, /*newTarget*/ undefined, () => { });
            }
        });
    }
    defineAccessor(name) {
        const setups = this.setups;
        this.setupMembers({
            get [name]() {
                return Recording.evaluate(setups, "get", name, this, [], /*newTarget*/ undefined, () => { });
            },
            set [name](value) {
                Recording.evaluate(setups, "set", name, this, [value], /*newTarget*/ undefined, () => { });
            }
        });
    }
}
class MockFunctionHandler extends MockHandler {
    apply(target, thisArg, argArray) {
        const setups = Recording.select(this.setups, "function", /*name*/ undefined);
        const result = {};
        const recording = new Recording("apply", /*name*/ undefined, thisArg, argArray, /*newTarget*/ undefined, result, /*callback*/ undefined);
        this.recordings.push(recording);
        try {
            return Recording.evaluate(setups, "apply", /*name*/ undefined, thisArg, argArray, /*newTarget*/ undefined, () => Reflect.apply(target, thisArg, argArray));
        }
        catch (e) {
            throw result.throw = e;
        }
    }
    construct(target, argArray, newTarget) {
        const setups = Recording.select(this.setups, "function", /*name*/ undefined);
        const result = {};
        const recording = new Recording("construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget, result, /*callback*/ undefined);
        this.recordings.push(recording);
        try {
            return Recording.evaluate(setups, "construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget, () => Reflect.construct(target, argArray, newTarget));
        }
        catch (e) {
            throw result.throw = e;
        }
    }
    capture(callback, result) {
        return this.captureCore(function () { }, new CapturingFunctionHandler(result), callback);
    }
}
class MethodHandler {
    constructor(name) {
        this.name = name;
    }
    apply(target, thisArgument, argumentsList) {
        const handler = weakHandler.get(thisArgument);
        return handler
            ? handler.invoke(thisArgument, this.name, target, argumentsList)
            : Reflect.apply(target, thisArgument, argumentsList);
    }
}
class CapturingHandler {
    constructor(result) {
        this.thisArg = hasOwn(result, "this") ? result.this : Recording.noThisArg;
        this.callback = hasOwn(result, "callback") ? result.callback : undefined;
        this.result = hasOwn(result, "return") ? { return: result.return } :
            hasOwn(result, "throw") ? { throw: result.throw } :
                hasOwn(result, "fallback") && result.fallback ? { fallback: true } :
                    undefined;
    }
    get(_target, name, _receiver) {
        this.recording = new Recording("get", name, this.thisArg, [], /*newTarget*/ undefined, this.result, this.callback);
        return (...argArray) => { this.recording = new Recording("invoke", name, this.thisArg, argArray, /*newTarget*/ undefined, this.result, this.callback); };
    }
    set(_target, name, value, _receiver) {
        this.recording = new Recording("set", name, this.thisArg, [value], /*newTarget*/ undefined, this.result, this.callback);
        return true;
    }
}
class CapturingFunctionHandler extends CapturingHandler {
    apply(_target, _thisArg, argArray) {
        this.recording = new Recording("apply", /*name*/ undefined, this.thisArg, argArray, /*newTarget*/ undefined, this.result, this.callback);
        return undefined;
    }
    construct(_target, argArray, newTarget) {
        this.recording = new Recording("construct", /*name*/ undefined, /*thisArg*/ undefined, argArray, newTarget, this.result, this.callback);
        return undefined;
    }
}
function hasOwn(object, key) {
    return object !== undefined
        && Object.prototype.hasOwnProperty.call(object, key);
}

//# sourceMappingURL=mock.js.map
