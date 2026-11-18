// @strict: true
// @target: es2015
// @lib: esnext, dom

declare const styles: Partial<Pick<CSSStyleDeclaration, keyof CSSStyleDeclaration & symbol>>;
declare function element(styles: Partial<Record<keyof CSSStyleDeclaration, string>>): void;
element(styles);
