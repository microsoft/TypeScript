package ast

import (
	"reflect"
	"strconv"
	"testing"

	"gotest.tools/v3/assert"
)

// Records must hold no Go pointers, so the garbage collector can skip
// them; pointer-valued fields belong in the store's side tables.
func TestNodeRecordsArePointerFree(t *testing.T) {
	t.Parallel()
	for layout := nodeLayout(1); layout < layoutCount; layout++ {
		if pinnedLayout(layout) {
			continue
		}
		typ := reflect.TypeOf(layoutRecord(layout))
		assert.Assert(t, typ != nil, "layout %d has no record type", layout)
		if path := findPointer(typ, typ.Name()); path != "" {
			t.Errorf("record field %s holds a pointer", path)
		}
	}
}

func findPointer(typ reflect.Type, path string) string {
	switch typ.Kind() {
	case reflect.Struct:
		for field := range typ.Fields() {
			if p := findPointer(field.Type, path+"."+field.Name); p != "" {
				return p
			}
		}
	case reflect.Array:
		return findPointer(typ.Elem(), path+"[]")
	case reflect.Pointer, reflect.String, reflect.Slice, reflect.Map, reflect.Interface, reflect.Func, reflect.Chan, reflect.UnsafePointer:
		return path + " (" + typ.String() + ")"
	}
	return ""
}

func TestNodeStoreCompaction(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	var before []Node
	for i := range 100 {
		before = append(before, factory.NewExpressionStatement(factory.NewIdentifier(strconv.Itoa(i))))
	}
	factory.CompactStore()
	var after []Node
	for i := range 100 {
		after = append(after, factory.NewExpressionStatement(factory.NewIdentifier(strconv.Itoa(100+i))))
	}
	for i, node := range append(before, after...) {
		assert.Equal(t, node.Expression().Text(), strconv.Itoa(i))
	}
	store := factory.store
	assert.Equal(t, store.flat[layoutIdentifier].n, uint32(100))
	assert.Equal(t, store.records[layoutIdentifier].n, uint32(100))

	store.compactSide()
	before[0].Expression().AsIdentifier().SetText("renamed")
	assert.Equal(t, before[0].Expression().Text(), "renamed")
	assert.Equal(t, after[99].Expression().Text(), "199")
}

func TestNodeSideTableZeroValues(t *testing.T) {
	t.Parallel()
	factory := NewNodeFactory(NodeFactoryHooks{})
	node := factory.NewBlock(nil, false)
	assert.Equal(t, factory.store.nodeLists.tail.n, uint32(0))
	assert.Assert(t, node.AsBlock().Locals() == nil)

	locals := SymbolTable{}
	node.AsBlock().SetLocals(locals)
	assert.Assert(t, node.AsBlock().Locals() != nil)
	node.AsBlock().SetLocals(nil)
	assert.Assert(t, node.AsBlock().Locals() == nil)
	assert.Equal(t, factory.store.symbolTables.tail.n, uint32(1))
}
