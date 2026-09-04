package customlint

import (
	"go/ast"
	"go/constant"
	"go/format"
	"go/token"
	"go/types"
	"path/filepath"
	"strings"

	"golang.org/x/tools/go/analysis"
	"golang.org/x/tools/go/analysis/passes/inspect"
	"golang.org/x/tools/go/ast/inspector"
)

var typedPathsAnalyzer = &analysis.Analyzer{
	Name: "typedpaths",
	Doc:  "checks typed path construction, conversions, and operations",
	Requires: []*analysis.Analyzer{
		inspect.Analyzer,
	},
	Run: func(pass *analysis.Pass) (any, error) {
		return (&typedPathsPass{pass: pass}).run()
	},
}

type typedPathsPass struct {
	pass *analysis.Pass
}

func (p *typedPathsPass) run() (any, error) {
	in := p.pass.ResultOf[inspect.Analyzer].(*inspector.Inspector)

	for c := range in.Root().Preorder((*ast.TypeSpec)(nil)) {
		typeSpec := c.Node().(*ast.TypeSpec)
		if p.isTestFile(typeSpec.Pos()) ||
			strings.HasSuffix(p.pass.Pkg.Path(), "/internal/tspath") ||
			typeSpec.Assign.IsValid() {
			continue
		}
		if source := typedPathType(p.pass.TypesInfo.TypeOf(typeSpec.Type)); source != "" {
			p.pass.Reportf(
				typeSpec.Pos(),
				"defining a new type from %s bypasses typed-path invariants; use a type alias",
				source,
			)
		}
	}

	for c := range in.Root().Preorder((*ast.CallExpr)(nil)) {
		call := c.Node().(*ast.CallExpr)
		if !strings.HasSuffix(p.pass.Pkg.Path(), "/internal/tspath") {
			p.checkTypedPathConstructorConstant(call)
		}
		if p.isTestFile(call.Pos()) {
			continue
		}
		if !strings.HasSuffix(p.pass.Pkg.Path(), "/internal/tspath") {
			p.checkLowercaseDirectorySequence(call)
			p.checkRedundantStringOperation(call)
		}
		if len(call.Args) != 1 {
			continue
		}

		typeName := conversionTypeName(p.pass.TypesInfo, call.Fun)
		if typeName == nil {
			continue
		}

		target := typedPathType(typeName.Type())
		if target == "" {
			continue
		}
		targetType := namedType(typeName.Type())
		if targetType == nil || targetType.Obj().Pkg() == nil || p.pass.Pkg.Path() == targetType.Obj().Pkg().Path() {
			continue
		}

		arg := call.Args[0]
		sourceType := p.pass.TypesInfo.TypeOf(arg)
		sourceName := ""
		if p.pass.TypesInfo.Types[arg].Value != nil {
			if constant := constantObject(p.pass.TypesInfo, arg); constant != nil {
				sourceType = constant.Type()
			} else {
				sourceType = nil
				sourceName = "constant"
			}
		}
		source := typedPathType(sourceType)
		if isDownwardTypedPathConversion(source, target) {
			continue
		}

		if sourceName == "" {
			sourceName = source
		}
		if sourceName == "" {
			sourceName = types.TypeString(sourceType, func(*types.Package) string { return "" })
		}
		p.pass.Reportf(
			call.Pos(),
			"conversion from %s to %s adds path invariants; use a tspath constructor",
			sourceName,
			target,
		)
	}

	for c := range in.Root().Preorder(
		(*ast.BasicLit)(nil),
		(*ast.Ident)(nil),
		(*ast.BinaryExpr)(nil),
		(*ast.SelectorExpr)(nil),
	) {
		expr := c.Node().(ast.Expr)
		if strings.HasSuffix(p.pass.Pkg.Path(), "/internal/tspath") {
			continue
		}
		if !isImplicitConversionContext(p.pass.TypesInfo, c) {
			continue
		}
		typeAndValue, ok := p.pass.TypesInfo.Types[expr]
		if !ok || typeAndValue.Value == nil || typeAndValue.Value.Kind() != constant.String || constant.StringVal(typeAndValue.Value) == "" {
			continue
		}
		target := typedPathType(typeAndValue.Type)
		if target == "" {
			continue
		}
		if p.isTestFile(expr.Pos()) {
			if valid, requirement, checked := validateTypedPathConstant(target, constant.StringVal(typeAndValue.Value)); checked && !valid {
				p.pass.Reportf(
					expr.Pos(),
					"constant assigned to %s must be %s",
					target,
					requirement,
				)
			}
			continue
		}
		p.pass.Reportf(
			expr.Pos(),
			"implicit conversion of non-empty constant to %s adds path invariants; use a tspath constructor",
			target,
		)
	}

	if !strings.HasSuffix(p.pass.Pkg.Path(), "/internal/tspath") {
		for c := range in.Root().Preorder(
			(*ast.SliceExpr)(nil),
			(*ast.BinaryExpr)(nil),
			(*ast.AssignStmt)(nil),
		) {
			if p.isTestFile(c.Node().Pos()) {
				continue
			}
			p.checkTypedPathOperation(c.Node())
		}
	}

	return nil, nil
}

