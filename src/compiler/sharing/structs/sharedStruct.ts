import "../../symbolMetadataShim";
import "./sharedStructsGlobals";

import { Debug } from "../../debug";
import { FakeSharedStructType } from "./fakeSharedStruct";
import { AbstractConstructor } from "../../types";

// Holds the fields tracked with `@Shared()`
const weakSharedFields = new WeakMap<object, string[]>();

// Holds the `SharedStructType` instances produced for classes tracked with `@Shared()`
const weakSharedStructType = new WeakMap<object, SharedStructTypeFactory>();

// WeakRef and FinalizationRegistry may not exist, so we'll fall back to a non-weak shim when unavailable
interface WeakRef<T extends WeakKey> {
    deref(): T | undefined;
}

interface FinalizationRegistry<T> {
    register(target: WeakKey, heldValue: T, unregisterToken?: WeakKey): void;
    unregister(unregisterToken: WeakKey): void;
}

declare var WeakRef: new <T extends WeakKey>(value: T) => WeakRef<T>;
declare var FinalizationRegistry: new <T>(cleanupCallback: (heldValue: T) => void) => FinalizationRegistry<T>;

class FakeWeakRef<T extends WeakKey> implements WeakRef<T> {
    private _target: T; // NOTE: Not actually weak
    constructor(target: T) {
        this._target = target;
    }
    deref(): T | undefined {
        return this._target;
    }
}

class FakeFinalizationRegistry<T> implements FinalizationRegistry<T> {
    constructor(cleanupCallback: (heldValue: T) => void) {
        void cleanupCallback;
    }
    register(target: WeakKey, heldValue: T, unregisterToken?: WeakKey): void {
        void target;
        void heldValue;
        void unregisterToken;
    }
    unregister(unregisterToken: WeakKey): void {
        void unregisterToken;
    }
}

function createWeakRef<T extends WeakKey>(value: T) {
    return typeof WeakRef === "function" ? new WeakRef(value) : new FakeWeakRef(value);
}

function createFinalizationRegistry<T>(cleanupCallback: (heldValue: T) => void): FinalizationRegistry<T> {
    return typeof FinalizationRegistry === "function" ? new FinalizationRegistry(cleanupCallback) : new FakeFinalizationRegistry(cleanupCallback);
}

function createSharedStructType(fields: readonly string[]) {
    // If shared structs are available, create a shared struct type to use when creating a new instance of the
    // target. Otherwise, create a fake shared struct that emulates the required semantics to ensure we are forwards
    // compatible.
    return typeof SharedStructType === "function" ? new SharedStructType(fields) : new FakeSharedStructType(fields);
}

class SharedStructTypeFactory {
    private _fields: readonly string[];
    private _structType: WeakRef<new () => SharedStruct> | undefined;
    private _arrayTypes: Map<number, WeakRef<new () => SharedStruct>> | undefined;
    private _registry: FinalizationRegistry<number>;
    constructor(fields: readonly string[]) {
        this._fields = fields;
        this._registry = createFinalizationRegistry(length => { this._arrayTypes?.delete(length); });
    }

    structType(): new () => SharedStruct {
        let structType = this._structType?.deref();
        if (!structType) {
            structType = createSharedStructType(this._fields);
            this._structType = createWeakRef(structType);
        }
        return structType;
    }

    arrayType(length: number): new () => SharedStruct {
        let arrayType = this._arrayTypes?.get(length)?.deref();
        if (!arrayType) {
            const fields = new Set(this._fields);
            fields.add("length");
            for (let i = 0; i < length; i++) {
                fields.add(`${i}`);
            }
            arrayType = createSharedStructType([...fields]);
            this._arrayTypes ??= new Map();
            this._arrayTypes.set(length, createWeakRef(arrayType));
            this._registry.register(arrayType, length);
        }
        return arrayType;
    }
}

interface SharedClassDecorator {
    <T extends AbstractConstructor>(target: T, context: ClassDecoratorContext<T>): void;
    <T extends AbstractConstructor>(target: T): void;
}

interface SharedClassOptions {
    abstract?: boolean;
}

interface SharedFieldDecorator {
    <This, T extends Shareable>(target: undefined, context: ClassFieldDecoratorContext<This, T> & { private: false, static: false, name: string }): void;
    <This, T extends Shareable>(target: This, propertyKey: string, descriptor?: TypedPropertyDescriptor<T>): void;
}

