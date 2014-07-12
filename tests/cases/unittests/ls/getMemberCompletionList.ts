///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

//todo: rewrite as fs test?

describe('getMemberCompletionList', function ()
{
    var code: string = Harness.readFile('cases/ls/memberlist.ts');
    var errOut = new Harness.Compiler.WriterAggregator();
    var stdOut = new Harness.Compiler.WriterAggregator();
    var script: TypeScript.Script = null;
    var ls: TypeScript.TypeScriptCompiler = null;

    function initCompiler(code: string)
    {
        if (!script)
        {
            ls = new TypeScript.TypeScriptCompiler(errOut);
            ls.parser.errorRecovery = true;
            ls.settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            ls.settings.controlFlow = true;
            ls.settings.controlFlowUseDef = true;
            TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Synchronous;
            ls.addUnit(Harness.Compiler.libText, 'lib.d.ts', true);
            script = ls.addUnit(code, 'test.ts');
            ls.typeCheck();
        }
    }

    function namesAndTypesAtPos(code: string, line: number, col: number)
    {
        initCompiler(code);

        var lineMap = script.locationInfo.lineMap;
        var offset = lineMap[line - 1] + col;
        var text = new TypeScript.StringSourceText(code);
        var pos = offset;
        var isMemberCompletion = false;
        var logger = new TypeScript.NullLogger();
        var enclosingScopeContext = TypeScript.findEnclosingScopeAt(logger, script, text, pos, isMemberCompletion);
        return new TypeScript.ScopeTraversal(ls).getScopeEntries(enclosingScopeContext);
    }

    function memberCompletionAtPos(code: string, line: number, col: number)
    {
        initCompiler(code);

        var lineMap = script.locationInfo.lineMap;
        var offset = lineMap[line - 1] + col;

        var text = new TypeScript.StringSourceText(code);
        var pos = offset;
        var isMemberCompletion = true;
        var logger = new TypeScript.NullLogger();
        var enclosingScopeContext = TypeScript.findEnclosingScopeAt(logger, script, text, pos, isMemberCompletion);
        return new TypeScript.ScopeTraversal(ls).getScopeEntries(enclosingScopeContext);
    }

    function verifyNumberOfMembers(namesAndTypes: TypeScript.ScopeEntry[], count: number)
    {
        var names = namesAndTypes;

        if (names.length !== count)
        {
            throw new Error("Expected " + count + " items, got " + names.length + " instead.");
        }
    }

    function verifyNamesAndTypes(namesAndTypes: TypeScript.ScopeEntry[], spec: any)
    {
        var found: boolean;
        var names = namesAndTypes;

        for (name in spec)
        {
            found = false;

            for (var i = 0; i < names.length; i++)
            {
                if (names[i].name === name)
                {
                    found = true;

                    if (names[i].type !== spec[name])
                    {
                        throw new Error("Expected " + name + " to be of type " + spec[name] + ", is of type " + names[i].type);
                    }

                    break;
                }
            }

            if (!found)
                throw new Error("Expected to find name '" + name + "'");
        }
    }

    describe('member completion', function ()
    {
        it("get members of classes", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 9, 5);

            verifyNumberOfMembers(namesAndTypes, 3);
            verifyNamesAndTypes(namesAndTypes, {
                'csVar': 'number',
                'csFunc': '() => void',
                'prototype': 'cls1'
            });
        });

        it("get members of functions", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 18, 5);

            verifyNumberOfMembers(namesAndTypes, 3);
            verifyNamesAndTypes(namesAndTypes, {
                'arguments': 'IArguments',
                'foovar': 'any',
                'foosfunc': '() => void'
            });
        });

        it("get members of module", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 33, 5);

            verifyNumberOfMembers(namesAndTypes, 5);
            verifyNamesAndTypes(namesAndTypes, {
                'meX': 'number',
                'meFunc': '() => void',
                'meClass': 'new() => mod1.meClass',
                'meMod': 'mod1.meMod',
                'meInt': 'mod1.meInt'
            });
        });

        it("get members of objects", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 51, 5);

            verifyNumberOfMembers(namesAndTypes, 2);
            verifyNamesAndTypes(namesAndTypes, {
                'bar': 'any',
                'foob': '(bar: any) => any'
            });
        });

        it("get members of class instances", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 54, 5);

            verifyNumberOfMembers(namesAndTypes, 2);
            verifyNamesAndTypes(namesAndTypes, {
                'ceFunc': '() => void',
                'ceVar': 'number'
            });
        });

        it("get members of the super", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 58, 14);

            verifyNumberOfMembers(namesAndTypes, 2);
            verifyNamesAndTypes(namesAndTypes, {
                'ceFunc': '() => void',
                'ceVar': 'number'
            });
        });


        it("get members of nested module", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 85, 24);

            verifyNumberOfMembers(namesAndTypes, 5);
            verifyNamesAndTypes(namesAndTypes, {
                'meX': 'number',
                'meFunc': '() => void',
                'meClass': 'new() => mod1.meClass',
                'meMod': 'mod1.meMod',
                'meInt': 'mod1.meInt'
            });
        });

        it("get members of from module variable", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 86, 9);

            verifyNumberOfMembers(namesAndTypes, 5);
            verifyNamesAndTypes(namesAndTypes, {
                'meX': 'number',
                'meFunc': '() => void',
                'meClass': 'new() => mod1.meClass',
                'meMod': 'mod1.meMod',
                'meInt': 'mod1.meInt'
            });
        });

        it("get members of nested from module variable", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 87, 10);

            verifyNumberOfMembers(namesAndTypes, 1);
            verifyNamesAndTypes(namesAndTypes, {
                'iMex': 'number',
            });
        });

        it("get members after invalid character", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 95, 11);

            verifyNumberOfMembers(namesAndTypes, 1);
            verifyNamesAndTypes(namesAndTypes, {
                'foo': 'number',
            });
        });

        it("get members of variable before keyword in named type", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 102, 20);

            verifyNumberOfMembers(namesAndTypes, 2);
            verifyNamesAndTypes(namesAndTypes, {
                'C1': 'new() => TypeModule1.C1',
                'C2': 'new() => TypeModule1.C2'
            });
        });

        it("get members of variable before keyword in doted expression", function ()
        {
            var namesAndTypes = memberCompletionAtPos(code, 108, 12);

            verifyNumberOfMembers(namesAndTypes, 2);
            verifyNamesAndTypes(namesAndTypes, {
                'C1': 'new() => TypeModule1.C1',
                'C2': 'new() => TypeModule1.C2'
            });
        });
    });
});
