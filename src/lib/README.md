# Read this!

The files within this directory are copied and deployed with TypeScript as the set of APIs  available as a part of the JavaScript language.

There are three main domains of APIs in `src/lib`:
 
 - **ECMAScript language features** - e.g. JavaScript APIs like functions on Array etc which are documented in [ECMA-262](https://tc39.es/ecma262/)
 - **DOM APIs** - e.g. APIs which are available in web browsers
 - **Intl APIs** - e.g. APIs scoped to `Intl` which are documented in [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/)

## How do we figure out when to add something?

TypeScript has a rule-of-thumb to only add something when it has got far enough through the standards process that it is more or less confirmed. For JavaScript APIs and language features, that means the proposal is at stage 3 or later.

You can find the source of truth for modern language features and Intl APIs in these completed proposal lists:

 - [JavaScript](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
 - [Intl](https://github.com/tc39/proposals/blob/master/ecma402/finished-proposals.md)

For the DOM APIs, which are a bit more free-form, we have asked that APIs are available un-prefixed/flagged in at least 2 browser _engines_ (i.e. not just 2 chromium browsers.) 

## Generated files

The DOM files ending in `.generated.d.ts` aren't meant to be edited by hand.

If you need to make changes to such files, make a change to the input files for [**our library generator**](https://github.com/microsoft/TypeScript-DOM-lib-generator).
