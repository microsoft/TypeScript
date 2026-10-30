package ast

import (
	"encoding/binary"
	"strconv"
	"strings"
)

// Some names are synthesized by combining a base name with a symbol, node, or
// generated-name ID, such as private names, unique symbol property names, and
// placeholder text for generated identifiers. Every such ID is distinct, so
// interning them would grow the table without bound in a long-lived process.
// Instead, a derived name packs its kind, ID, and the interned base name into
// the SymbolName itself and renders its text on demand:
//
//	bits 61-63: kind (0 for plain interned names)
//	bits 32-60: number
//	bits  0-31: interned ID of the base text (always an interned name)
//
// Names must be equal exactly when their texts are equal, so MakeSymbolName
// parses text that has a derived form into that form and never interns it.
// Text that only fails to fit (an oversized number, or a base that is itself
// derived) is interned instead.
//
// Interned text that starts with InternalSymbolNamePrefix, such as
// InternalSymbolNameCall, is tagged with its own kind, and its number holds
// the byte after the prefix plus one (zero if there is none). So whether a
// name is internal, and which sort, never requires looking at its text.
type derivedNameKind uint8

const (
	derivedNamePlain          derivedNameKind = iota
	derivedNamePrivate                        // "\xFE#" number "@" base
	derivedNameUniqueESSymbol                 // "\xFE@" base "@" number
	derivedNameModulePattern                  // "\xFE\"" base "\"pattern@" number
	derivedNameAuto                           // prefix "(auto@" number ")" suffix
	derivedNameGenerated                      // prefix "(generated@" number ")" suffix
	derivedNameInternal                       // "\xFE" base, interned; number is base[1]+1
)

const (
	derivedNameKindShift = 61
	derivedNameNumShift  = 32
	derivedNameNumMax    = 1<<(derivedNameKindShift-derivedNameNumShift) - 1
	derivedNameBaseMask  = 1<<derivedNameNumShift - 1
)

// Fails to compile if the kinds outgrow their bits.
const _ = uint(1<<(64-derivedNameKindShift) - 1 - derivedNameInternal)

// internalSymbolNameBits and internalMarkerShift build fixed internal names;
// see internedSymbolName.
const (
	internalSymbolNameBits SymbolName = SymbolName(derivedNameInternal) << derivedNameKindShift
	internalMarkerShift               = derivedNameNumShift
)

// internedSymbolName returns the name of text interned with the given ID.
func internedSymbolName(id uint32, text string) SymbolName {
	rest, ok := strings.CutPrefix(text, InternalSymbolNamePrefix)
	if !ok {
		return SymbolName(id)
	}
	var marker SymbolName
	if rest != "" {
		marker = SymbolName(rest[0]) + 1
	}
	return SymbolName(id) | internalSymbolNameBits | marker<<internalMarkerShift
}

// isInterned reports whether the name's text is in the intern table.
func (name SymbolName) isInterned() bool {
	kind := name.derivedKind()
	return kind == derivedNamePlain || kind == derivedNameInternal
}

const modulePatternMarker = "\"pattern@"

func (name SymbolName) derivedKind() derivedNameKind {
	return derivedNameKind(name >> derivedNameKindShift)
}

func (name SymbolName) derivedNum() uint64 {
	return uint64(name) >> derivedNameNumShift & derivedNameNumMax
}

func (name SymbolName) derivedBase() string {
	return symbolNames.text(uint32(name & derivedNameBaseMask))
}

func encodeDerivedName(kind derivedNameKind, num uint64, base string) (SymbolName, bool) {
	if num > derivedNameNumMax {
		return 0, false
	}
	baseName := MakeSymbolName(base)
	if !baseName.isInterned() {
		return 0, false
	}
	return SymbolName(uint64(kind)<<derivedNameKindShift | num<<derivedNameNumShift | uint64(baseName&derivedNameBaseMask)), true
}

// MakePrivateSymbolName returns the name of private identifier description in
// the class with the given symbol ID.
func MakePrivateSymbolName(classSymbolId SymbolId, description string) SymbolName {
	if name, ok := encodeDerivedName(derivedNamePrivate, uint64(classSymbolId), description); ok {
		return name
	}
	return MakeSymbolName(InternalSymbolNamePrefix + "#" + strconv.FormatUint(uint64(classSymbolId), 10) + "@" + description)
}

