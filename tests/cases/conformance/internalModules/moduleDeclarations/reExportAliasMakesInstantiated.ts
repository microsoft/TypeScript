declare module pack1 {
  const test1: string;
  export { test1 };
}
declare module pack2 {
  import test1 = pack1.test1;
  export { test1 };
}
export import test1 = pack2.test1;

declare module mod1 {
  type test1 = string;
  export { test1 };
}
declare module mod2 {
  import test1 = mod1.test1;
  export { test1 };
}
const test2 = mod2; // Possible false positive instantiation, but ok
