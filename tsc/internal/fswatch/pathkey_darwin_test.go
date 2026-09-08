//go:build darwin && (amd64 || arm64)

package fswatch

import (
	"errors"
	"os"
	"testing"
)

func TestNativePathComparerKeys(t *testing.T) {
	t.Parallel()
	c := PathComparer{comparer: pathComparer{ignoreCase: true}}
	for _, pair := range [][2]string{
		{"/A/file.ts", "/a/FILE.TS"},
		{"/straße/İ.ts", "/STRASSE/i\u0307.ts"},
		{"/\ufb03/ſ.ts", "/ffi/S.ts"},
		{"/Σ/ς.ts", "/σ/σ.ts"},
		{"/cafe\u0301.ts", "/caf\u00e9.ts"},
	} {
		if c.Key(pair[0]) != c.Key(pair[1]) {
			t.Errorf("unequal keys for aliases %q", pair)
		}
	}
	for _, pair := range [][2]string{
		{"/I.ts", "/\u0131.ts"},
		{"/i.ts", "/İ.ts"},
		{"/Ａ.ts", "/A.ts"},
		{"/file.ts2", "/file.ts"},
	} {
		if c.Key(pair[0]) == c.Key(pair[1]) {
			t.Errorf("equal keys for distinct paths %q", pair)
		}
	}
	for _, name := range []string{"/A\xff.ts", "/A\x00.ts"} {
		if got := c.Key(name); got != name {
			t.Errorf("malformed path was folded: %q => %q", name, got)
		}
	}
	if got, ok := c.Rebase("/STRASSE/new.ts", "/straße", "/original"); !ok || got != "/original/new.ts" {
		t.Fatalf("expanding fold rebased at wrong boundary: %q, %v", got, ok)
	}
}

func TestPathComparerVolumeQueryError(t *testing.T) {
	t.Parallel()
	name := "./pathkey_test.go/missing"
	_, err := PathComparerForPath(name)
	var pathErr *os.PathError
	if !errors.As(err, &pathErr) || pathErr.Op != "pathconf" || pathErr.Path != name {
		t.Fatalf("volume query did not preserve path error: %v", err)
	}
}
