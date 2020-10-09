// @noDeprecated: true
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
