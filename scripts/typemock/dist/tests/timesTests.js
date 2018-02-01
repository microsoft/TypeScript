"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./sourceMapSupport");
const times_1 = require("../times");
const utils_1 = require("./utils");
const chai_1 = require("chai");
describe("times", () => {
    function makeTimesNoneValidationData() {
        return [
            [0, true],
            [1, false]
        ];
    }
    utils_1.theory("Times.none validation", makeTimesNoneValidationData, function (count, expected) {
        // arrange
        const times = times_1.Times.none();
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expected, result);
    });
    function makeTimesOnceValidationData() {
        return [
            [0, false],
            [1, true],
            [2, false]
        ];
    }
    utils_1.theory("Times.once validation", makeTimesOnceValidationData, function (count, expected) {
        // arrange
        const times = times_1.Times.once();
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expected, result);
    });
    function makeTimesAtLeastOnceValidationData() {
        return [
            [0, false],
            [1, true],
            [2, true]
        ];
    }
    utils_1.theory("Times.atLeastOnce validation", makeTimesAtLeastOnceValidationData, function (count, expected) {
        // arrange
        const times = times_1.Times.atLeastOnce();
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expected, result);
    });
    function makeTimesAtMostOnceValidationData() {
        return [
            [0, true],
            [1, true],
            [2, false]
        ];
    }
    utils_1.theory("Times.atMostOnce validation", makeTimesAtMostOnceValidationData, function (count, expected) {
        // arrange
        const times = times_1.Times.atMostOnce();
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expected, result);
    });
    function makeTimesExactlyValidationData() {
        return [
            [0, 0, true],
            [0, 1, false],
            [1, 0, false],
            [1, 1, true]
        ];
    }
    utils_1.theory("Times.exactly validation", makeTimesExactlyValidationData, function (expectedCount, count, expectedResult) {
        // arrange
        const times = times_1.Times.exactly(expectedCount);
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expectedResult, result);
    });
    function makeTimesAtLeastValidationData() {
        return [
            [0, 0, true],
            [0, 1, true],
            [1, 0, false],
            [1, 1, true],
            [1, 2, true]
        ];
    }
    utils_1.theory("Times.atLeast validation", makeTimesAtLeastValidationData, function (expectedCount, count, expectedResult) {
        // arrange
        const times = times_1.Times.atLeast(expectedCount);
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expectedResult, result);
    });
    function makeTimesAtMostValidationData() {
        return [
            [0, 0, true],
            [0, 1, false],
            [1, 0, true],
            [1, 1, true],
            [1, 2, false]
        ];
    }
    utils_1.theory("Times.atMost validation", makeTimesAtMostValidationData, function (expectedCount, count, expectedResult) {
        // arrange
        const times = times_1.Times.atMost(expectedCount);
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expectedResult, result);
    });
    function makeTimesBetweenValidationData() {
        return [
            [1, 2, 0, false],
            [1, 2, 1, true],
            [1, 2, 2, true],
            [1, 2, 3, false]
        ];
    }
    utils_1.theory("Times.between validation", makeTimesBetweenValidationData, function (min, max, count, expectedResult) {
        // arrange
        const times = times_1.Times.between(min, max);
        // act
        const result = times.validate(count);
        // assert
        chai_1.assert.equal(expectedResult, result);
    });
    function makeTimesToStringData() {
        return [
            [times_1.Times.none(), "<never>"],
            [times_1.Times.once(), "<exactly once>"],
            [times_1.Times.atLeastOnce(), "<at least once>"],
            [times_1.Times.atMostOnce(), "<at most once>"],
            [times_1.Times.atLeast(2), "<at least 2 time(s)>"],
            [times_1.Times.atMost(2), "<at most 2 time(s)>"],
            [times_1.Times.exactly(2), "<exactly 2 time(s)>"],
            [times_1.Times.between(1, 2), "<between 1 and 2 time(s)>"]
        ];
    }
    utils_1.theory("Times.toString", makeTimesToStringData, function (times, expected) {
        // arrange
        // act
        const result = times.toString();
        // assert
        chai_1.assert.equal(expected, result);
    });
    function makeTimesCheckThrowsData() {
        return [
            [times_1.Times.none(), 1],
            [times_1.Times.once(), 0],
            [times_1.Times.once(), 2],
            [times_1.Times.atLeastOnce(), 0],
            [times_1.Times.atMostOnce(), 2],
            [times_1.Times.atLeast(2), 1],
            [times_1.Times.atMost(2), 3],
            [times_1.Times.exactly(1), 0],
            [times_1.Times.exactly(1), 2],
            [times_1.Times.between(1, 2), 0],
            [times_1.Times.between(1, 2), 3]
        ];
    }
    utils_1.theory("Times.check throws", makeTimesCheckThrowsData, (times, count) => {
        // arrange
        // act
        const e = utils_1.recordError(() => times.check(count, "test"));
        // assert
        chai_1.assert.instanceOf(e, Error);
    });
    function makeTimesCheckPassesData() {
        return [
            [times_1.Times.none(), 0],
            [times_1.Times.once(), 1],
            [times_1.Times.atLeastOnce(), 1],
            [times_1.Times.atLeastOnce(), 2],
            [times_1.Times.atMostOnce(), 1],
            [times_1.Times.atMostOnce(), 0],
            [times_1.Times.atLeast(2), 2],
            [times_1.Times.atLeast(2), 3],
            [times_1.Times.atMost(2), 2],
            [times_1.Times.atMost(2), 1],
            [times_1.Times.exactly(1), 1],
            [times_1.Times.between(1, 2), 1],
            [times_1.Times.between(1, 2), 2]
        ];
    }
    utils_1.theory("Times.check passes", makeTimesCheckPassesData, (times, count) => {
        // arrange
        // act
        const e = utils_1.recordError(() => times.check(count, "test"));
        // assert
        chai_1.assert.isUndefined(e);
    });
});

//# sourceMappingURL=timesTests.js.map
