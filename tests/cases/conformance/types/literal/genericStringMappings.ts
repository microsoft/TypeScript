// @strict: true
// @noEmit: true

// repro from #52102#issuecomment-1371248589

type CamelCase1<
  S extends string,
  L extends string = Lowercase<S>,
  Res extends string = ""
> = L extends ""
  ? `start_${Uncapitalize<Res>}_end`
  : CamelCase1<never, "", `${Res}${Capitalize<L>}`>;

type Test1 = CamelCase1<"ABC">

// repro from #52102

type CamelCase2<
  S extends string,
  L extends string = Lowercase<S>,
  Res extends string = ""
> = L extends ""
  ? Uncapitalize<Res>
  : L extends `${infer H}_${infer T}`
  ? CamelCase2<never, T, `${Res}${Capitalize<H>}`>
  : CamelCase2<never, "", `${Res}${Capitalize<L>}`>;

type Test2 = CamelCase2<"FOOBAR">