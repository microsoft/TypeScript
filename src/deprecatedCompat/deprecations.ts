// The following are deprecations for the public API. Deprecated exports are removed from the compiler itself
// and compatible implementations are added here, along with an appropriate deprecation warning using
// the `@deprecated` JSDoc tag as well as the `Debug.deprecate` API.
//
// Deprecations fall into one of three categories:
//
// - "soft" - Soft deprecations are indicated with the `@deprecated` JSDoc Tag.
// - "warn" - Warning deprecations are indicated with the `@deprecated` JSDoc Tag and a diagnostic message (assuming a compatible host).
// - "error" - Error deprecations are either indicated with the `@deprecated` JSDoc tag and will throw a `TypeError` when invoked, or removed from the API entirely.
//
// Once we have determined enough time has passed after a deprecation has been marked as `"warn"` or `"error"`, it will be removed from the public API.