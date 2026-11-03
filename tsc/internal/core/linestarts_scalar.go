//go:build !goexperiment.simd

package core

import (
	"slices"
	"strings"
)

func computeECMALineStarts(text string) ECMALineStarts {
	result := make([]TextPos, 0, strings.Count(text, "\n")+1)
	return slices.AppendSeq(result, ComputeECMALineStartsSeq(text))
}
