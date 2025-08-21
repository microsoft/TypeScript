package ata

import (
	"fmt"
	"net/url"
	"strings"
	"unicode/utf8"
)

type NameValidationResult int

const (
	NameOk NameValidationResult = iota
	EmptyName
	NameTooLong
	NameStartsWithDot
	NameStartsWithUnderscore
	NameContainsNonURISafeCharacters
)

const maxPackageNameLength = 214

/**
 * Validates package name using rules defined at https://docs.npmjs.com/files/package.json
 *
 * @internal
 */
func ValidatePackageName(packageName string) (result NameValidationResult, name string, isScopeName bool) {
	return validatePackageNameWorker(packageName /*supportScopedPackage*/, true)
}

func validatePackageNameWorker(packageName string, supportScopedPackage bool) (result NameValidationResult, name string, isScopeName bool) {
	packageNameLen := len(packageName)
	if packageNameLen == 0 {
		return EmptyName, "", false
	}
	if packageNameLen > maxPackageNameLength {
		return NameTooLong, "", false
	}
	firstChar, _ := utf8.DecodeRuneInString(packageName)
	if firstChar == '.' {
		return NameStartsWithDot, "", false
	}
	if firstChar == '_' {
		return NameStartsWithUnderscore, "", false
	}
	// check if name is scope package like: starts with @ and has one '/' in the middle
	// scoped packages are not currently supported
	if supportScopedPackage {
		if withoutScope, found := strings.CutPrefix(packageName, "@"); found {
			scope, scopedPackageName, found := strings.Cut(withoutScope, "/")
			if found && len(scope) > 0 && len(scopedPackageName) > 0 && !strings.Contains(scopedPackageName, "/") {
				scopeResult, _, _ := validatePackageNameWorker(scope /*supportScopedPackage*/, false)
				if scopeResult != NameOk {
					return scopeResult, scope, true
				}
				packageResult, _, _ := validatePackageNameWorker(scopedPackageName /*supportScopedPackage*/, false)
				if packageResult != NameOk {
					return packageResult, scopedPackageName, false
				}
				return NameOk, "", false
			}
		}
	}
	if url.QueryEscape(packageName) != packageName {
		return NameContainsNonURISafeCharacters, "", false
	}
	return NameOk, "", false
}

/** @internal */
func renderPackageNameValidationFailure(typing string, result NameValidationResult, name string, isScopeName bool) string {
	var kind string
	if isScopeName {
		kind = "Scope"
	} else {
		kind = "Package"
	}
	if name == "" {
		name = typing
	}
	switch result {
	case EmptyName:
		return fmt.Sprintf("'%s':: %s name '%s' cannot be empty", typing, kind, name)
	case NameTooLong:
		return fmt.Sprintf("'%s':: %s name '%s' should be less than %d characters", typing, kind, name, maxPackageNameLength)
	case NameStartsWithDot:
		return fmt.Sprintf("'%s':: %s name '%s' cannot start with '.'", typing, kind, name)
	case NameStartsWithUnderscore:
		return fmt.Sprintf("'%s':: %s name '%s' cannot start with '_'", typing, kind, name)
	case NameContainsNonURISafeCharacters:
		return fmt.Sprintf("'%s':: %s name '%s' contains non URI safe characters", typing, kind, name)
	case NameOk:
		panic("Unexpected Ok result")
	default:
		panic("Unknown package name validation result")
	}
}
