package compiler

import (
	"slices"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/module"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func TestGetSourceFileForResolvedModuleUsesResolvedPath(t *testing.T) {
	t.Parallel()
	path := tspath.PathKey("/resolved.ts")
	file := &ast.SourceFile{}
	program := &Program{
		filesByPath: map[tspath.PathKey]*ast.SourceFile{
			path: file,
		},
	}

	resolved := &module.ResolvedModule{
		ResolvedFileName: tspath.RootedFilePath("/different.ts"),
		ResolvedPath:     path,
	}
	if got := program.GetSourceFileForResolvedModule(resolved); got != file {
		t.Fatalf("GetSourceFileForResolvedModule() = %p, want %p", got, file)
	}
}

func TestGetCheckerAssociationBaseWeight(t *testing.T) {
	t.Parallel()
	if got := getCheckerAssociationBaseWeight(100, 2500); got != 125 {
		t.Fatalf("getCheckerAssociationBaseWeight() = %d, want 125", got)
	}
}

func TestGetDirectoryGroups(t *testing.T) {
	t.Parallel()
	paths := []string{
		"/p/a/x.ts",
		"/p/a/y.ts",
		"/p/b/c/z.ts",
		"/p/b/w.ts",
		"/p/lib.d.ts",
		"/p/big.ts",
	}
	weights := []int{10, 10, 10, 10, 0, 40}
	// The declaration file is not type checked, so it is not in order.
	order := []int{0, 1, 2, 3, 5}
	// Total weight 80 over 2 checkers: groups hold at most 80/(2*4) = 10 units,
	// so /p/a and /p/b are split, and /p/b/c becomes a group.
	groupOf, groupWeights := getDirectoryGroups(paths, weights, order, 2)
	if want := []int{0, 1, 2, 3, -1, 4}; !slices.Equal(groupOf, want) {
		t.Fatalf("groupOf = %v, want %v", groupOf, want)
	}
	if want := []int{10, 10, 10, 10, 40}; !slices.Equal(groupWeights, want) {
		t.Fatalf("groupWeights = %v, want %v", groupWeights, want)
	}
	// With one checker the threshold is 20, which /p/a and /p/b fit.
	groupOf, groupWeights = getDirectoryGroups(paths, weights, order, 1)
	if want := []int{0, 0, 1, 1, -1, 2}; !slices.Equal(groupOf, want) {
		t.Fatalf("groupOf = %v, want %v", groupOf, want)
	}
	if want := []int{20, 20, 40}; !slices.Equal(groupWeights, want) {
		t.Fatalf("groupWeights = %v, want %v", groupWeights, want)
	}
}

func TestGetCheckerAssociationWeights(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name         string
		baseWeights  []int
		importCounts []int
		want         []int
	}{
		{
			name:         "normalizes import work to syntax work",
			baseWeights:  []int{100, 50, 25},
			importCounts: []int{0, 1, 3},
			want:         []int{100, 93, 154},
		},
		{
			name:         "no imports preserves base weights",
			baseWeights:  []int{100, 50, 25},
			importCounts: []int{0, 0, 0},
			want:         []int{100, 50, 25},
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			got := getCheckerAssociationWeights(test.baseWeights, test.importCounts)
			if !slices.Equal(got, test.want) {
				t.Fatalf("getCheckerAssociationWeights(%v, %v) = %v, want %v", test.baseWeights, test.importCounts, got, test.want)
			}
		})
	}
}

func TestGetCheckerAssociations(t *testing.T) {
	t.Parallel()

	t.Run("empty", func(t *testing.T) {
		t.Parallel()
		if got := getCheckerAssociationsInOrder(nil, nil, nil, 4, checkerAssociationPenaltyMultiplier); got != nil {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want nil", got)
		}
	})

	t.Run("balances disconnected files", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 1, 1, 1, 1, 1},
			make([][]int, 6),
			nil,
			3,
			1,
		)
		want := []int{0, 1, 2, 0, 1, 2}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("uses program order", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 3, 2},
			make([][]int, 3),
			nil,
			2,
			1,
		)
		want := []int{0, 1, 0}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("keeps dense components together", func(t *testing.T) {
		t.Parallel()
		got := getCheckerAssociationsInOrder(
			[]int{1, 1, 1, 1, 1, 1},
			[][]int{
				{1, 2},
				{0, 2},
				{0, 1},
				{4, 5},
				{3, 5},
				{3, 4},
			},
			nil,
			2,
			1,
		)
		want := []int{0, 0, 0, 1, 1, 1}
		if !slices.Equal(got, want) {
			t.Fatalf("getCheckerAssociationsInOrder() = %v, want %v", got, want)
		}
	})

	t.Run("respects weighted balance cap", func(t *testing.T) {
		t.Parallel()
		weights := []int{8, 7, 6, 5, 4, 3, 2, 1}
		got := getCheckerAssociationsInOrder(weights, make([][]int, len(weights)), nil, 3, 1)
		loads := make([]int, 3)
		for i, checkerIndex := range got {
			loads[checkerIndex] += weights[i]
		}
		for checkerIndex, load := range loads {
			if load > 13 {
				t.Fatalf("checker %d load = %d, want at most 13; associations = %v", checkerIndex, load, got)
			}
		}
	})
}