// MakeUniqueESSymbolName returns the property name of a unique symbol declared
// by the symbol with the given name and ID.
func MakeUniqueESSymbolName(symbolName SymbolName, symbolId SymbolId) SymbolName {
	if symbolName.isInterned() {
		if name, ok := encodeDerivedName(derivedNameUniqueESSymbol, uint64(symbolId), symbolName.String()); ok {
			return name
		}
	}
	return MakeSymbolName(InternalSymbolNamePrefix + "@" + symbolName.String() + "@" + strconv.FormatUint(uint64(symbolId), 10))
}

// MakeModulePatternSymbolName returns the name of a pattern ambient module
// declaration whose attributes node has the given ID.
func MakeModulePatternSymbolName(moduleName string, nodeId NodeId) SymbolName {
	if name, ok := encodeDerivedName(derivedNameModulePattern, uint64(nodeId), moduleName); ok {
		return name
	}
	return MakeSymbolName(InternalSymbolNamePrefix + "\"" + moduleName + modulePatternMarker + strconv.FormatUint(uint64(nodeId), 10))
}

// MakeGeneratedSymbolName returns the placeholder name of a generated
// identifier: prefix + "(auto@id)" + suffix, or prefix + "(generated@id)" +
// suffix when forNode is set.
func MakeGeneratedSymbolName(prefix string, forNode bool, id uint64, suffix string) SymbolName {
	kind, marker := derivedNameAuto, "(auto@"
	if forNode {
		kind, marker = derivedNameGenerated, "(generated@"
	}
	// A prefix containing a placeholder or starting with
	// InternalSymbolNamePrefix would be parsed differently; let MakeSymbolName
	// handle it.
	if _, _, _, _, found := findGeneratedPlaceholder(prefix); !found && !strings.HasPrefix(prefix, InternalSymbolNamePrefix) {
		if name, ok := encodeDerivedName(kind, id, generatedAffixes(prefix, suffix)); ok {
			return name
		}
	}
	return MakeSymbolName(prefix + marker + strconv.FormatUint(id, 10) + ")" + suffix)
}

// generatedAffixes packs a generated name's prefix and suffix into one base.
func generatedAffixes(prefix string, suffix string) string {
	if len(prefix) == 0 && len(suffix) == 0 {
		return ""
	}
	var b strings.Builder
	b.Grow(binary.MaxVarintLen64 + len(prefix) + len(suffix))
	var n [binary.MaxVarintLen64]byte
	b.Write(n[:binary.PutUvarint(n[:], uint64(len(prefix)))])
	b.WriteString(prefix)
	b.WriteString(suffix)
	return b.String()
}

func splitGeneratedAffixes(base string) (prefix string, suffix string) {
	if len(base) == 0 {
		return "", ""
	}
	n, size := binary.Uvarint([]byte(base[:min(len(base), binary.MaxVarintLen64)]))
	base = base[size:]
	return base[:n], base[n:]
}

func (name SymbolName) derivedValue() string {
	if name.derivedKind() == derivedNameInternal {
		return name.derivedBase()
	}
	num := strconv.FormatUint(name.derivedNum(), 10)
	base := name.derivedBase()
	switch name.derivedKind() {
	case derivedNamePrivate:
		return InternalSymbolNamePrefix + "#" + num + "@" + base
	case derivedNameUniqueESSymbol:
		return InternalSymbolNamePrefix + "@" + base + "@" + num
	case derivedNameModulePattern:
		return InternalSymbolNamePrefix + "\"" + base + modulePatternMarker + num
	case derivedNameAuto:
		prefix, suffix := splitGeneratedAffixes(base)
		return prefix + "(auto@" + num + ")" + suffix
	case derivedNameGenerated:
		prefix, suffix := splitGeneratedAffixes(base)
		return prefix + "(generated@" + num + ")" + suffix
	}
	panic("unknown derived symbol name kind")
}

// internalMarker returns -1 if the name's text does not start with
// InternalSymbolNamePrefix. Otherwise, it returns the byte after the prefix
// plus one, or zero if there is none.
func (name SymbolName) internalMarker() int {
	switch name.derivedKind() {
	case derivedNameInternal:
		return int(name.derivedNum())
	case derivedNamePrivate:
		return '#' + 1
	case derivedNameUniqueESSymbol:
		return '@' + 1
	case derivedNameModulePattern:
		return '"' + 1
	}
	// Plain names are tagged derivedNameInternal if they start with the
	// prefix, and generated names never do; see splitDerivedName.
	return -1
}

