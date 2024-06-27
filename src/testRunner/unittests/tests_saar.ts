import * as debug from "../../compiler/debug.js";
import { SyntaxKind, AssertionLevel } from "../_namespaces/ts.js";

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

    it('reaches the if statement', () => {
        expect(debug.Debug.branch_coverage.get('assertOptionalToken_1')).to.equal(true);
    });

    after(() => {
        debug.Debug.setAssertionLevel(prev);
      });

});

describe("in function assertMissingNode and in if", () => {
    const node: undefined = undefined;
    const prev: AssertionLevel = debug.Debug.getAssertionLevel();

    before(() => {
        debug.Debug.setAssertionLevel(AssertionLevel.Normal);
        debug.Debug.assertMissingNode(node);
    });

    it('should reach function assertMissingNode', () => {
        expect(debug.Debug.branch_coverage.get('assertMissingNode_0')).to.equal(true);
    });

    it('reaches the if statement', () => {
        expect(debug.Debug.branch_coverage.get('assertMissingNode_1')).to.equal(true);
    });

    after(() => {
        debug.Debug.setAssertionLevel(prev);
      });

});

