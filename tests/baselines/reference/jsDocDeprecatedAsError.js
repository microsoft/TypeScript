//// [jsDocDeprecatedAsError.ts]
/**
 * @deprecated
 */
interface I {
    /**
     * @deprecated
     */
    f: string
}
/**
 * @deprecated
 */
const a = "foo"
declare const b: I
a.toLocaleLowerCase();
b.f.toLocaleLowerCase();


//// [jsDocDeprecatedAsError.js]
/**
 * @deprecated
 */
var a = "foo";
a.toLocaleLowerCase();
b.f.toLocaleLowerCase();
