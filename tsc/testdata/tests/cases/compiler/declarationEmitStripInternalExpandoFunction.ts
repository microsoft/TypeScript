// @declaration: true
// @stripInternal: true

/** @internal */
export function internalFn(): string {
    return "hello";
}
internalFn.debugFlag = true;

export function publicFn(): void {}
publicFn.metadata = "public";
