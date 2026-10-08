# Arena AST design

Keep these notes current with implementation changes and newly discovered
constraints. They describe the arena branch, not the pointer-based AST on main.

## Goals and current scope

Replace the AST's web of node pointers with source-file-relative handles and
pointer-free records. The intended benefits are less retained memory, less GC
work, and cheaper navigation. Preserving compiler, language-server, and
JavaScript wire-protocol behavior is a requirement.

The representation and consumer migration are implemented. Current optimization
work is limited to resolving accessor storage once and compacting node lists.
Arena lifetime changes and secondary header/side-pool tuning are deferred.
End-to-end performance evaluation is separate from those implementation tasks.

## Handles and ownership

`ast.Node` contains a `*SourceFile` owner and a `uint32` offset. It is comparable
and occupies 16 bytes on amd64. Its zero value represents absence; use
`IsNil()` rather than comparing nodes with `nil`.

Copies preserve identity and share mutations. Concrete and base `As*()` views
refer to the same record, not a copied payload. Read and write fields through
generated getters and setters.

A factory lazily creates its ownership anchor. Parsing creates children before
the source-file root; creating that root reuses the anchor. Further source-file
roots from the same factory have separate metadata objects but share the
existing arena owner. Source-file records contain a side-table index that maps
each root handle to its actual `*SourceFile`.

Releasing a factory's arenas drops its ownership references, not the storage
held by existing handles. Factories are not safe for concurrent mutation.

## Record layout and unsafe access

The common header occupies eight `uint32` words:

| Words | Contents |
| --- | --- |
| 0-1 | Lazy atomic node ID |
| 2 | Node flags |
| 3 | Mutable syntax kind |
| 4-5 | Position and end |
| 6 | Parent reference |
| 7 | Immutable concrete layout tag |

Generated payload fields start at word eight. Layout tags remain unchanged when
transformers change a syntax kind. `As*()` validates the concrete layout,
preserving the old payload type-assertion failures. Base field-offset tables
also use the immutable layout, rather than the mutable kind.

Chunks are pointer-free `[]uint64` allocations rooted through a GC-visible
`[]unsafe.Pointer`. They never move. Chunk capacities grow from 64 to 4096
`uint32` words. The offset's low 12 bits identify a word within a chunk; higher
bits select the chunk. Offset zero is reserved for absence.

Every allocation is rounded to an even word count, keeping atomic IDs aligned
to eight bytes on both 64-bit and 32-bit targets. A record must fit entirely
inside one chunk, including the first chunk's reserved zero offset.

Unsafe access depends on those allocator invariants and generated field
offsets. Traversal casts to an array sized for the actual record, not the maximum
chunk size; extending a typed view beyond a small allocation breaks checkptr.
Do not replace the GC-visible chunk roots with integer addresses.

## References and side tables

Local child and parent references are 32-bit offsets. Zero means an absent node.
The high bit marks a foreign reference, whose remaining bits are a one-based
index into the owner's foreign-handle table. Foreign handles are deduplicated
without changing their identity.

Typed side tables store strings, symbols, flow pointers, lists, maps, and other
Go-managed values. Records hold one-based indices; zero is the empty/nil value.
Setters update an existing slot or allocate its first slot. No Go pointers are
written into raw record storage.

`NodeList` and `ModifierList` still store `[]Node`. Compact lists are not yet
implemented. Binder-generated synthetic flow data uses a shared factory per
binding operation instead of allocating an ownership anchor for every node.

## Compatibility constraints

- Keep lazy, dense global node IDs. The checker's paged link store relies on
  dense IDs; deriving IDs from arena offsets would make that storage sparse.
- `NewToken` must choose the canonical payload layout for its kind, including
  identifiers, literals, keyword expressions, and keyword type nodes. Treating
  every token as the bare token layout breaks dispatch and subtree facts.
- Factory creation hooks see initialized payloads before explicit constructor
  flags are applied, matching the pointer-based factory's ordering.
- Keep the JavaScript AST encoding format unchanged. Its implementation uses
  handles internally, but serialization is not a protocol redesign.
- `SourceFile` is a pointer-owned metadata object, not a value view. All of its
  generated methods must have pointer receivers.

## SourceFile receiver race

The first migration accidentally generated value receivers for `SourceFile`
accessors and base conversions. A call such as `file.Locals()` or `file.Symbol()`
copied the entire metadata object, including its `sync.Once`, mutexes, and
atomic state. Copying those fields raced with concurrent binding and other
metadata operations even when the requested arena field was stable.

The race was reported by the parallel race-enabled smoke job for
[microsoft/TypeScript#64698](https://github.com/microsoft/TypeScript/pull/64698),
[run 37849859691](https://github.com/microsoft/TypeScript/actions/runs/37849859691/job/113559811242).
The required correction is pointer receivers for source-file field accessors,
base conversions, and subtree-fact forwarding. Other concrete/base views should
remain values. Record the implementation and regression evidence here with the
fix.

## Performance observations

The matched synthetic workload parses 1024 repeated exported functions. The
retention benchmark keeps 128 parsed files alive across a collection. The
comparison baseline includes the generated-method-dispatch foundation.

Six interleaved samples measured:

| Measurement | Change |
| --- | --- |
| Allocated bytes per parse | -9.15% |
| Allocations per parse | -7.84% |
| Retained live heap per file | -28.14% |
| GC-scanned heap per file | -76.39% |

CPU measurements were highly noisy, and sampled navigation remained slower.
No CPU improvement is established. Less scanned heap is not itself a
measurement of reduced GC CPU time. Whole-program and long-lived language-server
results are needed before drawing broader performance conclusions.

An experiment putting every visitor body directly into one large dispatch
method made navigation worse in local samples. Per-kind helpers sharing a
resolved record performed better. Treat those timings as provisional.

## Next implementation steps

### Resolve accessor storage once

Ordinary getters currently resolve the owner, chunk, and record for each field.
A cast validates the layout separately; base getters also resolve a
layout-dependent offset. Prototype sharing a resolved, validated record across
multi-field operations without removing assertions or introducing heap
allocations. Preserve handle identity, zero views, mutation visibility, and
atomic alignment.

### Compact lists

Each current list element carries a full handle and GC-visible owner pointer.
Investigate one owner per list with 32-bit encoded references, including absent
and foreign nodes. Migrate consumers without routinely allocating decoded
slices. Preserve list locations, modifier flags, ordering, cloning, mutation
semantics, and early-exit traversal. Account for decoding cost, not just storage
size.

## Generation and validation

The schema is `tools/scripts/tsc/ast.json`; arena-specific generation is in
`tools/scripts/tsc/go-arena.ts`. Regenerate with `npx hereby generate:ast`.
Handwritten subtree-fact inheritance is discovered from `ast.go`, which is
therefore also a generator input. Forced regeneration must be deterministic.

The initial migration passed full validation with unchanged compiler baselines,
focused race/checkptr tests, 32-bit tests, and a WASI AST test compilation.
The CI receiver race needs its own regression and race-enabled smoke validation;
the initial focused arena tests did not exercise concurrent metadata copies.

Relevant commands:

```sh
go -C ./tsc test -race -gcflags=all=-d=checkptr=2 ./internal/ast ./internal/api/encoder
GOARCH=386 go -C ./tsc test ./internal/ast ./internal/parser -run 'TestArena|TestNodeAccessors|TestNodeFactory|TestASTArena'
npx hereby build --race
./built/local/tsc -p ./tsc/testdata/fixtures/compiler --noEmit --singleThreaded
./built/local/tsc -p ./tsc/testdata/fixtures/compiler --noEmit
npx hereby validate --all
```
