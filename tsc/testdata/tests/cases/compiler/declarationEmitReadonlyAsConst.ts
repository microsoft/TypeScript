// @strict: true
// @declaration: true

export const value = {
  method(): string {
    return "a";
  },
  prop: {
    nested: 1,
  },
} as const;
