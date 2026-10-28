package ast

import (
	"sync"
	"sync/atomic"
	"unsafe"
)

// Symbol names are interned into a process-wide table and identified by an
// ID; ID 0 is the empty name, and the fixed names generated in
// symbolnames_generated.go are inserted next. Interned names are never freed.
// Names synthesized from symbol and node IDs are not interned; see
// symbolname_derived.go. IDs contain no pointers, so nodes, symbol tables, and
// caches that hold them cost the garbage collector nothing to scan.
//
// Texts are stored in a pointer-free arena as records of a 4-byte length
// followed by the text, aligned to 8-byte units, and an ID is its record's
// offset in units. Looking up an ID's text is then a single dependent load,
// which matters because every intern hit compares texts. The arena is split
// into fixed-size chunks so records never move, found through a two-level
// directory whose small top level stays in cache. Each shard appends records to
// its own chunk, so inserts into different shards don't contend; a record
// longer than a quarter chunk gets its own run of contiguous chunks.
//
// Lookups are lock-free: each shard publishes an open-addressing table whose
// slots pack a 32-bit hash with an ID. Inserts take the shard lock and may
// publish a larger table; a reader racing with growth may miss and then retry
// under the lock.
const (
	symbolNameShardBits    = 6
	symbolNameShardCount   = 1 << symbolNameShardBits
	symbolNameInitialSlots = 256

	symbolNameUnitBytes     = 8
	symbolNameRecordHeader  = 4
	symbolNameChunkUnitBits = 11
	symbolNameChunkUnits    = 1 << symbolNameChunkUnitBits
	symbolNameChunkBytes    = symbolNameChunkUnits * symbolNameUnitBytes
	symbolNameDirBits       = 11
	symbolNameDirSize       = 1 << symbolNameDirBits
	symbolNameMaxUnits      = 1 << derivedNameNumShift
	// The last chunk is left unused so unit offsets never overflow a uint32.
	symbolNameMaxChunks = symbolNameMaxUnits/symbolNameChunkUnits - 1
)

type symbolNameChunk [symbolNameChunkBytes]byte

type symbolNameDir [symbolNameDirSize]atomic.Pointer[symbolNameChunk]

// Lookups only read tables and chunks; inserts write the shard locks, counts,
// and the arena cursor. Keeping the two groups on separate cache lines stops
// inserts on one core from evicting lines that lookups on every other core
// need. The table is one large allocation, so it starts on a page boundary.
type symbolNameTable struct {
	tables    [symbolNameShardCount]atomic.Pointer[[]atomic.Uint64]
	dirs      [(symbolNameMaxChunks + symbolNameDirSize) / symbolNameDirSize]atomic.Pointer[symbolNameDir]
	nextChunk atomic.Uint32
	_         [60]byte
	shards    [symbolNameShardCount]symbolNameShard
}

type symbolNameShard struct {
	mu    sync.Mutex
	count int
	arena symbolNameArena
	_     [40]byte
}

// symbolNameArena is a bump allocator over the units of the current chunk.
type symbolNameArena struct {
	next, end uint32
}

var symbolNames = newSymbolNameTable()

func newSymbolNameTable() *symbolNameTable {
	t := &symbolNameTable{}
	for i := range t.tables {
		slots := make([]atomic.Uint64, symbolNameInitialSlots)
		t.tables[i].Store(&slots)
	}
	// The empty name's record is the zeroed first unit, and the fixed names
	// follow it in order.
	fixedArena := &symbolNameArena{}
	t.newChunks(fixedArena, 1)
	fixedArena.next = 1
	for _, fixed := range fixedSymbolNames {
		if fixed.text == "" {
			panic("fixed symbol name has no text")
		}
		if _, _, _, ok := splitDerivedName(fixed.text); ok {
			panic("fixed symbol name has a derived form: " + fixed.text)
		}
		if id := t.insert(hashSymbolNameText(fixed.text), fixed.text, fixedArena); id != fixed.id {
			panic("fixed symbol name has the wrong ID: " + fixed.text)
		}
	}
	return t
}

func (t *symbolNameTable) chunk(index uint32) *symbolNameChunk {
	return t.dirs[index>>symbolNameDirBits].Load()[index&(symbolNameDirSize-1)].Load()
}

func (t *symbolNameTable) text(id uint32) string {
	chunk := t.chunk(id >> symbolNameChunkUnitBits)
	record := unsafe.Pointer(&chunk[(id&(symbolNameChunkUnits-1))*symbolNameUnitBytes])
	return unsafe.String((*byte)(unsafe.Add(record, symbolNameRecordHeader)), *(*uint32)(record))
}

func (t *symbolNameTable) lookup(slots []atomic.Uint64, hash uint64, text string) uint32 {
	mask := uint64(len(slots) - 1)
	tag := hash >> 32
	for i := (hash >> symbolNameShardBits) & mask; ; i = (i + 1) & mask {
		v := slots[i].Load()
		if v == 0 {
			return 0
		}
		if v>>32 == tag {
			if id := uint32(v); t.text(id) == text {
				return id
			}
		}
	}
}

// make returns the name for text. Text with a derived form is never interned,
// so a lookup hit is always the canonical name. The empty name is ID 0, which
// the hash table uses for empty slots, so it is never inserted either.
func (t *symbolNameTable) make(text string, hash uint64) SymbolName {
	if text == "" {
		return EmptySymbolName
	}
	if id := t.lookup(*t.tables[hash&(symbolNameShardCount-1)].Load(), hash, text); id != 0 {
		return internedSymbolName(id, text)
	}
	if name, ok := parseDerivedName(text); ok {
		return name
	}
	return internedSymbolName(t.insert(hash, text, nil), text)
}

