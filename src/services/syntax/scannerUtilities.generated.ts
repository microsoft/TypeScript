///<reference path='references.ts' />

module TypeScript {
    export module ScannerUtilities {
        export function fixedWidthTokenLength(kind: SyntaxKind) {
            switch (kind) {
                case SyntaxKind.BreakKeyword: return 5;
                case SyntaxKind.CaseKeyword: return 4;
                case SyntaxKind.CatchKeyword: return 5;
                case SyntaxKind.ContinueKeyword: return 8;
                case SyntaxKind.DebuggerKeyword: return 8;
                case SyntaxKind.DefaultKeyword: return 7;
                case SyntaxKind.DeleteKeyword: return 6;
                case SyntaxKind.DoKeyword: return 2;
                case SyntaxKind.ElseKeyword: return 4;
                case SyntaxKind.FalseKeyword: return 5;
                case SyntaxKind.FinallyKeyword: return 7;
                case SyntaxKind.ForKeyword: return 3;
                case SyntaxKind.FunctionKeyword: return 8;
                case SyntaxKind.IfKeyword: return 2;
                case SyntaxKind.InKeyword: return 2;
                case SyntaxKind.InstanceOfKeyword: return 10;
                case SyntaxKind.NewKeyword: return 3;
                case SyntaxKind.NullKeyword: return 4;
                case SyntaxKind.ReturnKeyword: return 6;
                case SyntaxKind.SwitchKeyword: return 6;
                case SyntaxKind.ThisKeyword: return 4;
                case SyntaxKind.ThrowKeyword: return 5;
                case SyntaxKind.TrueKeyword: return 4;
                case SyntaxKind.TryKeyword: return 3;
                case SyntaxKind.TypeOfKeyword: return 6;
                case SyntaxKind.VarKeyword: return 3;
                case SyntaxKind.VoidKeyword: return 4;
                case SyntaxKind.WhileKeyword: return 5;
                case SyntaxKind.WithKeyword: return 4;
                case SyntaxKind.ClassKeyword: return 5;
                case SyntaxKind.ConstKeyword: return 5;
                case SyntaxKind.EnumKeyword: return 4;
                case SyntaxKind.ExportKeyword: return 6;
                case SyntaxKind.ExtendsKeyword: return 7;
                case SyntaxKind.ImportKeyword: return 6;
                case SyntaxKind.SuperKeyword: return 5;
                case SyntaxKind.ImplementsKeyword: return 10;
                case SyntaxKind.InterfaceKeyword: return 9;
                case SyntaxKind.LetKeyword: return 3;
                case SyntaxKind.PackageKeyword: return 7;
                case SyntaxKind.PrivateKeyword: return 7;
                case SyntaxKind.ProtectedKeyword: return 9;
                case SyntaxKind.PublicKeyword: return 6;
                case SyntaxKind.StaticKeyword: return 6;
                case SyntaxKind.YieldKeyword: return 5;
                case SyntaxKind.AnyKeyword: return 3;
                case SyntaxKind.BooleanKeyword: return 7;
                case SyntaxKind.ConstructorKeyword: return 11;
                case SyntaxKind.DeclareKeyword: return 7;
                case SyntaxKind.GetKeyword: return 3;
                case SyntaxKind.ModuleKeyword: return 6;
                case SyntaxKind.RequireKeyword: return 7;
                case SyntaxKind.NumberKeyword: return 6;
                case SyntaxKind.SetKeyword: return 3;
                case SyntaxKind.StringKeyword: return 6;
                case SyntaxKind.OpenBraceToken: return 1;
                case SyntaxKind.CloseBraceToken: return 1;
                case SyntaxKind.OpenParenToken: return 1;
                case SyntaxKind.CloseParenToken: return 1;
                case SyntaxKind.OpenBracketToken: return 1;
                case SyntaxKind.CloseBracketToken: return 1;
                case SyntaxKind.DotToken: return 1;
                case SyntaxKind.DotDotDotToken: return 3;
                case SyntaxKind.SemicolonToken: return 1;
                case SyntaxKind.CommaToken: return 1;
                case SyntaxKind.LessThanToken: return 1;
                case SyntaxKind.GreaterThanToken: return 1;
                case SyntaxKind.LessThanEqualsToken: return 2;
                case SyntaxKind.GreaterThanEqualsToken: return 2;
                case SyntaxKind.EqualsEqualsToken: return 2;
                case SyntaxKind.EqualsGreaterThanToken: return 2;
                case SyntaxKind.ExclamationEqualsToken: return 2;
                case SyntaxKind.EqualsEqualsEqualsToken: return 3;
                case SyntaxKind.ExclamationEqualsEqualsToken: return 3;
                case SyntaxKind.PlusToken: return 1;
                case SyntaxKind.MinusToken: return 1;
                case SyntaxKind.AsteriskToken: return 1;
                case SyntaxKind.PercentToken: return 1;
                case SyntaxKind.PlusPlusToken: return 2;
                case SyntaxKind.MinusMinusToken: return 2;
                case SyntaxKind.LessThanLessThanToken: return 2;
                case SyntaxKind.GreaterThanGreaterThanToken: return 2;
                case SyntaxKind.GreaterThanGreaterThanGreaterThanToken: return 3;
                case SyntaxKind.AmpersandToken: return 1;
                case SyntaxKind.BarToken: return 1;
                case SyntaxKind.CaretToken: return 1;
                case SyntaxKind.ExclamationToken: return 1;
                case SyntaxKind.TildeToken: return 1;
                case SyntaxKind.AmpersandAmpersandToken: return 2;
                case SyntaxKind.BarBarToken: return 2;
                case SyntaxKind.QuestionToken: return 1;
                case SyntaxKind.ColonToken: return 1;
                case SyntaxKind.EqualsToken: return 1;
                case SyntaxKind.PlusEqualsToken: return 2;
                case SyntaxKind.MinusEqualsToken: return 2;
                case SyntaxKind.AsteriskEqualsToken: return 2;
                case SyntaxKind.PercentEqualsToken: return 2;
                case SyntaxKind.LessThanLessThanEqualsToken: return 3;
                case SyntaxKind.GreaterThanGreaterThanEqualsToken: return 3;
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken: return 4;
                case SyntaxKind.AmpersandEqualsToken: return 2;
                case SyntaxKind.BarEqualsToken: return 2;
                case SyntaxKind.CaretEqualsToken: return 2;
                case SyntaxKind.SlashToken: return 1;
                case SyntaxKind.SlashEqualsToken: return 2;
                default: throw new Error();
            }
        }

