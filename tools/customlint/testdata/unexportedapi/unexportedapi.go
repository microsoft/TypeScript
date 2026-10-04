package unexportedapi

import "testdata/unexportedapi/otherpkg"

type Foo struct {
	Bar *oops
}

type oops struct {
	v int
}

type Okay struct {
	Sure  int
	Value ***Okay2
}

type Okay2 struct {
	VeryGood struct{}
}

func OkayFunc(v *Okay) *Okay2 {
	if v == nil {
		return nil
	}
	return **v.Value
}

// Test cases for various scenarios

// Exported function with unexported parameter type
func BadFunc(x unexported) {}

// Exported function with unexported return type
func AnotherBadFunc() *unexported {
	return nil
}

// Exported function with unexported type in slice
func SliceFunc(x []unexported) {}

// Exported function with unexported type in map
func MapFunc(x map[string]unexported) {}

// Exported function with unexported type in map key
func MapKeyFunc(x map[unexported]string) {}

// Exported function with unexported type in channel
func ChanFunc(x chan unexported) {}

// Exported type alias to unexported type
type BadAlias = unexported

// Exported type with unexported embedded field (OK since unexported has no exported members)
type OkayEmbed struct {
	unexported
}

// Unexported type with exported field
type unexportedWithExportedField struct {
	ExportedField int
}

// Bad - exported type embedding unexported type with exported members
type BadEmbed struct {
	unexportedWithExportedField
}

// Unexported type - should not trigger
type okayUnexported struct {
	field unexported
}

// Exported interface with unexported type in method
type BadInterface interface {
	Method(x unexported)
}

// Exported interface with unexported return type
type AnotherBadInterface interface {
	Method() unexported
}

type unexported struct {
	x int
}

// Exported function with multiple return values including unexported
func MultiReturn() (int, unexported, error) {
	return 0, unexported{}, nil
}

// Exported variable with unexported type
var BadVar unexported

// Exported const with unexported type (should not be possible, but let's be safe)
// const BadConst unexported = unexported{} // This won't compile anyway

// Array of unexported type
type BadArray [10]unexported

// Exported function with variadic unexported parameter
func VariadicFunc(args ...unexported) {}

// Exported type with method returning unexported type
type ExportedWithMethod struct{}

func (e ExportedWithMethod) Method() unexported {
	return unexported{}
}

// Exported type with pointer receiver method returning unexported type
func (e *ExportedWithMethod) PointerMethod() *unexported {
	return nil
}

// Generic type with unexported type constraint (Go 1.18+)
type GenericExported[T any] struct {
	Value T
}

// Okay - unexported method on exported type (methods are not part of exported API unless on exported interface)
func (e ExportedWithMethod) unexportedMethod() unexported {
	return unexported{}
}

// Test variables initialized with function calls

// Helper functions for testing
func helperReturnsExported() *Okay2 {
	return &Okay2{}
}

func helperReturnsUnexported() unexported {
	return unexported{}
}

// Okay - exported variable initialized by calling unexported function that returns exported type
var OkayVarFromUnexportedFunc = helperReturnsExported()

// Bad - exported variable initialized by calling exported function that returns unexported type
var BadVarFromFunc = helperReturnsUnexported()

// Okay - exported variable with explicit type (implementation doesn't matter)
var OkayVarExplicitType *Okay2 = helperReturnsExported()

// Bad - exported variable with explicit unexported type
var BadVarExplicitType unexported = helperReturnsUnexported()

// Test type aliases
type (
	ExportedString   string
	unexportedString string
)

// Okay - exported function using exported type alias
func OkayTypeAlias(s ExportedString) {}

// Bad - exported function using unexported type alias
func BadTypeAlias(s unexportedString) {}

// Test unexported types with exported methods (for interface satisfaction)
type unexportedImpl struct {
	value int
}

// Okay - exported method on unexported type (not part of public API, often used for interface satisfaction)
func (u *unexportedImpl) ExportedMethod() int {
	return u.value
}

// Okay - exported method on unexported type can return unexported types
func (u *unexportedImpl) AnotherMethod() unexported {
	return unexported{}
}

// Test for avoiding duplicate errors on embedded types with methods

type BaseWithBadMethod struct{}

// This method has an unexported return type - should be flagged once
func (b *BaseWithBadMethod) GetUnexported() *unexported {
	return nil
}

