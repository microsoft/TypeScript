import { workerThreads } from "../../workerThreads";
import { Shared } from "./sharedStruct";

const identifiableConstructors = new WeakSet();

let typeCount = 0;

/** @internal */
export interface IdentifiableStruct extends SharedStruct {
    readonly __hash__: number;
}

/**
 * Defines an "identity hash" on a shared struct, allowing it to be used as a key in a `SharedMap` or `SharedSet`.
 * @internal
 */
export function Identifiable<C extends abstract new (...args: any) => any>(base: C): C & (abstract new (...args: any) => IdentifiableStruct) {
    if (isIdentifiableConstructor(base)) {
        // constructor is already marked as identifiable. Nothing to do here.
        return base;
    }

    const threadId = workerThreads?.threadId ?? 0;
    const typeId = typeCount++;
    let instanceCount = 0;

    @Shared({ abstract: true })
    abstract class IdentifiableStruct extends base {
        @Shared() readonly __hash__: number;
        constructor(...args: any) {
            super(...args);
            const instanceId = instanceCount++;
            let hc = threadId;
            hc = ((hc << 7) | (hc >>> 25)) ^ typeId;
            hc = ((hc << 7) | (hc >>> 25)) ^ instanceId;
            this.__hash__ = hc;
        }
    }

    identifiableConstructors.add(IdentifiableStruct);
    return IdentifiableStruct;
}

function isIdentifiableConstructor(value: object | null) {
    while (value) {
        if (identifiableConstructors.has(value)) {
            return true;
        }
        value = Object.getPrototypeOf(value);
    }
    return false;
}