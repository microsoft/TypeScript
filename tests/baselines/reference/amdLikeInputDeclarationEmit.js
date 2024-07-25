//// [tests/cases/compiler/amdLikeInputDeclarationEmit.ts] ////

//// [typing.d.ts]
declare function define<T=unknown>(name: string, modules: string[], ready: (...modules: unknown[]) => T);
//// [BaseClass.d.ts]
declare module "deps/BaseClass" {
    class BaseClass {
        static extends<A>(a: A): new () => A & BaseClass;
    }
    export = BaseClass;
}
//// [ExtendedClass.js]
define("lib/ExtendedClass", ["deps/BaseClass"], 
/**
 * {typeof import("deps/BaseClass")}
 * @param  {typeof import("deps/BaseClass")} BaseClass 
 * @returns 
 */
(BaseClass) => {    
    
    const ExtendedClass = BaseClass.extends({
        f: function() {
            return "something";
        }
    });

    // Exports the module in a way tsc recognize class export 
    const module = {};
    module.exports = ExtendedClass
    return module.exports;
});



//// [ExtendedClass.d.ts]
export = ExtendedClass;
declare const ExtendedClass: new () => {
    f: () => "something";
} & import("deps/BaseClass");
