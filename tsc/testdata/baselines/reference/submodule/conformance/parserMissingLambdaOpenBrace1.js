//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserMissingLambdaOpenBrace1.ts] ////

//// [parserMissingLambdaOpenBrace1.ts]
class C {
    where(filter: Iterator<T, boolean>): Query<T> {
        return fromDoWhile(test =>
            var index = 0;
            return this.doWhile((item, i) => filter(item, i) ? test(item, index++) : true);
        });
    }
}

//// [parserMissingLambdaOpenBrace1.js]
class C {
    where(filter) {
        return fromDoWhile(test => {
            var index = 0;
            return this.doWhile((item, i) => filter(item, i) ? test(item, index++) : true);
        });
    }
}