func (p *typedPathsPass) checkTypedPathConstructorConstant(call *ast.CallExpr) {
	function := calledTspathFunction(p.pass.TypesInfo, call.Fun)
	switch function {
	case "ToRootedPath", "ToRootedFilePath", "ToRootedDirectoryPath":
		p.checkToRootedPathConstants(function, call)
		return
	}
	if len(call.Args) != 1 {
		return
	}
	value := p.pass.TypesInfo.Types[call.Args[0]].Value
	if value == nil || value.Kind() != constant.String {
		return
	}
	path := constant.StringVal(value)

	var valid bool
	var requirement string
	switch function {
	case "RootedPathFromAbsolute", "RootedFilePathFromAbsolute", "RootedDirectoryPathFromAbsolute":
		valid = literalRootLength(path) != 0 && literalURLPathPart(path) == path
		requirement = "absolute"
	case "RootedPathFromNormalized", "RootedFilePathFromNormalized", "RootedDirectoryPathFromNormalized":
		valid = isLiteralRootedNormalizedPath(path)
		requirement = "rooted and normalized"
	case "RelativePathFromNormalized":
		valid = isLiteralRelativeNormalizedPath(path)
		requirement = "relative and normalized"
	case "PathKeyFromCanonical":
		valid = isLiteralCanonicalPath(path)
		requirement = "empty or rooted and normalized"
	case "ToRelativePath":
		valid = literalRootLength(path) == 0
		requirement = "relative"
	default:
		return
	}
	if !valid {
		p.pass.Reportf(
			call.Args[0].Pos(),
			"constant argument to %s must be %s",
			function,
			requirement,
		)
	}
}

func (p *typedPathsPass) checkToRootedPathConstants(function string, call *ast.CallExpr) {
	if len(call.Args) != 2 {
		return
	}
	pathValue := p.pass.TypesInfo.Types[call.Args[0]].Value
	if pathValue == nil || pathValue.Kind() != constant.String {
		return
	}
	path := constant.StringVal(pathValue)
	if path != "" && literalRootLength(path) != 0 {
		if literalURLPathPart(path) == path {
			return
		}
		p.pass.Reportf(
			call.Args[0].Pos(),
			"constant argument to %s must not contain a URL query or fragment",
			function,
		)
		return
	}

	currentDirectory, currentDirectoryIsConstant := p.constantString(call.Args[1])
	if path != "" && !currentDirectoryIsConstant {
		return
	}
	if path != "" {
		if isLiteralRootedNormalizedPath(currentDirectory) {
			if isLiteralURLPath(currentDirectory) && strings.ContainsAny(path, "?#") {
				// Report below.
			} else {
				return
			}
		}
	}

	p.pass.Reportf(
		call.Args[0].Pos(),
		"constant argument to %s must be non-empty and rooted, or relative to a rooted current directory",
		function,
	)
}

