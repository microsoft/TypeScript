package autoimport_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil/baseline"
)

func TestMain(m *testing.M) {
	defer baseline.Track()()
	m.Run()
}
