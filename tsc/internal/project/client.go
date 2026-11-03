package project

import (
	"cmp"
	"context"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Client interface {
	WatchFiles(ctx context.Context, id WatcherID, watchers []*lsproto.FileSystemWatcher) error
	UnwatchFiles(ctx context.Context, id WatcherID) error
	RegisterContentMapperSelectors(ctx context.Context, selectors []ContentMapperSelector) error
	RefreshDiagnostics(ctx context.Context) error
	PublishDiagnostics(ctx context.Context, params *lsproto.PublishDiagnosticsParams) error
	RefreshInlayHints(ctx context.Context) error
	RefreshCodeLens(ctx context.Context) error
	ProgressStart(message *diagnostics.Message, args ...any)
	ProgressFinish(message *diagnostics.Message, args ...any)
	SendTelemetry(ctx context.Context, telemetry lsproto.TelemetryEvent) error
	IsActive() bool
	// SetLocale updates the locale used for diagnostic messages.
	SetLocale(locale string)
	// GetLocale returns the current display locale for diagnostic messages.
	GetLocale() locale.Locale
}

type ContentMapperSelector struct {
	Base      tspath.RootedDirectoryPath // Empty for workspace-independent patterns.
	Pattern   string
	Extension string // Used for conservative file-operation filters.
}

func ContentMapperExtensionPattern(extension string) string {
	return "**/*" + extension
}

func compareContentMapperSelectors(a, b ContentMapperSelector) int {
	return cmp.Or(cmp.Compare(a.Base, b.Base), cmp.Compare(a.Pattern, b.Pattern), cmp.Compare(a.Extension, b.Extension))
}