func (p *typedPathsPass) constantString(expr ast.Expr) (string, bool) {
	if value := p.pass.TypesInfo.Types[expr].Value; value != nil && value.Kind() == constant.String {
		return constant.StringVal(value), true
	}
	if paren, ok := expr.(*ast.ParenExpr); ok {
		return p.constantString(paren.X)
	}
	call, ok := expr.(*ast.CallExpr)
	if !ok || len(call.Args) == 0 {
		return "", false
	}
	function := calledTspathFunction(p.pass.TypesInfo, call.Fun)
	if function != "RootedDirectoryPathFromNormalized" &&
		function != "RootedDirectoryPathFromPath" &&
		function != "RootedPathFromNormalized" &&
		function != "RootedFilePathFromNormalized" &&
		function != "RootedFilePathFromPath" {
		target := conversionTypeName(p.pass.TypesInfo, call.Fun)
		if target == nil ||
			target.Name() != "RootedDirectoryPath" &&
				target.Name() != "RootedPath" &&
				target.Name() != "RootedFilePath" {
			return "", false
		}
	}
	return p.constantString(call.Args[0])
}

func isLiteralURLPath(path string) bool {
	if path == "" ||
		path[0] == '/' ||
		path[0] == '\\' ||
		len(path) > 1 && path[1] == ':' ||
		strings.HasPrefix(path, "^/") {
		return false
	}
	return strings.Contains(path, "://")
}

func validateTypedPathConstant(target string, path string) (valid bool, requirement string, checked bool) {
	switch target {
	case "RootedPath", "RootedFilePath", "RootedDirectoryPath":
		return isLiteralRootedNormalizedPath(path), "rooted and normalized", true
	case "RelativePath":
		return isLiteralRelativeNormalizedPath(path), "relative and normalized", true
	case "PathKey":
		return isLiteralCanonicalPath(path), "empty or rooted and normalized", true
	default:
		return false, "", false
	}
}

func literalRootLength(path string) int {
	if path == "" {
		return 0
	}
	ch0 := path[0]

	if ch0 == '/' || ch0 == '\\' {
		if len(path) == 1 || path[1] != ch0 {
			return 1
		}
		if separator := strings.IndexByte(path[2:], ch0); separator != -1 {
			return separator + 3
		}
		return len(path)
	}

	if isLiteralVolumeCharacter(ch0) && len(path) > 1 && path[1] == ':' {
		if len(path) == 2 {
			return 2
		}
		if path[2] == '/' || path[2] == '\\' {
			return 3
		}
	}

	if ch0 == '^' && len(path) > 1 && path[1] == '/' {
		const dynamicURIFileNamePrefix = "^/~ts-uri-v2~/"
		if strings.HasPrefix(path, dynamicURIFileNamePrefix) {
			schemeEnd := strings.IndexByte(path[len(dynamicURIFileNamePrefix):], '/')
			if schemeEnd != -1 {
				authorityStart := len(dynamicURIFileNamePrefix) + schemeEnd + 1
				if authorityEnd := strings.IndexByte(path[authorityStart:], '/'); authorityEnd != -1 {
					return authorityStart + authorityEnd + 1
				}
				return len(path)
			}
		}
		return 2
	}

	schemeEnd := strings.Index(path, "://")
	if schemeEnd == -1 {
		return 0
	}
	authorityStart := schemeEnd + len("://")
	authorityLength := strings.IndexByte(path[authorityStart:], '/')
	if authorityLength == -1 {
		return len(path)
	}
	authorityEnd := authorityStart + authorityLength
	scheme := path[:schemeEnd]
	authority := path[authorityStart:authorityEnd]
	if strings.EqualFold(scheme, "file") &&
		(authority == "" || strings.EqualFold(authority, "localhost")) &&
		len(path) > authorityEnd+2 &&
		isLiteralVolumeCharacter(path[authorityEnd+1]) {
		if volumeEnd := literalFileURLVolumeSeparatorEnd(path, authorityEnd+2); volumeEnd != -1 {
			if volumeEnd == len(path) {
				return volumeEnd
			}
			if path[volumeEnd] == '/' {
				return volumeEnd + 1
			}
		}
	}
	return authorityEnd + 1
}

