///<reference path='..\..\..\..\src\compiler\typescript.ts' />
///<reference path='..\..\..\..\src\harness\harness.ts' />

// todo: rewrite as fs test?

describe('getInScopeNamesAndTypesFromPosition', function ()
{
    var code: string = Harness.readFile('cases/ls/scopelist.ts');
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

    function verifyEmptyList(namesAndTypes: TypeScript.ScopeEntry[])
    {
        var names = namesAndTypes;
        if (names.length > 0)
        {
            throw new Error("Item contains more then expected. Expected 0, had " + names.length);
        }
    }

    function verifyNotListed(namesAndTypes: TypeScript.ScopeEntry[], spec: any)
    {
        var found: boolean;
        var names = namesAndTypes;

        for (var item in spec)
        {
            found = false;
            for (var i = 0; i < names.length; i++)
            {
                if (names[i] === spec[item])
                {
                    throw new Error("Expected to not have " + spec[item] + " on the list");
                }
            }
        }
    }

    describe('scope completion', function ()
    {
        it("gets names from global scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 1, 0);

            verifyNotListed(namesAndTypes, [
                'mod1var',
                'mod1fn',
                'mod1cls',
                'mod1int',
                'mod1mod',
                'mod1evar',
                'mod1efn',
                'mod1ecls',
                'mod1eint',
                'mod1emod',
                'mod1eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1': 'mod1',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint'
            });
        });

        it("gets names from module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 4, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'mod1exvar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'mod2': 'mod2',
                'mod3': 'mod3'
            });
        });

        it("gets names from function scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 244, 0);

            verifyNotListed(namesAndTypes, [
                'mod1var',
                'mod1fn',
                'mod1cls',
                'mod1int',
                'mod1mod',
                'mod1evar',
                'mod1efn',
                'mod1ecls',
                'mod1eint',
                'mod1emod',
                'mod1eexvar',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'sfvar': 'number',
                'sffn': '() => void'
            });
        });

        it("gets types from class scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 250, 0);

            verifyNotListed(namesAndTypes, [
                'mod1var',
                'mod1fn',
                'mod1cls',
                'mod1int',
                'mod1mod',
                'mod1evar',
                'mod1efn',
                'mod1ecls',
                'mod1eint',
                'mod1emod',
                'mod1eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'sivar',
                'sifn',
                'scpfn',
                'scpvar'
            ]);
        });

        it("gets types from interface scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 260, 0);

            verifyNotListed(namesAndTypes, [
                'mod1var',
                'mod1fn',
                'mod1cls',
                'mod1int',
                'mod1mod',
                'mod1evar',
                'mod1efn',
                'mod1ecls',
                'mod1eint',
                'mod1emod',
                'mod1eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'sivar': 'any',
                'sifn': '(bar: any) => any'
            });
        });

        it("gets types from function inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 6, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'mod1exvar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'bar': 'number',
                'foob': '() => void',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint'
            });
        });


        it("gets types from class inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 12, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'foovar',
                'foosfunc',
                'mod1exvar',
                'ceFunc',
                'ceVar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
            });
        });


        it("gets types from interface inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 20, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'foovar',
                'foosfunc'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'bar': 'any',
                'foob': '(bar: any) => any'
            });
        });

        it("gets types from exported function inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 6, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'mod1exvar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'bar': 'number',
                'foob': '() => void',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint'
            });
        });

        it("gets types from an exported class inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 34, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'foovar',
                'foosfunc',
                'mod1exvar',
                'ceFunc',
                'ceVar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint'
                //                'csVar': 'number',
                //                'csFunc': '() => void'
            });
        });

        it("gets types from exported interface inside a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 42, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'foovar',
                'foosfunc'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'bar': 'any',
                'foob': '(bar: any) => any'
            });
        });

        it("gets names from module in a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 49, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'mod1exvar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'm1X': 'number',
                'm1Func': 'm1Func',
                'm1Class': '{ csVar: number; csFunc(): void; new(): m1Class; }',
                'm1Int': 'm1Int',
                'm1Mod': 'm1Mod',
                'm1eX': 'number',
                'm1eFunc': 'm1eFunc',
                'm1eClass': '{ csVar: number; csFunc(): void; new(): m1eClass; }',
                'm1eInt': 'm1eInt',
                'm1eMod': 'm1eMod'
            });
        });

        it("gets names from an exported module in a module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 95, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn',
                'mod1exvar'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1var': 'number',
                'mod1fn': 'mod1fn',
                'mod1cls': '{ csVar: number; csFunc(): void; new(): mod1cls; }',
                'mod1int': 'mod1int',
                'mod1mod': 'mod1mod',
                'mod1evar': 'number',
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'mod2': 'mod2',
                'mod3': 'mod3',

                'mX': 'number',
                'mFunc': 'mFunc',
                'mClass': '{ csVar: number; csFunc(): void; new(): mClass; }',
                'mInt': 'mInt',
                'mMod': 'mMod',
                'meX': 'number',
                'meFunc': 'meFunc',
                'meClass': '{ csVar: number; csFunc(): void; new(): meClass; }',
                'meInt': 'meInt',
                'meMod': 'meMod'
            });
        });

        it("gets names from an extended module scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 143, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1efn': 'mod1efn',
                'mod1ecls': '{ csVar: number; csFunc(): void; new(): mod1ecls; }',
                'mod1eint': 'mod1eint',
                'mod1emod': 'mod1emod',
                'mod1eexvar': 'number',
                'mod1exvar': 'number',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'mod2': 'mod2',
                'mod3': 'mod3'
            });
        });

        it("gets names from a module with from", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 277, 0);

            verifyNotListed(namesAndTypes, [
                'mod1var',
                'mod1fn',
                'mod1cls',
                'mod1int',
                'mod1mod',
                'mod1evar',
                'mod1efn',
                'mod1ecls',
                'mod1eint',
                'mod1emod',
                'mod1eexvar',
                'mX',
                'mFunc',
                'mClass',
                'mInt',
                'mMod',
                'meX',
                'meFunc',
                'meClass',
                'meInt',
                'meMod',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1': 'mod1',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'string',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
            });
        });

        it("gets names from a shadow module with no export", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 194, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'shwvar': 'string',
                'shwfn': 'shwfn',
                'shwcls': '{ csVar: number; csFunc(): void; new(shadow: any): shwcls; }',
                'shwint': 'shwint',
            });
        });

        it("gets names from a shadow module with export", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 219, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'shwvar': 'string',
                'shwfn': 'shwfn',
                'shwcls': '{ csVar: number; csFunc(): void; new(shadow: any): shwcls; }',
                'shwint': 'shwint',
            });
        });

        it("gets names from extended class scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 4, 0);

            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint',
                'mod2': 'mod2',
                'mod3': 'mod3'
            });
        });

        it("checks for the type of shadow var (#1)", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 280, 0);

            verifyNamesAndTypes(namesAndTypes, {
                'shwvar': 'string'
            });
        });

        it("checks for the type of shadow var (#2)", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 281, 0);

            verifyNamesAndTypes(namesAndTypes, {
                'shwvar': 'string'
            });
        });

        it("gets names from object literal scope", function ()
        {
            var namesAndTypes = namesAndTypesAtPos(code, 287, 0);
            verifyNotListed(namesAndTypes, [
                'mod2var',
                'mod2fn',
                'mod2cls',
                'mod2int',
                'mod2mod',
                'mod2evar',
                'mod2efn',
                'mod2ecls',
                'mod2eint',
                'mod2emod',
                'mod2eexvar',
                'mod1exvar',
                'sfvar',
                'sffn',
                'sfsvar',
                'sfsfn',
                'scvar',
                'scfn',
                'scpfn',
                'scpvar',
                'scsvar',
                'scsfn',
                'sivar',
                'sifn'
            ]);

            verifyNamesAndTypes(namesAndTypes, {
                'mod1': 'mod1',
                'mod2': 'mod2',
                'mod3': 'mod3',
                'shwvar': 'number',
                'shwfn': 'shwfn',
                'shwcls': '{ scsvar: number; scsfn(): void; new(): shwcls; }',
                'shwint': 'shwint'
            });
        });
    });
});
