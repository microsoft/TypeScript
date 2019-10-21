// @filename: declaration.d.ts

export declare class ClassWithSymbols {
  public readonly [Namespace.locallyExportedCustomSymbol]: string;
  public [Namespace.fullyExportedCustomSymbol](): void;
}
export namespace Namespace {
  export const locallyExportedCustomSymbol: unique symbol;
  export const fullyExportedCustomSymbol: unique symbol;
}
