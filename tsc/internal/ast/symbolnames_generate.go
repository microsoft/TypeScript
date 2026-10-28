//go:build ignore

// This program generates symbolnames_generated.go, which declares the fixed
// symbol names as constants and seeds the intern table with their texts.
// Add new fixed names to the list below and run `npx hereby generate:symbolnames`.

package main

import (
	"bytes"
	"fmt"
	"go/format"
	"log"
	"os"
	"strconv"
	"strings"
	"unicode/utf8"
)

const internal = "\xFE" // InternalSymbolNamePrefix

var names = []struct{ name, text, comment string }{
	{"SymbolNameZero", "0", ""},
	{"SymbolNameUnresolved", "<<unresolved>>", ""},
	{"SymbolNameAbstractModuleSource", "AbstractModuleSource", ""},
	{"SymbolNameArray", "Array", ""},
	{"SymbolNameArrayBuffer", "ArrayBuffer", ""},
	{"SymbolNameArrayConstructor", "ArrayConstructor", ""},
	{"SymbolNameArrayLike", "ArrayLike", ""},
	{"SymbolNameAsyncDisposable", "AsyncDisposable", ""},
	{"SymbolNameAsyncDisposableStack", "AsyncDisposableStack", ""},
	{"SymbolNameAsyncGenerator", "AsyncGenerator", ""},
	{"SymbolNameAsyncGeneratorFunction", "AsyncGeneratorFunction", ""},
	{"SymbolNameAsyncIterable", "AsyncIterable", ""},
	{"SymbolNameAsyncIterableIterator", "AsyncIterableIterator", ""},
	{"SymbolNameAsyncIterator", "AsyncIterator", ""},
	{"SymbolNameAsyncIteratorObject", "AsyncIteratorObject", ""},
	{"SymbolNameAtomics", "Atomics", ""},
	{"SymbolNameAwaited", "Awaited", ""},
	{"SymbolNameBigInt", "BigInt", ""},
	{"SymbolNameBigInt64Array", "BigInt64Array", ""},
	{"SymbolNameBigUint64Array", "BigUint64Array", ""},
	{"SymbolNameBoolean", "Boolean", ""},
	{"SymbolNameBuiltinIteratorReturn", "BuiltinIteratorReturn", ""},
	{"SymbolNameCallableFunction", "CallableFunction", ""},
	{"SymbolNameCapitalize", "Capitalize", ""},
	{"SymbolNameClassAccessorDecoratorContext", "ClassAccessorDecoratorContext", ""},
	{"SymbolNameClassAccessorDecoratorResult", "ClassAccessorDecoratorResult", ""},
	{"SymbolNameClassAccessorDecoratorTarget", "ClassAccessorDecoratorTarget", ""},
	{"SymbolNameClassDecoratorContext", "ClassDecoratorContext", ""},
	{"SymbolNameClassFieldDecoratorContext", "ClassFieldDecoratorContext", ""},
	{"SymbolNameClassGetterDecoratorContext", "ClassGetterDecoratorContext", ""},
	{"SymbolNameClassMethodDecoratorContext", "ClassMethodDecoratorContext", ""},
	{"SymbolNameClassSetterDecoratorContext", "ClassSetterDecoratorContext", ""},
	{"SymbolNameDataView", "DataView", ""},
	{"SymbolNameDate", "Date", ""},
	{"SymbolNameDateTimeFormat", "DateTimeFormat", ""},
	{"SymbolNameDisposable", "Disposable", ""},
	{"SymbolNameDisposableStack", "DisposableStack", ""},
	{"SymbolNameElement", "Element", ""},
	{"SymbolNameElementAttributesProperty", "ElementAttributesProperty", ""},
	{"SymbolNameElementChildrenAttribute", "ElementChildrenAttribute", ""},
	{"SymbolNameElementClass", "ElementClass", ""},
	{"SymbolNameElementType", "ElementType", ""},
	{"SymbolNameError", "Error", ""},
	{"SymbolNameErrorConstructor", "ErrorConstructor", ""},
	{"SymbolNameEventTarget", "EventTarget", ""},
	{"SymbolNameExtract", "Extract", ""},
	{"SymbolNameFloat16Array", "Float16Array", ""},
	{"SymbolNameFloat32Array", "Float32Array", ""},
	{"SymbolNameFloat64Array", "Float64Array", ""},
	{"SymbolNameFunction", "Function", ""},
	{"SymbolNameGenerator", "Generator", ""},
	{"SymbolNameIArguments", "IArguments", ""},
	{"SymbolNameImportAttributes", "ImportAttributes", ""},
	{"SymbolNameImportCallOptions", "ImportCallOptions", ""},
	{"SymbolNameImportMeta", "ImportMeta", ""},
	{"SymbolNameImportMetaExpression", "ImportMetaExpression", ""},
	{"SymbolNameInt16Array", "Int16Array", ""},
	{"SymbolNameInt32Array", "Int32Array", ""},
	{"SymbolNameInt8Array", "Int8Array", ""},
	{"SymbolNameIntl", "Intl", ""},
	{"SymbolNameIntrinsicAttributes", "IntrinsicAttributes", ""},
	{"SymbolNameIntrinsicClassAttributes", "IntrinsicClassAttributes", ""},
	{"SymbolNameIntrinsicElements", "IntrinsicElements", ""},
	{"SymbolNameIterable", "Iterable", ""},
	{"SymbolNameIterableIterator", "IterableIterator", ""},
	{"SymbolNameIterator", "Iterator", ""},
	{"SymbolNameIteratorConstructor", "IteratorConstructor", ""},
	{"SymbolNameIteratorObject", "IteratorObject", ""},
	{"SymbolNameIteratorReturnResult", "IteratorReturnResult", ""},
	{"SymbolNameIteratorYieldResult", "IteratorYieldResult", ""},
	{"SymbolNameJSON", "JSON", ""},
	{"SymbolNameJSX", "JSX", ""},
	{"SymbolNameK", "K", ""},
	{"SymbolNameLibraryManagedAttributes", "LibraryManagedAttributes", ""},
	{"SymbolNameLowercase", "Lowercase", ""},
	{"SymbolNameMap", "Map", ""},
	{"SymbolNameMapConstructor", "MapConstructor", ""},
	{"SymbolNameMath", "Math", ""},
	{"SymbolNameNaN", "NaN", ""},
	{"SymbolNameNewableFunction", "NewableFunction", ""},
	{"SymbolNameNoInfer", "NoInfer", ""},
	{"SymbolNameNode", "Node", ""},
	{"SymbolNameNodeList", "NodeList", ""},
	{"SymbolNameNonNullable", "NonNullable", ""},
	{"SymbolNameNumber", "Number", ""},
	{"SymbolNameNumberConstructor", "NumberConstructor", ""},
	{"SymbolNameNumberFormat", "NumberFormat", ""},
	{"SymbolNameObject", "Object", ""},
	{"SymbolNameObjectConstructor", "ObjectConstructor", ""},
	{"SymbolNameOmit", "Omit", ""},
	{"SymbolNamePartial", "Partial", ""},
	{"SymbolNamePick", "Pick", ""},
	{"SymbolNamePromise", "Promise", ""},
	{"SymbolNamePromiseConstructor", "PromiseConstructor", ""},
	{"SymbolNamePromiseLike", "PromiseLike", ""},
	{"SymbolNameRawJSON", "RawJSON", ""},
	{"SymbolNameReadonly", "Readonly", ""},
	{"SymbolNameReadonlyArray", "ReadonlyArray", ""},
	{"SymbolNameReadonlyMap", "ReadonlyMap", ""},
	{"SymbolNameReadonlySet", "ReadonlySet", ""},
	{"SymbolNameRecord", "Record", ""},
	{"SymbolNameReflect", "Reflect", ""},
	{"SymbolNameRegExp", "RegExp", ""},
	{"SymbolNameRegExpConstructor", "RegExpConstructor", ""},
	{"SymbolNameRegExpExecArray", "RegExpExecArray", ""},
	{"SymbolNameRegExpMatchArray", "RegExpMatchArray", ""},
	{"SymbolNameRelativeTimeFormat", "RelativeTimeFormat", ""},
	{"SymbolNameRequired", "Required", ""},
	{"SymbolNameSet", "Set", ""},
	{"SymbolNameSharedArrayBuffer", "SharedArrayBuffer", ""},
	{"SymbolNameString", "String", ""},
	{"SymbolNameStringConstructor", "StringConstructor", ""},
	{"SymbolNameSymbol", "Symbol", ""},
	{"SymbolNameSymbolConstructor", "SymbolConstructor", ""},
	{"SymbolNameT", "T", ""},
	{"SymbolNameTemplateStringsArray", "TemplateStringsArray", ""},
	{"SymbolNameThisType", "ThisType", ""},
	{"SymbolNameTypedPropertyDescriptor", "TypedPropertyDescriptor", ""},
	{"SymbolNameUint16Array", "Uint16Array", ""},
	{"SymbolNameUint32Array", "Uint32Array", ""},
	{"SymbolNameUint8Array", "Uint8Array", ""},
	{"SymbolNameUint8ArrayConstructor", "Uint8ArrayConstructor", ""},
	{"SymbolNameUint8ClampedArray", "Uint8ClampedArray", ""},
	{"SymbolNameUncapitalize", "Uncapitalize", ""},
	{"SymbolNameUppercase", "Uppercase", ""},
	{"SymbolNameWeakMap", "WeakMap", ""},
	{"SymbolNameWeakSet", "WeakSet", ""},
	{"SymbolNameESModule", "__esModule", ""},
	{"SymbolNameUnderscoreDefault", "_default", ""},
	{"SymbolNameAny", "any", ""},
	{"SymbolNameArg", "arg", ""},
	{"SymbolNameArgs", "args", ""},
	{"SymbolNameArguments", "arguments", ""},
	{"SymbolNameAsyncIteratorProperty", "asyncIterator", ""},
	{"SymbolNameBind", "bind", ""},
	{"SymbolNameBooleanKeyword", "boolean", ""},
	{"SymbolNameCaller", "caller", ""},
	{"SymbolNameChildren", "children", ""},
	{"SymbolNameClass", "class", ""},
	{"SymbolNameClassName", "className", ""},
	{"SymbolNameConst", "const", ""},
	{"SymbolNameContext", "context", ""},
	{"SymbolNameDescriptor", "descriptor", ""},
	{"SymbolNameDone", "done", ""},
	{"SymbolNameExports", "exports", ""},
	{"SymbolNameFor", "for", ""},
	{"SymbolNameGetProperty", "get", ""},
	{"SymbolNameGlobal", "global", ""},
	{"SymbolNameGlobalThis", "globalThis", ""},
	{"SymbolNameHasInstance", "hasInstance", ""},
	{"SymbolNameHtmlFor", "htmlFor", ""},
	{"SymbolNameIteratorProperty", "iterator", ""},
	{"SymbolNameLength", "length", ""},
	{"SymbolNameMeta", "meta", ""},
	{"SymbolNameModule", "module", ""},
	{"SymbolNameName", "name", ""},
	{"SymbolNameNever", "never", ""},
	{"SymbolNameNext", "next", ""},
	{"SymbolNameNumberKeyword", "number", ""},
	{"SymbolNameParameterIndex", "parameterIndex", ""},
	{"SymbolNamePrivate", "private", ""},
	{"SymbolNamePropertyKey", "propertyKey", ""},
	{"SymbolNameProps", "props", ""},
	{"SymbolNamePrototype", "prototype", ""},
	{"SymbolNameRequire", "require", ""},
	{"SymbolNameReturn", "return", ""},
	{"SymbolNameSelf", "self", ""},
	{"SymbolNameSetProperty", "set", ""},
	{"SymbolNameStatic", "static", ""},
	{"SymbolNameStringKeyword", "string", ""},
	{"SymbolNameTarget", "target", ""},
	{"SymbolNameThen", "then", ""},
	{"SymbolNameThrow", "throw", ""},
	{"SymbolNameUndefined", "undefined", ""},
	{"SymbolNameUnknown", "unknown", ""},
	{"SymbolNameValue", "value", ""},
	{"SymbolNameWith", "with", ""},
	{"SymbolNameWritable", "writable", ""},
	{"InternalSymbolNameCall", internal + "call", "Call signatures"},
	{"InternalSymbolNameConstructor", internal + "constructor", "Constructor implementations"},
	{"InternalSymbolNameNew", internal + "new", "Constructor signatures"},
	{"InternalSymbolNameIndex", internal + "index", "Index signatures"},
	{"InternalSymbolNameExportStar", internal + "export", "Module export * declarations"},
	{"InternalSymbolNameGlobal", internal + "global", "Global self-reference"},
	{"InternalSymbolNameMissing", internal + "missing", "Indicates missing symbol"},
	{"InternalSymbolNameType", internal + "type", "Anonymous type literal symbol"},
	{"InternalSymbolNameObject", internal + "object", "Anonymous object literal declaration"},
	{"InternalSymbolNameJSXAttributes", internal + "jsxAttributes", "Anonymous JSX attributes object literal declaration"},
	{"InternalSymbolNameClass", internal + "class", "Unnamed class expression"},
	{"InternalSymbolNameFunction", internal + "function", "Unnamed function expression"},
	{"InternalSymbolNameComputed", internal + "computed", "Computed property name declaration with dynamic name"},
	{"InternalSymbolNameAssignmentDeclaration", internal + "assignment", "Assignment declarations"},
	{"InternalSymbolNameInstantiationExpression", internal + "instantiationExpression", "Instantiation expressions"},
	{"InternalSymbolNameImportAttributes", internal + "importAttributes", ""},
	{"InternalSymbolNameExportEquals", "export=", "Export assignment symbol"},
	{"InternalSymbolNameDefault", "default", "Default export symbol (technically not wholly internal, but included here for usability)"},
	{"InternalSymbolNameThis", "this", ""},
	{"InternalSymbolNameModuleExports", "module.exports", ""},
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	seenNames := map[string]bool{}
	seenTexts := map[string]string{"": "EmptySymbolName"}
	for _, n := range names {
		if seenNames[n.name] {
			log.Fatalf("duplicate fixed symbol name %s", n.name)
		}
		if other, ok := seenTexts[n.text]; ok {
			log.Fatalf("%s and %s have the same text %q", n.name, other, n.text)
		}
		seenNames[n.name] = true
		seenTexts[n.text] = n.name
	}

	var code bytes.Buffer
	code.WriteString("// Code generated by symbolnames_generate.go; DO NOT EDIT.\n\n")
	code.WriteString("package ast\n\n")
	code.WriteString("// Fixed symbol names take the first IDs in the intern table, so they are\n")
	code.WriteString("// compile-time constants. Internal names carry the same tag that\n")
	code.WriteString("// internedSymbolName gives them.\n")
	code.WriteString("const (\n")
	code.WriteString("\tEmptySymbolName SymbolName = iota // The zero value.\n")
	repeatingIota := true
	for _, n := range names {
		code.WriteString("\t" + n.name)
		if rest, ok := strings.CutPrefix(n.text, internal); ok {
			marker := "0"
			if rest != "" {
				marker = "(" + strconv.QuoteRuneToASCII(rune(rest[0])) + " + 1)"
				if rest[0] >= utf8.RuneSelf {
					marker = fmt.Sprintf("0x%x", int(rest[0])+1)
				}
			}
			code.WriteString(" SymbolName = iota | internalSymbolNameBits | " + marker + "<<internalMarkerShift")
			repeatingIota = false
		} else if !repeatingIota {
			code.WriteString(" SymbolName = iota")
			repeatingIota = true
		}
		if n.comment != "" {
			code.WriteString(" // " + n.comment)
		}
		code.WriteString("\n")
	}
	if !repeatingIota {
		code.WriteString("\tsymbolNameFixedCount SymbolName = iota\n")
	} else {
		code.WriteString("\tsymbolNameFixedCount\n")
	}
	code.WriteString(")\n\n")
	code.WriteString("var fixedSymbolNameTexts = [symbolNameFixedCount]string{\n")
	code.WriteString("\tEmptySymbolName: \"\",\n")
	for _, n := range names {
		key := n.name
		if strings.HasPrefix(n.text, internal) {
			key += " & derivedNameBaseMask"
		}
		fmt.Fprintf(&code, "\t%s: %s,\n", key, quote(n.text))
	}
	code.WriteString("}\n")

	formatted, err := format.Source(code.Bytes())
	if err != nil {
		log.Fatalf("failed to format generated code: %v", err)
	}
	if err := os.WriteFile("symbolnames_generated.go", formatted, 0o644); err != nil {
		log.Fatalf("failed to write symbolnames_generated.go: %v", err)
	}
}

func quote(text string) string {
	if rest, ok := strings.CutPrefix(text, internal); ok {
		return "InternalSymbolNamePrefix + " + strconv.Quote(rest)
	}
	return strconv.Quote(text)
}
