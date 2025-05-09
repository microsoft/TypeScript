package tsoptions

var typeAcquisitionDeclaration = &CommandLineOption{
	Name:           "typeAcquisition",
	Kind:           CommandLineOptionTypeObject,
	ElementOptions: commandLineOptionsToMap(typeAcquisitionDecls),
}

// Do not delete this without updating the website's tsconfig generation.
var typeAcquisitionDecls = []*CommandLineOption{
	{
		Name:                    "enable",
		Kind:                    CommandLineOptionTypeBoolean,
		DefaultValueDescription: false,
	},
	{
		Name: "include",
		Kind: CommandLineOptionTypeList,
	},
	{
		Name: "exclude",
		Kind: CommandLineOptionTypeList,
	},
	{
		Name:                    "disableFilenameBasedTypeAcquisition",
		Kind:                    CommandLineOptionTypeBoolean,
		DefaultValueDescription: false,
	},
}
