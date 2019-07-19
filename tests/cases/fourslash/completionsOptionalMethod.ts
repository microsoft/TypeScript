/// <reference path="fourslash.ts" />

// @strictNullChecks: true

////declare const x: { m?(): void };
////x./**/

verify.completions({
  marker: "",
  exact: { name: 'm', kind: 'method', kindModifiers: 'declare,optional', sortText: completion.SortText.OptionalMember }
});
