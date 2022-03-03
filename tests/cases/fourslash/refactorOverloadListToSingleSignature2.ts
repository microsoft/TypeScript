/// <reference path='fourslash.ts' />

/////*a*/declare function foo(): void;
/////**
//// * @param a a string param doc
//// */
////declare function foo(a: string): void;
/////**
//// * @param a a number param doc
//// * @param b b number param doc
//// */
////declare function foo(a: number, b: number): void;
/////**
//// * @param rest rest param doc
//// */
////declare function foo(...rest: symbol[]): void;/*b*/

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert overload list to single signature",
    actionName: "Convert overload list to single signature",
    actionDescription: ts.Diagnostics.Convert_overload_list_to_single_signature.message,
// we don't delete the param comment on the signature we update because deleting *part* of a comment is... hard
// and we definitely don't want to delete the whole comment. This is probably a good argument for why jsdoc should
// really be uniformly handled as AST nodes, and transformed as such :(
newContent: `/**
 * @param rest rest param doc
 */
declare function foo(...args: [] | [
    /**
     * a string param doc
     */
    a: string
] | [
    /**
     * a number param doc
     */
    a: number,
    /**
     * b number param doc
     */
    b: number
] | [
    /**
     * rest param doc
     */
    ...rest: symbol[]
]): void;`,
});
