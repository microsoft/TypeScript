///<reference path='references.ts' />

/* @internal */
namespace ts.formatting {
    export class RuleDescriptor {
        constructor(public LeftTokenRange: Shared.TokenRange, public RightTokenRange: Shared.TokenRange) {
        }

        public toString(): string {
            return "[leftRange=" + this.LeftTokenRange + "," +
                "rightRange=" + this.RightTokenRange + "]";
        }

        static create1(left: SyntaxKind, right: SyntaxKind): RuleDescriptor {
            return RuleDescriptor.create4(Shared.TokenRange.FromToken(left), Shared.TokenRange.FromToken(right));
        }

        static create2(left: Shared.TokenRange, right: SyntaxKind): RuleDescriptor {
            return RuleDescriptor.create4(left, Shared.TokenRange.FromToken(right));
        }

        static create3(left: SyntaxKind, right: Shared.TokenRange): RuleDescriptor {
            return RuleDescriptor.create4(Shared.TokenRange.FromToken(left), right);
        }

        static create4(left: Shared.TokenRange, right: Shared.TokenRange): RuleDescriptor {
            return new RuleDescriptor(left, right);
        }
    }
}