import "./sourceMapSupport";
import { Times } from "../times";
import { theory, recordError } from "./utils";
import { assert } from "chai";

describe("times", () => {
    function makeTimesNoneValidationData(): any[][]{
        return [
            [0, true],
            [1, false]
        ];
    }

    theory("Times.none validation", makeTimesNoneValidationData, function (count: number, expected: boolean): void {
        // arrange
        const times = Times.none();

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expected, result);
    });

    function makeTimesOnceValidationData(): any[][]{
        return [
            [0, false],
            [1, true],
            [2, false]
        ];
    }

    theory("Times.once validation", makeTimesOnceValidationData, function (count: number, expected: boolean): void {
        // arrange
        const times = Times.once();

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expected, result);
    });

    function makeTimesAtLeastOnceValidationData(): any[] {
        return [
            [0, false],
            [1, true],
            [2, true]
        ];
    }

    theory("Times.atLeastOnce validation", makeTimesAtLeastOnceValidationData, function (count: number, expected: boolean): void {
        // arrange
        const times = Times.atLeastOnce();

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expected, result);
    });

    function makeTimesAtMostOnceValidationData(): any[][]{
        return [
            [0, true],
            [1, true],
            [2, false]
        ];
    }

    theory("Times.atMostOnce validation", makeTimesAtMostOnceValidationData, function (count: number, expected: boolean): void {
        // arrange
        const times = Times.atMostOnce();

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expected, result);
    });

    function makeTimesExactlyValidationData(): any[][]{
        return [
            [0, 0, true],
            [0, 1, false],
            [1, 0, false],
            [1, 1, true]];
    }

    theory("Times.exactly validation", makeTimesExactlyValidationData, function (expectedCount: number, count: number, expectedResult: boolean): void {
        // arrange
        const times = Times.exactly(expectedCount);

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expectedResult, result);
    });

    function makeTimesAtLeastValidationData(): any[][]{
        return [
            [0, 0, true],
            [0, 1, true],
            [1, 0, false],
            [1, 1, true],
            [1, 2, true]
        ];
    }

    theory("Times.atLeast validation", makeTimesAtLeastValidationData, function (expectedCount: number, count: number, expectedResult: boolean): void {
        // arrange
        const times = Times.atLeast(expectedCount);

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expectedResult, result);
    });

    function makeTimesAtMostValidationData(): any[][]{
        return [
            [0, 0, true],
            [0, 1, false],
            [1, 0, true],
            [1, 1, true],
            [1, 2, false]
        ];
    }

    theory("Times.atMost validation", makeTimesAtMostValidationData, function (expectedCount: number, count: number, expectedResult: boolean): void {
        // arrange
        const times = Times.atMost(expectedCount);

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expectedResult, result);
    });

    function makeTimesBetweenValidationData(): any[][]{
        return [
            [1, 2, 0, false],
            [1, 2, 1, true],
            [1, 2, 2, true],
            [1, 2, 3, false]
        ];
    }

    theory("Times.between validation", makeTimesBetweenValidationData, function (min: number, max: number, count: number, expectedResult: boolean): void {
        // arrange
        const times = Times.between(min, max);

        // act
        const result = times.validate(count);

        // assert
        assert.equal(expectedResult, result);
    });

    function makeTimesToStringData(): any[][]{
        return [
            [Times.none(), "<never>"],
            [Times.once(), "<exactly once>"],
            [Times.atLeastOnce(), "<at least once>"],
            [Times.atMostOnce(), "<at most once>"],
            [Times.atLeast(2), "<at least 2 time(s)>"],
            [Times.atMost(2), "<at most 2 time(s)>"],
            [Times.exactly(2), "<exactly 2 time(s)>"],
            [Times.between(1, 2), "<between 1 and 2 time(s)>"]
        ];
    }

    theory("Times.toString", makeTimesToStringData, function (times: Times, expected: string): void {
        // arrange
        // act
        const result = times.toString();

        // assert
        assert.equal(expected, result);
    });

    function makeTimesCheckThrowsData(): any[][]{
        return [
            [Times.none(), 1],
            [Times.once(), 0],
            [Times.once(), 2],
            [Times.atLeastOnce(), 0],
            [Times.atMostOnce(), 2],
            [Times.atLeast(2), 1],
            [Times.atMost(2), 3],
            [Times.exactly(1), 0],
            [Times.exactly(1), 2],
            [Times.between(1, 2), 0],
            [Times.between(1, 2), 3]
        ]
    }

    theory("Times.check throws", makeTimesCheckThrowsData, (times: Times, count: number) => {
        // arrange
        // act
        const e = recordError(() => times.check(count, "test"));

        // assert
        assert.instanceOf(e, Error);
    });

    function makeTimesCheckPassesData(): any[][] {
        return [
            [Times.none(), 0],
            [Times.once(), 1],
            [Times.atLeastOnce(), 1],
            [Times.atLeastOnce(), 2],
            [Times.atMostOnce(), 1],
            [Times.atMostOnce(), 0],
            [Times.atLeast(2), 2],
            [Times.atLeast(2), 3],
            [Times.atMost(2), 2],
            [Times.atMost(2), 1],
            [Times.exactly(1), 1],
            [Times.between(1, 2), 1],
            [Times.between(1, 2), 2]
        ];
    }

    theory("Times.check passes", makeTimesCheckPassesData, (times: Times, count: number) => {
        // arrange
        // act
        const e = recordError(() => times.check(count, "test"));

        // assert
        assert.isUndefined(e);
    });
});