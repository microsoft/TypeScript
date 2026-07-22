package checker

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
)

// nodeLinkStore is a links store keyed by node references. Values are stored directly
// in the pages of the store which is suitable for values where sizeof(V) is small.
type nodeLinkStore[V any] struct {
	store core.PagedLinkStore[V]
}

func (s *nodeLinkStore[V]) Get(node *ast.Node) *V {
	return s.store.Get(uint64(ast.GetNodeId(node)))
}

func (s *nodeLinkStore[V]) Has(node *ast.Node) bool {
	return s.store.Has(uint64(ast.GetNodeId(node)))
}

func (s *nodeLinkStore[V]) TryGet(node *ast.Node) *V {
	return s.store.TryGet(uint64(ast.GetNodeId(node)))
}

// symbolArenaLinkStore is a links store keyed by symbol references. Values are stored
// indirectly in an arena which is suitable for values where sizeof(V) is larger.
type symbolArenaLinkStore[V any] struct {
	store core.PagedLinkStore[*V]
	arena core.Arena[V]
}

func (s *symbolArenaLinkStore[V]) Get(symbol *ast.Symbol) *V {
	link := s.store.Get(uint64(ast.GetSymbolId(symbol)))
	if *link == nil {
		*link = s.arena.New()
	}
	return *link
}

func (s *symbolArenaLinkStore[V]) Has(symbol *ast.Symbol) bool {
	return s.TryGet(symbol) != nil
}

func (s *symbolArenaLinkStore[V]) TryGet(symbol *ast.Symbol) *V {
	if link := s.store.TryGet(uint64(ast.GetSymbolId(symbol))); link != nil {
		return *link
	}
	return nil
}