func literalFileURLVolumeSeparatorEnd(path string, start int) int {
	if start >= len(path) {
		return -1
	}
	if path[start] == ':' {
		return start + 1
	}
	if start+2 < len(path) &&
		path[start] == '%' &&
		path[start+1] == '3' &&
		(path[start+2] == 'a' || path[start+2] == 'A') {
		return start + 3
	}
	return -1
}

func isLiteralVolumeCharacter(ch byte) bool {
	return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z'
}

func isLiteralRootedNormalizedPath(path string) bool {
	pathPart := literalURLPathPart(path)
	if pathPart != path {
		return false
	}
	rootLength := literalRootLength(pathPart)
	if pathPart == "" ||
		rootLength == 0 ||
		strings.ContainsRune(pathPart, '\\') ||
		!isLiteralNormalizedPath(pathPart, false) {
		return false
	}
	if len(pathPart) == rootLength {
		return pathPart[len(pathPart)-1] == '/'
	}
	return pathPart[len(pathPart)-1] != '/'
}

func isLiteralCanonicalPath(path string) bool {
	if path == "" {
		return true
	}
	return isLiteralRootedNormalizedPath(path)
}

func literalURLPathPart(path string) string {
	if path == "" ||
		path[0] == '/' ||
		path[0] == '\\' ||
		len(path) > 1 && path[1] == ':' ||
		strings.HasPrefix(path, "^/") {
		return path
	}
	schemeEnd := strings.Index(path, "://")
	if schemeEnd == -1 {
		return path
	}
	suffixStart := strings.IndexAny(path[schemeEnd+3:], "?#")
	if suffixStart == -1 {
		return path
	}
	suffixStart += schemeEnd + 3
	return path[:suffixStart]
}

func isLiteralNormalizedPath(path string, allowTrailingSeparator bool) bool {
	if strings.ContainsRune(path, '\\') {
		return false
	}
	rootLength := literalRootLength(path)
	segments := strings.Split(path[rootLength:], "/")
	for index, segment := range segments {
		if segment == "." || segment == ".." {
			return false
		}
		if segment == "" && index != len(segments)-1 {
			return false
		}
	}
	return allowTrailingSeparator || len(path) == rootLength || !strings.HasSuffix(path, "/")
}

func isLiteralRelativeNormalizedPath(path string) bool {
	if literalRootLength(path) != 0 || strings.ContainsRune(path, '\\') {
		return false
	}
	seenNonParent := false
	segments := strings.Split(path, "/")
	for index, segment := range segments {
		switch segment {
		case "":
			if index != len(segments)-1 {
				return false
			}
		case ".":
			return false
		case "..":
			if seenNonParent {
				return false
			}
		default:
			seenNonParent = true
		}
	}
	return true
}

func (p *typedPathsPass) checkLowercaseDirectorySequence(call *ast.CallExpr) {
	if calledTspathFunction(p.pass.TypesInfo, call.Fun) != "ContainsLowercaseDirectorySequence" {
		return
	}
	if len(call.Args) != 1 {
		return
	}
	value := p.pass.TypesInfo.Types[call.Args[0]].Value
	if value == nil || value.Kind() != constant.String {
		p.pass.Reportf(call.Args[0].Pos(), "directory sequence must be a lowercase string constant")
		return
	}
	sequence := constant.StringVal(value)
	if sequence != strings.ToLower(sequence) ||
		!strings.HasPrefix(sequence, "/") ||
		!strings.HasSuffix(sequence, "/") {
		p.pass.Reportf(call.Args[0].Pos(), "directory sequence must be lowercase and include leading and trailing separators")
	}
}

