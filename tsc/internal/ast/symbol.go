package ast

import (
	"hash/maphash"
	"iter"
	"maps"
	"slices"
	"strings"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// Symbol stores flags, checkFlags, and id uniquely for every symbol instance, but may share
// symbolData with other symbols. This is done so that instantiated symbols in the checker can
// all share the same underlying symbolData. Every Symbol needs its data field initialized either
// through SymbolWithData.Initialize or by explicitly setting it with Symbol.SetSymbolData.
type Symbol struct {
	flags      SymbolFlags
	checkFlags CheckFlags // Non-zero only in transient symbols created by Checker
	id         atomic.Uint64
	data       *symbolData
}

// Every symbol references a symbolData structure that may be shared with other symbols.
type symbolData struct {
	name             string
	declarations     []*Node
	valueDeclaration *Node
	parent           *Symbol
	extra            *symbolExtra
}

type symbolExtra struct {
	members      SymbolTable
	exports      SymbolTable
	exportSymbol *Symbol
}

// SymbolExtraArena batches optional symbol metadata without adding an allocator
// pointer to every symbol. References from symbolData keep its blocks alive.
type SymbolExtraArena struct {
	arena core.Arena[symbolExtra]
}

func (s *Symbol) Flags() SymbolFlags      { return s.flags }
func (s *Symbol) CheckFlags() CheckFlags  { return s.checkFlags }
func (s *Symbol) Name() string            { return s.data.name }
func (s *Symbol) Declarations() []*Node   { return s.data.declarations }
func (s *Symbol) ValueDeclaration() *Node { return s.data.valueDeclaration }
func (s *Symbol) Parent() *Symbol         { return s.data.parent }

func (s *Symbol) Members() SymbolTable {
	if s.data.extra == nil {
		return nil
	}
	return s.data.extra.members
}

func (s *Symbol) Exports() SymbolTable {
	if s.data.extra == nil {
		return nil
	}
	return s.data.extra.exports
}

func (s *Symbol) ExportSymbol() *Symbol {
	if s.data.extra == nil {
		return nil
	}
	return s.data.extra.exportSymbol
}

func (s *Symbol) SetFlags(value SymbolFlags)      { s.flags = value }
func (s *Symbol) SetCheckFlags(value CheckFlags)  { s.checkFlags = value }
func (s *Symbol) SetName(value string)            { s.data.name = value }
func (s *Symbol) SetDeclarations(value []*Node)   { s.data.declarations = value }
func (s *Symbol) SetValueDeclaration(value *Node) { s.data.valueDeclaration = value }
func (s *Symbol) SetParent(value *Symbol)         { s.data.parent = value }

func (s *Symbol) ensureExtra(arena *SymbolExtraArena) *symbolExtra {
	if s.data.extra == nil {
		s.data.extra = arena.arena.New()
	}
	return s.data.extra
}

func (s *Symbol) SetMembers(value SymbolTable, arena *SymbolExtraArena) {
	if value != nil || s.data.extra != nil {
		s.ensureExtra(arena).members = value
	}
}

func (s *Symbol) SetExports(value SymbolTable, arena *SymbolExtraArena) {
	if value != nil || s.data.extra != nil {
		s.ensureExtra(arena).exports = value
	}
}

func (s *Symbol) SetExportSymbol(value *Symbol, arena *SymbolExtraArena) {
	if value != nil || s.data.extra != nil {
		s.ensureExtra(arena).exportSymbol = value
	}
}

// SymbolWithData is a helper structure that contains both a Symbol and its associated symbolData.
type SymbolWithData struct {
	s Symbol
	d symbolData
}

// Initializes a SymbolWithData instance and returns the embedded Symbol.
func (sd *SymbolWithData) Initialize() *Symbol {
	sd.s.data = &sd.d
	return &sd.s
}

func NewSymbol() *Symbol {
	return (&SymbolWithData{}).Initialize()
}

// Initializes a Symbol's data field with the data from another Symbol. This allows multiple
// symbols to share the same underlying symbolData.
func (s *Symbol) SetSymbolData(other *Symbol) {
	s.data = other.data
}

// GetSourceFileOfSymbol returns the owning file of a published binder symbol, or
// nil for a non-file-owned symbol, even if it borrows declarations from a file.
// Ownership recovery walks only the first declaration's AST parents.
func GetSourceFileOfSymbol(symbol *Symbol) *SourceFile {
	debug.Assert(symbol != nil, "Expected a symbol")
	if symbol.Flags()&SymbolFlagsTransient != 0 {
		return nil
	}
	if len(symbol.Declarations()) == 0 {
		// A class's implicit prototype has no declaration of its own.
		debug.Assert(symbol.Flags()&SymbolFlagsPrototype != 0, "File-bound symbol has no declarations")
		debug.Assert(symbol.Parent() != nil && symbol.Parent().Flags()&SymbolFlagsClass != 0, "Prototype has no declaring class")
		symbol = symbol.Parent()
		debug.Assert(symbol.Flags()&SymbolFlagsTransient == 0, "Prototype parent is not file-bound")
		debug.Assert(len(symbol.Declarations()) != 0, "Prototype parent has no declarations")
	}
	file := GetSourceFileOfNode(symbol.Declarations()[0])
	debug.Assert(file != nil, "File-bound declaration has no source file")
	return file
}

func (s *Symbol) IsExternalModule() bool {
	return s.Flags()&SymbolFlagsModule != 0 && IsAmbientModuleSymbolName(s.Name())
}

func (s *Symbol) IsStatic() bool {
	if s.ValueDeclaration() == nil {
		return false
	}
	modifierFlags := s.ValueDeclaration().ModifierFlags()
	return modifierFlags&ModifierFlagsStatic != 0
}

// See comment on `declareModuleMember` in `binder.go`.
func (s *Symbol) CombinedLocalAndExportSymbolFlags() SymbolFlags {
	if s.ExportSymbol() != nil {
		return s.Flags() | s.ExportSymbol().Flags()
	}
	return s.Flags()
}

// SymbolTable
//
// A SymbolTable maps names to symbols and iterates in insertion order, like Strada's Map, so that iterating a table
// is deterministic and visits symbols in the order the binder and checker added them. A nil SymbolTable is an empty
// table that can be read and iterated but not written, like a nil map.
//
// The entries are kept in insertion order in one slice. Most tables are small, so a table is searched linearly until
// it has more than symbolTableLinearMax entries, and only then gets a hash index of entry positions. An entry does not
// store its key: the key is almost always the symbol's own name, so an entry holds the symbol and the key's length,
// which rejects most non-matching entries without reading the symbol. A key with other text than its symbol's name
// is kept in oddKeys. Because of that, a symbol's name must not change after the symbol is added to a table.
//
// This is not a collections.OrderedMap[string, *Symbol]: that stores every key in its key slice and again in its
// map, and gives every table a hash map, while symbol tables are numerous, long-lived and mostly tiny.
//
// A table must not be changed with Set or Delete while it is being iterated.
type SymbolTable = *SymbolMap

const symbolTableLinearMax = 16

type SymbolMap struct {
	entries []symbolMapEntry
	index   []int32 // open addressing table of entry positions plus one (0 is empty), only past symbolTableLinearMax
	oddKeys map[int32]string
}

var symbolTableSeed = maphash.MakeSeed()

type symbolMapEntry struct {
	symbol *Symbol
	keyLen int32
	oddKey bool
}

func NewSymbolTable(capacity int) SymbolTable {
	m := &SymbolMap{}
	if capacity > 0 {
		m.entries = make([]symbolMapEntry, 0, capacity)
		if capacity > symbolTableLinearMax {
			m.index = make([]int32, indexSizeFor(capacity))
		}
	}
	return m
}

// SymbolTableOf returns a new table holding symbol under name.
func SymbolTableOf(name string, symbol *Symbol) SymbolTable {
	m := NewSymbolTable(1)
	m.Set(name, symbol)
	return m
}

func (m *SymbolMap) keyAt(i int) string {
	if m.entries[i].oddKey {
		return m.oddKeys[int32(i)]
	}
	return m.entries[i].symbol.Name()
}

func (m *SymbolMap) find(key string) int {
	if m == nil {
		return -1
	}
	if m.index != nil {
		mask := uint64(len(m.index) - 1)
		for slot := maphash.String(symbolTableSeed, key) & mask; ; slot = (slot + 1) & mask {
			p := m.index[slot]
			if p == 0 {
				return -1
			}
			if i := int(p - 1); m.entries[i].keyLen == int32(len(key)) && m.keyAt(i) == key {
				return i
			}
		}
	}
	keyLen := int32(len(key))
	for i := range m.entries {
		if m.entries[i].keyLen == keyLen && m.keyAt(i) == key {
			return i
		}
	}
	return -1
}

func (m *SymbolMap) Len() int {
	if m == nil {
		return 0
	}
	return len(m.entries)
}

func (m *SymbolMap) Get(key string) *Symbol {
	if i := m.find(key); i >= 0 {
		return m.entries[i].symbol
	}
	return nil
}

func (m *SymbolMap) Lookup(key string) (*Symbol, bool) {
	if i := m.find(key); i >= 0 {
		return m.entries[i].symbol, true
	}
	return nil, false
}

// Set replaces the symbol of an existing key in place, keeping its position, or adds the key at the end.
func (m *SymbolMap) Set(key string, symbol *Symbol) {
	if i := m.find(key); i >= 0 {
		m.entries[i].symbol = symbol
		if !m.entries[i].oddKey && symbol.Name() != key {
			m.setOddKey(int32(i), key)
		}
		return
	}
	i := int32(len(m.entries))
	if cap(m.entries) == 0 {
		// Most tables hold one or two entries, so start with room for two rather than growing from one.
		m.entries = make([]symbolMapEntry, 0, 2)
	}
	m.entries = append(m.entries, symbolMapEntry{symbol: symbol, keyLen: int32(len(key))})
	if symbol.Name() != key {
		m.setOddKey(i, key)
	}
	if m.index != nil && len(m.entries)*4 <= len(m.index)*3 {
		m.insertIndex(key, i)
	} else if len(m.entries) > symbolTableLinearMax {
		m.buildIndex()
	}
}

func (m *SymbolMap) setOddKey(i int32, key string) {
	if m.oddKeys == nil {
		m.oddKeys = make(map[int32]string)
	}
	m.entries[i].oddKey = true
	m.oddKeys[i] = key
}

func indexSizeFor(n int) int {
	size := 32
	for size*3 < n*4 {
		size *= 2
	}
	return size
}

func (m *SymbolMap) insertIndex(key string, i int32) {
	mask := uint64(len(m.index) - 1)
	slot := maphash.String(symbolTableSeed, key) & mask
	for m.index[slot] != 0 {
		slot = (slot + 1) & mask
	}
	m.index[slot] = i + 1
}

func (m *SymbolMap) buildIndex() {
	m.index = make([]int32, indexSizeFor(len(m.entries)))
	for i := range m.entries {
		m.insertIndex(m.keyAt(i), int32(i))
	}
}

func (m *SymbolMap) Delete(key string) {
	d := m.find(key)
	if d < 0 {
		return
	}
	m.entries = slices.Delete(m.entries, d, d+1)
	if m.oddKeys != nil {
		var oddKeys map[int32]string
		for i, oddKey := range m.oddKeys {
			if i == int32(d) {
				continue
			}
			if i > int32(d) {
				i--
			}
			if oddKeys == nil {
				oddKeys = make(map[int32]string, len(m.oddKeys))
			}
			oddKeys[i] = oddKey
		}
		m.oddKeys = oddKeys
	}
	m.index = nil
	if len(m.entries) > symbolTableLinearMax {
		m.buildIndex()
	}
}

// All iterates over the keys and symbols of the table in insertion order.
func (m *SymbolMap) All() iter.Seq2[string, *Symbol] {
	return func(yield func(string, *Symbol) bool) {
		if m == nil {
			return
		}
		entries, oddKeys := m.entries, m.oddKeys
		for i := range entries {
			key := entries[i].symbol.Name()
			if entries[i].oddKey {
				key = oddKeys[int32(i)]
			}
			if !yield(key, entries[i].symbol) {
				return
			}
		}
	}
}

func (m *SymbolMap) Keys() iter.Seq[string] {
	return func(yield func(string) bool) {
		for key := range m.All() {
			if !yield(key) {
				return
			}
		}
	}
}

func (m *SymbolMap) Values() iter.Seq[*Symbol] {
	return func(yield func(*Symbol) bool) {
		for _, symbol := range m.All() {
			if !yield(symbol) {
				return
			}
		}
	}
}

func (m *SymbolMap) Clone() SymbolTable {
	if m == nil {
		return nil
	}
	clone := &SymbolMap{entries: slices.Clone(m.entries), index: slices.Clone(m.index), oddKeys: maps.Clone(m.oddKeys)}
	return clone
}

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

const (
	InternalSymbolNameCall                    = InternalSymbolNamePrefix + "call"                    // Call signatures
	InternalSymbolNameConstructor             = InternalSymbolNamePrefix + "constructor"             // Constructor implementations
	InternalSymbolNameNew                     = InternalSymbolNamePrefix + "new"                     // Constructor signatures
	InternalSymbolNameIndex                   = InternalSymbolNamePrefix + "index"                   // Index signatures
	InternalSymbolNameExportStar              = InternalSymbolNamePrefix + "export"                  // Module export * declarations
	InternalSymbolNameGlobal                  = InternalSymbolNamePrefix + "global"                  // Global self-reference
	InternalSymbolNameMissing                 = InternalSymbolNamePrefix + "missing"                 // Indicates missing symbol
	InternalSymbolNameType                    = InternalSymbolNamePrefix + "type"                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = InternalSymbolNamePrefix + "object"                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = InternalSymbolNamePrefix + "jsxAttributes"           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = InternalSymbolNamePrefix + "class"                   // Unnamed class expression
	InternalSymbolNameFunction                = InternalSymbolNamePrefix + "function"                // Unnamed function expression
	InternalSymbolNameComputed                = InternalSymbolNamePrefix + "computed"                // Computed property name declaration with dynamic name
	InternalSymbolNameAssignmentDeclaration   = InternalSymbolNamePrefix + "assignment"              // Assignment declarations
	InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression" // Instantiation expressions
	InternalSymbolNameImportAttributes        = InternalSymbolNamePrefix + "importAttributes"
	InternalSymbolNameExportEquals            = "export=" // Export assignment symbol
	InternalSymbolNameDefault                 = "default" // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = "this"
	InternalSymbolNameModuleExports           = "module.exports"
)

func SymbolName(symbol *Symbol) string {
	if symbol.ValueDeclaration() != nil && IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration()) {
		return symbol.ValueDeclaration().Name().Text()
	}
	return symbol.Name()
}

// EscapeAllInternalSymbolNames replaces internal symbol name markers ("\xFE") with "__".
func EscapeAllInternalSymbolNames(name string) string {
	return strings.ReplaceAll(name, InternalSymbolNamePrefix, "__")
}

func EscapeInternalSymbolName(name string) string {
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	return name
}

// EscapeSymbolName converts a binder symbol name into its escaped "__String"
// form. Internal names (prefixed with the "\xFE" sentinel) become "__"-prefixed,
// and user names that already begin with "__" gain an extra leading underscore
// so they can be distinguished from internal names.
func EscapeSymbolName(name string) string {
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	if len(name) >= 2 && name[0] == '_' && name[1] == '_' {
		return "_" + name
	}
	return name
}
