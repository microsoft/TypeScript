---
name: api-client
description: Instructions for working on the API client in ./packages/typescript
---

## Code comments

The user may tell you to reference Strada (the old TypeScript codebase) for implementation, but your code comments should not acknowledge that this codebase is a port of anything else. Comments should stand on their own and describe the code in the current codebase. Never say "Mirrors TypeScript's 'foo' function" or "...like the classic API's 'Bar' type."

## Adding properties/methods to `Type` and `Symbol`

When adding a property or method to `Type` or `Symbol` that references another `Type` or `Symbol`, decide how to represent it via this process:

- Does the public method take arguments, like `type.getProperty(name)`?
  - Add the method on `Type`
  - Do not cache results on the `Type`.
  - Result: every call will perform a fetch.
- Otherwise, does the method take non-trivial work to compute its result, like `type.getReducedType()`, or might it return a huge number of results, like `unionType.types()`?
  - Add the method on `Type`
  - Do not precompute a result to include in `TypeResponse`
  - Do include a backing cache field on `Type`, initialized to `false`, and update it after the first call.
  - Result: the first call will always perform a fetch. Subsequent calls will use the cached result.
- Otherwise, is the method trivial to compute, or represented as a plain property in the Go source?
  - Add the method on `Type`
  - Precompute the reference and include the ID in `TypeResponse`
  - Result: the first call will not perform a fetch if a Type/Symbol by that identity is already in the object registry.

If the situation doesn't seem to fit any of these categories, STOP and ask the user for guidance, and suggest updating these instructions.

## Adding methods to `Checker`

If the method is an operation on a single `Type` or `Symbol` that takes no other arguments and returns a `Type` or `Symbol`, add the method on `Type` according to the earlier instructions, and implement the Checker method by delegating to the corresponding `Type` or `Symbol` method, so the result is cacheable.

## Unnecessary spread and `exactOptionalPropertyTypes`

Never write code like `...(options ? { snapshot: options.snapshot } : {})`. All optional properties should tolerate `undefined`. If `--exactOptionalPropertyTypes` is forcing you to write code this way, fix the offending type. Rewriting as `if (options) foo.snapshot = options.snapshot` is not an acceptable workaround; always fix the type. As a rule, object types used in input positions should always define optional properties with `prop?: T | undefined` so this isn't a problem.

## What kinds of ID collisions matter?

Most API objects synchronize their client and server identities by some kind of handle or ID. Some care has to be taken when choosing an ID scheme.

What matters:

* A single `api.Session` in LSP mode can have multiple simultaneous clients. Sometimes those clients will all talk about the same server object. Other times, a single client needs to create objects that are private to it, like resolution contexts or source file leases. In those cases, the server must generate the unique ID after creation to avoid ID collision of private objects between multiple clients.


What doesn't matter:

* `uint64` overflow
* Passing objects between multiple `API` instances in the same JS process. We may eventually add some kind of central provenance validation. Do not add it on individual methods or flag it in reviews for now. It's not a realistic concern.

## Reference equality guarantees are forfeited by disposing owners and clearing the source file cache

It's not a bug to observe a new object identity for an object whose owner was previously disposed or manually removed by `api.clearSourceFileCache()`. Review comments and tests that assert an ownership or lifetime bug that rely on testing reference equality after disposal or cache clearing will be rejected.
