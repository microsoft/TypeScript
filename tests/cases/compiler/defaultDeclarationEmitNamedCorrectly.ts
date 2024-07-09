// @declaration: true
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