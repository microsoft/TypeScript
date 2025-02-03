package execute

import "github.com/microsoft/typescript-go/internal/tsoptions"

func CommandLineTest(sys System, cb cbType, commandLineArgs []string) (*tsoptions.ParsedCommandLine, ExitStatus) {
	parsedCommandLine := tsoptions.ParseCommandLine(commandLineArgs, sys)
	return parsedCommandLine, executeCommandLineWorker(sys, cb, parsedCommandLine)
}
