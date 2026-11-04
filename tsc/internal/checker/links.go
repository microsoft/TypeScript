package checker

import (
	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
)

// When possible, nodeLinkStore and symbolLinkStore store Node and Symbol links in an efficient and densely
// packed paged array store. When a Node or Symbol has not yet been assigned an ID, the store provides one
// from a generator that produces sequences of IDs in a reserved range of the ID space. The generator grabs
// chunks of 256 IDs from a central atomic counter, ensuring that each block of 256 IDs is consecutive and
// causing Node or Symbol links to be densely packed within a single page.

const maxPageLinkCount = 0x100_0000 // 16M

type nodeLinkStore[V any] struct {
	gen   ast.NodeIdGenerator
	links core.LinkStore[uint64, V]
	pages core.PagedLinkStore[V]
}

func (s *nodeLinkStore[V]) Get(node *ast.Node) *V {
	id := uint64(s.gen.GetNodeId(node))
	if id >= ast.BlockIdOffset && id < ast.BlockIdOffset+maxPageLinkCount {
		return s.pages.Get(id - ast.BlockIdOffset)
	}
	return s.links.Get(id)
}

func (s *nodeLinkStore[V]) Has(node *ast.Node) bool {
	return s.TryGet(node) != nil
}

func (s *nodeLinkStore[V]) TryGet(node *ast.Node) *V {
	id := uint64(s.gen.GetNodeId(node))
	if id >= ast.BlockIdOffset && id < ast.BlockIdOffset+maxPageLinkCount {
		return s.pages.TryGet(id - ast.BlockIdOffset)
	}
	return s.links.TryGet(id)
}

type symbolLinkStore[V any] struct {
	gen   ast.SymbolIdGenerator
	links core.LinkStore[uint64, V]
	pages core.PagedLinkStore[V]
}

func (s *symbolLinkStore[V]) Get(symbol *ast.Symbol) *V {
	id := uint64(s.gen.GetSymbolId(symbol))
	if id >= ast.BlockIdOffset && id < ast.BlockIdOffset+maxPageLinkCount {
		return s.pages.Get(id - ast.BlockIdOffset)
	}
	return s.links.Get(id)
}

func (s *symbolLinkStore[V]) Has(symbol *ast.Symbol) bool {
	return s.TryGet(symbol) != nil
}

func (s *symbolLinkStore[V]) TryGet(symbol *ast.Symbol) *V {
	id := uint64(s.gen.GetSymbolId(symbol))
	if id >= ast.BlockIdOffset && id < ast.BlockIdOffset+maxPageLinkCount {
		return s.pages.TryGet(id - ast.BlockIdOffset)
	}
	return s.links.TryGet(id)
}
