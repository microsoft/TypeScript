import "./sourceMapSupport";
import { Mock } from "../mock";
import { Stub } from "../stub";
import { Times } from "../times";
import { assert } from "chai";

describe("stub", () => {
    it("stub install replaces value", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);

        // act
        stub.install();

        // assert
        mock.verify(_ => _.a = 2, Times.once());
    });
    it("stub install is installed", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);

        // act
        stub.install();

        // assert
        assert.isTrue(stub.installed);
    });
    it("stub install twice only installs once", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);

        // act
        stub.install();
        stub.install();

        // assert
        mock.verify(_ => _.a = 2, Times.once());
    });
    it("stub uninstall restores value", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);
        stub.install();

        // act
        stub.uninstall();

        // assert
        mock.verify(_ => _.a = 1, Times.once());
    });
    it("stub uninstall is not installed", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);
        stub.install();

        // act
        stub.uninstall();

        // assert
        assert.isFalse(stub.installed);
    });
    it("stub uninstall twice only uninstalls once", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const stub = new Stub(mock.value, "a", 2);
        stub.install();

        // act
        stub.uninstall();
        stub.uninstall();

        // assert
        mock.verify(_ => _.a = 1, Times.once());
    });
});
