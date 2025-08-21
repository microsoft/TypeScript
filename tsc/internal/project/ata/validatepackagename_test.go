package ata_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/project/ata"
	"gotest.tools/v3/assert"
)

func TestValidatePackageName(t *testing.T) {
	t.Parallel()
	t.Run("name cannot be too long", func(t *testing.T) {
		t.Parallel()
		packageName := "a"
		for range 8 {
			packageName += packageName
		}
		status, _, _ := ata.ValidatePackageName(packageName)
		assert.Equal(t, status, ata.NameTooLong)
	})
	t.Run("package name cannot start with dot", func(t *testing.T) {
		t.Parallel()
		status, _, _ := ata.ValidatePackageName(".foo")
		assert.Equal(t, status, ata.NameStartsWithDot)
	})
	t.Run("package name cannot start with underscore", func(t *testing.T) {
		t.Parallel()
		status, _, _ := ata.ValidatePackageName("_foo")
		assert.Equal(t, status, ata.NameStartsWithUnderscore)
	})
	t.Run("package non URI safe characters are not supported", func(t *testing.T) {
		t.Parallel()
		status, _, _ := ata.ValidatePackageName("  scope  ")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		status, _, _ = ata.ValidatePackageName("; say ‘Hello from TypeScript!’ #")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		status, _, _ = ata.ValidatePackageName("a/b/c")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
	})
	t.Run("scoped package name is supported", func(t *testing.T) {
		t.Parallel()
		status, _, _ := ata.ValidatePackageName("@scope/bar")
		assert.Equal(t, status, ata.NameOk)
	})
	t.Run("scoped name in scoped package name cannot start with dot", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@.scope/bar")
		assert.Equal(t, status, ata.NameStartsWithDot)
		assert.Equal(t, name, ".scope")
		assert.Equal(t, isScopeName, true)
		status, name, isScopeName = ata.ValidatePackageName("@.scope/.bar")
		assert.Equal(t, status, ata.NameStartsWithDot)
		assert.Equal(t, name, ".scope")
		assert.Equal(t, isScopeName, true)
	})
	t.Run("scoped name in scoped package name cannot start with dot", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@_scope/bar")
		assert.Equal(t, status, ata.NameStartsWithUnderscore)
		assert.Equal(t, name, "_scope")
		assert.Equal(t, isScopeName, true)
		status, name, isScopeName = ata.ValidatePackageName("@_scope/_bar")
		assert.Equal(t, status, ata.NameStartsWithUnderscore)
		assert.Equal(t, name, "_scope")
		assert.Equal(t, isScopeName, true)
	})
	t.Run("scope name in scoped package name with non URI safe characters are not supported", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@  scope  /bar")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		assert.Equal(t, name, "  scope  ")
		assert.Equal(t, isScopeName, true)
		status, name, isScopeName = ata.ValidatePackageName("@; say ‘Hello from TypeScript!’ #/bar")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		assert.Equal(t, name, "; say ‘Hello from TypeScript!’ #")
		assert.Equal(t, isScopeName, true)
		status, name, isScopeName = ata.ValidatePackageName("@  scope  /  bar  ")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		assert.Equal(t, name, "  scope  ")
		assert.Equal(t, isScopeName, true)
	})
	t.Run("package name in scoped package name cannot start with dot", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@scope/.bar")
		assert.Equal(t, status, ata.NameStartsWithDot)
		assert.Equal(t, name, ".bar")
		assert.Equal(t, isScopeName, false)
	})
	t.Run("package name in scoped package name cannot start with underscore", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@scope/_bar")
		assert.Equal(t, status, ata.NameStartsWithUnderscore)
		assert.Equal(t, name, "_bar")
		assert.Equal(t, isScopeName, false)
	})
	t.Run("package name in scoped package name with non URI safe characters are not supported", func(t *testing.T) {
		t.Parallel()
		status, name, isScopeName := ata.ValidatePackageName("@scope/  bar  ")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		assert.Equal(t, name, "  bar  ")
		assert.Equal(t, isScopeName, false)
		status, name, isScopeName = ata.ValidatePackageName("@scope/; say ‘Hello from TypeScript!’ #")
		assert.Equal(t, status, ata.NameContainsNonURISafeCharacters)
		assert.Equal(t, name, "; say ‘Hello from TypeScript!’ #")
		assert.Equal(t, isScopeName, false)
	})
}