function getOrCreateMetadata(target: AbstractConstructor) {
    if (Object.prototype.hasOwnProperty.call(target, Symbol.metadata)) {
        return target[Symbol.metadata];
    }
    const metadata = Object.create(target[Symbol.metadata] ?? null);
    Object.defineProperty(target, Symbol.metadata, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: metadata
    });
    return metadata;
}

/**
 * A decorator used to mark a `class` or a non-static public class field as "shared". This is intended to be used to
 * emulate syntax for shared structs and provide a mechanism to associate types with shared struct fields.
 * @internal
 */
export function Shared(): SharedClassDecorator & SharedFieldDecorator;
/**
 * A decorator used to mark a `class` as "shared". This is intended to be used to emulate syntax for shared structs.
 * @param options.abstract Indicates the `class` is `abstract` and cannot be constructed directly.
 * @internal
 */
export function Shared(options: SharedClassOptions): SharedClassDecorator;
export function Shared(options?: SharedClassOptions) {
    function SharedClassDecorator<T extends AbstractConstructor>(target: T, context: ClassDecoratorContext<T>) {
        if (weakSharedStructType.has(target)) {
            Debug.fail("@Shared() cannot be applied to the same class more than once.");
        }

        // Delete the default `constructor` property from the prototype, as shared structs cannot currently have
        // properties on the prototype.
        Reflect.deleteProperty(target.prototype, "constructor");

        // Validate the prototype chain. Even though `@Shared` class supertypes will have a null prototype, there may
        // have been non-`@Shared` abstract classes in between.
        let prototype: object | null = target.prototype;
        while (prototype) {
            if (Reflect.ownKeys(target.prototype).length > 0) {
                Debug.fail(`Shared struct type '${context.name}' cannot have methods on its prototype.`);
            }

            prototype = Object.getPrototypeOf(prototype);

            // Break early when we find a `@Shared` supertype since it should have already been validated.
            if (prototype && weakSharedStructType.has(prototype)) {
                break;
            }
        }

        // Give the constructor a null-ish prototype. We can't set it directly because the `prototype` property of a
        // class constructor is non-configurable, non-writable. Instead, we set it's `[[Prototype]]` to `null`.
        Object.setPrototypeOf(target.prototype, null); // eslint-disable-line no-null/no-null

        // If the class is `abstract`, do not associate a shared struct type with it.
        if (options?.abstract) {
            return;
        }

        // If decorator metadata is not available we cannot emulate shared struct. In this case we are in an environment
        // where `../symbolMetadataShim` could not execute and likely doesn't support `SharedStructType` anyways. In
        // that case, we fall back to a regular object with no sharing support.
        if (!context.metadata) {
            weakSharedStructType.set(target.prototype, Object as any);
            return;
        }

        // Collect all of the `@Shared` fields in declaration order, with supertype fields coming first in the list.
        let fields: string[] = [];
        let metadata: DecoratorMetadata | null = context.metadata;
        while (metadata) {
            const sharedFields = weakSharedFields.get(metadata);
            if (sharedFields) {
                fields = [...sharedFields, ...fields];
            }
            metadata = Object.getPrototypeOf(metadata);
        }

        // Remove duplicate field names
        fields = [...new Set(fields)];

        weakSharedStructType.set(target.prototype, new SharedStructTypeFactory(fields));
        return;
    }

    function SharedFieldDecorator<This, T>(_target: undefined, context: ClassFieldDecoratorContext<This, T>) {
        Debug.assert(!context.private, "@Shared is not supported on private fields.");
        Debug.assert(!context.static, "@Shared is not supported on static fields.");
        Debug.assert(typeof context.name === "string", "@Shared cannot be used on symbol-named fields.");

        // If `context.metadata` does not exists then we cannot record shared field information about the class and
        // should do nothing. The `@Shared` decorator on the class will perform appropriate fallback behavior.
        if (!context.metadata) {
            return;
        }

        // Get or create an array of `@Shared` field names to be used to construct a SharedStructType for the class.
        let sharedFields = weakSharedFields.get(context.metadata);
        if (!sharedFields) weakSharedFields.set(context.metadata, sharedFields = []);

        Debug.assert(!sharedFields.includes(context.name), "@Shared cannot be specified more than once on the same declaration.");
        sharedFields.push(context.name);
    }

    function decorator(...args: 
            | [target: AbstractConstructor]
            | [target: AbstractConstructor, context: ClassDecoratorContext]
            | [target: undefined, context: ClassFieldDecoratorContext]
            | [target: object, propertyKey: string, descriptor?: PropertyDescriptor]
        ) {
        if (args.length === 1) {
            const [target] = args;
            return SharedClassDecorator(target, {
                name: target.name,
                get metadata() { return getOrCreateMetadata(target); }
            } as ClassDecoratorContext);
        }
        else if (typeof args[1] === "string") {
            const [target, propertyKey, _descriptor] = args;
            Debug.assert(target);
            return SharedFieldDecorator(
                /*target*/ undefined,
                {
                    kind: "field",
                    name: propertyKey,
                    public: true,
                    static: false,
                    private: false,
                    get metadata() { return getOrCreateMetadata(target.constructor as AbstractConstructor); }
                } as unknown as ClassFieldDecoratorContext
            );
        }
        else {
            const [target, context] = args;
            switch (context.kind) {
                case "class": return SharedClassDecorator(target as AbstractConstructor, context);
                case "field": return SharedFieldDecorator(target as undefined, context);
                default: Debug.fail(`@Shared is not supported on ${(context as DecoratorContext).kind} declarations.`);
            }
        }
    }

    return decorator;
}

