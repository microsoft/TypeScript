import "./sourceMapSupport";
import { Mock } from "../mock";
import { Inject } from "../inject";
import { Times } from "../times";
import { assert } from "chai";

describe("inject", () => {
    it("install replaces value", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);

        // act
        inject.install();

        // assert
        mock.verify(_ => _.a = 2, Times.once());
    });
    it("install is installed", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);

        // act
        inject.install();

        // assert
        assert.isTrue(inject.installed);
    });
    it("install twice only installs once", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);

        // act
        inject.install();
        inject.install();

        // assert
        mock.verify(_ => _.a = 2, Times.once());
    });
    it("uninstall restores value", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);
        inject.install();

        // act
        inject.uninstall();

        // assert
        mock.verify(_ => _.a = 1, Times.once());
    });
    it("uninstall is not installed", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);
        inject.install();

        // act
        inject.uninstall();

        // assert
        assert.isFalse(inject.installed);
    });
    it("uninstall twice only uninstalls once", () => {
        // arrange
        const mock = new Mock({ a: 1 });
        const inject = new Inject(mock.proxy, "a", 2);
        inject.install();

        // act
        inject.uninstall();
        inject.uninstall();

        // assert
        mock.verify(_ => _.a = 1, Times.once());
    });
});
