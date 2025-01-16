package ast

import "sync/atomic"

// Symbol

type Symbol struct {
	Flags                        SymbolFlags
	CheckFlags                   CheckFlags // Non-zero only in transient symbols created by Checker
	ConstEnumOnlyModule          bool       // True if module contains only const enums or other modules with only const enums
	IsReplaceableByMethod        bool
	Name                         string
	Declarations                 []*Node
	ValueDeclaration             *Node
	Members                      SymbolTable
	Exports                      SymbolTable
	id                           atomic.Uint32
	Parent                       *Symbol
	ExportSymbol                 *Symbol
	AssignmentDeclarationMembers map[NodeId]*Node // Set of detected assignment declarations
	GlobalExports                SymbolTable      // Conditional global UMD exports
}

// SymbolTable

type SymbolTable map[string]*Symbol

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
	InternalSymbolNameResolving               = InternalSymbolNamePrefix + "resolving"               // Indicator symbol used to mark partially resolved type aliases
	InternalSymbolNameExportEquals            = InternalSymbolNamePrefix + "export="                 // Export assignment symbol
	InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression" // Instantiation expressions
	InternalSymbolNameImportAttributes        = InternalSymbolNamePrefix + "importAttributes"
	InternalSymbolNameDefault                 = "default" // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = "this"
)

func SymbolName(symbol *Symbol) string {
	if symbol.ValueDeclaration != nil && IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration) {
		return symbol.ValueDeclaration.Name().AsPrivateIdentifier().Text
	}
	return symbol.Name
}
