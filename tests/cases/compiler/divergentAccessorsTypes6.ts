// @lib: esnext,dom
// @declaration: true

export {};

interface Element {
    get style(): CSSStyleDeclaration;
    set style(cssText: string);
}

declare const element: Element;
element.style = "color: red";
element.style.animationTimingFunction;
element.style = element.style; // error

// Now that we don't check for getter/setter assignability, we should
// ensure the setter annotation is actually checked even if it's never observed.

type Fail<T extends never> = T;
interface I1 {
    get x(): number;
    set x(value: Fail<string>);
}
const o1 = {
    get x(): number { return 0; },
    set x(value: Fail<string>) {}
}

// A setter annotation still implies the getter return type.

const o2 = {
    get p1() { return 0; }, // error - no annotation means type is implied from the setter annotation
    set p1(value: string) {},

    get p2(): number { return 0; }, // ok - explicit annotation
    set p2(value: string) {},
};