// insert appends new texts to arena, or to the shard's arena if nil.
func (t *symbolNameTable) insert(hash uint64, text string, arena *symbolNameArena) uint32 {
	table := &t.tables[hash&(symbolNameShardCount-1)]
	shard := &t.shards[hash&(symbolNameShardCount-1)]
	shard.mu.Lock()
	defer shard.mu.Unlock()
	slots := *table.Load()
	if id := t.lookup(slots, hash, text); id != 0 {
		return id
	}
	if (shard.count+1)*4 > len(slots)*3 {
		grown := make([]atomic.Uint64, len(slots)*2)
		for i := range slots {
			if v := slots[i].Load(); v != 0 {
				storeSymbolNameSlot(grown, t.hashOf(uint32(v)), v)
			}
		}
		table.Store(&grown)
		slots = grown
	}
	if arena == nil {
		arena = &shard.arena
	}
	id := t.allocate(arena, text)
	storeSymbolNameSlot(slots, hash, hash>>32<<32|uint64(id))
	shard.count++
	return id
}

func (t *symbolNameTable) hashOf(id uint32) uint64 {
	return hashSymbolNameText(t.text(id))
}

func (t *symbolNameTable) allocate(arena *symbolNameArena, text string) uint32 {
	if len(text) > 1<<30 {
		panic("symbol name too long")
	}
	units := uint32((symbolNameRecordHeader + len(text) + symbolNameUnitBytes - 1) / symbolNameUnitBytes)
	var id uint32
	switch {
	case units > symbolNameChunkUnits/4:
		var own symbolNameArena
		id = t.newChunks(&own, (units+symbolNameChunkUnits-1)/symbolNameChunkUnits)
	case arena.next+units > arena.end:
		id = t.newChunks(arena, 1)
		arena.next = id + units
	default:
		id = arena.next
		arena.next += units
	}
	chunk := t.chunk(id >> symbolNameChunkUnitBits)
	record := unsafe.Pointer(&chunk[(id&(symbolNameChunkUnits-1))*symbolNameUnitBytes])
	*(*uint32)(record) = uint32(len(text))
	copy(unsafe.Slice((*byte)(unsafe.Add(record, symbolNameRecordHeader)), len(text)), text)
	return id
}

// newChunks points arena at a new run of count contiguous chunks and returns
// the run's first unit.
func (t *symbolNameTable) newChunks(arena *symbolNameArena, count uint32) uint32 {
	first := t.nextChunk.Add(count) - count
	if uint64(first)+uint64(count) > symbolNameMaxChunks {
		panic("too many symbol names")
	}
	run := make([]symbolNameChunk, count)
	for i := range run {
		index := first + uint32(i)
		dir := t.dirs[index>>symbolNameDirBits].Load()
		if dir == nil {
			dir = new(symbolNameDir)
			if !t.dirs[index>>symbolNameDirBits].CompareAndSwap(nil, dir) {
				dir = t.dirs[index>>symbolNameDirBits].Load()
			}
		}
		dir[index&(symbolNameDirSize-1)].Store(&run[i])
	}
	arena.next = first << symbolNameChunkUnitBits
	arena.end = arena.next + count<<symbolNameChunkUnitBits
	return arena.next
}

func storeSymbolNameSlot(slots []atomic.Uint64, hash uint64, v uint64) {
	mask := uint64(len(slots) - 1)
	for i := (hash >> symbolNameShardBits) & mask; ; i = (i + 1) & mask {
		if slots[i].Load() == 0 {
			slots[i].Store(v)
			return
		}
	}
}

// SymbolNameCache is a small direct-mapped cache in front of the global intern
// table, for callers like the parser that intern many repeated names. It holds
// no pointers, so updating it needs no write barriers.
type SymbolNameCache struct {
	slots [symbolNameCacheSize]symbolNameCacheSlot
}

type symbolNameCacheSlot struct {
	hash uint32
	id   uint32
}

const symbolNameCacheSize = 4096

func (c *SymbolNameCache) Make(text string) SymbolName {
	return c.MakeHashed(text, hashSymbolNameText(text))
}

// MakeHashed is Make for callers that already computed the name's hash with
// SymbolNameHashSeed, SymbolNameHashAdd, and SymbolNameHashFinish.
func (c *SymbolNameCache) MakeHashed(text string, hash uint64) SymbolName {
	slot := &c.slots[hash&(symbolNameCacheSize-1)]
	if slot.id != 0 && slot.hash == uint32(hash>>32) && symbolNames.text(slot.id) == text {
		return SymbolName(slot.id)
	}
	name := symbolNames.make(text, hash)
	// Only untagged names, whose value is their ID, are cached.
	if name.derivedKind() == derivedNamePlain {
		*slot = symbolNameCacheSlot{hash: uint32(hash >> 32), id: uint32(name)}
	}
	return name
}

// Symbol name hashes are FNV-1a with a final mix. The incremental form lets
// the scanner hash identifiers while it scans them.
const SymbolNameHashSeed uint64 = 14695981039346656037

func SymbolNameHashAdd(h uint64, b byte) uint64 {
	return (h ^ uint64(b)) * 1099511628211
}

func SymbolNameHashFinish(h uint64) uint64 {
	h ^= h >> 32
	h *= 0x9E3779B97F4A7C15
	h ^= h >> 29
	return h
}

func hashSymbolNameText(text string) uint64 {
	h := SymbolNameHashSeed
	for i := range len(text) {
		h = SymbolNameHashAdd(h, text[i])
	}
	return SymbolNameHashFinish(h)
}