        export function identifierKind(str: string, start: number, length: number): SyntaxKind {
            switch (length) {
              case 2: // do, if, in
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.d: return (str.charCodeAt(start + 1) === CharacterCodes.o) ? SyntaxKind.DoKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.i: // if, in
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.f: return SyntaxKind.IfKeyword;
                      case CharacterCodes.n: return SyntaxKind.InKeyword;
                      default: return SyntaxKind.IdentifierName;
                    }
                  default: return SyntaxKind.IdentifierName;
                }
              case 3: // any, for, get, let, new, set, try, var
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.a: return (str.charCodeAt(start + 1) === CharacterCodes.n && str.charCodeAt(start + 2) === CharacterCodes.y) ? SyntaxKind.AnyKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.f: return (str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.r) ? SyntaxKind.ForKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.g: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.t) ? SyntaxKind.GetKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.l: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.t) ? SyntaxKind.LetKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.n: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.w) ? SyntaxKind.NewKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.s: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.t) ? SyntaxKind.SetKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.t: return (str.charCodeAt(start + 1) === CharacterCodes.r && str.charCodeAt(start + 2) === CharacterCodes.y) ? SyntaxKind.TryKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.v: return (str.charCodeAt(start + 1) === CharacterCodes.a && str.charCodeAt(start + 2) === CharacterCodes.r) ? SyntaxKind.VarKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 4: // case, else, enum, null, this, true, void, with
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.c: return (str.charCodeAt(start + 1) === CharacterCodes.a && str.charCodeAt(start + 2) === CharacterCodes.s && str.charCodeAt(start + 3) === CharacterCodes.e) ? SyntaxKind.CaseKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.e: // else, enum
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.l: return (str.charCodeAt(start + 2) === CharacterCodes.s && str.charCodeAt(start + 3) === CharacterCodes.e) ? SyntaxKind.ElseKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.n: return (str.charCodeAt(start + 2) === CharacterCodes.u && str.charCodeAt(start + 3) === CharacterCodes.m) ? SyntaxKind.EnumKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.n: return (str.charCodeAt(start + 1) === CharacterCodes.u && str.charCodeAt(start + 2) === CharacterCodes.l && str.charCodeAt(start + 3) === CharacterCodes.l) ? SyntaxKind.NullKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.t: // this, true
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.h: return (str.charCodeAt(start + 2) === CharacterCodes.i && str.charCodeAt(start + 3) === CharacterCodes.s) ? SyntaxKind.ThisKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.r: return (str.charCodeAt(start + 2) === CharacterCodes.u && str.charCodeAt(start + 3) === CharacterCodes.e) ? SyntaxKind.TrueKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.v: return (str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.i && str.charCodeAt(start + 3) === CharacterCodes.d) ? SyntaxKind.VoidKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.w: return (str.charCodeAt(start + 1) === CharacterCodes.i && str.charCodeAt(start + 2) === CharacterCodes.t && str.charCodeAt(start + 3) === CharacterCodes.h) ? SyntaxKind.WithKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 5: // break, catch, class, const, false, super, throw, while, yield
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.b: return (str.charCodeAt(start + 1) === CharacterCodes.r && str.charCodeAt(start + 2) === CharacterCodes.e && str.charCodeAt(start + 3) === CharacterCodes.a && str.charCodeAt(start + 4) === CharacterCodes.k) ? SyntaxKind.BreakKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.c: // catch, class, const
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.a: return (str.charCodeAt(start + 2) === CharacterCodes.t && str.charCodeAt(start + 3) === CharacterCodes.c && str.charCodeAt(start + 4) === CharacterCodes.h) ? SyntaxKind.CatchKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.l: return (str.charCodeAt(start + 2) === CharacterCodes.a && str.charCodeAt(start + 3) === CharacterCodes.s && str.charCodeAt(start + 4) === CharacterCodes.s) ? SyntaxKind.ClassKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.o: return (str.charCodeAt(start + 2) === CharacterCodes.n && str.charCodeAt(start + 3) === CharacterCodes.s && str.charCodeAt(start + 4) === CharacterCodes.t) ? SyntaxKind.ConstKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.f: return (str.charCodeAt(start + 1) === CharacterCodes.a && str.charCodeAt(start + 2) === CharacterCodes.l && str.charCodeAt(start + 3) === CharacterCodes.s && str.charCodeAt(start + 4) === CharacterCodes.e) ? SyntaxKind.FalseKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.s: return (str.charCodeAt(start + 1) === CharacterCodes.u && str.charCodeAt(start + 2) === CharacterCodes.p && str.charCodeAt(start + 3) === CharacterCodes.e && str.charCodeAt(start + 4) === CharacterCodes.r) ? SyntaxKind.SuperKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.t: return (str.charCodeAt(start + 1) === CharacterCodes.h && str.charCodeAt(start + 2) === CharacterCodes.r && str.charCodeAt(start + 3) === CharacterCodes.o && str.charCodeAt(start + 4) === CharacterCodes.w) ? SyntaxKind.ThrowKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.w: return (str.charCodeAt(start + 1) === CharacterCodes.h && str.charCodeAt(start + 2) === CharacterCodes.i && str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.e) ? SyntaxKind.WhileKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.y: return (str.charCodeAt(start + 1) === CharacterCodes.i && str.charCodeAt(start + 2) === CharacterCodes.e && str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.d) ? SyntaxKind.YieldKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 6: // delete, export, import, module, number, public, return, static, string, switch, typeof
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.d: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.l && str.charCodeAt(start + 3) === CharacterCodes.e && str.charCodeAt(start + 4) === CharacterCodes.t && str.charCodeAt(start + 5) === CharacterCodes.e) ? SyntaxKind.DeleteKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.e: return (str.charCodeAt(start + 1) === CharacterCodes.x && str.charCodeAt(start + 2) === CharacterCodes.p && str.charCodeAt(start + 3) === CharacterCodes.o && str.charCodeAt(start + 4) === CharacterCodes.r && str.charCodeAt(start + 5) === CharacterCodes.t) ? SyntaxKind.ExportKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.i: return (str.charCodeAt(start + 1) === CharacterCodes.m && str.charCodeAt(start + 2) === CharacterCodes.p && str.charCodeAt(start + 3) === CharacterCodes.o && str.charCodeAt(start + 4) === CharacterCodes.r && str.charCodeAt(start + 5) === CharacterCodes.t) ? SyntaxKind.ImportKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.m: return (str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.d && str.charCodeAt(start + 3) === CharacterCodes.u && str.charCodeAt(start + 4) === CharacterCodes.l && str.charCodeAt(start + 5) === CharacterCodes.e) ? SyntaxKind.ModuleKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.n: return (str.charCodeAt(start + 1) === CharacterCodes.u && str.charCodeAt(start + 2) === CharacterCodes.m && str.charCodeAt(start + 3) === CharacterCodes.b && str.charCodeAt(start + 4) === CharacterCodes.e && str.charCodeAt(start + 5) === CharacterCodes.r) ? SyntaxKind.NumberKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.p: return (str.charCodeAt(start + 1) === CharacterCodes.u && str.charCodeAt(start + 2) === CharacterCodes.b && str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.i && str.charCodeAt(start + 5) === CharacterCodes.c) ? SyntaxKind.PublicKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.r: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.t && str.charCodeAt(start + 3) === CharacterCodes.u && str.charCodeAt(start + 4) === CharacterCodes.r && str.charCodeAt(start + 5) === CharacterCodes.n) ? SyntaxKind.ReturnKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.s: // static, string, switch
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.t: // static, string
                        switch(str.charCodeAt(start + 2)) {
                          case CharacterCodes.a: return (str.charCodeAt(start + 3) === CharacterCodes.t && str.charCodeAt(start + 4) === CharacterCodes.i && str.charCodeAt(start + 5) === CharacterCodes.c) ? SyntaxKind.StaticKeyword : SyntaxKind.IdentifierName;
                          case CharacterCodes.r: return (str.charCodeAt(start + 3) === CharacterCodes.i && str.charCodeAt(start + 4) === CharacterCodes.n && str.charCodeAt(start + 5) === CharacterCodes.g) ? SyntaxKind.StringKeyword : SyntaxKind.IdentifierName;
                          default: return SyntaxKind.IdentifierName;
                        }
                      case CharacterCodes.w: return (str.charCodeAt(start + 2) === CharacterCodes.i && str.charCodeAt(start + 3) === CharacterCodes.t && str.charCodeAt(start + 4) === CharacterCodes.c && str.charCodeAt(start + 5) === CharacterCodes.h) ? SyntaxKind.SwitchKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.t: return (str.charCodeAt(start + 1) === CharacterCodes.y && str.charCodeAt(start + 2) === CharacterCodes.p && str.charCodeAt(start + 3) === CharacterCodes.e && str.charCodeAt(start + 4) === CharacterCodes.o && str.charCodeAt(start + 5) === CharacterCodes.f) ? SyntaxKind.TypeOfKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 7: // boolean, declare, default, extends, finally, package, private, require
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.b: return (str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.o && str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.e && str.charCodeAt(start + 5) === CharacterCodes.a && str.charCodeAt(start + 6) === CharacterCodes.n) ? SyntaxKind.BooleanKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.d: // declare, default
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.e: // declare, default
                        switch(str.charCodeAt(start + 2)) {
                          case CharacterCodes.c: return (str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.a && str.charCodeAt(start + 5) === CharacterCodes.r && str.charCodeAt(start + 6) === CharacterCodes.e) ? SyntaxKind.DeclareKeyword : SyntaxKind.IdentifierName;
                          case CharacterCodes.f: return (str.charCodeAt(start + 3) === CharacterCodes.a && str.charCodeAt(start + 4) === CharacterCodes.u && str.charCodeAt(start + 5) === CharacterCodes.l && str.charCodeAt(start + 6) === CharacterCodes.t) ? SyntaxKind.DefaultKeyword : SyntaxKind.IdentifierName;
                          default: return SyntaxKind.IdentifierName;
                        }
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.e: return (str.charCodeAt(start + 1) === CharacterCodes.x && str.charCodeAt(start + 2) === CharacterCodes.t && str.charCodeAt(start + 3) === CharacterCodes.e && str.charCodeAt(start + 4) === CharacterCodes.n && str.charCodeAt(start + 5) === CharacterCodes.d && str.charCodeAt(start + 6) === CharacterCodes.s) ? SyntaxKind.ExtendsKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.f: return (str.charCodeAt(start + 1) === CharacterCodes.i && str.charCodeAt(start + 2) === CharacterCodes.n && str.charCodeAt(start + 3) === CharacterCodes.a && str.charCodeAt(start + 4) === CharacterCodes.l && str.charCodeAt(start + 5) === CharacterCodes.l && str.charCodeAt(start + 6) === CharacterCodes.y) ? SyntaxKind.FinallyKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.p: // package, private
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.a: return (str.charCodeAt(start + 2) === CharacterCodes.c && str.charCodeAt(start + 3) === CharacterCodes.k && str.charCodeAt(start + 4) === CharacterCodes.a && str.charCodeAt(start + 5) === CharacterCodes.g && str.charCodeAt(start + 6) === CharacterCodes.e) ? SyntaxKind.PackageKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.r: return (str.charCodeAt(start + 2) === CharacterCodes.i && str.charCodeAt(start + 3) === CharacterCodes.v && str.charCodeAt(start + 4) === CharacterCodes.a && str.charCodeAt(start + 5) === CharacterCodes.t && str.charCodeAt(start + 6) === CharacterCodes.e) ? SyntaxKind.PrivateKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  case CharacterCodes.r: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.q && str.charCodeAt(start + 3) === CharacterCodes.u && str.charCodeAt(start + 4) === CharacterCodes.i && str.charCodeAt(start + 5) === CharacterCodes.r && str.charCodeAt(start + 6) === CharacterCodes.e) ? SyntaxKind.RequireKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 8: // continue, debugger, function
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.c: return (str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.n && str.charCodeAt(start + 3) === CharacterCodes.t && str.charCodeAt(start + 4) === CharacterCodes.i && str.charCodeAt(start + 5) === CharacterCodes.n && str.charCodeAt(start + 6) === CharacterCodes.u && str.charCodeAt(start + 7) === CharacterCodes.e) ? SyntaxKind.ContinueKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.d: return (str.charCodeAt(start + 1) === CharacterCodes.e && str.charCodeAt(start + 2) === CharacterCodes.b && str.charCodeAt(start + 3) === CharacterCodes.u && str.charCodeAt(start + 4) === CharacterCodes.g && str.charCodeAt(start + 5) === CharacterCodes.g && str.charCodeAt(start + 6) === CharacterCodes.e && str.charCodeAt(start + 7) === CharacterCodes.r) ? SyntaxKind.DebuggerKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.f: return (str.charCodeAt(start + 1) === CharacterCodes.u && str.charCodeAt(start + 2) === CharacterCodes.n && str.charCodeAt(start + 3) === CharacterCodes.c && str.charCodeAt(start + 4) === CharacterCodes.t && str.charCodeAt(start + 5) === CharacterCodes.i && str.charCodeAt(start + 6) === CharacterCodes.o && str.charCodeAt(start + 7) === CharacterCodes.n) ? SyntaxKind.FunctionKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 9: // interface, protected
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.i: return (str.charCodeAt(start + 1) === CharacterCodes.n && str.charCodeAt(start + 2) === CharacterCodes.t && str.charCodeAt(start + 3) === CharacterCodes.e && str.charCodeAt(start + 4) === CharacterCodes.r && str.charCodeAt(start + 5) === CharacterCodes.f && str.charCodeAt(start + 6) === CharacterCodes.a && str.charCodeAt(start + 7) === CharacterCodes.c && str.charCodeAt(start + 8) === CharacterCodes.e) ? SyntaxKind.InterfaceKeyword : SyntaxKind.IdentifierName;
                  case CharacterCodes.p: return (str.charCodeAt(start + 1) === CharacterCodes.r && str.charCodeAt(start + 2) === CharacterCodes.o && str.charCodeAt(start + 3) === CharacterCodes.t && str.charCodeAt(start + 4) === CharacterCodes.e && str.charCodeAt(start + 5) === CharacterCodes.c && str.charCodeAt(start + 6) === CharacterCodes.t && str.charCodeAt(start + 7) === CharacterCodes.e && str.charCodeAt(start + 8) === CharacterCodes.d) ? SyntaxKind.ProtectedKeyword : SyntaxKind.IdentifierName;
                  default: return SyntaxKind.IdentifierName;
                }
              case 10: // implements, instanceof
                switch(str.charCodeAt(start)) {
                  case CharacterCodes.i: // implements, instanceof
                    switch(str.charCodeAt(start + 1)) {
                      case CharacterCodes.m: return (str.charCodeAt(start + 2) === CharacterCodes.p && str.charCodeAt(start + 3) === CharacterCodes.l && str.charCodeAt(start + 4) === CharacterCodes.e && str.charCodeAt(start + 5) === CharacterCodes.m && str.charCodeAt(start + 6) === CharacterCodes.e && str.charCodeAt(start + 7) === CharacterCodes.n && str.charCodeAt(start + 8) === CharacterCodes.t && str.charCodeAt(start + 9) === CharacterCodes.s) ? SyntaxKind.ImplementsKeyword : SyntaxKind.IdentifierName;
                      case CharacterCodes.n: return (str.charCodeAt(start + 2) === CharacterCodes.s && str.charCodeAt(start + 3) === CharacterCodes.t && str.charCodeAt(start + 4) === CharacterCodes.a && str.charCodeAt(start + 5) === CharacterCodes.n && str.charCodeAt(start + 6) === CharacterCodes.c && str.charCodeAt(start + 7) === CharacterCodes.e && str.charCodeAt(start + 8) === CharacterCodes.o && str.charCodeAt(start + 9) === CharacterCodes.f) ? SyntaxKind.InstanceOfKeyword : SyntaxKind.IdentifierName;
                      default: return SyntaxKind.IdentifierName;
                    }
                  default: return SyntaxKind.IdentifierName;
                }
              case 11: return (str.charCodeAt(start) === CharacterCodes.c && str.charCodeAt(start + 1) === CharacterCodes.o && str.charCodeAt(start + 2) === CharacterCodes.n && str.charCodeAt(start + 3) === CharacterCodes.s && str.charCodeAt(start + 4) === CharacterCodes.t && str.charCodeAt(start + 5) === CharacterCodes.r && str.charCodeAt(start + 6) === CharacterCodes.u && str.charCodeAt(start + 7) === CharacterCodes.c && str.charCodeAt(start + 8) === CharacterCodes.t && str.charCodeAt(start + 9) === CharacterCodes.o && str.charCodeAt(start + 10) === CharacterCodes.r) ? SyntaxKind.ConstructorKeyword : SyntaxKind.IdentifierName;
              default: return SyntaxKind.IdentifierName;
            }
        }
    }
}