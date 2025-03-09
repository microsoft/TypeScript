package core

type WatchOptions struct {
	Interval        *int               `json:"watchInterval"`
	FileKind        WatchFileKind      `json:"watchFile"`
	DirectoryKind   WatchDirectoryKind `json:"watchDirectory"`
	FallbackPolling PollingKind        `json:"fallbackPolling"`
	SyncWatchDir    Tristate           `json:"synchronousWatchDirectory"`
	ExcludeDir      []string           `json:"excludeDirectories"`
	ExcludeFiles    []string           `json:"excludeFiles"`
}

type WatchFileKind int32

const (
	WatchFileKindNone                         WatchFileKind = 0
	WatchFileKindFixedPollingInterval         WatchFileKind = 1
	WatchFileKindPriorityPollingInterval      WatchFileKind = 2
	WatchFileKindDynamicPriorityPolling       WatchFileKind = 3
	WatchFileKindFixedChunkSizePolling        WatchFileKind = 4
	WatchFileKindUseFsEvents                  WatchFileKind = 5
	WatchFileKindUseFsEventsOnParentDirectory WatchFileKind = 6
)

type WatchDirectoryKind int32

const (
	WatchDirectoryKindNone                   WatchDirectoryKind = 0
	WatchDirectoryKindUseFsEvents            WatchDirectoryKind = 1
	WatchDirectoryKindFixedPollingInterval   WatchDirectoryKind = 2
	WatchDirectoryKindDynamicPriorityPolling WatchDirectoryKind = 3
	WatchDirectoryKindFixedChunkSizePolling  WatchDirectoryKind = 4
)

type PollingKind int32

const (
	PollingKindNone             PollingKind = 0
	PollingKindFixedInterval    PollingKind = 1
	PollingKindPriorityInterval PollingKind = 2
	PollingKindDynamicPriority  PollingKind = 3
	PollingKindFixedChunkSize   PollingKind = 4
)