class NullObject extends null { // eslint-disable-line no-null/no-null
    constructor() {
        const self = Object.create(new.target.prototype);
        Object.setPrototypeOf(self, null); // eslint-disable-line no-null/no-null
        return self;
    }
}

Object.setPrototypeOf(NullObject.prototype, null); // eslint-disable-line no-null/no-null

/** @internal */
@Shared({ abstract: true })
// The compiler doesn't like us using `extends null` in `SharedStructBase` due to the interface extension to
// opt into the `SharedStruct` brand. If we use `extends null` below we end up with this error:
//
//  Class static side 'typeof SharedStructBase' incorrectly extends base class static side 'null'.ts(2417)
//
export abstract class SharedStructBase extends NullObject { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
    constructor() {
        // Find the first `SharedStructTypeFactory` instance associated with this prototype chain
        let prototype: object | null = new.target.prototype;
        while (prototype) {
            const StructType = weakSharedStructType.get(prototype)?.structType();
            if (StructType) {
                // This will either be an instance of `SharedStructType` (if shared structs and `context.metadata` are
                // available), an instance of `FakeSharedStructType` (if shared structs are not available, but
                // `context.metadata` is), or `Object` (if neither shared structs nor `context.metadata` are available).
                return new StructType();
            }
            prototype = Object.getPrototypeOf(prototype);
        }
        Debug.fail("Class not marked @Shareable()");
        super();
    }
}

// Reopen `SharedStructBase` to give it the `SharedStruct` brand.
/** @internal */
export interface SharedStructBase extends SharedStruct { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
}

// /** @internal */
// @Shared({ abstract: true })
// export abstract class SharedArrayBase<T extends Shareable> extends SharedStructBase {
//     @Shared() readonly length!: number;
//     constructor(length: number) {
//         // Find the first `SharedStructTypeFactory` instance associated with this prototype chain
//         let prototype: object | null = new.target.prototype;
//         while (prototype) {
//             const StructType = weakSharedStructType.get(prototype)?.arrayType(length);
//             if (StructType) {
//                 // This will either be an instance of `SharedStructType` (if shared structs and `context.metadata` are
//                 // available), an instance of `FakeSharedStructType` (if shared structs are not available, but
//                 // `context.metadata` is), or `Object` (if neither shared structs nor `context.metadata` are available).
//                 const inst = new StructType() as Mutable<SharedArrayBase<T>>;
//                 inst.length = length;
//                 return inst;
//             }
//             prototype = Object.getPrototypeOf(prototype);
//         }
//         Debug.fail("Class not marked @Shareable()");
//         super();
//     }

//     [index: number]: T;
// }

// // Reopen `SharedArrayBase` to give it the `SharedArray` brand.
// /** @internal */
// export interface SharedArrayBase<T extends Shareable> extends SharedArray<T> { // eslint-disable-line @typescript-eslint/no-unsafe-declaration-merging
// }