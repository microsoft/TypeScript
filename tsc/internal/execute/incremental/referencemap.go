package incremental

import (
	"iter"
	"maps"
	"slices"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/tspath"
)

type referenceMap struct {
	references   collections.SyncMap[tspath.Path, *collections.Set[tspath.Path]]
	referencedBy map[tspath.Path]*collections.Set[tspath.Path]
	referenceBy  sync.Once
}

func (r *referenceMap) storeReferences(path tspath.Path, refs *collections.Set[tspath.Path]) {
	r.references.Store(path, refs)
}

func (r *referenceMap) getReferences(path tspath.Path) (*collections.Set[tspath.Path], bool) {
	refs, ok := r.references.Load(path)
	return refs, ok
}

func (r *referenceMap) getPathsWithReferences() []tspath.Path {
	return slices.Collect(r.references.Keys())
}

func (r *referenceMap) getReferencedBy(path tspath.Path) iter.Seq[tspath.Path] {
	r.referenceBy.Do(func() {
		r.referencedBy = make(map[tspath.Path]*collections.Set[tspath.Path])
		r.references.Range(func(key tspath.Path, value *collections.Set[tspath.Path]) bool {
			for ref := range value.Keys() {
				set, ok := r.referencedBy[ref]
				if !ok {
					set = &collections.Set[tspath.Path]{}
					r.referencedBy[ref] = set
				}
				set.Add(key)
			}
			return true
		})
	})
	refs, ok := r.referencedBy[path]
	if ok {
		return maps.Keys(refs.Keys())
	}
	return func(yield func(tspath.Path) bool) {}
}
