// Type definitions for chai 1.7.2
// Project: http://chaijs.com/
// Definitions by: Jed Hunsaker <https://github.com/jedhunsaker/>
// DefinitelyTyped: https://github.com/borisyankov/DefinitelyTyped


declare module chai {

    function expect(target: any, message?: string): Expect;

    // Provides a way to extend the internals of Chai
    function use(fn: (chai: any, utils: any) => void): any;

    interface ExpectStatic {
        (target: any): Expect;
    }

    interface Assertions {
        attr(name: string, value?: string): any;
        css(name: string, value?: string): any;
        data(name: string, value?: string): any;
        class(className: string): any;
        id(id: string): any;
        html(html: string): any;
        text(text: string): any;
        value(value: string): any;
        visible: any;
        hidden: any;
        selected: any;
        checked: any;
        disabled: any;
        empty: any;
        exist: any;
    }

    interface Expect extends LanguageChains, NumericComparison, TypeComparison, Assertions {
        not: Expect;
        deep: Deep;
        a: TypeComparison;
        an: TypeComparison;
        include: Include;
        contain: Include;
        ok: Expect;
        true: Expect;
        false: Expect;
        null: Expect;
        undefined: Expect;
        exist: Expect;
        empty: Expect;
        arguments: Expect;
        Arguments: Expect;
        equal: Equal;
        equals: Equal;
        eq: Equal;
        eql: Equal;
        eqls: Equal;
        property: Property;
        ownProperty: OwnProperty;
        haveOwnProperty: OwnProperty;
        length: Length;
        lengthOf: Length;
        match(RegularExpression: RegExp, message?: string): Expect;
        string(string: string, message?: string): Expect;
        keys: Keys;
        key(string: string): Expect;
        throw: Throw;
        throws: Throw;
        Throw: Throw;
        respondTo(method: string, message?: string): Expect;
        itself: Expect;
        satisfy(matcher: Function, message?: string): Expect;
        closeTo(expected: number, delta: number, message?: string): Expect;
        members: Members;
    }

    interface LanguageChains {
        to: Expect;
        be: Expect;
        been: Expect;
        is: Expect;
        that: Expect;
        and: Expect;
        have: Expect;
        with: Expect;
        at: Expect;
        of: Expect;
        same: Expect;
    }

    interface NumericComparison {
        above: NumberComparer;
        gt: NumberComparer;
        greaterThan: NumberComparer;
        least: NumberComparer;
        gte: NumberComparer;
        below: NumberComparer;
        lt: NumberComparer;
        lessThan: NumberComparer;
        most: NumberComparer;
        lte: NumberComparer;
        within(start: number, finish: number, message?: string): Expect;
    }

    interface NumberComparer {
        (value: number, message?: string): Expect;
    }

    interface TypeComparison {
        (type: string, message?: string): Expect;
        instanceof: InstanceOf;
        instanceOf: InstanceOf;
    }

    interface InstanceOf {
        (constructor: Object, message?: string): Expect;
    }

    interface Deep {
        equal: Equal;
        property: Property;
    }

    interface Equal {
        (value: any, message?: string): Expect;
    }

    interface Property {
        (name: string, value?: any, message?: string): Expect;
    }

    interface OwnProperty {
        (name: string, message?: string): Expect;
    }

    interface Length extends LanguageChains, NumericComparison {
        (length: number, message?: string): Expect;
    }

    interface Include {
        (value: Object, message?: string): Expect;
        (value: string, message?: string): Expect;
        (value: number, message?: string): Expect;
        keys: Keys;
        members: Members;
    }

    interface Keys {
        (...keys: string[]): Expect;
        (keys: any[]): Expect;
    }

    interface Members {
        (set: any[], message?: string): Expect;
    }

    interface Throw {
        (): Expect;
        (expected: string, message?: string): Expect;
        (expected: RegExp, message?: string): Expect;
        (constructor: Error, expected?: string, message?: string): Expect;
        (constructor: Error, expected?: RegExp, message?: string): Expect;
        (constructor: Function, expected?: string, message?: string): Expect;
        (constructor: Function, expected?: RegExp, message?: string): Expect;
    }

    function assert(expression: any, message?: string): void;
    module assert {
        function equal(actual: any, expected: any, message?: string): void;
        function notEqual(actual: any, expected: any, message?: string): void;
        function isTrue(value: any, message?: string): void;
        function isFalse(value: any, message?: string): void;
        function isNull(value: any, message?: string): void;
        function isNotNull(value: any, message?: string): void;
    }
}