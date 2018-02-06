/// <reference path="./harness.ts" />
declare namespace Chai {
    interface ChaiStatic {
        util: UtilStatic;
    }

    interface UtilStatic {
        objDisplay(obj: any): string;
    }

    interface AssertStatic {
        sameMembers<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string): void;
        notSameMembers<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string): void;
        includeMembersOnce<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string): void;
        includeMembers<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string): void;
        notIncludeMembers<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string): void;
    }
}

// patch assert.sameMembers to support other iterables
_chai.use((chai: Chai.ChaiStatic, util: Chai.UtilStatic) => {
    function isIdenticalTo<T>(left: Iterable<T>, right: Iterable<T>) {
        if (!(left instanceof core.SortedSet) && right instanceof core.SortedSet) {
            [left, right] = [right, left];
        }

        const set = asReadonlySet(left);
        const seen = set instanceof core.SortedSet ? new core.SortedSet<T>(set.comparer) : new Set<T>();
        const iterator = Array.isArray(right) ? ts.arrayIterator(right) : right[Symbol.iterator]();
        for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
            if (!set.has(value)) return false;
            seen.add(value);
        }
        return set.size === seen.size;
    }

    function isSubsetOf<T>(subset: Iterable<T>, superset: Iterable<T>, unique?: boolean) {
        const set = asReadonlySet(superset);
        const seen = unique ? set instanceof core.SortedSet ? new core.SortedSet<T>(set.comparer) : new Set<T>() : undefined;
        const iterator = Array.isArray(subset) ? ts.arrayIterator(subset) : subset[Symbol.iterator]();
        for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
            if (!set.has(value)) return false;
            if (seen) {
                if (seen.has(value)) return false;
                seen.add(value);
            }
        }
        return true;
    }

    function overlaps<T>(left: Iterable<T>, right: Iterable<T>) {
        if (!(left instanceof core.SortedSet) && right instanceof core.SortedSet) {
            [left, right] = [right, left];
        }

        const set = asReadonlySet(left);
        const iterator = Array.isArray(right) ? ts.arrayIterator(right) : right[Symbol.iterator]();
        for (let { value, done } = iterator.next(); !done; { value, done } = iterator.next()) {
            if (set.has(value)) return true;
        }
        return false;
    }

    function asReadonlySet<T>(iterable: Iterable<T>): ReadonlySet<T> {
        return iterable instanceof Set ? iterable :
            iterable instanceof core.SortedSet ? iterable :
            new Set(iterable);
    }

    function asReadonlyArray<T>(iterable: Iterable<T>): ReadonlyArray<T> {
        return Array.isArray(iterable) ? iterable : Array.from(iterable);
    }

    // patch `assert.sameMembers` to support any iterable
    chai.assert.sameMembers = <T>(actual: Iterable<T>, expected: Iterable<T>, message?: string) => {
        if (!isIdenticalTo(actual, expected)) {
            actual = asReadonlyArray(actual);
            expected = asReadonlyArray(expected);
            assert.fail(actual, expected, message || `expected ${util.objDisplay(actual)} to have the same members as ${util.objDisplay(expected)}`);
        }
    };

    // patch `assert.notSameMembers` to support any iterable
    chai.assert.notSameMembers = <T>(actual: Iterable<T>, expected: Iterable<T>, message?: string) => {
        if (isIdenticalTo(actual, expected)) {
            actual = asReadonlyArray(actual);
            expected = asReadonlyArray(expected);
            assert.fail(actual, expected, message || `expected ${util.objDisplay(actual)} to not have the same members as ${util.objDisplay(expected)}`);
        }
    };

    chai.assert.includeMembersOnce = <T>(actual: Iterable<T>, expected: Iterable<T>, message?: string) => {
        if (!isSubsetOf(expected, actual, /*unique*/ true)) {
            actual = asReadonlyArray(actual);
            expected = asReadonlyArray(expected);
            assert.fail(actual, expected, message || `expected ${util.objDisplay(actual)} to include the members of ${util.objDisplay(expected)} only once`);
        }
    };

    // patch `assert.includeMembers` to support any iterable
    chai.assert.includeMembers = <T>(actual: Iterable<T>, expected: Iterable<T>, message?: string) => {
        if (!isSubsetOf(expected, actual)) {
            actual = asReadonlyArray(actual);
            expected = asReadonlyArray(expected);
            assert.fail(actual, expected, message || `expected ${util.objDisplay(actual)} to include the members of ${util.objDisplay(expected)}`);
        }
    };

    // patch `assert.notIncludeMembers` to support any iterable
    chai.assert.notIncludeMembers = <T>(actual: Iterable<T>, expected: Iterable<T>, message?: string) => {
        if (overlaps(expected, actual)) {
            actual = asReadonlyArray(actual);
            expected = asReadonlyArray(expected);
            assert.fail(actual, expected, message || `expected ${util.objDisplay(actual)} to not include the members of ${util.objDisplay(expected)}`);
        }
    };
});