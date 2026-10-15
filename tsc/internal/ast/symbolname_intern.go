package ast

import (
	"sync"
	"sync/atomic"
)

// Symbol names are interned into a process-wide table and identified by a
// 32-bit ID; ID 0 is reserved for the unset name. Interned names are never
// freed. IDs contain no pointers, so nodes, symbol tables, and caches that
// hold them cost the garbage collector nothing to scan or write-barrier.
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

func (t *symbolNameTable) intern(text string) uint32 {
	return t.internHashed(text, hashSymbolNameText(text))
}

func (t *symbolNameTable) internHashed(text string, hash uint64) uint32 {
	shard := &t.shards[hash&(symbolNameShardCount-1)]
	if id := t.lookup(*shard.table.Load(), hash, text); id != 0 {
		return id
	}
	return t.insert(shard, hash, text)
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

// hashSymbolNameText is FNV-1a with a final mix. Names are short, so this
// inlines well and beats a general-purpose hash call.
func hashSymbolNameText(text string) uint64 {
	h := uint64(14695981039346656037)
	for i := range len(text) {
		h ^= uint64(text[i])
		h *= 1099511628211
	}
	h ^= h >> 32
	h *= 0x9E3779B97F4A7C15
	h ^= h >> 29
	return h
}
