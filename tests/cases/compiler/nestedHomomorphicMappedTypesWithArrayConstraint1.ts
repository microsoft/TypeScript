// @strict: true
// @noEmit: true

interface SinonMatcher {
  and(expr: SinonMatcher): SinonMatcher;
  or(expr: SinonMatcher): SinonMatcher;
  test(val: any): boolean;
}

type MatchArguments<T> = {
  [K in keyof T]: SinonMatcher | T[K];
};

interface SinonSpyCallApi<TArgs extends any[] = any[]> {
  calledWith(...args: Partial<MatchArguments<TArgs>>): boolean;
}
