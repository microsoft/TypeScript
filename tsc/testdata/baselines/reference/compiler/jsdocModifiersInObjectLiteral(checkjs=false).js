//// [tests/cases/compiler/jsdocModifiersInObjectLiteral.ts] ////

//// [test.js]
// Object literal members aren't class-like members, so JSDoc modifiers like
// @override or @readonly aren't real modifiers and must not produce grammar
// errors, regardless of checkJs (#4437).

const obj = {
  /** @override */
  created() {
  },

  /** @private */
  onClose_() {
  },

  /** @readonly */
  get value() {
    return 1;
  },

  /** @protected */
  set value(v) {
  },

  /** @public */
  async load() {
  },
};




//// [test.d.ts]
declare const obj: {
    /** @override */
    created(): void;
    /** @private */
    onClose_(): void;
    /** @readonly */
    value: number;
    /** @public */
    load(): Promise<void>;
};
