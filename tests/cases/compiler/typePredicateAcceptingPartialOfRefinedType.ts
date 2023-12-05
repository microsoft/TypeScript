// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

// repro #51953

interface Test {
  testy?: string;
}

interface Options {
  test: Test['testy'];
}

declare function includesAllRequiredOptions(options: Partial<Options>): options is Options;
