# Type Hierarchy Feature: Comprehensive Enhancement

## Summary

This PR implements a comprehensive Type Hierarchy feature for the TypeScript language service, providing IDE support for navigating class, interface, and type alias hierarchies. The feature supports the LSP Type Hierarchy protocol and enables rich navigation across supertypes and subtypes.

## Features

### Core Functionality

- **Prepare Type Hierarchy**: Resolves the type hierarchy declaration at a given position
- **Provide Supertypes**: Returns base classes, implemented interfaces, and referenced types
- **Provide Subtypes**: Returns derived classes, implementing classes, and intersection type aliases
- **On-Demand Loading**: Following LSP protocol, the tree is loaded lazily - one level at a time when expanded in the UI

### Supported Declaration Types

1. **Classes** (named and anonymous class expressions)
2. **Interfaces** (including declaration merging)
3. **Type Aliases** (with semantic relationship tracking)
4. **Mixin Variables** (`const Mixed = Mixin(Base)` patterns)
5. **Type Parameters** (with constraint tracking)

### Advanced Type Patterns

The implementation handles complex TypeScript patterns:

| Pattern | Supertype Support | Subtype Support |
|---------|------------------|-----------------|
| `extends` clauses | ✅ | ✅ |
| `implements` clauses | ✅ | ✅ |
| Intersection types (`A & B`) | ✅ (members) | ✅ (as structural subtype) |
| Union types (`A \| B`) | ✅ (members) | ❌ (semantically incorrect) |
| Conditional types | ✅ (extends clause) | ✅ (as possible subtype) |
| Mapped types | ✅ (referenced types) | ❌ |
| Generic instantiations | ✅ (original generic) | ✅ |
| Re-exports/module aliases | ✅ | ✅ |
| Mixin patterns | ✅ (composition chain) | ✅ (reverse lookup) |
| Type parameter constraints | ✅ | N/A |

### Kind Modifiers

Types are annotated with descriptive `kindModifiers` to help distinguish different type relationships:

| Modifier | Description | Example |
|----------|-------------|---------|
| `mixin` | Mixin variable | `const Mixed = Mixin(Base)` |
| `alias` | Simple type alias | `type Foo = Bar` |
| `conditional,extends` | Simple conditional type | `T extends U ? X : Y` |
| `conditional,infer` | Inference conditional type | `T extends (...) => infer R ? R : never` |
| `intersection` | Intersection type | `A & B` |
| `union` | Union type | `A \| B` |
| `mapped` | Mapped type | `{ [K in keyof T]: ... }` |
| `tuple` | Tuple type | `[A, B]` |
| `template` | Template literal type | `` `Hello ${string}` `` |
| `indexed` | Indexed access type | `T["key"]` |
| `keyof` | Keyof operator | `keyof T` |
| `readonly` | Readonly operator | `readonly T[]` |

## Implementation Details

### Files Changed

1. **`src/services/typeHierarchy.ts`** (new, ~1000 lines)
   - Core type hierarchy implementation
   - `resolveTypeHierarchyDeclaration()` - Entry point for type hierarchy requests
   - `createTypeHierarchyItem()` - Creates hierarchy items with proper metadata
   - `getSupertypes()` - Collects base types, implemented interfaces, and type parameter constraints
   - `getSubtypes()` - Finds derived types using hybrid approach with configurable limits
   - `getTypeHierarchyKindModifiers()` - Returns modifiers based on type pattern
   - `findMixinVariablesUsingSymbol()` - Reverse mixin lookup
   - `collectTypeParameterConstraints()` - Collects type parameter constraints as supertypes

2. **`src/compiler/types.ts`** (modified)
   - Added `typeHierarchyMaxResults` to `UserPreferences` for configurable result limits

3. **`src/harness/fourslashImpl.ts`** (modified)
   - Added `kindModifiers` display in type hierarchy baselines

4. **Test Files** (27 new fourslash tests)
   - Comprehensive coverage of all supported patterns
   - Multi-file tests for cross-file scenarios
   - Edge case and negative case testing

### Key Algorithms

#### Supertype Collection
- Uses `getEffectiveBaseTypeNode()` for class inheritance
- Iterates heritage clauses for `extends`/`implements`
- Handles type aliases by analyzing their type structure
- Traces mixin composition chains recursively
- Collects type parameter constraints

