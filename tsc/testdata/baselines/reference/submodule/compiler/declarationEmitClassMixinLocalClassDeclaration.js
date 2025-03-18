//// [tests/cases/compiler/declarationEmitClassMixinLocalClassDeclaration.ts] ////

//// [declarationEmitClassMixinLocalClassDeclaration.ts]
export type AnyFunction<Result = any> = (...input: any[]) => Result

export type AnyConstructor<Instance extends object = object, Static extends object = object> =
    (new (...input: any[]) => Instance) & Static


type MixinHelperFunc = <A extends AnyConstructor, T>(required: [A], arg: T) => T extends AnyFunction<infer M> ? M : never


export const Mixin: MixinHelperFunc = null as any


export class Base {}


export class XmlElement2 extends Mixin(
    [Base],
    (base: AnyConstructor<Base, typeof Base>) => {
        class XmlElement2 extends base {
            num: number = 0
        }
        return XmlElement2;
    }) { }


//// [declarationEmitClassMixinLocalClassDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlElement2 = exports.Base = exports.Mixin = void 0;
exports.Mixin = null;
class Base {
}
exports.Base = Base;
class XmlElement2 extends (0, exports.Mixin)([Base], (base) => {
    class XmlElement2 extends base {
        num = 0;
    }
    return XmlElement2;
}) {
}
exports.XmlElement2 = XmlElement2;
