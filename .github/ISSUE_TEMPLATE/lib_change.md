---
name: Library change
about: Fix or improve issues with built-in type definitions like `lib.dom.d.ts`, `lib.es6.d.ts`,
  etc.
title: ''
labels: ''
assignees: ''

---

# lib Update Request

<!--
  Please fill in each section completely. Thank you!

  Are you here for one of these commonly-requested lib changes?
    * Object.keys - see https://stackoverflow.com/questions/55012174/
    * Array methods - see https://github.com/microsoft/TypeScript/issues/36554
    * parseInt, parseFloat, isFinite, isNaN, etc. - see https://github.com/microsoft/TypeScript/issues/4002

  The DOM lib is maintained elsewhere and you can skip a step by filing issues/PRs for the DOM at that repo.
  See https://github.com/microsoft/TypeScript-DOM-lib-generator
-->

## Configuration Check

<!--
  If you're missing common new methods like Array.includes, you may have a misconfigured project.
  Try setting `lib: "es2020"` and checking whether the type you want is present.
  You can diagnose further by running `tsc` with `--listFilesOnly` or `--showConfig`.

  Conversely, if you are seeing built-in methods you expect to *not* see, check your 'lib' setting
  or review your dependencies for lib/reference directives that might be polluting
  your global scope. This is common when using the 'node' type library. See https://github.com/microsoft/TypeScript/issues/40184

  Replace the text below:
-->
My compilation *target* is `ES2015` and my *lib* is `the default`.

## Missing / Incorrect Definition

<!--
  What property, method, function, etc is missing or incorrect?
-->

## Sample Code

<!--
  What's some code using this that should work, but doesn't?
-->

## Documentation Link

<!--
  Link to relevant documentation (e.g. MDN, W3C, ECMAScript Spec) to consult for this property.
  Note that lib.dom.d.ts intentionally does not include browser-specific extensions
   or early experimental features.
-->
