//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClass2.ts] ////

//// [parserClass2.ts]
    export class LoggerAdapter implements ILogger {
        constructor (public logger: ILogger) { 
            this._information = this.logger.information();
        }
    }

//// [parserClass2.js]
export class LoggerAdapter {
    logger;
    constructor(logger) {
        this.logger = logger;
        this._information = this.logger.information();
    }
}
