"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./sourceMapSupport");
const mock_1 = require("../mock");
const inject_1 = require("../inject");
const times_1 = require("../times");
const chai_1 = require("chai");
describe("inject", () => {
    it("install replaces value", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        // act
        inject.install();
        // assert
        mock.verify(_ => _.a = 2, times_1.Times.once());
    });
    it("install is installed", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        // act
        inject.install();
        // assert
        chai_1.assert.isTrue(inject.installed);
    });
    it("install twice only installs once", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        // act
        inject.install();
        inject.install();
        // assert
        mock.verify(_ => _.a = 2, times_1.Times.once());
    });
    it("uninstall restores value", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        inject.install();
        // act
        inject.uninstall();
        // assert
        mock.verify(_ => _.a = 1, times_1.Times.once());
    });
    it("uninstall is not installed", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        inject.install();
        // act
        inject.uninstall();
        // assert
        chai_1.assert.isFalse(inject.installed);
    });
    it("uninstall twice only uninstalls once", () => {
        // arrange
        const mock = new mock_1.Mock({ a: 1 });
        const inject = new inject_1.Inject(mock.proxy, "a", 2);
        inject.install();
        // act
        inject.uninstall();
        inject.uninstall();
        // assert
        mock.verify(_ => _.a = 1, times_1.Times.once());
    });
});

//# sourceMappingURL=injectTests.js.map