// This type embeds BaseWithBadMethod - should NOT re-report the GetUnexported method issue
type DerivedEmbedding struct {
	BaseWithBadMethod
}

// Test embedding unexported type with exported method that references unexported type
type unexportedBase struct{}

// This exported method on unexported type won't be checked (unexported type methods are skipped)
func (u *unexportedBase) MethodWithBadReturn() *unexported {
	return nil
}

// This embeds an unexported type - what happens?
// OK because methods on unexported types aren't checked
type EmbeddingUnexportedBase struct {
	unexportedBase
}

// Test embedding unexported type with exported field that references unexported type
type unexportedBaseWithField struct {
	ExportedField *unexported
}

// Bad - embeds unexported type with exported field that references unexported type
type EmbeddingUnexportedBaseWithField struct {
	unexportedBaseWithField
}

// ============================================
// Additional test cases for coverage
// ============================================

// Test IndexExpr - generic type with single type parameter
type GenericWithUnexported[T any] struct {
	Value T
}

// Bad - exported variable with generic type instantiated with unexported type
var BadGenericVar GenericWithUnexported[unexported]

// Okay - exported variable with generic type instantiated with exported type
var OkayGenericVar GenericWithUnexported[Okay2]

// Test IndexListExpr - generic type with multiple type parameters
type MultiGeneric[K comparable, V any] struct {
	Key   K
	Value V
}

// Bad - exported variable with multi-param generic using unexported type
var BadMultiGenericVar MultiGeneric[string, unexported]

// Okay - exported variable with multi-param generic using exported types
var OkayMultiGenericVar MultiGeneric[string, Okay2]

// Test ParenExpr - parenthesized type expressions
type ParenType = (Okay2)

// Test function type in variable (covers Signature in checkType)
type FuncTypeWithUnexported func(unexported) unexported

// Okay function type
type FuncTypeOkay func(int) string

// Test BinaryExpr in array size (compile-time constant expression)
type ArrayWithBinaryExpr [1 + 2]int

// Test UnaryExpr in array size
const (
	negOne = -1
	posOne = 1
)

type ArrayWithUnaryExpr [+posOne]int

// Test interface embedding
type EmbeddedInterface interface {
	Okay2Method()
}

type CompositeInterface interface {
	EmbeddedInterface
	AnotherMethod()
}

// Test type with method that has function literal type
type TypeWithComplexMethod struct{}

func (t TypeWithComplexMethod) MethodWithFuncArg(fn func(int) int) {}

// Bad - method with function arg that uses unexported type
func (t TypeWithComplexMethod) BadMethodWithFuncArg(fn func(unexported) unexported) {}

// Test exported type with unexported type in generic constraint
type unexportedConstraint interface {
	~int | ~string
}

// Bad - exported generic type with unexported constraint
type BadGenericWithConstraint[T unexportedConstraint] struct {
	Value T
}

// Test CallExpr in variable initialization with type annotation
var CallExprVar Okay2 = func() Okay2 { return Okay2{} }()

// Test CompositeLit - composite literal types
var CompositeVar = struct{ X int }{X: 1}

// Test exported variable with struct type containing unexported field type
var StructVarWithUnexported = struct{ X unexported }{}

// Test deeply nested generic types
type DeepGeneric[T any] struct {
	Inner GenericWithUnexported[T]
}

var DeepGenericVar DeepGeneric[unexported]

// Test send-only and receive-only channels
func SendOnlyChan(c chan<- unexported)    {}
func ReceiveOnlyChan(c <-chan unexported) {}

// Test unexported type parameter name in type params
type GenericWithNames[unexportedParam any] struct {
	Value unexportedParam
}

// Test pointer to generic type
var PointerToGeneric *GenericWithUnexported[unexported]

// Test slice of generic type
var SliceOfGeneric []GenericWithUnexported[unexported]

// Test map with generic types
var MapOfGeneric map[string]GenericWithUnexported[unexported]

// ============================================
// Tests for checkType via inferred types
// ============================================

// Helper to create values with inferred types
func makeSlice() []unexported                    { return nil }
func makeArray() [3]unexported                   { return [3]unexported{} }
func makeChan() chan unexported                  { return nil }
func makeMap() map[string]unexported             { return nil }
func makeFunc() func(unexported)                 { return nil }
func makeInterface() interface{ M() unexported } { return nil }

