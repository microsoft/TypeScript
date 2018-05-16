Change Log
===

v5.10.0
---

## :tada: Features

- [new-rule] [`prefer-while`](https://palantir.github.io/tslint/rules/prefer-while/) (#3750)
- [new-fixer] [`comment-format`](https://palantir.github.io/tslint/rules/comment-format/) (#3845)
- [new-rule-option] `"allow-empty-functions"` for [`no-empty`](https://palantir.github.io/tslint/rules/no-empty/) rule (#3624)
- [new-rule-option] New options for [`promise-function-async`](https://palantir.github.io/tslint/rules/promise-function-async/) specifying what kinds of functions to check (#3807)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] [`file-header`](https://palantir.github.io/tslint/rules/file-header/) rule plays nice with [`no-trailing-whitespace`](https://palantir.github.io/tslint/rules/no-trailing-whitespace/) rule (#3802)
- [bugfix] [`no-unbound-method`](https://palantir.github.io/tslint/rules/no-unbound-method/) rule allows square bracket property access (#3610)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/) no longer marks native JSX elements as unsafe (#3699)
- [enhancement] [`file-header`](https://palantir.github.io/tslint/rules/file-header/) auto-fixes use '!' character to ensure header stays above imports (#3741)
- [enhancement] Better error messages if a rule crashes (#3836)
- [enhancement] Better error messages when no valid rules are specified (#3729)
- [enhancement] Better lint messages for unused imports in [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) rule (#3831)
- [docs] Improve documentation of cli flag --project (#3703)
- [docs] Added short rationales for about thirty rules (#3734)
- [docs] Added optional capability to provide code examples in rules' metadata (#3602)
- [docs] Many small docs fixes and tweaks from many great contributors!

Thanks to our contributors!

- Achim Weimert
- BB9z
- Blair Zajac
- Chia-Lun Wu (Leo)
- Ethan
- Janis Koehr
- Josh Goldberg
- Julian Verdurmen
- Lucas Sloan
- Mark Vincze
- Martin Möhwald
- Oliver Joseph Ash
- Pichest Wongsiripiphat
- Rafael Santana
- Ruben Bridgewater
- Ryan Waskiewicz
- Sehrope Sarkuni
- Suchan Lee
- Victor Belozyorov
- aervin_
- cwgorman
- felipeissa
- jishi9


v5.9.1
---

## :hammer_and_wrench: Bugfixes

- [bugfix] Removed extraneous deprecation warning produced when using `tslint:recommended` or `tslint:latest` by disabling `typeof-compare` in these rulesets. (#3639)
- [bugfix] Resolve directories as absolute paths when validating custom `rulesDirectory` paths, which fixes usage with tslint-loader. (#3640)

v5.9.0
---

## :warning: Deprecations

- [deprecation] Several utility functions from `src/language/utils.ts` have been deprecated (#3476)
- [deprecation] Linting non-existent files now outputs a warning. This will be an error in TSLint 6. (#3313)

## Configuration inheritance changes

Significant changes have been made to configuration inheritance to address a long-standing UX issue around `defaultSeverity`: #2569.

`defaultSeverity` defined in a `tslint.json` file will now override the `defaultSeverity` value defined in any configurations you are extending.
This means that any rules specified in the base configurations can now take on a new `defaultSeverity` if you so choose. If you extend multiple
configuration files, the `defaultSeverity` defined in the last one wins.

In practice, this allows users to, for example, more easily use the built-in TSLint configurations (`tslint:recommended`, `tslint:latest`, `tslint:all`)
and treat all errors as warnings instead of errors.

For more details, see the relevant PRs:

- Override `defaultSeverity` defined in extended configs (#3449)
- Inherit defaultSeverity and apply it to preceding base configs (#3530)

## :tada: Features

- [feature] Support yaml configuration files (#1598) (#3433)
- [new-fixer] [`file-header`](https://palantir.github.io/tslint/rules/file-header/) (#3475)
- [new-rule] [`no-dynamic-delete`](https://palantir.github.io/tslint/rules/no-dynamic-delete/) (#3573)
- [new-rule] [`prefer-readonly`](https://palantir.github.io/tslint/rules/prefer-readonly/) (#2896)
- [new-rule] [`newline-per-chained-call`](https://palantir.github.io/tslint/rules/newline-per-chained-call/) (#3278)
- [new-rule-option] `"temporalDeadZone"` for [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) to ignore shadowing in the temporal dead zone of classes, parameters, enums and variables declared with `let` or `const`
(#3389)
- [new-rule-option] `"shorthand-first"` for [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/) (#3607)
- [new-rule-option] Add support for an ignore pattern for [`max-line-length`](https://palantir.github.io/tslint/rules/max-line-length/) (#3099)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] Update commander.js dependency to prevent users from transitively installing a buggy 2.12.0 release (#3510)
- [bugfix] `--project` excludes all files of external dependencies (#3320)
- [bugfix] Show errors when `tsconfig.json` is invalid (#3410)
- [bugfix] [`no-implicit-dependencies`](https://palantir.github.io/tslint/rules/no-implicit-dependencies/) don't crash on malformed package.json (#3373)
- [bugfix] [`strict-type-predicates`](https://palantir.github.io/tslint/rules/strict-type-predicates/) allows comparing typeof result with non-literals (#3542)
- [bugfix] [`no-redundant-jsdoc`](https://palantir.github.io/tslint/rules/no-redundant-jsdoc/) fixed crash on unhandled tag (#3414)
- [bugfix] [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/) fixed regression that effectively disabled the rule with `\r\n` line breaks (#3427)
- [bugfix] [`curly`](https://palantir.github.io/tslint/rules/curly/) fixer now correctly handles comments (#3473)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/) fixed false-positive with namespaced types (#3487)
- [bugfix] Removed potentailly dangerous fixer for [`no-any`](https://palantir.github.io/tslint/rules/no-any/) (#3486)
- [bugfix] [`no-unnecessary-type-assertion`](https://palantir.github.io/tslint/rules/no-unnecessary-type-assertion/) fixed false negatives for types with numeric keys (#3468)
- [bugfix] [`callable-types`](https://palantir.github.io/tslint/rules/callable-types/) adds parentheses when fixing a type literal inside an array type (#3440)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/) allows spreading an `any` value into an object (#3439)
- [bugfix] no unnecessary whitespace before argument in callback functions fixed with [`arrow-parens`](https://palantir.github.io/tslint/rules/arrow-parens) fixer (#3618)
- [bugfix] [`prefer-const`](https://palantir.github.io/tslint/rules/prefer-const/) false negative with index signature named like a variable (#3385)
- [bugfix] [`whitespace`](https://palantir.github.io/tslint/rules/whitespace) rule checks property declarations if `"check-decl"` is enabled (#3546)
- [bugfix] Using ternary operator for calling super() now passes [`no-duplicate-super`](https://palantir.github.io/tslint/rules/no-duplicate-super) rule. (#3544)
- [bugfix] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) now excludes declaration files and ambient modules (#3387)
- [bugfix] [`no-duplicate-imports`](https://palantir.github.io/tslint/rules/no-duplicate-imports) Allow duplicate imports from separate ambient module declarations (#3398)
- [bugfix] [`await-promise`](https://palantir.github.io/tslint/rules/await-promise/) correctly recognises classes extending Promise (#3383)
- [bugfix] [`prefer-conditional-expression`](https://palantir.github.io/tslint/rules/prefer-conditional-expression/): don't repeat error on nested if statements (#3528)
- [bugfix] [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/): don't require documentation on methods in object literals (#3532)
- [bugfix] [`one-line`](https://palantir.github.io/tslint/rules/one-line/) fixed crash on syntax error in class or interface (#3538)
- [bugfix] [`no-redundant-jsdoc`](https://palantir.github.io/tslint/rules/no-redundant-jsdoc/) allow `@template` tag if it has a description (#3415)
- [bugfix] Fix condition for deprecation of [`typeof-compare`](https://palantir.github.io/tslint/rules/typeof-compare) (#3429)
- [enhancement] Better error message for files not contained in the project (#3313)
- [enhancement] `"properties"` option for [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/) rule now checks getter and setter accessors. (#3497)
- [enhancement] [`no-magic-numbers`](https://palantir.github.io/tslint/rules/no-magic-numbers) ignores parseInt radix parameter (#3536)
- [enhancement] Avoid duplicate I/O when using `--project` option (#3313)
- [enhancement] clicking the filename in `stylish`-formatter's output jumps to the first failure in that file. (#3491)
- [enhancement] [`ban-comma-operator`](https://palantir.github.io/tslint/rules/ban-comma-operator/) ignores comma operator inside for-loop incrementor (#3485)
- [enhancement] [`space-within-parens`](https://palantir.github.io/tslint/rules/space-within-parens/) updated to always allow empty parentheses `()`. (#3513)
- [enhancement] Better error message syntax for [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/) modifier lists (#3379)
- [enhancement] Improve failure message & docs for [`ban-comma-operator`](https://palantir.github.io/tslint/rules/ban-comma-operator/) (#3384)
- [enhancement] Output code warnings in yellow instead of red for codeFrame formatter (#3402)
- [enhancement] Converted [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs) rule to use a function instead of a walker (#3466)
- [docs] [`ban-comma-operator`](https://palantir.github.io/tslint/rules/ban-comma-operator/): fix metadata, list as "functionality" rule (#3612)
- [docs] Enhance [`no-use-before-declare`](https://palantir.github.io/tslint/rules/no-use-before-declare/) documentation to clarify the rule's status (#3520)
- [docs] Enhance [`await-promise`](https://palantir.github.io/tslint/rules/await-promise/) options documentation (#3519)
- [docs] Add `hasFix` metadata for the [`indent`](https://palantir.github.io/tslint/rules/indent) rule (#3529)
- [docs] Clearer rule description for [`no-irregular-whitespace`](https://palantir.github.io/tslint/rules/no-irregular-whitespace) (#3627)

Thanks to our contributors!

- Klaus Meinhardt
- Josh Goldberg
- Chris Barr
- Nathan Shively-Sanders
- Jeremy Morton
- Sergey Koshechkin
- Daniel Kucal
- Eric Smekens
- Johannes Choo
- Elena Vilchik
- Eugene Timokhov
- Carlo Bottiglieri
- reduckted
- Glavin Wiechert
- jbsingh
- Mateusz Witkowski
- HideDev
- Bruno Lemos
- aervin_
- Roman
- Ryan Waskiewicz

v5.8.0
---

## :warning: Deprecations

- [deprecation] [`typeof-compare`](https://palantir.github.io/tslint/rules/typeof-compare/) is deprecated because typescript already does that check (#3286)
- [deprecation] CLI argument `--type-check` is no longer necessary and will be removed in the next major version (#3322)

## Updates to `tslint:latest` configuration

```diff
+    "ban-comma-operator": true,
+    "jsdoc-format": {
+        options: "check-multiline-start",
+    },
+    "no-duplicate-switch-case": true,
+    "no-implicit-dependencies": true,
+    "no-return-await": true,
```

## :tada: Features

- [feature] Added `linterOptions` configuration field to `tslint.json`, which supports a list of `exclude` globs to disable linting for a subset of files (#2409)
- [new-rule] [`no-return-await`](https://palantir.github.io/tslint/rules/no-return-await/) (#3233)
- [new-rule] [`no-redundant-jsdoc`](https://palantir.github.io/tslint/rules/no-redundant-jsdoc/) (#2754)
- [new-rule] [`no-duplicate-switch-case`](https://palantir.github.io/tslint/rules/no-duplicate-switch-case/) (#2937)
- [new-rule] [`no-implicit-dependencies`](https://palantir.github.io/tslint/rules/no-implicit-dependencies/) (#3343)
- [new-rule] [`no-unnecessary-class`](https://palantir.github.io/tslint/rules/no-unnecessary-class/) (#3119)
- [new-rule] [`ban-comma-operator`](https://palantir.github.io/tslint/rules/ban-comma-operator/) (#3250)
- [new-fixer] [`one-line`](https://palantir.github.io/tslint/rules/one-line/) (#3200)
- [new-fixer] [`curly`](https://palantir.github.io/tslint/rules/curly/) (#3262)
- [new-rule-option] [`jsdoc-format`](https://palantir.github.io/tslint/rules/jsdoc-format/) adds option `"check-multiline-start"` to enforce the first line of a multiline JSDoc comment to be empty. (#3181)
- [new-rule-option] [`trailing-comma`](https://palantir.github.io/tslint/rules/trailing-comma/) adds option `"esSpecCompliant"` to make it compatible with the ES spec regarding trailing commas after object/array rest and rest parameters. (#3176)
- [new-rule-option] `"check-parameter-property"` option for [`member-access`](https://palantir.github.io/tslint/rules/member-access/) rule (#3325)
- [new-rule-option] `"strict-bound-class-methods"` option for [`semicolon`](https://palantir.github.io/tslint/rules/semicolon/) rule (#3294)
- [new-rule-option] `"grouped-imports"` option for [`ordered-imports`](https://palantir.github.io/tslint/rules/ordered-imports/) rule (#3138)
- [new-rule-option] `"ignore-blank-lines"` option for [`no-trailing-whitespace`](https://palantir.github.io/tslint/rules/no-trailing-whitespace/) rule (#3346)
- [new-rule-option] `"never"` option for [`object-literal-shorthand`](https://palantir.github.io/tslint/rules/object-literal-shorthand/) disallows shorthand notation (#3268)
- [new-rule-option] `"exclude-class-expressions"` option for [`max-classes-per-file`](https://palantir.github.io/tslint/rules/max-classes-per-file/) rule (#3281)
- [new-rule-option] [`no-unnecessary-type-assertion`](https://palantir.github.io/tslint/rules/no-unnecessary-type-assertion/) supports a whitelist of types to ignore (#3257)
- [new-rule-option] `"module-source-path"` for [`ordered-imports`](https://palantir.github.io/tslint/rules/ordered-imports/) allows sorting imports by trailing end of path (#3178)
- [new-formatter] JUnit (#3194)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] [`no-empty-interface`](https://palantir.github.io/tslint/rules/no-empty-interface/) allows providing type arguments for extended type (#3260)
- [bugfix] Fixed line switches to not disable failures in the next line following the disabled line (#3177)
- [bugfix] [`return-undefined`](https://palantir.github.io/tslint/rules/return-undefined/) handles union return types in async functions (#3298)
- [bugfix] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/) checks correct constructor overload (#3203)
- [bugfix] [`return-undefined`](https://palantir.github.io/tslint/rules/return-undefined/) declared return type takes precedence over contextual type (#3298)
- [bugfix] Correctly mark `inputFilePath` as an optional parameter in `Configuration.findConfiguration()` (#3195)
- [bugfix] [`return-undefined`](https://palantir.github.io/tslint/rules/return-undefined/) fixed regressions: once again allows anything if return type is `any` (#3298)
- [bugfix] [`only-arrow-functions`](https://palantir.github.io/tslint/rules/only-arrow-functions/) allow function if `this` is used in parameter initializer (#3315)
- [bugfix] [`no-conditional-assignment`](https://palantir.github.io/tslint/rules/no-conditional-assignment/): exclude intentional assignments, e.g. inside functions (#2629)
- [bugfix] [`no-angle-bracket-type-assertion`](https://palantir.github.io/tslint/rules/no-angle-bracket-type-assertion/) fixer adds parentheses when necessary (#3301)
- [bugfix] [`no-angle-bracket-type-assertion`](https://palantir.github.io/tslint/rules/no-angle-bracket-type-assertion/) fixed order when autofixing consecutive assertions (#3301)
- [bugfix] `vso` formatter no longer duplicates output for fixed failures (#3348)
- [bugfix] [`no-unbound-method`](https://palantir.github.io/tslint/rules/no-unbound-method/): Allow negation of method (#3349)
- [bugfix] [`arrow-parens`](https://palantir.github.io/tslint/rules/arrow-parens/) with option `"ban-single-arg-parens"` no longer produces invalid code when fixed (#3247)
- [bugfix] Fixed regression where the lookup of `tslint.json` stopped at the current directory. (#3309)
- [bugfix] `--test` works correctly with any `compilerOptions.target` (#3296)
- [bugfix] `whitepace` handles files with BOM and other irregular whitespace (#3305)
- [bugfix] [`callable-types`](https://palantir.github.io/tslint/rules/callable-types/) auto fix produces invalid results (#3342)
- [bugfix] [`no-string-literal`](https://palantir.github.io/tslint/rules/no-string-literal/) correctly fix property names with leading underscores (#3184)
- [bugfix] [`variable-name`](https://palantir.github.io/tslint/rules/variable-name/) fixed crash on empty variable name (#3292)
- [bugfix] [`trailing-comma`](https://palantir.github.io/tslint/rules/trailing-comma/) fixed crash on arrow function without parens (#3246)
- [bugfix] Fix [`space-before-function-paren`](https://palantir.github.io/tslint/rules/space-before-function-paren/) for anonymous/arrow generic functions (#3085)
- [bugfix] Removed warning printed to console when using the [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) along with the `noUnusedLocals` and `noUnusedParameters` compiler options (#3227)
- [bugfix] [`no-invalid-this`](https://palantir.github.io/tslint/rules/no-invalid-this/) ignores functions with a `this` param (#3267)
- [enhancement] Sort failures by line and character for formatters (#3345)
- [enhancement] [`import-blacklist`](https://palantir.github.io/tslint/rules/import-blacklist/) also checks exports and dynamic imports (#3258)
- [enhancement] [`no-conditional-assignment`](https://palantir.github.io/tslint/rules/no-conditional-assignment/) added check for conditional (ternary) expressions (#2629)
- [enhancement] Allow [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/) to list doc tags that mark a node as not requiring a documentation body. Tags can also provide a regexp matcher to validate that their contents are docs-valid. (#2415)
- [enhancement] [`await-promise`](https://palantir.github.io/tslint/rules/await-promise/) enforces that `for-await-of` is only used with `AsyncIterable` (#3297)
- [enhancement] [`one-line`](https://palantir.github.io/tslint/rules/one-line/) checks type alias declarations (#3200)
- [enhancement] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/) checks object destructuring (#3318)
- [enhancement] [`no-submodule-imports`](https://palantir.github.io/tslint/rules/no-submodule-imports/) also checks exports (#3258)
- [enhancement] [`restrict-plus-operands`](https://palantir.github.io/tslint/rules/restrict-plus-operands/): More specific error message when arguments include strings (#3220)
- [enhancement] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/) checks more expressions, for example destructuring, `yield`, property initializer (#3196)
- [enhancement] [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/): allow grouping of object properties via additional blank lines when using alphabetical ordering. (#3191)
- [enhancement] Migrated CLI from using `colors` module to `chalk` module (#3171)
- [enhancement] [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) applies the ignorePattern to imports (#3187)

Thanks to our contributors!

- Klaus Meinhardt
- Charles Samborski
- Donald Pipowitch
- Josh Goldberg
- mmkal
- Erik
- Csaba Miklos
- Dominik Moritz
- Khalid Saifullah
- Lukas Spieß
- Merott Movahedi
- Bowen Ni
- ksvitkovsky
- Hutson Betts
- Caleb Eggensperger
- Brent Erickson
- Trivikram
- Brandon Furtwangler
- Pavel Zet
- aervin_
- Holger Jeromin
- Danny Guo
- Jeremy Morton
- Cyril Gandon
- Andy Hanson
- yadan

v5.7.0
---

## :tada: New rules, options, and fixers

- [new-rule] [`no-parameter-reassignment`](https://palantir.github.io/tslint/rules/no-parameter-reassignment/) (#3045)
- [new-rule-option]: [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/): Add `match-declaration-order` option (#2829)
- [new-rule-option] `check-type-operator` for [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/) rule (#3083)
- [new-rule-option] [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/): Add `check-rest-spread` option (#3089)

## :hammer_and_wrench: Bugfixes & enhancements

- [api] `AbstractRule#applyWithFunction` allows additional parameter that is passed through to `walkFn` (#3140)
- [api] `AbstractRule#applyWithFunction` has better type checking for its type parameter (#2660)
- [bugfix] [`member-access`](https://palantir.github.io/tslint/rules/member-access/) autofix now correcly inserts `public` keyword after decorators (#3162)
- [bugfix] [`prefer-const`](https://palantir.github.io/tslint/rules/prefer-const/) correctly handle `catch` without binding parameter introduced in `typescript@2.5.1` (#3151)
- [bugfix] [`no-invalid-template-strings`](https://palantir.github.io/tslint/rules/no-invalid-template-strings/) allows backslash-prefixed template expressions  (#3116)
- [bugfix] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/) no longer shows errors on imports and exports (#3141)
- [bugfix] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/): fix false positive when calling a function or method where another overload is deprecated (#2883)
- [bugfix] [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/): fixed `"check-separator"` for trivial `for` cases. (#3132)
- [bugfix] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/) prevent spreading `this` as it is not allowed by the compiler (#3126)
- [bugfix] `msbuild` formatter uses backslashes in paths on Windows (#3145)
- [bugfix] [`no-namespace`](https://palantir.github.io/tslint/rules/no-namespace/) ignores global augmentation (#3161)
- [enhancement] remove superfluous empty lines on tslint output. (#3121)
- [enhancement] [`no-submodule-imports`](https://palantir.github.io/tslint/rules/no-submodule-imports/) allows whitelisting of submodules like `@angular/core/testing` (#3129)
- [enhancement] custom lint rules will be resolved using node's path resolution to allow for loaders like `ts-node` (#3108)
- [enhancement] [`quotemark`](https://palantir.github.io/tslint/rules/quotemark/) no longer requires `"single"` or `"double"` to be the first option. The rule defaults to `"double"` if none is specified. (#3114)
- [enhancement] [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) autofix removes trailing comments of imports (#3156)
- [enhancement] [`no-unnecessary-type-assertion`](https://palantir.github.io/tslint/rules/no-unnecessary-type-assertion/) allows certain necessary assertions to prevent type widening (#3120)

Thanks to our contributors!

- Paul Gschwendtner
- Andy Hanson
- ksvitkovsky
- Santi Albo
- aervin
- Junle Li
- Joscha Feth
- WiseBird
- Caleb Eggensperger
- WGroenestein
- Bowen Ni

v5.6.0
---

## :tada: New rules, options, and fixers

- [new-rule] [`no-duplicate-imports`](https://palantir.github.io/tslint/rules/no-duplicate-imports/) (#3075)
- [new-rule] [`no-submodule-imports`](https://palantir.github.io/tslint/rules/no-submodule-imports/) (#3091)
- [new-rule] [`space-within-parens`](https://palantir.github.io/tslint/rules/space-within-parens/) (#2959)
- [new-fixer] [`member-access`](https://palantir.github.io/tslint/rules/member-access/) (#2969)
- [new-fixer] [`no-null-keyword`](https://palantir.github.io/tslint/rules/no-null-keyword/): fix `x == null` to `x == undefined` (#2802)
- [new-rule-option] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) let's you optionally ignore certain kinds of declarations (#3030)
- [new-rule-option] [`prefer-conditional-expression`](https://palantir.github.io/tslint/rules/prefer-conditional-expression/) adds `check-else-if` (#2963)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] [`array-type`](https://palantir.github.io/tslint/rules/array-type/): consider `this` to be simple type (#2982)
- [bugfix] [`await-promise`](https://palantir.github.io/tslint/rules/await-promise/) accepts not only union types but also intersection types with Promise-like types (#2987)
- [bugfix] [`callable-types`](https://palantir.github.io/tslint/rules/callable-types/): don't remove export modifier of interfaces (#2962)
- [bugfix] [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/): Only checks variables at the file-level. (#2950)
- [bugfix] [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/): Uses correct visibility of variables. (#2950)
- [bugfix] [`no-floating-promises`](https://palantir.github.io/tslint/rules/no-floating-promises/): recognize rejection handler passed as second argument to `promise.then()` (#3048)
- [bugfix] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) don't warn for shadowed type parameter on static class members (#3030)
- [bugfix] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) fixed false positive with key name in index signature (#3030)
- [bugfix] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) fixed false positive with parameter inside function decorator (#3030)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/): allow truthyness and falsyness checks (#3008)
- [bugfix] [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) fixed crash when using destructuring (#3058)
- [bugfix] [`one-line`](https://palantir.github.io/tslint/rules/one-line/) correctly handles multiline type parameters (#3004)
- [bugfix] [`prefer-for-of`](https://palantir.github.io/tslint/rules/prefer-for-of/) fixed false positives when array is modified, e.g. `arr[i]++` (#3044)
- [bugfix] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/) adds parens when fixing arrow function return (#3026)
- [bugfix] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/) permit functions as first argument to Object.assign (#3098)
- [bugfix] [`space-before-function-paren`](https://palantir.github.io/tslint/rules/space-before-function-paren/) Handle default exports of functions without names like anonymous functions (fixes #3040) (#3053)
- [bugfix] Fixed an issue where, at runtime, the module `./test/parse` could not be located due after consumers had run `yarn clean` (#3072)
- [enhancement] [`no-null-keyword`](https://palantir.github.io/tslint/rules/no-null-keyword/) allows strict comparison (#2802)
- [enhancement] [`no-switch-case-fall-through`](https://palantir.github.io/tslint/rules/no-switch-case-fall-through/) matches `// falls through` comments case insensitive and allows trailing text (#2983)
- [enhancement] [`ordered-imports`](https://palantir.github.io/tslint/rules/ordered-imports/): support importEqualsDeclaration (#3102)
- [enhancement] Added NaN and (+/-)Infinity as numbers to [`no-inferrable-types`](https://palantir.github.io/tslint/rules/no-inferrable-types/) (#2885)
- [enhancement] Improved CLI error message when no filenames are specified (#3066)
- [rule-change] [`prefer-conditional-expression`](https://palantir.github.io/tslint/rules/prefer-conditional-expression/): ignore `if-else-if` by default. Use the new `"check-else-if"` option to check nested if statements (#2963)

Thanks to our contributors!

- Klaus Meinhardt
- Julian Verdurmen
- Alexandre Alonso
- Josh Goldberg
- ksvitkovsky
- Daisuke Yokomoto
- Andrii Dieiev
- Florent Suc
- Jason Killian
- Amin Pakseresht
- reduckted
- vilicvane
- Russell Briggs
- Andy Hanson
- Leo Liang
- Dan Homola
- BehindTheMath
- David Golightly
- aervin
- Daniel Kucal
- Ika
- Chris Barr

v5.5.0
---

__Editor's note__: This release features an important bugfix for overlapping fixes when using `--project` and `--fix` (#2864).

## :tada: New rules and options

- [new-rule-option] [`completed-docs`](https://palantir.github.io/tslint/rules/completed-docs/): Add `enum-members` option (#2911)
- [new-rule] [`no-this-assignment`](https://palantir.github.io/tslint/rules/no-this-assignment/) (#2931)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] [`encoding`](https://palantir.github.io/tslint/rules/encoding/) closes files correctly (#2958)
- [bugfix] [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/) fix whitespace `"check-module"` to properly lint and fix errors  (#2401) (#2825)
- [bugfix]: [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/): now correctly handles dynamic imports introduced in typescript@2.4.0 (#2924)
- [bugfix] [`switch-final-break`](https://palantir.github.io/tslint/rules/switch-final-break/): don't fail if break jumps to a label outside of the switch (#2914)
- [bugfix] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/): exempt `this` parameter (#2598)
- [bugfix] [`prefer-for-of`](https://palantir.github.io/tslint/rules/prefer-for-of/) correctly handles variable scopes and other unrelated identifiers (#2984)
- [bugfix] Don't leave blank lines when [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) autofix removes whole import (#2901)
- [cli] restore `-v` option (#2926)
- [enhancement] Print stack trace of exceptions (#2890)
- [enhancement] Added allow-empty-catch option to [`no-empty`](https://palantir.github.io/tslint/rules/no-empty/) (#2886)
- [enhancement] [`prefer-const`](https://palantir.github.io/tslint/rules/prefer-const/): handle destructuring in for-of loop initializer as if `{"destructuring": "all"}` was specified (#2904)
- [enhancement] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/): added checks for other shadowing declarations, e.g. interfaces, classes, type parameters, imports, etc. (#2598)
- [rule-change] [`no-shadowed-variable`](https://palantir.github.io/tslint/rules/no-shadowed-variable/) no longer fails for declarations in the same scope, e.g. `var foo; var foo;`. Use the rule [`no-duplicate-variable`](https://palantir.github.io/tslint/rules/no-duplicate-variable/) to find such errors. (#2598)

Thanks to our contributors!

- Klaus Meinhardt
- Josh Goldberg
- Petr Kosikhin
- Pablo Núñez
- Benny Neugebauer
- Radon Rosborough
- reduckted
- Chris Barr
- Julian Verdurmen

v5.4.3
---

## :hammer_and_wrench: Bugfixes

- [bugfix] Fixed regression with empty `--out` file (#2867)
- [bugfix] [`unified-signatures`](https://palantir.github.io/tslint/rules/unified-signatures/): Don't suggest to unify rest parameters. (#2874)
- [bugfix] [`binary-expression-operand-order`](https://palantir.github.io/tslint/rules/binary-expression-operand-order/): Allow if both sides of the binary expression are literals. (#2873)
- [bugfix] Restore compatibility with typescript@2.1 and 2.2 for [`whitespace`](https://palantir.github.io/tslint/rules/whitespace/), [`space-before-function-paren`](https://palantir.github.io/tslint/rules/space-before-function-paren/) and [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/) (#2893)
- [docs] [`no-string-literal`](https://palantir.github.io/tslint/rules/no-string-literal/): Fix documentation (#2875)

v5.4.2
---

## :hammer_and_wrench: Bugfixes

- [bugfix] Restored support for multiple `--exclude` options in the CLI (#2855)
- [bugfix] Restored support for `--version` CLI option (#2857)

v5.4.1
---

## :hammer_and_wrench: Bugfixes

- [bugfix] Fixed regression in `--exclude` CLI option when using `--project` (#2852)

v5.4.0
---

## :star: Non-breaking API changes

- `--type-check` only checks for errors before linting is no longer required to enable rules that use the type checker. You only need to supply `--project` now.

## :tada: New rules, options, and fixers

- [new-rule] [`switch-final-break`](https://palantir.github.io/tslint/rules/switch-final-break/) (#2804)
- [new-rule] [`use-default-type-parameter`](https://palantir.github.io/tslint/rules/use-default-type-parameter/) (#2253)
- [new-rule] [`binary-expression-operand-order`](https://palantir.github.io/tslint/rules/binary-expression-operand-order/) (#2805)
- [new-rule-option] [`ban`](https://palantir.github.io/tslint/rules/ban/) new options format: allows to specify an optional explanation message for function bans, banning nested methods and using a wildcard for object of a method ban (#2547)
- [new-rule-option] [`no-duplicate-variable`](https://palantir.github.io/tslint/rules/no-duplicate-variable/) adds `check-parameters` option to check if variable has the same name as a parameter (#2597)
- [new-rule-option] [`curly`](https://palantir.github.io/tslint/rules/curly/): "as-needed" option (#2842)
- [new-rule-option] [`no-unbound-method`](https://palantir.github.io/tslint/rules/no-unbound-method/) add option `"ignore-static"` (#2751)
- [new-rule-option] [`strict-boolean-expressions`](https://palantir.github.io/tslint/rules/strict-boolean-expressions/) adds `allow-boolean-or-undefined` (#2820)
- [new-fixer] [`object-literal-shorthand`](https://palantir.github.io/tslint/rules/object-literal-shorthand/) can fix longhand methods (#2558)

## :hammer_and_wrench: Bugfixes & enhancements

- [bugfix] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/) allows constructor, function and method calls and more as first argument to `Object.assign` (#2828)
- [bugfix] [`no-unbound-method`](https://palantir.github.io/tslint/rules/no-unbound-method/) walker skips past the parent if it is a cast or parenthesized expression (#2838)
- [bugfix] [`object-literal-shorthand`](https://palantir.github.io/tslint/rules/object-literal-shorthand/): fixed suggestion for generator functions (#2558)
- [bugfix] Fixed issue with case sensitivity of [`no-unused-variable`](https://palantir.github.io/tslint/rules/no-unused-variable/) rule on Windows (#2819)
- [bugfix] don't crash `tslint --project` if `allowJs` is set in tsconfig.json (#2823)
- [bugfix] [`align`](https://palantir.github.io/tslint/rules/align/) with option `"members"`: check members of class expressions; don't check semicolons in classes (#2668)
- [bugfix] [`no-inferred-empty-object-type`](https://palantir.github.io/tslint/rules/no-inferred-empty-object-type/): fix stack overflow (#2762)
- [bugfix] [`semicolon`](https://palantir.github.io/tslint/rules/semicolon/): don't warn about unnecesary semicolon when it is actually needed, e.g. when followed by type assertion or template string (#2655)
- [bugfix] [`space-before-function-paren`](https://palantir.github.io/tslint/rules/space-before-function-paren/): Ignore async arrow function with no parentheses (#2833)
- [bugfix]: [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/): Don't fail on `continue label;` (#2830)
- [bugfix] [`no-unbound-method`](https://palantir.github.io/tslint/rules/no-unbound-method/): Allow unbound method to be used as a condition (#2834)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/): Allow to switch on a value of type `any` (#2836)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/): Don't mark `declare global {}` as an unsafe any. (#2839)
- [bugfix] [`indent`](https://palantir.github.io/tslint/rules/indent/) now checks indentation of expressions inside template strings (#2826)
- [enhancement] `--project` (or `-p`) enables rules that require the type checker. `--type-check` only checks for errors before linting is no longer required (#2773)
- [enhancement] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/): error message includes deprecation text if available (#2748)
- [enhancement] [`cyclomatic-complexity`](https://palantir.github.io/tslint/rules/cyclomatic-complexity/): Don't count empty switch case(#2743)
- [enhancement] [`strict-boolean-expressions`](https://palantir.github.io/tslint/rules/strict-boolean-expressions/): Allow `any`, and `true` and `false` literal types (#2758)
- [enhancement] [`no-floating-promises`](https://palantir.github.io/tslint/rules/no-floating-promises/): Allow 'promise.catch()' (#2774)
- [enhancement] [`comment-format`](https://palantir.github.io/tslint/rules/comment-format/) no longer excludes comments with triple slash from linting except `/// <reference path="..."/>` (#2616)
- [enhancement] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/): lint more locations where return value is used. (#2828)
- [enhancement] [`semicolon`](https://palantir.github.io/tslint/rules/semicolon/): option `"never"` is now spec compliant (#2655)
- [enhancement] [`object-literal-shorthand`](https://palantir.github.io/tslint/rules/object-literal-shorthand/) handles async functions correctly (#2558)
- [enhancement] `--test` CLI option: allow passing path to tslint.json (#2784)
- [enhancement] Use commander instead of optimist for CLI arguments (#2689)
- [enhancement] [`strict-type-predicates`](https://palantir.github.io/tslint/rules/strict-type-predicates/): warn if strictNullChecks is not enabled (#2786)

Thanks to our contributors!

- Klaus Meinhardt
- Manuel Lopez
- Andy Hanson
- Piotr Tomiak

v5.3.2
---

- [bugfix] Fixes `not a directory` error (#2813)

v5.3.0
---

## This change may require a change to tslint.json

- [enhancement] [`prefer-switch`](https://palantir.github.io/tslint/rules/prefer-switch/): Change default `min-cases` to 3. (#2669)

## :tada: Features & enhancements

- [new-cli-option] cli: Add `outputAbsolutePaths` option (#2667)
- [new-rule] [`prefer-object-spread`](https://palantir.github.io/tslint/rules/prefer-object-spread/) (#2624)
- [new-rule] [`encoding`](https://palantir.github.io/tslint/rules/encoding/) (#2368)
- [new-rule] [`prefer-conditional-expression`](https://palantir.github.io/tslint/rules/prefer-conditional-expression/) (#2363)
- [new-rule-option] [`indent`](https://palantir.github.io/tslint/rules/indent/) support indent size (#2723)
- [new-rule-option] [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/) adds `ignore-case` (#2592)
- [new-rule-option] [`quotemark`](https://palantir.github.io/tslint/rules/quotemark/): Add `avoid-template` option (#2766)
- [new-rule-option] [`await-promise`](https://palantir.github.io/tslint/rules/await-promise): What's considered a "Promise" is now configurable. (#2661)
- [new-fixer] [`indent`](https://palantir.github.io/tslint/rules/indent/) (#2723)
- [new-fixer] [`typedef-whitespace`](https://palantir.github.io/tslint/rules/typedef-whitespace/) (#2718)
- [enhancement] better error messages in [`variable-name`](https://palantir.github.io/tslint/rules/variable-name/) (#2672)
- [enhancement] [`typedef`](https://palantir.github.io/tslint/rules/typedef/): Use name or parameters for error location (#2460)
- [enhancement] [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/): check shorthand properties (#2592)
- [enhancement] [`space-before-function-paren`](https://palantir.github.io/tslint/rules/space-before-function-paren/): Handle `get`/`set` accessor (#2700)
- [enhancement] [`typedef-whitespace`](https://palantir.github.io/tslint/rules/typedef-whitespace/) added checks for arrow function, call and construct signature (#2718)
- [enhancement] [`no-object-literal-type-assertion`](https://palantir.github.io/tslint/rules/no-object-literal-type-assertion/): Allow cast to `any` (#2671)
- [enhancement] cli: `-p` option handles directories (#2756)
- [develop] testing rules with type information is enabled when a `tsconfig.json` is found next to `tslint.json` (#2769)
- [configuration] deprecate mixed case tslint.json (#2713)
- [bugfix] [`return-undefined`](https://palantir.github.io/tslint/rules/return-undefined/): Treat a return type `void | undefined` same as `void` (#2731)
- [bugfix] [`no-unnecessary-initializer`](https://palantir.github.io/tslint/rules/no-unnecessary-initializer/): Handle `BindingElement` anywhere, not just in a `VariableDeclaration`. (#2707)
- [bugfix] [`jsdoc-format`](https://palantir.github.io/tslint/rules/jsdoc-format/): correctly handle alignment in files with BOM (#2619)
- [bugfix] [`jsdoc-format`](https://palantir.github.io/tslint/rules/jsdoc-format/): don't treat empty comments (`/**/`) as jsdoc (#2619)
- [bugfix] [`typedef-whitespace`](https://palantir.github.io/tslint/rules/typedef-whitespace/) don't warn for leading whitespace if token is preceded by line break (#2718)
- [bugfix] Make "completed-docs" rule respect "public" privacy (or lack thereof) (#2749)
- [bugfix] [`jsdoc-format`](https://palantir.github.io/tslint/rules/jsdoc-format/): fixed error position if line ends with `\r\n` (#2619)
- [bugfix] [`prefer-switch`](https://palantir.github.io/tslint/rules/prefer-switch/): add missing checks for some expressions (#2686)
- [bugfix] [`prefer-template`](https://palantir.github.io/tslint/rules/prefer-template/): Allow `"a" + "b" + "c"`. (#2741)
- [bugfix] [`prefer-const`](https://palantir.github.io/tslint/rules/prefer-const/): fix false positive with variable declared outside of for-of or for-in (#2760)
- [bugfix] `--project`: fix file matching with relative path to `tsconfig.json` (#2688)
- [bugfix] [`no-default-export`](https://palantir.github.io/tslint/rules/no-default-export/): correctly handle `export default abstract class {...}` (#2630)
- [bugfix] [`no-mergeable-namespace`](https://palantir.github.io/tslint/rules/no-mergeable-namespace/): display correct line in error message (#2656)
- [bugfix] [`object-literal-sort-keys`](https://palantir.github.io/tslint/rules/object-literal-sort-keys/): handle object spread correctly (#2592)
- [bugfix] Consistently output absolute/relative paths (#2667)
- [bugfix] [`await-promise`](https://palantir.github.io/tslint/rules/await-promise): Consider types derived from a Promise in union types too. (#2661)
- [bugfix] [`no-unsafe-any`](https://palantir.github.io/tslint/rules/no-unsafe-any/): Fix bug where number literal in type position was flagged as an unsafe `any`. (#2712)
- [api] Deprecate `Lint.Utils.objectify` (#2764)

Thanks to our contributors!
- Andy Hanson
- Klaus Meinhardt
- Martin Probst
- Filipe Silva
- walkerburgin
- René Scheibe

v5.2.0
---

- [rule-change] [`no-console`](https://palantir.github.io/tslint/rules/no-console/) bans all console methods when no methods are specified (#2610)
- [new-rule] [`no-object-literal-type-assertion`](https://palantir.github.io/tslint/rules/no-object-literal-type-assertion/) (#2580)
- [new-rule] [`no-irregular-whitespace`](https://palantir.github.io/tslint/rules/no-irregular-whitespace/) (#2487)
- [new-rule] [`prefer-switch`](https://palantir.github.io/tslint/rules/prefer-switch/) (#2331)
- [new-rule] [`number-literal-format`](https://palantir.github.io/tslint/rules/number-literal-format/) (#2526)
- [new-rule] [`deprecation`](https://palantir.github.io/tslint/rules/deprecation/) (#2395)
- [new-rule] [`no-unnecessary-type-assertion`](https://palantir.github.io/tslint/rules/no-unnecessary-type-assertion/) (#2519)
- [new-fixer] [`interface-over-type-literal`](https://palantir.github.io/tslint/rules/interface-over-type-literal/) (#2617)
- [new-fixer] [`callable-types`](https://palantir.github.io/tslint/rules/callable-types/) (#2552)
- [new-fixer] [`no-string-literal`](https://palantir.github.io/tslint/rules/no-string-literal/) (#2495)
- [new-fixer] [`no-internal-module`](https://palantir.github.io/tslint/rules/no-internal-module/) (#2517)
- [new-rule-option] [`align`](https://palantir.github.io/tslint/rules/align/) rule added `members` option, which checks alignment of methods and properties of classes, objects, interfaces, type literals and object destructuring (#2387)
- [new-rule-option] [`align`](https://palantir.github.io/tslint/rules/align/) rule added `elements` option, which checks alignment of elements in array literals, array destructuring and tuple types (#2387)
- [new-rule-option] [`trailing-comma`](https://palantir.github.io/tslint/rules/trailing-comma/) adds more granular options to specify trailing commas for arrays, objects, functions, type literals, imports, and exports (#2538)
- [api] Deprecate `ScopeAwareRuleWalker` and `BlockScopeAwareRuleWalker`. (#2561)
- [develop] added support for [error templates in rule tests](https://palantir.github.io/tslint/develop/testing-rules/) (#2481)
- [bugfix] Fixes "Severity for rule not found" error (#2516)
- [bugfix] [`no-unused-expression`](https://palantir.github.io/tslint/rules/no-unused-expression/): allow `void(0)` in addition to `void 0` and `void` in expression and statement position (#2645)
- [bugfix] [`align`](https://palantir.github.io/tslint/rules/align/): fix false positive for files with BOM (#2642)
- [bugfix] [`return-undefined`](https://palantir.github.io/tslint/rules/return-undefined/): Handle contextual types with ambiguous signatures; allow `any`; and handle async functions. (#2576)
- [bugfix] [`semicolon`](https://palantir.github.io/tslint/rules/semicolon/): don't mark semicolon as unnecessary when the next statement is on the same line (#2591)
- [bugfix] [`no-internal-module`](https://palantir.github.io/tslint/rules/no-internal-module/): no more false positives for global augmentation (#2517)
- [bugfix] [`no-unnecessary-qualifier`](https://palantir.github.io/tslint/rules/no-unnecessary-qualifier/): no longer breaks when walking a function that references `arguments` (#2555)
- [bugfix] [`prefer-const`](https://palantir.github.io/tslint/rules/prefer-const/) no longer shows warnings on ambient declarations (#2391)
- [bugfix] [`callable-types`](https://palantir.github.io/tslint/rules/callable-types/): suggest correct fix for interfaces with type arguments (#2552)
- [bugfix] [`quotemark`](https://palantir.github.io/tslint/rules/quotemark/): fix regression with jsx attributes (#2605)
- [bugfix] [`adjacent-overload-signatures`](https://palantir.github.io/tslint/rules/adjacent-overload-signatures/) handles functions ending in semicolon (#2412)
- [bugfix] [`object-literal-key-quotes`](https://palantir.github.io/tslint/rules/object-literal-key-quotes/): correctly stringify numbers when fixing (#2515)
- [bugfix] [`object-literal-key-quotes`](https://palantir.github.io/tslint/rules/object-literal-key-quotes/): does no longer require quotes for property names containing digits (#2515)
- [enhancement] Failures in extended config files now indicate which file (#2588)
- [enhancement] [`align`](https://palantir.github.io/tslint/rules/align/): Don't report 'statements are not aligned' for empty statements (#2653)
- [enhancement] [`class-name`](https://palantir.github.io/tslint/rules/class-name/) now also checks class expressions (#2553)
- [enhancement] `optionExamples`: Allow to use an options array directly instead of a string representation. (#2527)
- [enhancement] `rulesDirectory` can now be resolved with Nodes resolve logic, if the directory contains an `index.js` (#2163) (#2358)
- [enhancement] [`no-unused-expression`](https://palantir.github.io/tslint/rules/no-unused-expression/): narrow error location for comma separated expressions and conditional expressions (#2645)
- [enhancement] [`no-string-literal`](https://palantir.github.io/tslint/rules/no-string-literal/) now handles escaped strings (#2495)
- [enhancement] [`no-unnecessary-callback-wrapper`](https://palantir.github.io/tslint/rules/no-unnecessary-callback-wrapper/): Allow `x => x(x)` (#2524)
- [enhancement] [`no-var-keyword`](https://palantir.github.io/tslint/rules/no-var-keyword/): Allow global var declarations (#2513)

Thanks to our contributors!
- Andy Hanson
- Alex Eagle
- Donald Pipowitch
- Klaus Meinhardt
- Gord P
- Andy
- Quentin
- Mitchell Wills
- Vito
- CSchulz
- Josh Goldberg
- Brian Olore
- Manuel Lopez
- James Clark

v5.1.0
---

- [new-rule] `no-invalid-template-strings` (#2332)
- [new-rule] `no-sparse-arrays` (#2407)
- [new-rule-option] `no-void-expression`: adds `ignore-arrow-function-shorthand` (#2445)
- [api] `tslint:all` configuration (#2417)
- [bugfix] In tslint:recommended move `no-reference-import` from `jsRules` to `rules` (#2441)
- [bugfix] `no-unnecessary-callback-wrapper`: only check if callback is identifier, allow all other expressions (#2510)
- [bugfix] `member-access`: Skip index signature, it can not have an access modifier (#2437)
- [bugfix] `restrict-plus-operands` fixes regression where every assignment and comparison was checked (#2454)
- [bugfix] `no-unnecessary-callback-wrapper`: allow async wrapper function (#2510)
- [bugfix] `prefer-for-of`: No error if `delete` is used (#2458)
- [bugfix] `radix`: don't warn for missing radix on method calls (#2352)
- [bugfix] `no-use-before-declare`: Handle symbol with empty declarations list. (#2436)
- [bugfix] `strict-type-predicates`: Check for construct signatures in `isFunction`. (#2479)
- [enhancement] `strict-boolean-expressions`: When `--strictNullChecks` is turned off, `allow-null-union` and `allow-undefined-union` turn off "always truthy" errors. (#2373)
- [enhancement] `radix`: added check for global.parseInt and window.parseInt (#2352)
- [enhancement] `arrow-return-shorthand`: Improve failure message when return expression is an object literal (#2466)

Thanks to our contributors!
- Andy Hanson
- bumbleblym
- Klaus Meinhardt
- Jonas Kello
- Minko Gechev
- Donald Pipowitch

v5.0.0
---

## :fire: Breaking changes

- Minimum version of TypeScript version is now 2.1.0 (#2425)
- The severity level of rules are now configurable and defaults to severity "error". This affects the output of formatters:
    - [formatter] `msbuild` was outputting all failures as "warning".
    - [formatter] `pmd` was outputting all failures as priority 1. Now, it uses _priority 3_ for "error" (default) and _priority 4_ for "warning"
- [formatter] `json` changed the `fix` property to now contain either one replacement or an array of replacements (#2403)
- `tslint:recommended` configuration updated with `tslint:latest` rules & options (#2424)
- Removed `no-unused-new` rule, with logic moved into `no-unused-expression` (#2269)
- `no-trailing-whitespace` now checks template strings by default. Use the new options `ignore-template-strings` to restore the old behavior. (#2359)

### API breaks for custom rules

- Removed method `skip` from `RuleWalker` (#2313)
- Removed all use of the TypeScript Language Service, use only Program APIs instead (#2235)

    - This means that some rules that previously worked without the type checker _now require it_. This includes:
        - `no-unused-variable`
        - `no-use-before-declare`

    - This breaks custom rule compilation. If your rule was not using the `ts.LanguageService` APIs, the migration is quite simple:

    ```diff
    - public applyWithProgram(srcFile: ts.SourceFile, langSvc: ts.LanguageService): Lint.RuleFailure[] {
    -     return this.applyWithWalker(new Walker(srcFile, this.getOptions(), langSvc.getProgram()));
    + public applyWithProgram(srcFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
    +     return this.applyWithWalker(new Walker(srcFile, this.getOptions(), program));
    ```

    - N.B. If you are refactoring your custom rules, consider [these performance tips for writing custom rules](https://palantir.github.io/tslint/develop/custom-rules/performance.html).

- Removed `createFix`. Replacements should be passed directly into addFailure. (#2403)
- Removed deprecated `scanAllTokens` and `skippableTokenAwareRuleWalker` (#2370)

## :tada: Notable features & enhancements

- [feature] The severity level of rules are now individually configurable. Default severity can also be configured.  (#629, #345)

    - Valid values for `severity`: `default` | `error | warn | warning | none | off`
    - Valid values for `defaultSeverity`: `error | warn | warning | none | off`
    - Old style:

    ```json
    {
        "extends": "tslint:latest",
        "rules": {
            "callable-types": true,
            "max-line-length": [true, 140]
        }
    }
    ```

    - New style (in this example, `callable-types` outputs errors and `max-line-length` outputs warnings):

    ```json
    {
        "extends": "tslint:latest",
        "defaultSeverity": "error",
        "rules": {
            "callable-types": true,
            "max-line-length": {
                "options": 140,
                "severity": "warning"
            }
        }
    }
    ```

- [new-rule] `prefer-template` (#2243)
- [new-rule] `return-undefined` (#2251)
- [new-rule] `no-reference-import` (#2273)
- [new-rule] `no-unnecessary-callback-wrapper` (#2249)
- [new-fixer] `linebreak-style` (#2394)
- [new-fixer] `eofline` (#2393)


## Full list of changes

- [api] Added class `OptionallyTypedRule`, which allows rule authors to write a rule that applies when typing is either enabled or disabled (#2300)
- [bugfix] `prefer-function-over-method` now ignores abstract methods (#2307)
- [bugfix] `arrow-parens` with option `ban-single-arg-parens` now correctly handles functions with return type annotation (#2265)
- [bugfix] `prefer-function-over-method` exclude overload signatures (#2315)
- [bugfix] `use-isnan` now applies only to comparison operators (#2317)
- [bugfix] `file-header-rule` now handles single-line comments correctly (#2320)
- [bugfix] `newline-before-return`: fix handling of blank lines between comments (#2321)
- [bugfix] `trailing-comma` No longer enforce trailing commas in type parameters and tuple types (#2236)
- [bugfix] `align` don't fix if it would remove code (#2379)
- [bugfix] `unified-signatures` now recognizes rest parameters (#2342)
- [bugfix] `no-inferrable-types` don't warn for inferrable type on readonly property (#2312)
- [bugfix] `trailing-comma` no longer crashes on new without parentheses (e.g. `new Foo`) (#2389)
- [bugfix] `semicolon` Ignore comments when checking for unnecessary semicolon (#2240)
- [bugfix] `semicolon` Don't report unnecessary semicolon when followed by regex literal (#2240)
- [bugfix] CLI: exit with 0 on type check errors when `--force` is specified (#2322)
- [bugfix] CLI: `--test` now correctly strips single quotes from patterns on windows (#2322)
- [bugfix] `prefer-const` only fix initialized variables (#2219)
- [bugfix] `prefer-const` correctly handle variables shadowed by parameters and catched exceptions (#2219)
- [bugfix] `prefer-const` don't warn if one variable in a for loop initializer can not be const (#2219)
- [bugfix] `prefer-const` handle more cases in destructuring (#2219)
- [bugfix] `no-unused-expression` allow comma separated assignments (#2269)
- [chore] removed update-notifier dependency (#2262)
- [development] allow rule tests to specify version requirement for typescript (#2323)
- [enhancement] `ignore-properties` option of `no-inferrable-types` now also ignores parameter properties (#2312)
- [enhancement] `unified-signatures` now displays line number of the overload to unify if there are more than 2 overloads (#2270)
- [enhancement] `trailing-comma` New checks for CallSignature and NamedExports (#2236)
- [enhancement] `semicolon` New check for export statements, function overloads and shorthand module declaration (#2240)
- [enhancement] `semicolon` Report unnecessary semicolons in classes and in statement position (for option "always" too) (#2240)
- [enhancement] `semicolon` check for semicolon after method overload (#2240)
- [enhancement] `array-type` now consider `object`, `undefined` and `never` as simple types, allowing `object`, `undefined[]` and `never[]` (#1843)(#2353)
- [enhancement] `align` check statement alignment for all blocks (#2379)
- [enhancement] `align`check parameter alignment for all signatures (#2379)
- [enhancement] `--test` can handle multiple paths at once (#2322)
- [enhancement] `only-arrow-functions` allow functions that use `this` in the body (#2229)
- [enhancement] CLI: print error when `--type-check` is used without `--project` (#2322)
- [enhancement] CLI: don't print stack trace on type check error (#2322)
- [enhancement] CLI: added `-p` as shorthand for `--project` to be consistent with `tsc` (#2322)
- [enhancement] `prefer-const` show warnings for `var` (#2219)
- [enhancement] `quotemark` fixer unescapes original quotemark (e.g. `'\''` -> `"'"`) (#2359)
- [enhancement] `no-unused-expression` allow indirect eval `(0, eval)("");` (#2269)
- [enhancement] `no-unused-expression` checking for unused new can now use option `allow-fast-null-checks` (#2269)
- [enhancement] `no-unused-expression` find unused comma separated expressions in all locations of the code (#2269)
- [enhancement] `no-unused-expression` find unused expressions inside void expression (#2269)
- [new-config-option] Adds `defaultSeverity` with options `error`, `warning`, and `off`. (#2416)
- [new-formatter] TAP formatter (#2325)
- [new-rule-option] `no-unused-expression` adds option `allow-tagged-template` to allow tagged templates for side effects (#2269)
- [new-rule-option] `no-unused-expression` adds option `allow-new` to allow `new` without using the new object (#2269)
- [new-rule-option] `member-access` adds `no-public` option (#2247)
- [new-rule-option] `curly` added option `ignore-same-line` (#2334)
- [new-rule-option] `{destructuring: "all"}` to only warn if all variables in a destructuring can be const (#2219)
- [new-rule-option] added `ignore-template-strings` to `no-trailing-whitespace` (#2359)
- [rule-update] `array-type` now consider `undefined` and `never` as simple types, allowing `undefined[]` and `never[]` (#1843)

Thanks to our contributors!

- Brian Olore
- Andy Hanson
- @andy-ms
- Chris Barr
- Klaus Meinhardt
- @bumbleblym
- Josh Goldberg
- James Clark
- @vilic
- Aleksandr Filatov
- Matt Banz
- Karol Janyst
- Mike Deverell
- Alexander James Phillips
- Irfan Hudda

v4.5.1
---

- [enhancement] Updated recommended rules to include `ban-types` and `no-duplicate-super` (#2271)
- [bugfix] `object-literal-key-quotes` handle negative number property name (#2273)

v4.5.0
---

- [new-rule] `no-import-side-effect` (#2155)
- [new-rule] `match-default-export-name` (#2117)
- [new-rule] `no-non-null-assertion` (#2221)
- [new-rule] `ban-types` (#2175)
- [new-rule] `no-duplicate-super` (#2038)
- [new-rule] `newline-before-return` (#2173)
- [new-rule-option] `completed-docs` adds options for location, type, and privacy. Also adds interfaces, enums, types (#2095)
- [new-rule-option] `no-inferrable-types` adds option  `ignore-properties` (#2178)
- [new-rule-option] `typedef` adds options `object-destructuring` and `array-destructuring` options (#2146)
- [new-rule-option] `member-ordering` adds option `alphabetize` (#2101)
- [new-rule-option] `no-trailing-whitespace` adds option `ignore-jsdoc` (#2177)
- [new-rule-option] `no-trailing-whitespace` adds option `ignore-comments` option (#2153)
- [new-fixer] `no-inferrable-types` automatically remove inferrable type annotations (#2178)
- [new-fixer] `no-any` (#2165)
- [new-fixer] `noConsecutiveBlankLines` (#2201)
- [new-fixer] `object-literal-shorthand` (#2165)
- [bugfix] `no-switch-case-fallthrough` handle break, throw, continue and return nested in block, if-else and switch (#2218)
- [bugfix] `no-switch-case-fallthrough` allow empty case clauses before default clause (#2218)
- [bugfix] `no-mergeable-namespace` ignore property types that can't be merged (#2105)
- [bugfix] `object-literal-key-quotes` no need to quote a float if its .toString() is the same. (#2144)
- [bugfix] `no-consecutive-blank-lines` Correctly apply fixes at EOF (#2239)
- [bugfix]: Fixes installation issue with node 7.5 (#2212)
- [bugfix]: `quotemark` now handles escaped chars (#2224)
- [enhancement] Don't exit when a rule requires type checking but type checking is not enabled (#2188)
- [enhancement] `no-switch-case-fallthrough` allow single line comment `// falls through` (#2218)
- [enhancement] `no-unbound-method` allows property access and binary expressions (#2143)
- [api] Introduce `AbstractWalker` for performance (#2093)
    - see [performance] (https://palantir.github.io/tslint/develop/custom-rules/performance.html) and [migration] (https://palantir.github.io/tslint/develop/custom-rules/migration.html) docs

Thanks to our contributors!

- Andy Hanson
- Stefan Reichel
- Shlomi Assaf
- Josh Goldberg
- Minko Gechev
- Irfan Hudda
- Klaus Meinhardt
- Martin Probst
- Naoto Usuyama
- Caleb Eggensperger
- Arturs Vonda
- Joscha Feth
- Moritz
- Alexander Rusakov
- Alex Ryan
- Andy
- Yuichi Nukiyama

v4.4.2
---

* [bugfix] `whitespace` rule caused false positive on EOF (#2131)
* [bugfix] WebStorm fails because `json` formatter parameter has extra space (#2132)

v4.4.1
---

* [bugfix] errant space in recommended ruleset (couldn't find `no-misused-new`)

v4.4.0
---

* [new-rule] `arrow-return-shorthand` (#1972)
* [new-rule] `no-unbound-method` (#2089)
* [new-rule] `no-boolean-literal-compare` (#2013)
* [new-rule] `no-unsafe-any` (#2047)
* [new-rule] `no-unnecessary-qualifier` (#2008)
* [new-rule] `no-unnecessary-initializer` (#2106)
* [new-rule] `await-promise` (#2102)
* [new-rule] `no-floating-promises` (#1632)
* [new-rule] `strict-type-predicates` (#2046)
* [new-rule] `no-misused-new` (#1963)
* [new-rule] `prefer-method-signature` (#2028)
* [new-rule] `prefer-function-over-method` (#2037)
* [new-rule-option] `allow-fast-null-checks` added to `no-unused-expression` (#1638)
* [new-rule-option] `comment-format-rule` adds `ignore-words` and `ignore-pattern` options (#1757)
* [new-rule-option] `whitespace` adds `check-preblock` option (#2002)
* [new-rule-option] `strict-boolean-expressions` adds `allow-null-union`, `allow-undefined-union`, `allow-string`, and `allow-number` and  (#2033)
* [new-fixer] `align` (#2097)
* [new-fixer] `no-trailing-whitespace` (#2060)
* [bugfix] `no-magic-numbers` false positive on default parameter values (#2004)
* [bugfix] `no-empty-interface` allow empty interface with 2 or more parents (#2070)
* [bugfix] `no-trailing-whitespace` fixed for comments and EOF (#2060)
* [bugfix] `no-empty` no longer fails for private or protected constructor (#1976)
* [bugfix] `tslint:disable`/`tslint-enable` now handles multiple rules and fixes what code is enabled/disabled (#2061)
* [bugfix] `no-inferrable-types` now validates property declarations (#2081)
* [bugfix] `unified-signatures` false positive (#2016)
* [bugfix] `whitespace` finds all whitespace errors in JsxExpressions and TemplateExpressions (#2036)
* [bugfix] `comment-format` no more false positives in JsxText (#2036)
* [enhancement] `--test` option now accepts glob (#2079)

Thanks to our contributors!

* Alexander Rusakov
* Andrii Dieiev
* @andy-ms
* Andy Hanson
* Josh Goldberg
* Kei Son
* Klaus Meinhardt
* Krati Ahuja
* Martin Probst
* Mohsen Azimi
* Romke van der Meulen
* cameron-mcateer

v4.3.1
---

* [bugfix] Fix back-compat break. Allow formattersDirectory === null (#1997)

v4.3.0
---

* **Enabled additional rules in `tslint:latest` configuration** (#1981)
* [new-rule] `space-before-function-paren` (#1897)
* [new-rule] `typeof-compare` (#1927)
* [new-rule] `import-spacing` (#1935)
* [new-rule] `unified-signatures` (#1944)
* [new-fixer] `object-literal-key-quotes` (#1953)
* [new-fixer] `no-angle-bracket-type-assertion` (#1979)
* [bugfix] `adjacent-overload-signature` now handles static/computed function names (#1831)
* [bugfix] `file-header` now handles files with only comments (#1913)
* [bugfix] `no-consecutive-blank-lines` now allows blank lines in template strings (#1886)
* [bugfix] `object-literal-key-quotes` no longer throws exception when using rest operator (#1916)
* [bugfix] `restrict-plus-operands` no longer shows false positive in ternary operation (#1925)
* [bugfix] `prefer-for-of` now handles nested `for` loops with reused iterator (#1926)
* [bugfix] Exit gracefully when `tsconfig.json` passed as `--project` argument doens't have files (#1933)
* [bugfix] `object-literal-key-quotes` now handles shorthand and spread properties (#1945)
* [bugfix] `arrow-parens` Allow binding patterns `([x, y]) => ...` and `({x, y}) => ...` to have parens (#1958)
* [bugfix] `semicolon` fixer now handles comma separator in interfaces and indicates failure when commas are using in interfaces (#1856)
* [bugfix] `only-arrow-functions` option `allow-named-functions` now allows function declarations (#1961)
* [bugfix] `prefer-for-of` no longer shows false positive when array is in parentheses (#1986)
* [bugfix] `prefer-const` now works for TypeScript versions < 2.1.0 (#1989)
* [enhancement] `member-access` narrow location of error (#1964)

Thanks to our contributors!

* Andrii Dieiev
* @andy-ms
* Andy Hanson
* Josh Goldberg
* Klaus Meinhardt
* Linda_pp
* Mohsen Azimi
* Victor Grigoriu
* Yuichi Nukiyama
* cameron-mcateer

v4.2.0
---

* [new-rule] `no-string-throw` (#1878)
* [new-rule] `no-empty-interface` (#1889)
* [new-rule] `interface-over-type-literal` (#1890)
* [new-rule] `callable-types` (#1891)
* [new-rule] `no-void-expression` (#1903)
* [new-rule-option] `ban-single-arg-parens` added to `arrow-parens` (#1893)
* [bugfix] `prefer-const` handles destructuring arrays (#1894), destructuring objects (#1906), and forward references (#1908)
* [bugfix] Don't error for misplaced braces for 'else' in `one-line` rule (#1866)
* [bugfix] `no-shadowed-variable` now identifies shadowed `for` iterator (#1816)
* [bugfix] `object-literal-key-quotes` now includes function names (#1874)
* [bugfix] error when EOF comes after `disable-next-line` comment (#1902)

Thanks to our contributors!

* Andrew Scott
* @andy-ms
* Andy Hanson
* James Booth
* Klaus Meinhardt
* Vladimir Matveev

v4.1.1
---

* [bugfix] `typedef` rule was showing false positive for `catch` clause (#1887)

v4.1.0
---

* [new-rule] `prefer-const` (#1801)
* [new-rule] `strict-boolean-expressions` (#1820)
* [new-rule] `no-magic-numbers` (#1799)
* [new-rule] `import-blacklist` (#1841)
* [new-rule] `promise-functions-async` (#1779)
* [new-rule] `no-inferred-empty-object-type`: a type must be specified when using a generic class/function/etc (#1821)
* [new-rule-option] `allow-named-functions` added to `only-arrow-functions` (#1857)
* [new-fixer] `prefer-const` (#1801)
* [new-fixer] `quotemark` (#1790)
* [new-formatter] `code-frame` formatter shows you the error in context (#1819)
* [enhancement] `no-internal-module` failures highlight less text (#1781)
* [enhancement] Avoid auto-fixing errors that would result in compilation errors for rules that use type-check (#1608)
* [rule-change] `only-arrow-functions` will allow functions with a `this` parameter (#1597)
* [bugfix] `no-use-before-declare` false positive on named import (#1620)
* [bugfix] `prefer-for-of` was showing false positive when the element is assigned (#1813)
* [bugfix] The command line argument `type-check` was swallowing the next argument (#1783)
* [bugfix] `tslint:disable-line` was re-enabling `tslint:disable` (#1634)
* [bugfix] `adjacent-overload-signatures` did not work for constructors (#1800)
* [bugfix] `checkstyle` formatter was reporting errors under one file (#1811)
* [bugfix] `trailing-comma` was applied to parameter lists (#1775)
* [api] CLI logic moved into API friendly class (#1688)

Thanks to our contributors!

* Alex Eagle
* Andrii Dieiev
* Andy Hanson
* Art Chaidarun
* Donald Pipowitch
* Feisal Ahmad
* Josh Goldberg
* Klaus Meinhardt
* Maciej Sypień
* Mohsen Azimi
* Ryan Lester
* Simon Schick
* Subhash Sharma
* Timothy Slatcher
* Yaroslav Admin
* Yuichi Nukiyama
* tdsmithATabc
* @wmrowan

v4.0.2
---

* [enhancement] Don't exit when a rule can't be found. Print as a warning instead (#1771)
* [api-change] Allow 3rd party apps to see exception when the config is invalid (#1764)
* [bugfix] Don't flag a property named as empty string as not needing quotes in an object literal (#1762)
* [bugfix] Report correct number of fixes done by --fix (#1767)
* [bugfix] Fix false positives and exceptions in `prefer-for-of` (#1758)
* [bugfix] Fix `adjacent-overload-signatures` false positive when a static function has the same name (#1772)

Thanks to our contributors!
* @gustavderdrache

v4.0.1
---

* [bugfix] Removed `no-unused-variable` rule from recommended config, as it was causing spurious deprecation warnings.

v4.0.0-dev.2
---

* Include latest v4.0.0 changes

v4.0.0
---

* **BREAKING CHANGES**
    * [api-change] Minor changes to the library API. See this PR for changes and upgrade instructions (#1720)
    * [removed-rule] Removed `no-unreachable` rule; covered by compiler (#661)
    * [enhancement] Changed order of applied configuration files for the `extends` array to make it more intuitive. (#1503)
    * [enhancement] Changed TypeScript peer dependency to >= 2.0.0 (#1710)
* [new-rule] `completed-docs` rule added (#1644)
* [new-fixer] `ordered-imports` auto fixed (#1640)
* [new-fixer] `arrow-parens` auto fixed (#1731)
* [rule-change] `indent` rule now ignores template strings (#1611)
* [new-rule-option] `object-literal-key-quotes` adds the options `consistent` and `consistent-as-needed` (#1733)
* [enhancement] `--fix` option added to automatically fix selected rules (#1697)
* [enhancement] Updated recommend rules (#1717)
* [enhancement] `adjacent-overload-signatures` now works with classes, source files, modules, and namespaces (#1707)
* [enhancement] Users are notified if they are using an old TSLint version (#1696)
* [bugfix] Lint `.jsx` files if `jsRules` are configured (#1714)
* [bugfix] Command line glob patterns now handle single quotes (#1679)

Thanks to our contributors!
* Andrii Dieiev
* Andy
* Chris Barr
* Davie Schoots
* Jordan Hawker
* Josh Goldberg
* Stepan Riha
* Yuichi Nukiyama

v4.0.0-dev.1
---

* **BREAKING CHANGES**
    * [enhancement] The `semicolon` rule now disallows semicolons in multi-line bound class methods
         (to get the v3 behavior, use the `ignore-bound-class-methods` option) (#1643)
    * [removed-rule] Removed `use-strict` rule (#678)
    * [removed-rule] Removed `label-undefined` rule; covered by compiler (#1614)
    * [enhancement] Renamed `no-constructor-vars` to `no-parameter-properties` (#1296)
    * [rule-change] The `orderedImports` rule now sorts relative modules below non-relative modules (#1640)
* **Deprecated**
    * [deprecated] `no-unused-variable` rule. This is checked by the TypeScript v2 compiler using the flags [`--noUnusedParameters` and `--noUnusedLocals`](https://github.com/Microsoft/TypeScript/wiki/What%27s-new-in-TypeScript#flag-unused-declarations-with---nounusedparameters-and---nounusedlocals). (#1481)
* [enhancement] Lint .js files (#1515)
* [new-fixer] `no-var-keyword` replaces `var` with `let` (#1547)
* [new-fixer] `trailing-comma` auto fixed (#1546)
* [new-fixer] `no-unused-variable` auto fixed for imports (#1568)
* [new-fixer] `semicolon` auto fixed (#1423)
* [new-rule] `max-classes-per-file` rule added (#1666)
* [new-rule-option] `no-consecutive-blank-lines` rule now accepts a number value indicating max blank lines (#1650)
* [new-rule-option] `ordered-imports` rule option `import-sources-order` accepts value `any` (#1602)
* [bugfix] `no-empty` rule fixed when parameter has readonly modifier
* [bugfix] `no-namespace` rule: do not flag nested or .d.ts namespaces (#1571)

Thanks to our contributors!

* Alex Eagle
* Andrii Dieiev
* Ben Coveney
* Boris Aranovich
* Chris Barr
* Cyril Gandon
* Evgeniy Zhukovskiy
* Jay Anslow
* Kunal Marwaha
* Martin Probst
* Mingye Wang
* Raghav Katyal
* Sean Dawson
* Yuichi Nukiyama
* jakpaw

v4.0.0-dev.0
---

* **BREAKING CHANGES**
    * [enhancement] Drop support for configuration via package.json (#1579)
    * [removed-rule] Removed `no-duplicate-key` rule; covered by compiler (#1109)
    * [enhancement] Call formatter once for all file results. Format output may be different (#656)
    * [rule-change] `trailing-comma` supports function declarations, expressions, and types (#1486)
    * [rule-change] `object-literal-sort-keys` now sorts quoted keys (#1529)
    * [rule-change] `semicolon` now processes type aliases (#1475)
    * [rule-change] `no-var-keyword` now rejects `export var` statements (#1256)
    * [rule-change] `semicolon` now requires semicolon for function declaration with no body (#1447)
* [new-formatter] `fileslist` formatter writes a list of files with errors without position or error type specifics (#1558)
* [new-rule] `cyclomaticComplexity`, enforces a threshold of cyclomatic complexity.] (#1464)
* [new-rule] `prefer-for-of`, which errors when `for(var x of y)` can be used instead of `for(var i = 0; i < y.length; i++)` (#1335)
* [new-rule] `array-type`, which can require using either `T[]' or 'Array<T>' for arrays (#1498)
* [rule-change] `object-literal-sort-keys` checks multiline objects only (#1642)
* [rule-change] `ban` rule now can ban global functions (#327)
* [bugfix] always write lint result, even if using formatter (#1353)
* [bugfix] npm run test:bin fails on Windows (#1635)
* [bugfix] Don't enforce trailing spaces on newlines in typedef-whitespace rule (#1531)
* [bugfix] `jsdoc` rule should not match arbitrary comments (#1543)
* [bugfix] `one-line` rule errors when declaring wildcard ambient modules (#1425)

Thanks to our contributors!

* Alex Eagle
* Andrii Dieiev
* Andy Hanson
* Ben Coveney
* Boris Aranovich
* Chris Barr
* Christian Dreher
* Claas Augner
* Josh Goldberg
* Martin Probst
* Mike Deverell
* Nina Hartmann
* Satoshi Amemiya
* Scott Wu
* Steve Van Opstal
* Umar Bolatov
* Vladimir Matveev
* Yui

v3.15.1
---

* Enabled additional rules in `tslint:latest` configuration (#1506)

v3.15.0
---

* Stable release containing changes from the last dev release (v3.15.0-dev.0)

v3.15.0-dev.0
---

* [enhancement] Rules can automatically fix errors (#1423)
* [enhancement] Better error messages for invalid source files (#1480)
* [new-rule] `adjacent-overload-signatures` rule (#1426)
* [new-rule] `file-header` rule (#1441)
* [new-rule] `object-literal-shorthand` rule (#1488)
* [new-rule-option] `allow-declarations` option for `only-arrow-functions` rule (#1452)
* [new-rule-option] `import-sources-order` option for `ordered-imports` rule (#1466)
* [bugfix] `arrow-parens` rule handles async and generics (#1446, #1479)
* [bugfix] `comment-format` rule ignores tslint control comments (#1473)
* [bugfix] Fix `no-shadowed-variable` rule false positives (#1482)

Thanks to our contributors!
* @apacala
* @danvk
* @DovydasNavickas
* @glen-84
* @IllusionMH
* @JoshuaKGoldberg
* @markwongsk
* @rakatyal
* @rhysd
* @ScottSWu
* @YuichiNukiyama

v3.14.0
---

* Stable release containing changes from the last dev releases (v3.14.0-dev.0, v3.14.0-dev.1)

v3.14.0-dev.1
---

* [new-rule] `arrow-parens` rule (#777)
* [new-rule] `max-file-line-count` rule (#1360)
* [new-rule] `no-unsafe-finally` rule (#1349)
* [new-rule] `no-for-in-array` rule (#1380)
* [new-rule] `object-literal-key-quotes` rule (#1364)
* [enhancement] Better `ban` rule failure messages (#1385)
* [enhancement] New stylish formatter (#1406)

Thanks to our contributors!
* @chrismbarr
* @danvk
* @gjuchault
* @lowkay
* @ScottSWu
* @YuichiNukiyama

v3.14.0-dev.0
---

* [enhancement] Add optional type information to rules (#1323)

Thanks to our contributors!
* @ScottSWu

v3.13.0
---

* Stable release containing changes from the last dev release (v3.13.0-dev.0)

v3.13.0-dev.0
---

* [new-rule] `ordered-imports` rule (#1325)
* [enhancement] MPEG transport stream files are ignored by the CLI (#1357)

Thanks to our contributors!
* @chrismbarr
* @corydeppen
* @danvk
* @janaagaard75
* @mprobst

v3.12.0-dev.2
---

* [enhancement] Support TypeScript v2.0.0-dev builds

v3.12.1
---

* Stable release containing changes from the last dev release (v3.12.0-dev.1)

v3.12.0-dev.1
---

* [bugfix] Fix null reference bug in typedef rule (#1345)

v3.12.0
---

* Stable release containing changes from the last dev release (v3.12.0-dev.0)

v3.12.0-dev.0
---

* [new-rule] `only-arrow-functions` rule (#1318)
* [new-rule] `no-unused-new` rule (#1316)
* [new-rule-option] `arrow-call-signature` option for `typedef` rule (#1284)
* [enhancement] Metadata for every rule (#1311)
* [enhancement] `typedef` rule is more flexible about the location of typedefs for arrow functions (#1176)
* [enhancement] Failure messages are clearer and more consistent for many rules (#1303, #1307, #1309)
* [bugfix] `no-consecutive-blank-lines` now handles lines with only whitespace correctly (#1249)
* [bugfix] Correctly load `.json` config files that have a BOM (#1338)

Thanks to our contributors!
* @allannienhuis
* @arnaudvalle
* @bencoveney
* @chrismbarr
* @corydeppen
* @HamletDRC
* @JoshuaKGoldberg
* @timbrown81
* @tomduncalf
* @YuichiNukiyama

v3.11.0
---

* Stable release containing changes from the last dev release (v3.11.0-dev.0)

v3.11.0-dev.0
---

* [new-rule] `linebreak-style` rule (#123)
* [new-rule] `no-mergeable-namespace` rule (#843)
* [enhancement] Add built-in configurations (#1261)
* [enhancement] New vso formatter (#1281)
* [new-rule-option] `ignore-interfaces` option for `semicolon` rule (#1233)
* [bugfix] `no-default-export` rule handles more default export cases (#1241)

Thanks to our contributors!
* @cgwrench
* @HamletDRC
* @lijunle
* @paldepind
* @patsissons
* @schmuli
* @YuichiNukiyama

v3.10.2
---

* Stable release containing changes from the last dev release (v3.10.0-dev.2)

v3.10.0-dev.2
---

* [bugfix] `member-ordering` rule doesn't crash on methods in class expressions (#1252)
* [bugfix] `ban` rule handles chained methods appropriately (#1234)

Thanks to our contributors!
* @marines

v3.10.1
---

* Stable release containing changes from the last dev release (v3.10.0-dev.1)

v3.10.0-dev.1
---

* [bugfix] `member-ordering` rule doesn't crash on methods in object literals (#1243)

v3.10.0
---

* Stable release containing changes from the last dev release (v3.10.0-dev.0)

v3.10.0-dev.0
---

* [new-rule] `new-parens` rule (#1177)
* [new-rule] `no-default-export` rule (#1182)
* [new-rule-option] `order: ...` option for `member-ordering` rule (#1208)
* [new-rule-option] "ignore-for-loop" option for `one-variable-per-declaration` rule (#1204)
* [enhancement] "no-this-in-function-in-method" option renamed to "check-function-in-method" (#1203)
* [bugfix] `semicolon` rule checks export statements (#1155)

Thanks to our contributors!
* @chrismbarr
* @HamletDRC
* @larshp
* @patsissons
* @YuichiNukiyama

v3.9.0
---

* Stable release containing changes from the last dev release (v3.9.0-dev.0)

v3.9.0-dev.0
---

* [new-rule] `no-namespace` rule (#1133)
* [new-rule] `one-variable-per-declaration` rule (#525)
* [new-rule-option] "ignore-params" option for `no-inferrable-types` rule (#1190)
* [new-rule-option] "no-this-in-function-in-method" option for `no-invalid-this` rule (#1179)
* [enhancement] Single line enable/disable comments (#144)
* [enhancement] Resolve `extends` packages relative to location of configuration file (#1171)
* [enhancement] `Linter` class will throw an error if configuration is of an invalid type (#1167)
* [bugfix] `use-isnan` allows assaignments to `NaN` (#1054)
* [bugfix] `no-unreachable` handles allows hoisted type aliases (#564)
* [bugfix] `member-ordering` rule now checks constructors (#1158)
* [bugfix] `--test` CLI command works correctly with specifiying custom rules (#1195)

Thanks to our contributors!
* @abierbaum
* @HamletDRC
* @inthemill
* @janslow
* @JoshuaKGoldberg
* @mprobst
* @patsissions
* @YuichiNukiyama

v3.8.1
---

* Stable release containing changes from the last dev release (v3.8.0-dev.1)

v3.8.0-dev.1
---

* [bugfix] Allow JS directives at the start of constructors, getters, and setters (#1159)
* [bugfix] Remove accidentally included performance profiles from published NPM artifact (#1160)

v3.8.0
---

* Stable release containing changes from the last dev release (v3.8.0-dev.0)

v3.8.0-dev.0
---

* [new-rule] `no-invalid-this` rule (#1105)
* [new-rule] `use-isnan` rule (#1054)
* [new-rule] `no-reference` rule (#1139)
* [new-rule-option] "allow-pascal-case" option for `variable-name` rule (#1079)
* [enhancement] Comments now allowed in `tslint.json` files (#1129)
* [enhancement] Smarter `trailing-comma` behavior (#1122)
* [enhancement] `semicolon` rule more lenient with arrow-function class members (#1076)
* [enhancement] Allow enabling/disabling rules with `//` comments (#1134)
* [enhancement] New checkstyle formatter (#250)
* [enhancement] Clearer message for `no-var-keyword` rule (#1124)
* [bugfix] Loaded configurations are not cached (#1128)
* [bugfix] Allow JS directives at the start of class methods (#1144)

Thanks to our contributors!
* @AndyMoreland
* @chrismbarr
* @HamletDRC
* @JoshuaKGoldberg
* @sshev
* @unional

v3.7.4
---

* Stable release containing changes from the last dev release (v3.7.0-dev.5)

v3.7.0-dev.5
---

* [bugfix] Allow JS directives in namespaces (#1115)

v3.7.3
---

* Stable release containing changes from the last dev release (v3.7.0-dev.4)

v3.7.0-dev.4
---

* [bugfix] Downgrade `findup-sync` dependency (#1108)

v3.7.2
---

* Stable release containing changes from the last dev release (v3.7.0-dev.3)

v3.7.0-dev.3
---

* [bugfix] `findConfigurationPath` always returns an absolute path (#1093)
* [bugfix] Update `findup-sync` dependency (#1080)
* [bugfix] `declare global` no longer triggers `no-internal-module` rule (#1069)
* [bugfix] Valid JS directives no longer trigger `no-unused-expression` rule (#1050)

v3.7.1
---
* Stable release containing changes from the last dev release

v3.7.0-dev.2
---

* [bugfix] Improve handling of paths provided via the -c CLI option (#1083)

v3.7.0
---

* Stable release containing changes from the last dev release

v3.7.0-dev.1
---

* [enhancement] `extends` field for `tslint.json` files (#997)
* [enhancement] `--force` CLI option (#1059)
* [enhancement] Improve how `Linter` class handles configurations with a `rulesDirectory` field (#1035)
* [new-rule] `no-angle-bracket-type-assertion` rule (#639)
* [new-rule-option] "allow-undefined-check" option for `triple-equals` rule (#602)
* [new-rule-option] "always-prefix" and "never-prefix" option for `interface-name` rule (#512)

Thanks to our contributors!
* @Arnavion
* @chrismbarr
* @ChrisPearce
* @JoshuaKGoldberg
* @patsissonso
* @sasidhar
* @unional
* @vvakame

v3.6.0
---

* Stable release containing changes from the last dev release

v3.6.0-dev.1
---

* [enhancement] Add `--exclude` CLI option (#915)
* [bugfix] Fix `no-shadowed-variable` rule handling of standalone blocks (#1021)
* [deprecation] Configuration through `package.json` files (#1020)
* [API] Export additional configuration methods from top-level "tslint" module (#1009)

Thanks to our contributors!
* @blakeembrey
* @hamhut1066
* @meowtec

v3.5.0
---

* Stable release containing changes from the last dev release

v3.5.0-dev.1
---

* [new-rule-option] "ignore-pattern" option for `no-unused-variable` rule (#314)
* [bugfix] Fix occassional crash in `no-string-literal` rule (#906)
* [enhancement] Tweak behavior of `member-ordering` rule with regards to arrow function types in interfaces (#226)

Thanks to our contributors!
* @arusakov
* @Pajn

v3.4.0
---

* Stable release containing changes from the last two dev releases

v3.4.0-dev.2
---

* [new-rule-option] "arrow-parameter" option for `typedef` rule (#333)
* [new-rule-option] "never" option for `semicolon` rule (#363)
* [new-rule-option] "onespace" setting for `typedef-whitespace` rule (#888)
* [new-rule-option] `typedef-whitespace` rule can now check spacing on right side of typdef colon (#888)
* [enhancement] `member-ordering` rule treats arrow functions as methods (#226)
* [bugfix] Handle spaces before typedefs correctly in `typedef-whitespace` rule (#955)
* [bugfix] `label-position` rule now allows labels on `for-of` loops (#959)

Thanks to our contributors!
* @b0r3as
* @ChaseMoskal
* @Pajn
* @pe8ter
* @tomduncalf

v3.4.0-dev.1
---

* [enhancement] Revamped testing system (#620)
  * Writing tests for rules is now much simpler with a linter DSL.
    See exisitng tests in `test/rules/**/*.ts.lint` for examples.
* [enhancement] New msbuild formatter (#947)
* [bugfix] Fix handling of multiline literals in `trailing-comma` rule (#856)
* [bugfix] `one-line` rule correctly checks space between `catch` and opening brace (#925)
* [bugfix] `one-line` rule correctly checks multiline variable declarations (#935)
* [new-rule-option] New option `check-finally` for `one-line` rule (#925)
* __BREAKING CHANGES__
  * [bugfix] Report error when a rule in the config file is not found (#598)

Thanks to our contributors!
* @mmv
* @pe8ter

v3.3.0
---

* [bugfix] Tweak TSLint build so TSLint works with typescript@next (#926)

v3.3.0-dev.1
---

* [bugfix] Correctly handle more than one custom rules directory (#928)

v3.2.2
---

* Stable release containing changes from the last dev release

v3.2.2-dev.1
---

* [enhancement] Throw an error if a path to a directory of custom rules is invalid (#910)
* [new-rule-option] "jsx-single" and "jsx-double" options for `quotemark` rule (#673)
* [bugfix] Handle paths to directories of custom rules more accurately
* [bugfix] `no-unused-expression` rule handles `await` statements correctly (#887)

v3.2.1
---

* Stable release containing changes from the last dev release

v3.2.1-dev.1
---

* [enhancement] automatically generate a `tslint.json` file with new `--init` CLI command (#717)
* [bugfix] `no-var-keyword` rule detects the use of `var` in all types of `for` loops (#855)

v3.2.0
---

* Stable release containing changes from last two dev releases

v3.2.0-dev.2
---

* [bugfix] formatters are now exported correctly to work with TS 1.8 (#863)

v3.2.0-dev.1
---

* [bugfix] fixed bug in how custom rules directories are registered (#844)
* [enhancement] better support for globs in CLI (#827)
* [new-rule] `no-null-keyword` rule (#722)

v3.1.1
---

* Bump TypeScript peer dependency to `>= 1.7.3` due to `const enum` incompatibility (#832)

v3.1.0
---

* [bugfix] build with TS v1.7.3 to fix null pointer exception (#832)
* [bugfix] fixed false positive in `no-require-imports` rule (#816)

v3.1.0-dev.1
---

* [bugfix] fixed `no-shadowed-variable` false positives when handling destructuring in function params (#727)
* [enhancement] `rulesDirectory` in `tslint.json` now supports multiple file paths (#795)

v3.0.0
---

* [bugfix] `member-access` rule now handles object literals and get/set accessors properly (#801)
    * New rule options: `check-accessor` and `check-constructor`
* All the changes from the following releases, including some **breaking changes**:
    * `3.0.0-dev.3`
    * `3.0.0-dev.2`
    * `3.0.0-dev.1`
    * `2.6.0-dev.2`
    * `2.6.0-dev.1`

v3.0.0-dev.3
---

* TypeScript is now a peerDependency (#791)
* [bugfix] `no-unused-variable` rule with `react` option works with self-closing JSX tags (#776)
* [bugfix] `use-strict` bugfix (#544)

v3.0.0-dev.2
---

* [new-rule-option] "react" option for `no-unused-variable` rule (#698, #725)
* [bugfix] Fix how `Linter` is exported from "tslint" module (#760)
* [bugfix] `no-use-before-declare` rule doesn't crash on uncompilable code (#763)

v3.0.0-dev.1
---

* **BREAKING CHANGES**
    * Rearchitect TSLint to use external modules instead of merged namespaces (#726)
        * Dependencies need to be handled differently now by custom rules and formatters
        * See the [PR](https://github.com/palantir/tslint/pull/726) for full details about this change
    * `no-trailing-comma` rule removed, it is replaced by the `trailing-comma` rule (#687)
    * Rename `sort-object-literal-keys` rule to `object-literal-sort-keys` (#304, #537)
    * `Lint.abstract()` has been removed (#700)
* [new-rule] `trailing-comma` rule (#557, #687)
* [new-rule-option] "ban-keywords" option for `variable-name` rule (#735, #748)
* [bugfix] `typedef` rule now handles `for-of` loops correctly (#743)
* [bugfix] Handle tslint.json utf-8 files which have a BOM correctly (#90)

v2.6.0-dev.2
---

* Upgrade TypeScript compiler to `v1.7.0-dev.20151003`
* [bugfix] `no-unused-expression` rule now handles yield expressions properly (#706)

v2.6.0-dev.1
---

* Upgrade TypeScript compiler to `v1.7.0-dev.20150924`

v2.5.1
---

* [new-rule] no-inferrable-types rule (#676)
* [new-rule-option] "avoid-escape" option for quotemark rule (#543)
* [bugfix] type declaration for tslint external module #686
* [enhancement] `AbstractRule` and `AbstractFormatter` are now abstract classes (#631)
    * Note: `Lint.abstract()` is now deprecated

v2.5.0
---

* Use TypeScript compiler `v1.6.2`
* [bugfixes] #637, #642, #650, #652
* [bugfixes] fix various false positives in `no-unused-variable` rule (#570, #613, #663)
* Update project setup for latest VSCode (#662)

v2.5.0-beta
---

* Use TypeScript compiler `v1.6.0-beta`
* [bugfix] Fix `no-internal-module` false positives on nested namespaces (#600)
* [docs] Add documentation for `sort-object-literal-keys` rule

v2.5.0-dev.5
---

* Upgrade TypeScript compiler to `v1.7.0-dev.20150828`
* [bugfix] Handle .tsx files appropriately (#597, #558)

v2.5.0-dev.4
---

* Upgrade TypeScript compiler to `v1.6.0-dev.20150825`

v2.5.0-dev.3
---

* Upgrade TypeScript compiler to `v1.6.0-dev.20150821`

v2.5.0-dev.2
---

* Upgrade TypeScript compiler to `v1.6.0-dev.20150811`
* [bug] fix `whitespace` false positive in JSX elements (#559)

v2.5.0-dev.1
---

* Upgrade TypeScript compiler to `v1.6.0-dev.20150805`
* [enhancement] Support `.tsx` syntax (#490)

v2.4.5
---

* [bugfix] fix false positives on `no-shadowed-variable` rule (#500)
* [enhancement] add `allow-trailing-underscore` option to `variable-name` rule

v2.4.4
---

* [bugfix] remove "typescript" block from package.json (#606)

v2.4.3
---

* [new-rule] `no-conditional-assignment` (#507)
* [new-rule] `member-access` (#552)
* [new-rule] `no-internal-module` (#513)
* [bugfix] small fixes to `sample.tslint.json` (#545)
* [bugfix] fix README docs for quotemark and indent (#523)
* [enhancement] update `findup-sync` and `underscore.string` dependencies
* [enhancement] add `"typescript"` field to `package.json` (#560)
* [enhancement] small improvements to CLI help text
* [enhancement] expose raw failures array in the JS API (#477)

v2.4.2
---

* [bug] remove npm-shrinkwrap.json from the published package

v2.4.0
---

* Upgraded Typescript compiler to 1.5.3
* [bugs] #332, #493, #509, #483
* [bug] fix error message in `no-var-keyword` rule
* [enhancement] CI tests are now run on node v0.12 in addition to v0.10
* **BREAKING**
    * `-f` option removed from CLI

v2.3.1-beta
---

* [bugs] #137 #434 #451 #456
* [new-rule] `no-require-imports` disallows `require()` style imports
* [new-rule] `no-shadowed-variable` moves over shadowed variable checking from `no-duplicate-variable` into its own rule
* **BREAKING**
    * `no-duplicate-variable` now only checks for duplicates within the same block scope; enable `no-shadowed-variable` to get duplicate-variable checking across block scopes
* [enhancement] `no-duplicate-variable`, `no-shadowed-variable`, and `no-use-before-declare` now support ES6 destructuring
* [enhancement] tslint CLI now uses a default configuration if no config file is found

v2.3.0-beta
---

* [bugs] #401 #367 #324 #352
* [new-rule] `no-var-keyword` disallows `var` in favor of `let` and `const`
* [new-rule] `sort-object-literal-keys` forces object-literal keys to be sorted alphabetically
* Add support for ES6 destructuring and module syntax (affects `variable-name`, `no-use-before-declare`, `whitespace` and `no-unused-variable`)
* Add support for ES6 for-of and spread operator syntax
* Use tsconfig.json & JSCS in the build system

v2.2.0-beta
---

* Upgraded Typescript compiler to 1.5.0-beta
* **BREAKING CHANGES**
    * due to changes to the typescript compiler API, old custom rules may no longer work and may need to be rewritten
    * the JSON formatter's line and character positions are now back to being 0-indexed instead of 1-indexed
* [bugs] #328 #334 #319 #351 #365 #254
* [bug] fixes for tslint behavior around template strings (fixes #357, #349, #332, and more)
* [new-rule] `align` rule now enforces vertical alignment on parameters, arguments, and statements
* [new-rule] `switch-default` enforces a `default` case in `switch` statements
* [feature] `no-duplicate-variable` rule now additionally checks if function parameters have been shadowed
* Additional fixes to existing rules to work as before with the typescript 1.5 compiler

v2.1.1
---

* [bugs] #292 #293 #295 #301 #302
* Some internal refactoring
* Added Windows CI testing (appveyor)

v2.1.0
---

* Fix crash on Windows

v2.0.1
---

* Upgraded Typescript compiler to 1.4
* **BREAKING CHANGES**
    * typedef rule options were modified:
        * index-signature removed as no longer necessary
        * property-signature renamed to property-declaration
        * variable-declarator renamed to variable-declaration
        * member-variable-declarator renamed to member-variable-declaration
    * typedef-whitespace rule options were modified:
        * catch-clause was removed as invalid
        * further options were added, see readme for more details
    * due to changes to the typescript compiler API, old custom rules may no longer work and may need to be rewritten
    * the JSON formatter's line and character positions are now 1-indexed instead of 0-indexed

v1.2.0
---

* [bug] #245

v1.0.1
---

* [bug] #238

v1.0.0
---

* upgrade TypeScript compiler to 1.3
* **BREAKING CHANGES**
    * all error messages now start with a lower-case character and do not end with a period
    * all rule options are consistent in nomenclature. The `typedef` and `typedef-whitespace` rules now take in hyphenated options
    * `unused-variables` rule cannot find unused private variables defined in the constructor due to a bug in 1.3 compiler
    * `indent` rule has changed to only check for tabs or spaces and not enforce indentation levels

v0.4.12
---

* multiple files with -f on cli
* config file search starts with input file

v0.4.11
---

* [bugs] #136, #163
* internal refactors

v0.4.10
---

* [bugs] #138, #145, #146, #148

v0.4.9
---

* [new-rule] `no-any` disallows all uses of `any`
* [bug] `/* tslint:disable */` now disables semicolon rule as well
* [bug] delete operator no longer results in a false positive for `no-unused-expression`

v0.4.8
---

* [new-rule] `no-var-requires` disallows require statements not part of an import statement
* [new-rule] `typedef` rule also checks for member variables
* [bug] `no-unused-variable` no longer triggers false positives for class members labeled only `static`
* [bug] `no-unused-expression` no longer triggers false positives for `"use strict";` expressions
* [bug] `use-strict` works correctly on function declarations
* [bug] config file is now discoverable from other drives on Windows

v0.4.7
---

* [new-rule] added `no-unused-expression` rule which disallows unused expression statements
* [feature] the `check-operator` option for the `whitespace` rule now checks whitespace around the => token
* [bug] `no-use-before-declare-rule` no longer triggers false positives for member variables of classes used before the class is declared
* [bug] semicolon at end of file no longer triggers false positives for `whitespace` rule
* [bug] hoisted functions no longer cause false positives for the `no-unreachable` rule
* [bug] the rule loader no longer transforms/ignores the leading and trailing underscores and dashes of rule names in the config file
* [bug] `export import` statements no longer false positives for `no-unused-variable-rule`
* [docs] added documentation for creating custom rules and formatters
* [docs] added sample `tslint.json` file, under `docs/sample.tslint.json`

v0.4.6
---

* [build] migrated build to use `grunt-ts` instead of `grunt-typescript`
* [feature] `package.json` now contains a `tslintConfig` paramater to allow users to specify the location of the configuration file there
* [feature] tslint now searches for the configuration file in the user's home directory if not found in the current path
* [bug] unbraced conditionals no longer cause false positives for the `no-unreachable` rule

v0.4.5
---

* [feature] `no-unused-variable` no longer checks parameters by default. Parameters are now only checked if the `check-parameters` option is set.
* [bug] `no-unused-variable` parameter check no longer fails on variable argument parameters (like ...args) and on cases where the parameters are broken up by newlines.

v0.4.4
---

* [bug] `no-unused-variable` validates function parameters and constructor methods
* [bug] `no-empty` and `no-trailing-comma` rules handle empty objects

v0.4.3
---

* [new-rule] `no-unused-variable`
* [new-rule] `no-trailing-comma`
* [new-rule] `no-use-before-declare`
* [feature] support `--version` in CLI
* [feature] expose rule names to custom formatters
* [feature] add `verbose` formatter
* [bug] `no-empty` allows constructors with member declaration parameters
* [bug] CLI supports `--help`
* [bug] `max-line-length` allows CRLF endings
