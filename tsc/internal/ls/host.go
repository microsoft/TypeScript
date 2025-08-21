package ls

import (
	"github.com/microsoft/typescript-go/internal/compiler"
)

type Host interface {
	GetProgram() *compiler.Program
}
