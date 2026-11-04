package incremental

import (
	"iter"
	"maps"
	"slices"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type referenceMap struct {
	references   collections.SyncMap[tspath.PathKey, *collections.Set[tspath.PathKey]]
	referencedBy map[tspath.PathKey]*collections.Set[tspath.PathKey]
	referenceBy  sync.Once
}

func (r *referenceMap) storeReferences(path tspath.PathKey, refs *collections.Set[tspath.PathKey]) {
	r.references.Store(path, refs)
}

func (r *referenceMap) getReferences(path tspath.PathKey) (*collections.Set[tspath.PathKey], bool) {
	refs, ok := r.references.Load(path)
	return refs, ok
}

func (r *referenceMap) getPathsWithReferences() []tspath.PathKey {
	return slices.Collect(r.references.Keys())
}

func (r *referenceMap) getReferencedBy(path tspath.PathKey) iter.Seq[tspath.PathKey] {
	r.referenceBy.Do(func() {
		r.referencedBy = make(map[tspath.PathKey]*collections.Set[tspath.PathKey])
		r.references.Range(func(key tspath.PathKey, value *collections.Set[tspath.PathKey]) bool {
			for ref := range value.Keys() {
				set, ok := r.referencedBy[ref]
				if !ok {
					set = &collections.Set[tspath.PathKey]{}
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
	return func(yield func(tspath.PathKey) bool) {}
}
