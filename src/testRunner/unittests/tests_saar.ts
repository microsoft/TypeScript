import * as debug from "../../compiler/debug.js";
import { SyntaxKind, AssertionLevel } from "../_namespaces/ts.js";


describe("in function assertOptionalToken and not in if", () => {
    const kind: SyntaxKind = SyntaxKind.Identifier;
    const node: undefined = undefined;
    before(() => {
        debug.Debug.assertOptionalToken(node, kind);
    });

    it('should reach function assertOptionalToken', () => {
        expect(debug.Debug.branch_coverage.get('assertOptionalToken_0')).to.equal(true);
    });

    it('should not reach the if statement', () => {
        expect(debug.Debug.branch_coverage.get('assertOptionalToken_1')).not.to.equal(true);
    });

});

describe("in function assertOptionalToken and in if", () => {
    const kind: SyntaxKind = SyntaxKind.Identifier;
    const node: undefined = undefined;
    const prev: AssertionLevel = debug.Debug.getAssertionLevel();

    before(() => {
        debug.Debug.setAssertionLevel(AssertionLevel.Normal);
        debug.Debug.assertOptionalToken(node, kind);
    });

    it('should reach function assertOptionalToken', () => {
        expect(debug.Debug.branch_coverage.get('assertOptionalToken_0')).to.equal(true);
    });

    it('should not reach the if statement', () => {
        expect(debug.Debug.branch_coverage.get('assertOptionalToken_1')).to.equal(true);
    });

    after(() => {
        debug.Debug.setAssertionLevel(prev);
      });

});

// branch_coverage.set('assertOptionalToken_0', true);
// 339            0 :         if (shouldAssertFunction(AssertionLevel.Normal, "assertOptionalToken")) {
// 340            0 :             branch_coverage.set('assertOptionalToken_1', true);
// 341            0 :             assert(
// 342            0 :                 kind === undefined || node === undefined || node.kind === kind,
// 343            0 :                 message || "Unexpected node.",
// 344            0 :                 () => `Node ${formatSyntaxKind(node?.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
// 345            0 :                 stackCrawlMark || assertOptionalToken,
// 346            0 :             );
// 347            0 :         }
// 348            0 :     }

// function shouldAssertFunction<K extends AssertionKeys>(level: AssertionLevel, name: K): boolean {
//     187     20728131 :         if (!shouldAssert(level)) {
//     188            0 :             assertionCache[name] = { level, assertion: Debug[name] };
//     189            0 :             (Debug as any)[name] = noop;
//     190            0 :             return false;
//     191            0 :         }
//     192     20728131 :         return true;
//     193     20728131 :     }

// export function shouldAssert(level: AssertionLevel): boolean {
//     177     21005832 :         return currentAssertionLevel >= level;
//     178     21005832 :     }
//     179            8 : 
