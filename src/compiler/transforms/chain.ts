/// <reference path="../factory.ts" />
/// <reference path="../transform.ts" />
/// <reference path="es6.ts" />
/// <reference path="es5.ts" />
/*@internal*/
namespace ts.transform {
    
    export let transformTime = 0;
    
    export type TransformationChain = (statements: NodeArray<Statement>) => NodeArray<Statement>;
    
    export function getTransformationChain(options: CompilerOptions): TransformationChain {
        if ((options.target || ScriptTarget.ES3) < ScriptTarget.ES6) {
            return chainTransformations([toES6, toES5]);
        }
        
        return chainTransformations([toES6]);
    }
    
    export function chainTransformations(transformations: TransformationChain[]): TransformationChain {
        switch (transformations.length) {
            case 0: return identityTransformation;
            case 1: return createUnaryTransformationChain(transformations[0]);
            case 2: return createBinaryTransformationChain(transformations[0], transformations[1]);
            case 3: return createTrinaryTransformationChain(transformations[0], transformations[1], transformations[2]);
            default: return createNaryTransformationChain(transformations);
        }
    }
    
    function runTransformation(chain: TransformationChain, statements: NodeArray<Statement>) {
        let start = new Date().getTime();
        let transformed = chain(statements);
        transformTime += new Date().getTime() - start;
        return transformed;
    }
    
    function createUnaryTransformationChain(only: TransformationChain) {
        return function (statements: NodeArray<Statement>) {
            if (only) statements = runTransformation(only, statements);
            return statements;
        };
    }
    
    function createBinaryTransformationChain(first: TransformationChain, second: TransformationChain) {
        return function (statements: NodeArray<Statement>) {
            if (first) statements = runTransformation(first, statements);
            if (second) statements = runTransformation(second, statements);
            return statements;
        };
    }
    
    function createTrinaryTransformationChain(first: TransformationChain, second: TransformationChain, third: TransformationChain) {
        return function (statements: NodeArray<Statement>) {
            if (first) statements = runTransformation(first, statements);
            if (second) statements = runTransformation(second, statements);
            if (third) statements = runTransformation(third, statements);
            return statements;
        };
    }
    
    function createNaryTransformationChain(transformations: TransformationChain[]) {
        return function (statements: NodeArray<Statement>) {
            for (let transformation of transformations) {
                if (transformation) statements = transformation(statements);
            }
            return statements;
        };
    }
    
    function identityTransformation(statements: NodeArray<Statement>): NodeArray<Statement> {
        return statements;
    }
}