func (p *typedPathsPass) checkTypedPathOperation(node ast.Node) {
	switch node := node.(type) {
	case *ast.SliceExpr:
		source := typedPathType(p.pass.TypesInfo.TypeOf(node.X))
		if source == "" {
			source = degradedTypedPath(p.pass.TypesInfo, node.X)
		}
		if source != "" {
			p.pass.Reportf(
				node.Pos(),
				"slicing %s produces an unvalidated substring; use a typed tspath operation",
				source,
			)
		}
	case *ast.BinaryExpr:
		if node.Op != token.ADD {
			return
		}
		source := typedPathType(p.pass.TypesInfo.TypeOf(node.X))
		if source == "" {
			source = typedPathType(p.pass.TypesInfo.TypeOf(node.Y))
		}
		if source != "" {
			p.pass.Reportf(
				node.Pos(),
				"concatenating %s may invalidate path invariants; use a typed tspath operation",
				source,
			)
		}
	case *ast.AssignStmt:
		if node.Tok != token.ADD_ASSIGN {
			return
		}
		for _, expr := range append(node.Lhs, node.Rhs...) {
			if source := typedPathType(p.pass.TypesInfo.TypeOf(expr)); source != "" {
				p.pass.Reportf(
					node.Pos(),
					"concatenating %s may invalidate path invariants; use a typed tspath operation",
					source,
				)
				return
			}
		}
	}
}

func isImplicitConversionContext(info *types.Info, cursor inspector.Cursor) bool {
	child := cursor.Node()
	parent := cursor.Parent()
	for {
		if _, ok := parent.Node().(*ast.ParenExpr); !ok {
			break
		}
		child = parent.Node()
		parent = parent.Parent()
	}
	switch node := parent.Node().(type) {
	case *ast.ValueSpec, *ast.ReturnStmt, *ast.CompositeLit:
		return true
	case *ast.AssignStmt:
		return node.Tok != token.ADD_ASSIGN
	case *ast.KeyValueExpr:
		if node.Value == child {
			return true
		}
		if node.Key != child {
			return false
		}
		composite, ok := parent.Parent().Node().(*ast.CompositeLit)
		if !ok {
			return false
		}
		_, ok = info.TypeOf(composite).Underlying().(*types.Map)
		return ok
	case *ast.CallExpr:
		return !(len(node.Args) == 1 && conversionTypeName(info, node.Fun) != nil)
	default:
		return false
	}
}

func (p *typedPathsPass) isTestFile(pos token.Pos) bool {
	return strings.HasSuffix(filepath.ToSlash(p.pass.Fset.PositionFor(pos, false).Filename), "_test.go")
}

func (p *typedPathsPass) checkRedundantStringOperation(call *ast.CallExpr) {
	function := calledTspathFunction(p.pass.TypesInfo, call.Fun)
	if function == "" || len(call.Args) == 0 {
		return
	}

	source := degradedTypedPath(p.pass.TypesInfo, call.Args[0])
	if source == "" {
		return
	}

	redundant := false
	switch function {
	case "NormalizePath", "NormalizeSlashes":
		redundant = source == "RootedPath" || source == "RootedFilePath" || source == "RootedDirectoryPath" || source == "SourceMapLocation" || source == "PathKey"
	case "GetDirectoryPath":
		redundant = source == "RootedPath" || source == "RootedFilePath" || source == "PathKey"
	case "RemoveTrailingDirectorySeparator":
		redundant = source == "PathKey"
	case "ToRootedPath",
		"TryRootedPathFromAbsolute",
		"RootedPathFromAbsolute",
		"TryRootedPathFromNormalized",
		"RootedPathFromNormalized",
		"ToRootedFilePath",
		"TryRootedFilePathFromAbsolute",
		"RootedFilePathFromAbsolute",
		"TryRootedFilePathFromNormalized",
		"RootedFilePathFromNormalized",
		"ToRootedDirectoryPath",
		"RootedDirectoryPathFromAbsolute",
		"RootedDirectoryPathFromNormalized":
		redundant = source == "PathKey"
	}
	if redundant {
		p.pass.Reportf(
			call.Args[0].Pos(),
			"%s converts %s to string before %s; use a typed tspath operation",
			expressionText(p.pass.Fset, call.Args[0]),
			source,
			function,
		)
	}
}

