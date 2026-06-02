package fswatch

import (
	"errors"
	"os"
	"path/filepath"
	"runtime"
	"testing"
)

type walkDirFunc = func(dir string, recursive bool, fn func(string, bool) error) error

func runWalkDirTest(t *testing.T, fn func(t *testing.T, walk walkDirFunc)) {
	t.Helper()
	t.Parallel()
	for _, rt := range []struct {
		name string
		fn   walkDirFunc
	}{
		{"native", walkDir},
		{"generic", walkDirGeneric},
	} {
		t.Run(rt.name, func(t *testing.T) {
			t.Parallel()
			fn(t, rt.fn)
		})
	}
}

func TestWalkDirDoesNotFollowSymlinkedDir(t *testing.T) { //nolint:paralleltest // runWalkDirTest calls t.Parallel.
	runWalkDirTest(t, testWalkDirDoesNotFollowSymlinkedDir)
}

func testWalkDirDoesNotFollowSymlinkedDir(t *testing.T, walk walkDirFunc) {
	root := newTmpDir(t)
	target := filepath.Join(t.TempDir(), "target")
	if err := os.Mkdir(target, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(target, "child"), []byte("hidden"), 0o644); err != nil {
		t.Fatal(err)
	}

	link := filepath.Join(root, "link")
	if err := os.Symlink(target, link); err != nil {
		t.Fatal(err)
	}

	found := map[string]bool{}
	if err := walk(root, true, func(path string, isDir bool) error {
		found[path] = isDir
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	isDir, ok := found[link]
	if !ok {
		t.Fatalf("symlink %q missing from walk", link)
	}
	if isDir {
		t.Fatalf("symlink %q was treated as a directory", link)
	}
	if _, ok := found[filepath.Join(link, "child")]; ok {
		t.Fatal("walkDir followed symlinked directory")
	}
}

func TestWalkDirIgnoresUnreadableSubdir(t *testing.T) { //nolint:paralleltest // runWalkDirTest calls t.Parallel.
	runWalkDirTest(t, testWalkDirIgnoresUnreadableSubdir)
}

func testWalkDirIgnoresUnreadableSubdir(t *testing.T, walk walkDirFunc) {
	if runtime.GOOS == "windows" {
		t.Skip("Windows does not enforce POSIX directory permission bits")
	}
	if os.Geteuid() == 0 {
		t.Skip("root can read directories regardless of mode bits")
	}

	root := newTmpDir(t)
	denied := filepath.Join(root, "denied")
	if err := os.Mkdir(denied, 0o700); err != nil {
		t.Fatal(err)
	}
	child := filepath.Join(denied, "child")
	if err := os.WriteFile(child, []byte("hidden"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.Chmod(denied, 0); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = os.Chmod(denied, 0o700) })

	found := map[string]bool{}
	if err := walk(root, true, func(path string, isDir bool) error {
		found[path] = isDir
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	if _, ok := found[denied]; ok {
		t.Fatalf("unreadable directory should be ignored, found %q", denied)
	}
	if _, ok := found[child]; ok {
		t.Fatalf("unreadable child should be ignored, found %q", child)
	}
}

func TestWalkDirMissingDir(t *testing.T) { runWalkDirTest(t, testWalkDirMissingDir) } //nolint:paralleltest // runWalkDirTest calls t.Parallel.
func testWalkDirMissingDir(t *testing.T, walk walkDirFunc) {
	dir := filepath.Join(t.TempDir(), "nonexistent")
	if err := walk(dir, true, nil); err == nil {
		t.Fatal("expected error for missing directory")
	}
}

func TestWalkDirNotADir(t *testing.T) { runWalkDirTest(t, testWalkDirNotADir) } //nolint:paralleltest // runWalkDirTest calls t.Parallel.
func testWalkDirNotADir(t *testing.T, walk walkDirFunc) {
	f := filepath.Join(t.TempDir(), "file")
	if err := os.WriteFile(f, []byte("x"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := walk(f, true, nil); err == nil {
		t.Fatal("expected error for non-directory")
	}
}

func TestWalkDirEntries(t *testing.T) { runWalkDirTest(t, testWalkDirEntries) } //nolint:paralleltest // runWalkDirTest calls t.Parallel.
func testWalkDirEntries(t *testing.T, walk walkDirFunc) {
	root := newTmpDir(t)
	if err := os.WriteFile(filepath.Join(root, "a.txt"), []byte("a"), 0o644); err != nil {
		t.Fatal(err)
	}
	sub := filepath.Join(root, "sub")
	if err := os.Mkdir(sub, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(sub, "b.txt"), []byte("b"), 0o644); err != nil {
		t.Fatal(err)
	}

	found := map[string]bool{}
	if err := walk(root, true, func(path string, isDir bool) error {
		found[path] = isDir
		return nil
	}); err != nil {
		t.Fatal(err)
	}
	if _, ok := found[filepath.Join(root, "a.txt")]; !ok {
		t.Fatal("missing a.txt")
	}
	if _, ok := found[sub]; !ok {
		t.Fatal("missing sub/")
	}
	if _, ok := found[filepath.Join(sub, "b.txt")]; !ok {
		t.Fatal("missing sub/b.txt")
	}
}

func TestWalkDirCallback(t *testing.T) { runWalkDirTest(t, testWalkDirCallback) } //nolint:paralleltest // runWalkDirTest calls t.Parallel.
func testWalkDirCallback(t *testing.T, walk walkDirFunc) {
	root := newTmpDir(t)
	sub := filepath.Join(root, "sub")
	if err := os.Mkdir(sub, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(sub, "f.txt"), []byte("f"), 0o644); err != nil {
		t.Fatal(err)
	}

	var dirs, files []string
	err := walk(root, true, func(path string, isDir bool) error {
		if isDir {
			dirs = append(dirs, path)
		} else {
			files = append(files, path)
		}
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}
	if len(dirs) < 2 {
		t.Fatalf("expected at least 2 dirs (root + sub), got %d: %v", len(dirs), dirs)
	}
	if len(files) < 1 {
		t.Fatalf("expected at least 1 file, got %d", len(files))
	}
}

func TestWalkDirCallbackError(t *testing.T) { runWalkDirTest(t, testWalkDirCallbackError) } //nolint:paralleltest // runWalkDirTest calls t.Parallel.
func testWalkDirCallbackError(t *testing.T, walk walkDirFunc) {
	root := newTmpDir(t)
	if err := os.WriteFile(filepath.Join(root, "a.txt"), []byte("a"), 0o644); err != nil {
		t.Fatal(err)
	}

	sentinel := errors.New("stop")
	err := walk(root, true, func(path string, isDir bool) error {
		return sentinel
	})
	if !errors.Is(err, sentinel) {
		t.Fatalf("expected sentinel error, got %v", err)
	}
}
