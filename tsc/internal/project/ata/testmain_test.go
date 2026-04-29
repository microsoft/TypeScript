package ata_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

func TestMain(m *testing.M) {
	core.ApplyDebugStackLimit()
	defer baseline.Track()()
	m.Run()
}
