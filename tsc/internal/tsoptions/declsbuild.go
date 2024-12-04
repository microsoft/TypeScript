package tsoptions

import "github.com/microsoft/typescript-go/internal/compiler/diagnostics"

var tscBuildOption = CommandLineOption{
	Name:                     "build",
	Kind:                     "boolean",
	shortName:                "b",
	showInSimplifiedHelpView: true,
	category:                 diagnostics.Command_line_Options,
	description:              diagnostics.Build_one_or_more_projects_and_their_dependencies_if_out_of_date,
	defaultValueDescription:  false,
}

var optionsForBuild = []*CommandLineOption{
	&tscBuildOption,
	{
		Name:                    "verbose",
		shortName:               "v",
		category:                diagnostics.Command_line_Options,
		description:             diagnostics.Enable_verbose_logging,
		Kind:                    "boolean",
		defaultValueDescription: false,
	},
	{
		Name:                    "dry",
		shortName:               "d",
		category:                diagnostics.Command_line_Options,
		description:             diagnostics.Show_what_would_be_built_or_deleted_if_specified_with_clean,
		Kind:                    "boolean",
		defaultValueDescription: false,
	},
	{
		Name:                    "force",
		shortName:               "f",
		category:                diagnostics.Command_line_Options,
		description:             diagnostics.Build_all_projects_including_those_that_appear_to_be_up_to_date,
		Kind:                    "boolean",
		defaultValueDescription: false,
	},
	{
		Name:                    "clean",
		category:                diagnostics.Command_line_Options,
		description:             diagnostics.Delete_the_outputs_of_all_projects,
		Kind:                    "boolean",
		defaultValueDescription: false,
	},
	{
		Name:                    "stopBuildOnErrors",
		category:                diagnostics.Command_line_Options,
		description:             diagnostics.Skip_building_downstream_projects_on_error_in_upstream_project,
		Kind:                    "boolean",
		defaultValueDescription: false,
	},
}
