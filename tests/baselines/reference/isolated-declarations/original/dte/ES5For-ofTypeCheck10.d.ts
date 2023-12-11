//// [tests/cases/conformance/statements/for-ofStatements/ES5For-ofTypeCheck10.ts] ////

//// [ES5For-ofTypeCheck10.ts]
// In ES3/5, you cannot for...of over an arbitrary iterable.
class StringIterator {
    next() {
        return {
            done: true,
            value: ""
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}

for (var v of new StringIterator) { }

/// [Declarations] ////



//// [ES5For-ofTypeCheck10.d.ts]
declare class StringIterator {
    next(): invalid;
    [Symbol.iterator](): invalid;
}

/// [Errors] ////

ES5For-ofTypeCheck10.ts(3,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
ES5For-ofTypeCheck10.ts(9,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
ES5For-ofTypeCheck10.ts(9,6): error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
ES5For-ofTypeCheck10.ts(14,15): error TS2495: Type 'StringIterator' is not an array type or a string type.


==== ES5For-ofTypeCheck10.ts (4 errors) ====
    // In ES3/5, you cannot for...of over an arbitrary iterable.
    class StringIterator {
        next() {
        ~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 ES5For-ofTypeCheck10.ts:3:5: Add a return type to the method
            return {
                done: true,
                value: ""
            };
        }
        [Symbol.iterator]() {
        ~~~~~~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 ES5For-ofTypeCheck10.ts:9:5: Add a return type to the method
         ~~~~~~
!!! error TS2585: 'Symbol' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.
            return this;
        }
    }
    
    for (var v of new StringIterator) { }
                  ~~~~~~~~~~~~~~~~~~
!!! error TS2495: Type 'StringIterator' is not an array type or a string type.