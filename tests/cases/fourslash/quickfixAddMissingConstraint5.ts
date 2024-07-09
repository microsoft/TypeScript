/// <reference path="fourslash.ts" />

// @strict: true
// @filename: /foo.ts
////export interface RendererElement {
////    [key: string]: any
////}
////
////export interface VNode<HostElement extends RendererElement> {
////    target: HostElement | null;
////}
////
////export function cloneVNode<U>(vnode: VNode<U>): VNode<U> {
////    const cloned: VNode<RendererElement> = {
////        target: vnode.target,
////    }
////    return cloned;
////}

goTo.file("/foo.ts");
verify.codeFixAll({
    fixId: "addMissingConstraint",
    fixAllDescription: ts.Diagnostics.Add_extends_constraint_to_all_type_parameters.message,
    newFileContent:
`export interface RendererElement {
    [key: string]: any
}

export interface VNode<HostElement extends RendererElement> {
    target: HostElement | null;
}

export function cloneVNode<U extends RendererElement>(vnode: VNode<U>): VNode<U> {
    const cloned: VNode<RendererElement> = {
        target: vnode.target,
    }
    return cloned;
}`
})
