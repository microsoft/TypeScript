type MyExtract<T, U> = T extends U ? T : never

function foo<T>(a: T) {
  const b: Extract<any[], T> = 0 as any;
  a = b; // ok

  const c: (any[] extends T ? any[] : never) = 0 as any;
  a = c;

  const d: MyExtract<any[], T> = 0 as any;
  a = d; // ok

  type CustomType = any[] extends T ? any[] : never;
  const e: CustomType = 0 as any;
  a = e;
}