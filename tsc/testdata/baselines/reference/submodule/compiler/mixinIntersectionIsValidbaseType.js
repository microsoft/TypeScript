//// [tests/cases/compiler/mixinIntersectionIsValidbaseType.ts] ////

//// [mixinIntersectionIsValidbaseType.ts]
export type Constructor<T extends object = object> = new (...args: any[]) => T;

export interface Initable {
    init(...args: any[]): void;
}

/**
 * Plain mixin where the superclass must be Initable
 */
export const Serializable = <K extends Constructor<Initable> & Initable>(
    SuperClass: K
) => {
    const LocalMixin = (InnerSuperClass: K) => {
        return class SerializableLocal extends InnerSuperClass {
        }
    };
    let ResultClass = LocalMixin(SuperClass);
    return ResultClass;
};

const AMixin = <K extends Constructor<Initable> & Initable>(SuperClass: K) => {
    let SomeHowOkay = class A extends SuperClass {
    };

    let SomeHowNotOkay = class A extends Serializable(SuperClass) {
    };
};

//// [mixinIntersectionIsValidbaseType.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializable = void 0;
/**
 * Plain mixin where the superclass must be Initable
 */
const Serializable = (SuperClass) => {
    const LocalMixin = (InnerSuperClass) => {
        return class SerializableLocal extends InnerSuperClass {
        };
    };
    let ResultClass = LocalMixin(SuperClass);
    return ResultClass;
};
exports.Serializable = Serializable;
const AMixin = (SuperClass) => {
    let SomeHowOkay = class A extends SuperClass {
    };
    let SomeHowNotOkay = class A extends (0, exports.Serializable)(SuperClass) {
    };
};
