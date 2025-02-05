package tsoptions

import (
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
)

var optionsForWatch = []*CommandLineOption{
	{
		Name: "watchFile",
		Kind: CommandLineOptionTypeEnum,
		// new Map(Object.entries({
		//     fixedpollinginterval: WatchFileKind.FixedPollingInterval,
		//     prioritypollinginterval: WatchFileKind.PriorityPollingInterval,
		//     dynamicprioritypolling: WatchFileKind.DynamicPriorityPolling,
		//     fixedchunksizepolling: WatchFileKind.FixedChunkSizePolling,
		//     usefsevents: WatchFileKind.UseFsEvents,
		//     usefseventsonparentdirectory: WatchFileKind.UseFsEventsOnParentDirectory,
		// })),
		Category:                diagnostics.Watch_and_Build_Modes,
		Description:             diagnostics.Specify_how_the_TypeScript_watch_mode_works,
		DefaultValueDescription: core.WatchFileKindUseFsEvents,
	},
	{
		Name: "watchDirectory",
		Kind: CommandLineOptionTypeEnum,
		// new Map(Object.entries({
		//     usefsevents: WatchDirectoryKind.UseFsEvents,
		//     fixedpollinginterval: WatchDirectoryKind.FixedPollingInterval,
		//     dynamicprioritypolling: WatchDirectoryKind.DynamicPriorityPolling,
		//     fixedchunksizepolling: WatchDirectoryKind.FixedChunkSizePolling,
		// })),
		Category:                diagnostics.Watch_and_Build_Modes,
		Description:             diagnostics.Specify_how_directories_are_watched_on_systems_that_lack_recursive_file_watching_functionality,
		DefaultValueDescription: core.WatchDirectoryKindUseFsEvents,
	},
	{
		Name: "fallbackPolling",
		Kind: CommandLineOptionTypeEnum,
		// new Map(Object.entries({
		//     fixedinterval: PollingWatchKind.FixedInterval,
		//     priorityinterval: PollingWatchKind.PriorityInterval,
		//     dynamicpriority: PollingWatchKind.DynamicPriority,
		//     fixedchunksize: PollingWatchKind.FixedChunkSize,
		// })),
		Category:                diagnostics.Watch_and_Build_Modes,
		Description:             diagnostics.Specify_what_approach_the_watcher_should_use_if_the_system_runs_out_of_native_file_watchers,
		DefaultValueDescription: core.PollingKindPriorityInterval,
	},
	{
		Name:                    "synchronousWatchDirectory",
		Kind:                    CommandLineOptionTypeBoolean,
		Category:                diagnostics.Watch_and_Build_Modes,
		Description:             diagnostics.Synchronously_call_callbacks_and_update_the_state_of_directory_watchers_on_platforms_that_don_t_support_recursive_watching_natively,
		DefaultValueDescription: false,
	},
	{
		Name: "excludeDirectories",
		Kind: CommandLineOptionTypeList,
		// element: {
		//     Name: "excludeDirectory",
		//     Kind: "string",
		//     isFilePath: true,
		//     extraValidation: specToDiagnostic,
		// },
		allowConfigDirTemplateSubstitution: true,
		Category:                           diagnostics.Watch_and_Build_Modes,
		Description:                        diagnostics.Remove_a_list_of_directories_from_the_watch_process,
	},
	{
		Name: "excludeFiles",
		Kind: CommandLineOptionTypeList,
		// element: {
		//     Name: "excludeFile",
		//     Kind: "string",
		//     isFilePath: true,
		//     extraValidation: specToDiagnostic,
		// },
		allowConfigDirTemplateSubstitution: true,
		Category:                           diagnostics.Watch_and_Build_Modes,
		Description:                        diagnostics.Remove_a_list_of_files_from_the_watch_mode_s_processing,
	},
}
