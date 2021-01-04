// @declaration: true
type Wrap<A> = {
    nest: A
};
interface PreventInliningInDeclarationEmit {
}
export type PublicWrap<X, Y = {}> = Wrap<Y> & PreventInliningInDeclarationEmit;
export function fn<T>(arg: T): PublicWrap<T> {
    return { nest: arg }
}
const nested = fn({ foo: 1 });   // Syntax Error in declaration emit here
export default nested;