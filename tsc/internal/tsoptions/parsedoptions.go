package tsoptions

import (
	"github.com/microsoft/typescript-go/internal/contentmapper"
	"github.com/microsoft/typescript-go/internal/core"
)

type ParsedOptions struct {
	CompilerOptions *core.CompilerOptions `json:"compilerOptions"`
	WatchOptions    *core.WatchOptions    `json:"watchOptions"`
	TypeAcquisition *core.TypeAcquisition `json:"typeAcquisition"`

	FileNames         []string                 `json:"fileNames"`
	ProjectReferences []*core.ProjectReference `json:"projectReferences"`
	ContentMappers    []*contentmapper.Mapper  `json:"contentMappers"`
}
