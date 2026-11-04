// @target: es2015
// @strict: true

declare function setProperty<T extends Element, K extends keyof T & string>(element: T, property: K, value: T[K]): void;
declare const element: Element;
declare const key: keyof Element;
setProperty(element, key, true);
