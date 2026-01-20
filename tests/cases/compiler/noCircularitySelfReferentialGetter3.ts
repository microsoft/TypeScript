// @strict: true
// @noEmit: true

const a = {
  prop: 42,
  get self() {
    return a;
  },
} satisfies { prop: number; self: any };
