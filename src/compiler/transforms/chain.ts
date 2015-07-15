/// <reference path="../factory.ts" />
/// <reference path="../transform.ts" />
/// <reference path="es6.ts" />
/// <reference path="es5.ts" />
namespace ts.transform {
    export type TransformationChain = (context: VisitorContext, statements: NodeArray<Statement>) => NodeArray<Statement>;
    
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
    
    function createUnaryTransformationChain(only: TransformationChain) {
        return function (context: VisitorContext, statements: NodeArray<Statement>) {
            if (only) statements = only(context, statements);
            return statements;
        };
    }
    
    function createBinaryTransformationChain(first: TransformationChain, second: TransformationChain) {
        return function (context: VisitorContext, statements: NodeArray<Statement>) {
            if (first) statements = first(context, statements);
            if (second) statements = second(context, statements);
            return statements;
        };
    }
    
    function createTrinaryTransformationChain(first: TransformationChain, second: TransformationChain, third: TransformationChain) {
        return function (context: VisitorContext, statements: NodeArray<Statement>) {
            if (first) statements = first(context, statements);
            if (second) statements = second(context, statements);
            if (third) statements = third(context, statements);
            return statements;
        };
    }
    
    function createNaryTransformationChain(transformations: TransformationChain[]) {
        return function (context: VisitorContext, statements: NodeArray<Statement>) {
            for (let transformation of transformations) {
                if (transformation) statements = transformation(context, statements);
            }
            return statements;
        };
    }
    
    function identityTransformation(context: VisitorContext, statements: NodeArray<Statement>): NodeArray<Statement> {
        return statements;
    }
}