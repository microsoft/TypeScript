import { ModifierFlags } from "#enums/modifierFlags";
import { SyntaxKind } from "#enums/syntaxKind";

export function modifierToFlag(kind: SyntaxKind): ModifierFlags {
    switch (kind) {
        case SyntaxKind.StaticKeyword:
            return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword:
            return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword:
            return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword:
            return ModifierFlags.Private;
        case SyntaxKind.AbstractKeyword:
            return ModifierFlags.Abstract;
        case SyntaxKind.AccessorKeyword:
            return ModifierFlags.Accessor;
        case SyntaxKind.ExportKeyword:
            return ModifierFlags.Export;
        case SyntaxKind.DeclareKeyword:
            return ModifierFlags.Ambient;
        case SyntaxKind.ConstKeyword:
            return ModifierFlags.Const;
        case SyntaxKind.DefaultKeyword:
            return ModifierFlags.Default;
        case SyntaxKind.AsyncKeyword:
            return ModifierFlags.Async;
        case SyntaxKind.ReadonlyKeyword:
            return ModifierFlags.Readonly;
        case SyntaxKind.OverrideKeyword:
            return ModifierFlags.Override;
        case SyntaxKind.InKeyword:
            return ModifierFlags.In;
        case SyntaxKind.OutKeyword:
            return ModifierFlags.Out;
        case SyntaxKind.Decorator:
            return ModifierFlags.Decorator;
        default:
            return ModifierFlags.None;
    }
}