#### Subtype Collection (Hybrid Approach)
1. **FindAllReferences** with `{ implementations: true }` for efficient heritage clause lookup
2. **Manual traversal** for type alias subtypes (intersection types only)
3. **Reverse mixin lookup** for finding mixin variables that use a base class
4. **Results limit** (1000 per level) to prevent performance issues in large codebases

#### Symbol Resolution
- Properly resolves import aliases using `skipAlias()`
- Handles declaration merging via `getMergedSymbol()`
- Resolves generic type instantiations to their base types

### Mixin Support

The implementation recognizes and supports TypeScript mixin patterns:

```typescript
// Mixin function
function Timestamped<T extends new (...args: any[]) => any>(Base: T) {
    return class extends Base { timestamp = Date.now(); };
}

// Mixin variable - recognized as TypeHierarchyDeclaration
const TimestampedUser = Timestamped(User);

// Querying MixinBase finds all mixin variables using it
export class MixinBase {}
export const Full = Serializable(Activatable(Timestamped(MixinBase)));
// MixinBase → subtypes: [TimestampedBase, ActivatableTimestamped, FullMixin]
```

### Type Parameter Constraints

Type hierarchy shows type parameter constraints as supertypes:

```typescript
interface Entity { id: number; }
function process<T extends Entity>(item: T) { ... }
// T → supertypes: [Entity]
```

## Testing

### Test Coverage

- 27 fourslash tests covering:
  - Basic class/interface inheritance
  - Abstract classes
  - Multi-file scenarios
  - Generic types and instantiations
  - Type parameter constraints
  - Conditional types
  - Mapped types
  - Intersection/union types
  - Template literal types
  - Indexed access types
  - Mixin patterns (forward and reverse lookup)
  - Re-exports and module aliases
  - Declaration merging
  - Project references
  - Edge cases and negative cases

### Running Tests

```bash
# Run all type hierarchy tests
npx hereby runtests --tests=typeHierarchy

# Run specific test
npx hereby runtests --tests=tests/cases/fourslash/typeHierarchyMixinsDeclarations.ts

# Run full test suite
npx hereby runtests-parallel
```

## Semantic Correctness

### Union vs Intersection Types

The implementation correctly models type relationships:

- **Intersection types** (`A & B`): A subtype of both A and B (has ALL properties)
- **Union types** (`A | B`): A supertype of A and B (not a subtype!)

```typescript
type Pet = Dog | Cat;  // Pet is NOT a subtype of Dog - relationship reversed!
type DogPet = Dog & Pet;  // DogPet IS a subtype of both Dog and Pet
```

### Conditional Types

Conditional types like `ExtractDog<T> = T extends Dog ? T : never` are shown as "possible subtypes" when the condition could be satisfied. The `conditional,extends` or `conditional,infer` modifiers help distinguish these from structural subtypes.

## Performance Considerations

- **On-Demand Loading**: Follows LSP protocol - tree is loaded one level at a time as user expands nodes
- **FindAllReferences**: Uses efficient name index for subtype lookup
- **AST Traversal**: Avoided when possible; uses targeted lookups
- **Seen Sets**: Prevents duplicate processing
- **Cancellation Tokens**: Supports responsiveness during long operations
- **Results Limit**: Subtype collection is capped at a configurable limit (default: 1000) to prevent performance issues in very large codebases
- **Configurable via `UserPreferences.typeHierarchyMaxResults`**: The limit can be adjusted per-request

## Known Limitations

1. **Deeply nested generics**: May not fully trace through complex generic type transformations
2. **Type-level computation**: Runtime-computed types (e.g., complex mapped types) may not show all relationships
3. **Anonymous classes from mixins**: Mixin functions return anonymous classes; we show the mixin variable instead
4. **satisfies expressions**: Not applicable - `satisfies` is an expression-level operator, not a type-level relationship

## Future Enhancements

- [ ] **Truncation indicator** - Show indicator when results exceed the configured limit
- [ ] Handle more complex generic type inference
- [ ] Show inferred type widening in hierarchy
- [ ] Enhanced cross-project reference support

---

## AI Disclosure

This PR was developed with assistance from GitHub Copilot (Claude Opus 4.5). The AI helped with:
- Code implementation and algorithm design
- Test case creation and coverage analysis
- Documentation and PR description writing
- Code review and bug identification

All code has been reviewed by the contributor @kbrilla and tested against the full TypeScript test suite (99,267 tests passing).

---

Fixes #45877
