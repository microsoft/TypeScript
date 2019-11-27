// This file actually uses arguments passed on commandline and executes it
ts.executeCommandLine(
    ts.sys,
    {
        onCompilerHostCreate: ts.noop,
        onCompilationComplete: ts.noop,
        onSolutionBuilderHostCreate: ts.noop,
        onSolutionBuildComplete: ts.noop
    },
    ts.sys.args
);
