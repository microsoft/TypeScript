/// <reference path='fourslash.ts' />

// @strict: true

// @Filename: user.ts
//// declare const line: string;
//// let test: string | null = null;
////
//// for (let i = 0; i < line.length; i++) {
////   const char = line[i];
////   if (test === char) {}
////   const [|alsoChar/*1*/|] = char;
////   test = alsoChar;
//// }

// if this circularity error ever goes awayt a different input code should be used here
verify.getSemanticDiagnostics([{
  code: 7022,
  message: "'alsoChar' implicitly has type 'any' because it does not have a type annotation and is referenced directly or indirectly in its own initializer.",
}]);
verify.quickInfoAt("1", "const alsoChar: any");
