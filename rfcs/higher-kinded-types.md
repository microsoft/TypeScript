# RFC: Higher-Kinded Types for TypeScript

**Issue:** [#1213](https://github.com/microsoft/TypeScript/issues/1213) (4000+ reactions)
**Status:** Draft / Prototype
**Author:** TypeScript Community Contribution
**Date:** 2026-04-11

---

## Summary

This RFC proposes adding Higher-Kinded Types (HKTs) to TypeScript, enabling type
constructors to be passed as type parameters. This is the most requested TypeScript
feature by a wide margin and would unlock powerful abstractions for generic
programming, including Functor, Monad, and Traversable patterns.

## Motivation

Currently, TypeScript has no way to abstract over type constructors. You cannot write:

```ts
// DESIRED: A generic "map" that works over any container type
type Mappable<F<_>> = {
  map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
};
```

Instead, developers must resort to workarounds:
- Module augmentation (fp-ts approach)
- URI-based type-level dictionaries
- Conditional type encoding (HKT emulation)

All workarounds have significant ergonomic and type-safety drawbacks.

## Proposed Syntax

### Type Parameter Declaration with Kind Annotation

A type parameter that itself accepts type parameters uses the `<F<_>>` syntax:

```ts
// Single-parameter type constructor
type Functor<F<_>> = {
  map<A, B>(fa: F<A>, f: (a: A) => B): F<B>;
};

// Multi-parameter type constructor
type Bifunctor<F<_, _>> = {
  bimap<A, B, C, D>(fab: F<A, B>, f: (a: A) => C, g: (b: B) => D): F<C, D>;
};

// Named HKT parameters for clarity
type Transform<F<A, B>> = {
  apply<X, Y>(input: F<X, Y>): F<Y, X>;
};
```

### Usage at Call Sites

```ts
// Implementing Functor for Array
const ArrayFunctor: Functor<Array> = {
  map: (fa, f) => fa.map(f),
};

// Implementing Functor for Promise
const PromiseFunctor: Functor<Promise> = {
  map: (fa, f) => fa.then(f),
};

// Implementing Functor for a custom type
type Maybe<T> = T | null;
const MaybeFunctor: Functor<Maybe> = {
  map: (fa, f) => fa === null ? null : f(fa),
};
```

### Constraints on Higher-Kinded Parameters

```ts
// F must be a type constructor that produces something with a .length
type Sized<F<_>> = {
  size<A>(fa: F<A>): number;
};

// F must be a Functor to be a Monad
type Monad<F<_>> = Functor<F> & {
  of<A>(a: A): F<A>;
  flatMap<A, B>(fa: F<A>, f: (a: A) => F<B>): F<B>;
};
```

## Design Details

### Kind System

We introduce a simple kind system:

| Kind | Meaning | Example |
|------|---------|---------|
| `*` | A concrete type | `number`, `string`, `Array<number>` |
| `* -> *` | A type constructor taking one type | `Array`, `Promise`, `Set` |
| `* -> * -> *` | A type constructor taking two types | `Map`, `Either` |
| `(* -> *) -> *` | A type constructor taking a type constructor | `Fix`, `Free` |

In our syntax:
- `<T>` declares a parameter of kind `*`
- `<F<_>>` declares a parameter of kind `* -> *`
- `<F<_, _>>` declares a parameter of kind `* -> * -> *`

### Parser Changes

The parser is modified to recognize when a type parameter itself has type
parameters. When parsing `<F<_>>`, the parser:

1. Parses `F` as the type parameter name (Identifier)
2. Detects `<` immediately after the identifier
3. Speculatively parses inner type parameters (`_` or named identifiers)
4. Sets `isHigherKinded = true` on the `TypeParameterDeclaration` node
5. Stores the inner parameters as `hktParameters`

Key implementation points:
- We reuse the existing `TypeParameterDeclaration` node kind rather than adding
  a new `SyntaxKind`, minimizing changes across the codebase
- The `isHigherKinded` and `hktParameters` properties are `@internal`
- `_` is treated as a valid identifier (placeholder) for unnamed HKT parameters

### Type Checker Changes (Future)

The checker needs these additions:

1. **Kind checking**: When a type argument is provided for an HKT parameter, verify
   it has the correct number of type parameters. E.g., `Functor<Array>` is valid
   (Array has 1 type param), `Functor<Map>` is an error (Map has 2 type params).

2. **Application**: When `F<A>` appears in the body where `F` is an HKT parameter,
   the checker must produce the applied type. If `F = Array`, then `F<A>` = `Array<A>`.

3. **Inference**: The checker should infer HKT arguments from usage. Given
   `map(promise, f)` where `map` expects `Functor<F>`, infer `F = Promise`.

4. **Partial application**: Support `F<A, _>` to partially apply a multi-parameter
   type constructor, producing a type constructor of lower kind.

### Compatibility

- **Backward compatible**: All existing code continues to work. The `<F<_>>` syntax
  currently produces a parse error, so no existing code uses it.
- **Emit**: HKTs are erased at runtime, like all TypeScript types.
- **Declaration files**: `.d.ts` output must preserve HKT syntax.

## Implementation Phases

### Phase 1: Parser Support (This PR)
- [x] Parse `<F<_>>` syntax in type parameter positions
- [x] Attach `isHigherKinded` and `hktParameters` to `TypeParameterDeclaration`
- [x] Add test cases for parsing
- [ ] Update `emitter.ts` to emit HKT syntax in declarations

### Phase 2: Basic Type Checking
- [ ] Kind checking for HKT arguments
- [ ] Type application: resolving `F<A>` when `F` is an HKT parameter
- [ ] Error messages for kind mismatches

### Phase 3: Inference and Advanced Features
- [ ] Infer HKT arguments from usage
- [ ] Partial application of multi-parameter type constructors
- [ ] Constraints on HKT parameters (`F<_> extends Iterable<_>`)
- [ ] Higher-order HKTs (`<F<G<_>>>`)

### Phase 4: Ecosystem Integration
- [ ] Language service support (completions, quick info)
- [ ] Declaration emit
- [ ] API documentation
- [ ] Lib updates (built-in Functor, Monad, etc.)

## Alternatives Considered

### 1. Type-Level `typeof` for Generics
```ts
type Functor<F extends Generic<1>> = { ... }
```
Rejected: Requires a new `Generic<N>` built-in and doesn't compose well.

### 2. Module-Level Type Lambdas
```ts
type Functor<F extends TypeLambda> = { ... }
```
This is the fp-ts/Effect approach. It works but is extremely verbose and requires
manual registration of every type constructor.

### 3. `~` Syntax for Kind Annotation
```ts
type Functor<F ~ (* -> *)> = { ... }
```
Rejected: Introduces new syntax that doesn't feel like TypeScript.

### 4. `extends` with Application Syntax
```ts
type Functor<F extends <T> => Type> = { ... }
```
Rejected: Conflicts with arrow function syntax in type positions.

## Impact on Existing Libraries

- **fp-ts / Effect**: Could replace the URI-based HKT emulation with native HKTs
- **io-ts**: Codec type constructors become first-class
- **rxjs**: `Observable` can be treated as a proper Functor
- **Prisma / Drizzle**: Type-safe query builders benefit from type constructor abstraction

## Open Questions

1. **Should `_` be reserved as a type parameter name?** Currently `_` is a valid
   identifier. We may want to treat it specially only in HKT positions.

2. **How should partial application work?** Should `Map<string, _>` produce a
   `* -> *` type constructor? This requires type-level currying.

3. **Should we support kind annotations explicitly?** E.g., `<F : * -> *>` for
   cases where the arity cannot be inferred from usage.

4. **How does this interact with conditional types and mapped types?**
   `F<A> extends F<B> ? ... : ...` when F is an HKT parameter needs careful design.

5. **Variance annotations on HKT parameters?** Should `<out F<_>>` be valid?

## References

- [TypeScript #1213](https://github.com/microsoft/TypeScript/issues/1213) - Original issue
- [Haskell Kind System](https://wiki.haskell.org/Kind) - Inspiration
- [Scala 3 Type Lambdas](https://docs.scala-lang.org/scala3/reference/new-types/type-lambdas.html)
- [fp-ts HKT](https://gcanti.github.io/fp-ts/modules/HKT.ts.html) - Current workaround
- [Effect HKT](https://effect.website/) - Modern workaround
