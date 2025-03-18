package tsoptions

import (
	"slices"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
)

var BuildOpts = slices.Concat(commonOptionsWithBuild, optionsForBuild)

var TscBuildOption = CommandLineOption{
	Name:                     "build",
	Kind:                     "boolean",
	ShortName:                "b",
	ShowInSimplifiedHelpView: true,
	Category:                 diagnostics.Command_line_Options,
	Description:              diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date,
	DefaultValueDescription:  false,
}

var optionsForBuild = []*CommandLineOption{
	&TscBuildOption,
	{
		Name:                    "verbose",
		ShortName:               "v",
		Category:                diagnostics.Command_line_Options,
		Description:             diagnostics.Enable_verbose_logging,
		Kind:                    "boolean",
		DefaultValueDescription: false,
	},
	{
		Name:                    "dry",
		ShortName:               "d",
		Category:                diagnostics.Command_line_Options,
		Description:             diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
		Kind:                    "boolean",
		DefaultValueDescription: false,
	},
	{
		Name:                    "force",
		ShortName:               "f",
		Category:                diagnostics.Command_line_Options,
		Description:             diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
		Kind:                    "boolean",
		DefaultValueDescription: false,
	},
	{
		Name:                    "clean",
		Category:                diagnostics.Command_line_Options,
		Description:             diagnostics.Delete_the_outputs_of_all_projects,
		Kind:                    "boolean",
		DefaultValueDescription: false,
	},
	{
		Name:                    "stopBuildOnErrors",
		Category:                diagnostics.Command_line_Options,
		Description:             diagnostics.Skip_building_downstream_projects_on_error_in_upstream_project,
		Kind:                    "boolean",
		DefaultValueDescription: false,
	},
}
