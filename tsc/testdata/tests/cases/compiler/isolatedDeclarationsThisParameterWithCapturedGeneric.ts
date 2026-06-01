// @declaration: true
// @isolatedDeclarations: true
export function fromProviders<T>() {
  return {
    tearDown(this: {state: T}): void {}
  };
}