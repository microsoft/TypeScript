//// [tests/cases/compiler/defaultDeclarationEmitNamedCorrectly.ts] ////

//// [defaultDeclarationEmitNamedCorrectly.ts]
export interface Things<P, T> {
    p: P;
    t: T;
}
export function make<P, CTor>(x: { new (): CTor & {props: P} }): Things<P, CTor> {
    return null as any;
}

export interface Props {
}

export default class MyComponent {
    props: Props;
    static create = make(MyComponent);
}

//// [defaultDeclarationEmitNamedCorrectly.js]
export function make(x) {
    return null;
}
class MyComponent {
}
MyComponent.create = make(MyComponent);
export default MyComponent;


//// [defaultDeclarationEmitNamedCorrectly.d.ts]
export interface Things<P, T> {
    p: P;
    t: T;
}
export declare function make<P, CTor>(x: {
    new (): CTor & {
        props: P;
    };
}): Things<P, CTor>;
export interface Props {
}
export default class MyComponent {
    props: Props;
    static create: Things<Props, MyComponent>;
}
