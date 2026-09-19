---
name: api-client
description: Instructions for working on the API client in ./packages/typescript
---

## Code comments

The user may tell you to reference Strada (the old TypeScript codebase) for implementation, but your code comments should not acknowledge that this codebase is a port of anything else. Comments should stand on their own and describe the code in the current codebase. Never say "Mirrors TypeScript's 'foo' function" or "...like the classic API's 'Bar' type."

## Unnecessary spread and `exactOptionalPropertyTypes`

Never write code like `...(options ? { snapshot: options.snapshot } : {})`. All optional properties should tolerate `undefined`. If `--exactOptionalPropertyTypes` is forcing you to write code this way, fix the offending type. Rewriting as `if (options) foo.snapshot = options.snapshot` is not an acceptable workaround; always fix the type. As a rule, object types used in input positions should always define optional properties with `prop?: T | undefined` so this isn't a problem.
