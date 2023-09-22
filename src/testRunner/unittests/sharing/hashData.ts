import { HashData } from "../../../compiler/sharing/collections/hashData";

describe("unittests:: sharing:: hashData", () => {
    describe("findEntryIndex", () => {
        it("when empty", () => {
            const hashData = new HashData(0);
            expect(HashData.findEntryIndex(hashData, 0)).to.equal(-1);
        });
        it("when has element", () => {
            const hashData = new HashData(0);
            HashData.insertEntry(hashData, "a", "a");
            expect(HashData.findEntryIndex(hashData, "a")).to.equal(0);
        });
    });
});