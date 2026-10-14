package checker

import (
	"fmt"
	"maps"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// When set, every class or interface type whose members are resolved through a member layout is
// checked against members resolved eagerly from the same declared members, mapper and base types,
// as they were before member layouts. The check runs after each source file is checked, so that
// it doesn't change the order in which types are resolved during checking.
const verifyMemberLayouts = true

type memberLayoutVerification struct {
	t               *Type
	declaredMembers ast.SymbolTable // The declared members when resolved, which can be partial during late binding
	lazy            *lazyMembers
}

func (c *Checker) recordMemberLayoutVerification(t *Type, source *Type) {
	c.memberLayoutVerifications = append(c.memberLayoutVerifications, memberLayoutVerification{t: t, declaredMembers: source.AsInterfaceType().declaredMembers, lazy: t.AsStructuredType().lazy})
}

func (c *Checker) verifyMemberLayouts() {
	// Verification can resolve more types, which records them to be verified too.
	for len(c.memberLayoutVerifications) != 0 {
		pending := c.memberLayoutVerifications
		c.memberLayoutVerifications = nil
		for _, v := range pending {
			c.verifyMemberLayout(v)
		}
	}
}

func (c *Checker) verifyMemberLayout(v memberLayoutVerification) {
	fail := func(format string, args ...any) {
		debug.Fail(fmt.Sprintf("Member layout of %s doesn't match its eager members: %s", c.TypeToString(v.t), fmt.Sprintf(format, args...)))
	}
	l := v.lazy
	if v.t.AsStructuredType().lazy != l {
		// Members resolved again during a circular resolution replace these, and are verified separately.
		return
	}
	var members ast.SymbolTable
	if l.mapper == nil {
		members = maps.Clone(v.declaredMembers)
	} else {
		members = c.instantiateSymbolTable(v.declaredMembers, l.mapper)
	}
	for _, base := range l.bases {
		members = c.addInheritedMembers(members, c.getPropertiesOfType(base))
	}
	eager := c.getNamedMembers(members, v.t.symbol)
	properties := c.getLazyProperties(l)
	if len(eager) != len(properties) {
		fail("%d properties, expected %d", len(properties), len(eager))
	}
	for i, e := range eager {
		p := properties[i]
		if p.Name() != e.Name() {
			fail("property %d is %q, expected %q", i, p.Name(), e.Name())
		}
		// Instantiation can return either the original or a new symbol depending on what was resolved
		// first, so instantiated symbols are compared by their flags and declarations.
		if p != e && !sameMemberSymbol(p, e) {
			fail("property %q has a different symbol", e.Name())
		}
	}
	table := c.getLazyMemberTable(l)
	if len(table) != len(members) {
		fail("%d members, expected %d", len(table), len(members))
	}
	for key, e := range members {
		p, ok := table[key]
		if !ok {
			fail("member %q is missing", key)
		}
		if p.Name() != e.Name() || !sameMemberSymbol(p, e) {
			fail("member %q has a different symbol", key)
		}
		if c.getLazyMemberByName(l, key) != p {
			fail("member %q is found by name as a different symbol", key)
		}
	}
}

func sameMemberSymbol(a *ast.Symbol, b *ast.Symbol) bool {
	return a.Flags()&^ast.SymbolFlagsTransient == b.Flags()&^ast.SymbolFlagsTransient && a.ValueDeclaration() == b.ValueDeclaration() && len(a.Declarations()) == len(b.Declarations())
}

func (c *Checker) verifyMemberLayoutSlot(l *lazyMembers, i int, base *lazyMembers, slot int) {
	if slot >= len(base.layout.symbols) || base.layout.key(slot) != l.layout.key(i) {
		debug.Fail(fmt.Sprintf("Member layout slot of %q in its base doesn't have the same key", l.layout.key(i)))
	}
}