// IsInternal reports whether the name starts with InternalSymbolNamePrefix,
// and so cannot be written in source.
func (name SymbolName) IsInternal() bool {
	return name.internalMarker() >= 0
}

// IsPrivateName reports whether the name is that of a private identifier
// member (InternalSymbolNamePrefix + "#").
func (name SymbolName) IsPrivateName() bool {
	return name.internalMarker() == '#'+1
}

// IsLateBoundName reports whether the name is that of a property keyed by a
// unique symbol (InternalSymbolNamePrefix + "@").
func (name SymbolName) IsLateBoundName() bool {
	return name.internalMarker() == '@'+1
}

// IsReservedMemberName reports whether the name is an internal member name
// such as "\xFEcall", rather than a private or late-bound name.
func (name SymbolName) IsReservedMemberName() bool {
	marker := name.internalMarker()
	return marker > 0 && marker != '@'+1 && marker != '#'+1
}

// PrivateNameDescription returns the private identifier text (such as "#x")
// of a private name.
func (name SymbolName) PrivateNameDescription() (string, bool) {
	if name.derivedKind() == derivedNamePrivate {
		return name.derivedBase(), true
	}
	if !name.IsPrivateName() {
		return "", false
	}
	_, description, ok := strings.Cut(name.String(), "@")
	return description, ok
}

// parseDerivedName returns the derived form of text, if it has one.
func parseDerivedName(text string) (SymbolName, bool) {
	if kind, num, base, ok := splitDerivedName(text); ok {
		return encodeDerivedName(kind, num, base)
	}
	return 0, false
}

// splitDerivedName matches text against the derived name shapes. Only the
// internal kinds start with InternalSymbolNamePrefix, so their kinds alone
// determine the leading bytes of the text.
func splitDerivedName(text string) (kind derivedNameKind, num uint64, base string, ok bool) {
	if strings.HasPrefix(text, InternalSymbolNamePrefix) {
		if len(text) < 2 {
			return derivedNamePlain, 0, "", false
		}
		rest := text[2:]
		switch text[1] {
		case '#':
			if digits, base, found := strings.Cut(rest, "@"); found {
				if num, ok := parseCanonicalUint(digits); ok {
					return derivedNamePrivate, num, base, true
				}
			}
		case '@':
			if base, digits, found := strings.CutLast(rest, "@"); found {
				if num, ok := parseCanonicalUint(digits); ok {
					return derivedNameUniqueESSymbol, num, base, true
				}
			}
		case '"':
			if base, digits, found := strings.CutLast(rest, modulePatternMarker); found {
				if num, ok := parseCanonicalUint(digits); ok {
					return derivedNameModulePattern, num, base, true
				}
			}
		}
		return derivedNamePlain, 0, "", false
	}
	if start, end, forNode, num, found := findGeneratedPlaceholder(text); found {
		kind := derivedNameAuto
		if forNode {
			kind = derivedNameGenerated
		}
		return kind, num, generatedAffixes(text[:start], text[end:]), true
	}
	return derivedNamePlain, 0, "", false
}

// findGeneratedPlaceholder finds the first "(auto@N)" or "(generated@N)" in text.
func findGeneratedPlaceholder(text string) (start int, end int, forNode bool, num uint64, found bool) {
	for offset := 0; ; {
		i := strings.IndexByte(text[offset:], '(')
		if i < 0 {
			return 0, 0, false, 0, false
		}
		start = offset + i
		rest := text[start+1:]
		var digits string
		if after, ok := strings.CutPrefix(rest, "auto@"); ok {
			digits, forNode = after, false
		} else if after, ok := strings.CutPrefix(rest, "generated@"); ok {
			digits, forNode = after, true
		}
		if closing := strings.IndexByte(digits, ')'); closing >= 0 {
			if num, ok := parseCanonicalUint(digits[:closing]); ok {
				end = len(text) - len(digits) + closing + 1
				return start, end, forNode, num, true
			}
		}
		offset = start + 1
	}
}

// parseCanonicalUint parses digits as strconv.FormatUint would have printed them.
func parseCanonicalUint(digits string) (uint64, bool) {
	if len(digits) == 0 || len(digits) > 1 && digits[0] == '0' {
		return 0, false
	}
	var n uint64
	for i := range len(digits) {
		c := digits[i]
		if c < '0' || c > '9' {
			return 0, false
		}
		if n > derivedNameNumMax {
			return 0, false
		}
		n = n*10 + uint64(c-'0')
	}
	return n, true
}
