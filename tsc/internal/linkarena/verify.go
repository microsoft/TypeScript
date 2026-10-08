package linkarena

import (
	"fmt"
	"reflect"
	"slices"
	"strings"
	"sync"
	"sync/atomic"
	"unsafe"
)

// Verifying reports whether arenas record what Verify needs.
func Verifying() bool {
	return verifying
}

type verifyState struct {
	allocs []allocRecord
	// Address ranges of the kept objects, as integers so that they keep nothing alive.
	kept []addrRange
}

type allocRecord struct {
	addr  uintptr
	typ   reflect.Type
	count int
}

func (v *verifyState) record(p unsafe.Pointer, typ reflect.Type, count int) {
	v.allocs = append(v.allocs, allocRecord{addr: uintptr(p), typ: typ, count: count})
}

// A Violation is a link or pointer stored in arena memory whose target the arena does not
// keep alive.
type Violation struct {
	// Type of the allocation that holds the reference and the path of the field inside it.
	Type  reflect.Type
	Field string
	// Address of the allocation and the value found.
	Addr   uintptr
	Target uintptr
	// What is wrong with the target.
	Problem string
}

func (v Violation) String() string {
	return fmt.Sprintf("%v%s at %#x refers to %#x, %s", v.Type, v.Field, v.Addr, v.Target, v.Problem)
}

// FormatViolations renders violations one per line.
func FormatViolations(violations []Violation) string {
	var sb strings.Builder
	for _, v := range violations {
		sb.WriteString("\n  ")
		sb.WriteString(v.String())
	}
	return sb.String()
}

// Verify checks every reference stored in the arena's memory and reports at most limit
// violations. A link must be zero or refer to memory of this arena or of an arena it keeps
// alive. A pointer must be nil, point into such memory, point into an object registered
// with Keep, or point to static data. Verify reports nothing unless Verifying is true, and
// it only recognizes pointers to unregistered Go objects on systems where it can tell which
// addresses belong to the Go heap (see CanFindGoHeapPointers). It must not run while the
// arena is being allocated from.
func (a *Arena) Verify(limit int) []Violation {
	v := a.verify
	if v == nil {
		return nil
	}
	a.mu.Lock()
	kept := slices.Clone(v.kept)
	// Memory the arena keeps alive: its own chunks and those of the arenas it uses.
	reachable := slices.Clone(a.ranges)
	uses := make([]*Arena, 0, len(a.uses))
	for b := range a.uses {
		uses = append(uses, b)
	}
	a.mu.Unlock()
	for _, b := range uses {
		b.mu.Lock()
		reachable = append(reachable, b.ranges...)
		b.mu.Unlock()
	}
	slices.SortFunc(kept, compareRanges)
	slices.SortFunc(reachable, compareRanges)
	// The heap may have grown since the last call.
	heap := sysGoHeapRanges()
	slices.SortFunc(heap, compareRanges)

	var violations []Violation
	for _, alloc := range v.allocs {
		slots := referenceSlots(alloc.typ)
		if len(slots) == 0 {
			continue
		}
		size := alloc.typ.Size()
		for i := range alloc.count {
			elem := alloc.addr + uintptr(i)*size
			for _, slot := range slots {
				target, ok := slot.read(elem)
				if !ok || target == 0 {
					continue
				}
				var problem string
				switch {
				case slot.kind == slotLink:
					page := atomic.LoadUintptr(&pages[Link(target)>>offsetBits])
					if page == 0 {
						problem = "a link to a page that is not in use"
					} else if !inRanges(reachable, page) {
						problem = "a link into an arena that this one does not keep alive"
					}
				case !inRanges(reachable, target) && !inRanges(kept, target) && inRanges(heap, target):
					// Either an ordinary Go object or memory of another arena.
					problem = "a pointer to Go memory that this arena does not keep alive"
				}
				if problem == "" {
					continue
				}
				violations = append(violations, Violation{Type: alloc.typ, Field: slot.path, Addr: elem, Target: target, Problem: problem})
				if len(violations) >= limit {
					return violations
				}
			}
		}
	}
	return violations
}

// CanFindGoHeapPointers reports whether Verify can recognize pointers to Go memory that an
// arena does not keep alive.
func CanFindGoHeapPointers() bool {
	return len(sysGoHeapRanges()) > 0
}

type slotKind uint8

const (
	slotPointer slotKind = iota
	slotString
	slotSlice
	slotInterface
	slotLink
)

type referenceSlot struct {
	offset uintptr
	kind   slotKind
	path   string
}

// read returns the reference stored in the slot of the value at addr. ok is false when the
// slot holds no reference (an empty string or a slice without capacity).
func (s referenceSlot) read(addr uintptr) (target uintptr, ok bool) {
	p := *(*unsafe.Pointer)(unsafe.Pointer(&addr))
	p = unsafe.Add(p, s.offset)
	switch s.kind {
	case slotLink:
		return uintptr(*(*Link)(p)), true
	case slotString:
		words := (*[2]uintptr)(p)
		return words[0], words[1] != 0
	case slotSlice:
		words := (*[3]uintptr)(p)
		return words[0], words[2] != 0
	case slotInterface:
		return (*[2]uintptr)(p)[1], true
	}
	return *(*uintptr)(p), true
}

var (
	slotCache sync.Map // reflect.Type -> []referenceSlot
	linkType  = reflect.TypeFor[Link]()
)

func referenceSlots(t reflect.Type) []referenceSlot {
	if cached, ok := slotCache.Load(t); ok {
		return cached.([]referenceSlot)
	}
	slots := appendReferenceSlots(nil, t, 0, "")
	slotCache.Store(t, slots)
	return slots
}

func appendReferenceSlots(slots []referenceSlot, t reflect.Type, offset uintptr, path string) []referenceSlot {
	if t == linkType {
		return append(slots, referenceSlot{offset: offset, kind: slotLink, path: path})
	}
	switch t.Kind() {
	case reflect.Pointer, reflect.UnsafePointer, reflect.Map, reflect.Chan, reflect.Func:
		return append(slots, referenceSlot{offset: offset, kind: slotPointer, path: path})
	case reflect.String:
		return append(slots, referenceSlot{offset: offset, kind: slotString, path: path})
	case reflect.Slice:
		return append(slots, referenceSlot{offset: offset, kind: slotSlice, path: path})
	case reflect.Interface:
		return append(slots, referenceSlot{offset: offset, kind: slotInterface, path: path})
	case reflect.Struct:
		for f := range t.Fields() {
			slots = appendReferenceSlots(slots, f.Type, offset+f.Offset, path+"."+f.Name)
		}
	case reflect.Array:
		for i := range t.Len() {
			slots = appendReferenceSlots(slots, t.Elem(), offset+uintptr(i)*t.Elem().Size(), fmt.Sprintf("%s[%d]", path, i))
		}
	}
	return slots
}
