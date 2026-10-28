package ast

import (
	"sync"
	"sync/atomic"
)

// Symbol names are interned into a process-wide table and identified by an
// ID; ID 0 is the empty name, and the fixed names generated in
// symbolnames_generated.go take the IDs after it. Interned names are never
// freed. Names synthesized from symbol and node IDs are not interned; see
// symbolname_derived.go. IDs contain no pointers, so nodes, symbol tables, and
// caches that hold them cost the garbage collector nothing to scan.
//
// Texts are stored in fixed-size chunks so an ID's text never moves. Lookups
// are lock-free: each shard publishes an open-addressing table whose slots
// pack a 32-bit hash with an ID. Inserts take the shard lock and may publish
// a larger table; a reader racing with growth may miss and then retry under
// the lock.
const (
	symbolNameShardBits    = 6
	symbolNameShardCount   = 1 << symbolNameShardBits
	symbolNameInitialSlots = 256
	symbolNameChunkBits    = 12
	symbolNameChunkSize    = 1 << symbolNameChunkBits
	symbolNameMaxChunks    = 1 << 14
)

type symbolNameChunk [symbolNameChunkSize]string

type symbolNameShard struct {
	table atomic.Pointer[[]atomic.Uint64]
	mu    sync.Mutex
	count int
	_     [64]byte
}

type symbolNameTable struct {
	shards [symbolNameShardCount]symbolNameShard
	nextID atomic.Uint32
	chunks [symbolNameMaxChunks]atomic.Pointer[symbolNameChunk]
}

var symbolNames = newSymbolNameTable()

func newSymbolNameTable() *symbolNameTable {
	t := &symbolNameTable{}
	for i := range t.shards {
		slots := make([]atomic.Uint64, symbolNameInitialSlots)
		t.shards[i].table.Store(&slots)
	}
	for want := SymbolName(1); want < SymbolName(len(fixedSymbolNameTexts)); want++ {
		text := fixedSymbolNameTexts[want]
		if text == "" {
			panic("fixed symbol name has no text")
		}
		if _, _, _, ok := splitDerivedName(text); ok {
			panic("fixed symbol name has a derived form: " + text)
		}
		hash := hashSymbolNameText(text)
		if id := t.insert(&t.shards[hash&(symbolNameShardCount-1)], hash, text); SymbolName(id) != want {
			panic("duplicate fixed symbol name: " + text)
		}
	}
	return t
}

func (t *symbolNameTable) text(id uint32) string {
	return t.chunks[id>>symbolNameChunkBits].Load()[id&(symbolNameChunkSize-1)]
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
	shard := &t.shards[hash&(symbolNameShardCount-1)]
	if id := t.lookup(*shard.table.Load(), hash, text); id != 0 {
		return internedSymbolName(id, text)
	}
	if name, ok := parseDerivedName(text); ok {
		return name
	}
	return internedSymbolName(t.insert(shard, hash, text), text)
}

func (t *symbolNameTable) insert(shard *symbolNameShard, hash uint64, text string) uint32 {
	shard.mu.Lock()
	defer shard.mu.Unlock()
	slots := *shard.table.Load()
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
		shard.table.Store(&grown)
		slots = grown
	}
	id := t.allocate(string([]byte(text)))
	storeSymbolNameSlot(slots, hash, hash>>32<<32|uint64(id))
	shard.count++
	return id
}

func (t *symbolNameTable) hashOf(id uint32) uint64 {
	return hashSymbolNameText(t.text(id))
}

func (t *symbolNameTable) allocate(text string) uint32 {
	id := t.nextID.Add(1)
	if id >= symbolNameMaxChunks*symbolNameChunkSize-1 {
		panic("too many symbol names")
	}
	chunkSlot := &t.chunks[id>>symbolNameChunkBits]
	chunk := chunkSlot.Load()
	if chunk == nil {
		chunk = new(symbolNameChunk)
		if !chunkSlot.CompareAndSwap(nil, chunk) {
			chunk = chunkSlot.Load()
		}
	}
	chunk[id&(symbolNameChunkSize-1)] = text
	return id
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
