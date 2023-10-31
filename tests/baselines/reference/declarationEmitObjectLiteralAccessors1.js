//// [tests/cases/compiler/declarationEmitObjectLiteralAccessors1.ts] ////

//// [declarationEmitObjectLiteralAccessors1.ts]
// same type accessors
export const obj1 = {
  /** my awesome getter (first in source order) */
  get x(): string {
    return "";
  },
  /** my awesome setter (second in source order) */
  set x(a: string) {},
};

// divergent accessors
export const obj2 = {
  /** my awesome getter */
  get x(): string {
    return "";
  },
  /** my awesome setter */
  set x(a: number) {},
};

export const obj3 = {
  /** my awesome getter */
  get x(): string {
    return "";
  },
};

export const obj4 = {
  /** my awesome setter */
  set x(a: number) {},
};




//// [declarationEmitObjectLiteralAccessors1.d.ts]
export declare const obj1: {
    /** my awesome getter (first in source order) */
    x: string;
};
export declare const obj2: {
    /** my awesome getter */
    get x(): string;
    /** my awesome setter */
    set x(a: number);
};
export declare const obj3: {
    /** my awesome getter */
    readonly x: string;
};
export declare const obj4: {
    /** my awesome setter */
    x: number;
};