// Bad - exported variables with inferred types (triggers checkType paths)
var (
	InferredSlice     = makeSlice()
	InferredArray     = makeArray()
	InferredChan      = makeChan()
	InferredMap       = makeMap()
	InferredFunc      = makeFunc()
	InferredInterface = makeInterface()
)

// Test embedded pointer to unexported type
type unexportedForEmbed struct {
	Value int
}

type EmbeddingPointer struct {
	*unexportedForEmbed
}

// Test function literal in type position
type FuncLitType = func()

var FuncLitVar = func(x unexported) unexported { return x }

// ============================================
// More coverage tests
// ============================================

// Test mixed exported/unexported names in var decl (covers line 127-128)
var (
	ExportedInGroup, unexportedInGroup = 1, 2
)

// Test unexported field names in struct (covers checkExportedField returning false)
type StructWithUnexportedField struct {
	unexportedField int
	ExportedField   string
}

// Test SelectorExpr - using type from same package via alias
type AliasToOkay2 = Okay2

// Test interface with only unexported methods (no exported methods to check)
type InterfaceWithUnexportedMethod interface {
	unexportedMethod()
}

// Test struct with only unexported fields (no exported fields to check)
type StructWithOnlyUnexportedFields struct {
	a, b, c int
}

// Test generic type instantiation that triggers TypeArgs path
type (
	GenericContainer[T any] struct{ Value T }
	ConcreteContainer       = GenericContainer[unexported]
)

// Test pointer in embedded field (covers pointer dereference in checkEmbeddedField)
type exportedForPointerEmbed struct {
	ExportedValue *unexported
}

type EmbeddingExportedPointer struct {
	*exportedForPointerEmbed
}

// ============================================
// Tests for SelectorExpr (qualified type from other package)
// ============================================

// Okay - using exported type from other package (triggers SelectorExpr case)
func UsesOtherPkgType(x otherpkg.ExportedType) {}

// Okay - field with type from other package
type StructWithOtherPkgField struct {
	Field otherpkg.ExportedType
}

// Test type alias to type from other package
type AliasToOtherPkg = otherpkg.ExportedType

// Test using type from other package that itself has unexported field
// This should trigger checkType on the type from otherpkg
func UsesTypeWithUnexported(x otherpkg.TypeWithUnexported) {}

// ============================================
// Tests for types.Struct and types.Interface returning false after loop
// ============================================

// Struct with only exported fields that are all OK types (triggers return false in types.Struct)
type AllOkayStruct struct {
	A int
	B string
	C float64
}

// Use it in inferred type context to trigger checkType(types.Struct)
func makeAllOkayStruct() AllOkayStruct { return AllOkayStruct{} }

var InferredAllOkayStruct = makeAllOkayStruct()

// Interface with only exported methods that have OK types (triggers return false in types.Interface)
type AllOkayInterface interface {
	Method1() int
	Method2(string) bool
}

// Use it in inferred type context
func makeAllOkayInterface() AllOkayInterface { return nil }

var InferredAllOkayInterface = makeAllOkayInterface()

// ============================================
// Tests for TypeArgs path
// ============================================

// Generic type from standard library with type args
type MyMap = map[string]int

// Inferred generic type - this should trigger TypeArgs check
func makeGeneric() GenericContainer[int] { return GenericContainer[int]{} }

var InferredGeneric = makeGeneric()

// Bad - inferred generic with unexported type arg (triggers TypeArgs return true path)
func makeGenericUnexported() GenericContainer[unexported] { return GenericContainer[unexported]{} }

var InferredGenericUnexported = makeGenericUnexported()

// Test anonymous struct type with all OK fields (triggers types.Struct return false)
func makeAnonStruct() struct {
	A int
	B string
} {
	return struct {
		A int
		B string
	}{}
}

var InferredAnonStruct = makeAnonStruct()

// Test anonymous interface type with all OK methods (triggers types.Interface return false)
func makeAnonInterface() interface{ Method() int } { return nil }

var InferredAnonInterface = makeAnonInterface()

// Test types.Alias - type alias to unexported type
type (
	unexportedAliased struct{ v int }
	AliasedUnexported = unexportedAliased
)

// Bad - using type alias to unexported type
func UsesAliasedUnexported(x AliasedUnexported) {}

// Okay - using type alias to exported type
type AliasedExported = Okay2

func UsesAliasedExported(x AliasedExported) {}