func calledTspathFunction(info *types.Info, expr ast.Expr) string {
	selector, ok := expr.(*ast.SelectorExpr)
	if !ok {
		return ""
	}
	function, ok := info.Uses[selector.Sel].(*types.Func)
	if !ok || function.Pkg() == nil || !strings.HasSuffix(function.Pkg().Path(), "/internal/tspath") {
		return ""
	}
	return function.Name()
}

func degradedTypedPath(info *types.Info, expr ast.Expr) string {
	for {
		paren, ok := expr.(*ast.ParenExpr)
		if !ok {
			break
		}
		expr = paren.X
	}
	call, ok := expr.(*ast.CallExpr)
	if !ok {
		return ""
	}

	if len(call.Args) == 0 {
		if selector, ok := call.Fun.(*ast.SelectorExpr); ok && selector.Sel.Name == "AsString" {
			return typedPathType(info.TypeOf(selector.X))
		}
		return ""
	}
	if len(call.Args) != 1 {
		return ""
	}

	ident, ok := call.Fun.(*ast.Ident)
	if !ok || ident.Name != "string" {
		return ""
	}
	if typeAndValue, ok := info.Types[ident]; !ok || !typeAndValue.IsType() || typeAndValue.Type.String() != "string" {
		return ""
	}
	return typedPathType(info.TypeOf(call.Args[0]))
}

func expressionText(fset *token.FileSet, expr ast.Expr) string {
	var b strings.Builder
	if err := format.Node(&b, fset, expr); err != nil {
		return "expression"
	}
	return b.String()
}

func constantObject(info *types.Info, expr ast.Expr) *types.Const {
	switch expr := expr.(type) {
	case *ast.Ident:
		constant, _ := info.Uses[expr].(*types.Const)
		return constant
	case *ast.ParenExpr:
		return constantObject(info, expr.X)
	default:
		return nil
	}
}

func conversionTypeName(info *types.Info, expr ast.Expr) *types.TypeName {
	switch expr := expr.(type) {
	case *ast.Ident:
		typeName, _ := info.Uses[expr].(*types.TypeName)
		return typeName
	case *ast.SelectorExpr:
		typeName, _ := info.Uses[expr.Sel].(*types.TypeName)
		return typeName
	case *ast.ParenExpr:
		return conversionTypeName(info, expr.X)
	case *ast.IndexExpr:
		return conversionTypeName(info, expr.X)
	case *ast.IndexListExpr:
		return conversionTypeName(info, expr.X)
	default:
		return nil
	}
}

func typedPathType(typ types.Type) string {
	if typ == nil {
		return ""
	}
	named := namedType(typ)
	if named != nil {
		if named.Obj().Pkg() != nil && strings.HasSuffix(named.Obj().Pkg().Path(), "/internal/tspath") {
			switch name := named.Obj().Name(); name {
			case "PathKey",
				"RootedPath",
				"RootedFilePath",
				"RootedDirectoryPath",
				"RelativePath",
				"ModuleSpecifier",
				"SourceMapLocation",
				"FileSpec",
				"PathPattern":
				return name
			}
		}
	}

	switch typ := types.Unalias(typ).(type) {
	case *types.TypeParam:
		return typedPathType(typ.Constraint())
	case *types.Union:
		var result string
		for term := range typ.Terms() {
			current := typedPathType(term.Type())
			if current == "" {
				return ""
			}
			if result != "" && result != current {
				result = "typed path"
			} else if result == "" {
				result = current
			}
		}
		return result
	}

	iface, ok := typ.Underlying().(*types.Interface)
	if !ok {
		return ""
	}
	iface.Complete()
	var result string
	for embedded := range iface.EmbeddedTypes() {
		current := typedPathType(embedded)
		if current == "" {
			continue
		}
		if result != "" && result != current {
			result = "typed path"
		} else if result == "" {
			result = current
		}
	}
	return result
}

func namedType(typ types.Type) *types.Named {
	named, _ := types.Unalias(typ).(*types.Named)
	return named
}

func isDownwardTypedPathConversion(source string, target string) bool {
	if source == target {
		return true
	}
	switch target {
	case "RootedPath":
		return source == "RootedFilePath" || source == "RootedDirectoryPath"
	default:
		return false
	}
}
