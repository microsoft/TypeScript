/*@internal*/
/* eslint-disable linebreak-style */
namespace ts {
    /**
     * Transforms ECMAScript Class Syntax.
     * TypeScript parameter property syntax is transformed in the TypeScript transformer.
     * For now, this transforms public field declarations using TypeScript class semantics,
     * where declarations are elided and initializers are transformed as assignments in the constructor.
     * When --useDefineForClassFields is on, this transforms to ECMAScript semantics, with Object.defineProperty.
     */
    export const transformConcurrentStatements: TransformerFactory<
        SourceFile | Bundle
    > = (context: TransformationContext) => {
        const visitor = (node: Node): Node => {
            if (isConcurrentStatement(node)) {
                const thenableElements = node.body.statements.map(
                    (statement) => {
                        if (isAwaitExpressionStatement(statement)) {
                            // the expression is an await expression, which means we want the expression
                            return statement.expression.expression;
                        } else {
                            // the initializer is an await expression, which means we want the expression
                            return statement.declarationList.declarations[0]
                                .initializer.expression;
                        }
                    }
                );

                const argumentsArray = [
                    factory.createArrayLiteralExpression(
                        thenableElements,
                        // multiLine
                        true
                    ),
                ];

                // Promise.all
                const promiseAllExpression =
                    factory.createPropertyAccessExpression(
                        factory.createIdentifier("Promise"),
                        factory.createIdentifier("all")
                    );

                // Promise.all([args])
                const callPromiseAllExpression = factory.createCallExpression(
                    promiseAllExpression,
                    // no type arguments, not generic
                    undefined,
                    argumentsArray
                );

                const awaitCallPromiseAllExpression =
                    factory.createAwaitExpression(callPromiseAllExpression);

                if (
                    node.body.statements.every((statement) =>
                        isAwaitExpressionStatement(statement)
                    )
                ) {
                    /**
                    if every statement in the concurrent body is just an await expression statement,
                    eg:

                    ```
                    concurrent {
                      await a();
                      await b();
                    }
                    ```

                    then we won't emit a variable statement and instead just emit the await expression:

                    ```
                    await Promise.all([
                      a(),
                      b(),
                    ])
                    ```
                  */
                    return factory.createExpressionStatement(
                        awaitCallPromiseAllExpression
                    );
                }

                /**
               we have some mix of await expression statements and await variable statements:
              ```
                  concurrent {
                    const aRes = await a();
                    await b();
                    const cRes = await c();
                  }
                ```

                  should become:
                  ```
                  const [aRes,,cRes] = await Promise.all([
                    a(),
                    b(),
                    c(),
                  ])
                  ```
                */

                // if an expression statmement, we omit;
                // if a variable statement, we include.
                // aRes,{omitted},cRes
                const bindingElements = node.body.statements.map(
                    (statement) => {
                        if (isAwaitExpressionStatement(statement)) {
                            return factory.createOmittedExpression();
                        } else {
                            return factory.createBindingElement(
                                // dotdotdot token
                                undefined,
                                // propertyName
                                undefined,
                                // name
                                statement.declarationList.declarations[0].name,
                                // initializer
                                undefined
                            );
                        }
                    }
                );

                // [aRes,{omitted},cRes]
                const arrayBindingPattern =
                    factory.createArrayBindingPattern(bindingElements);

                // one declaration for our consts
                const declarations = [
                    factory.createVariableDeclaration(
                        arrayBindingPattern,
                        // exclamation
                        undefined,
                        // type
                        undefined,
                        awaitCallPromiseAllExpression
                    ),
                ];

                const hasAnyLets = node.body.statements.some(
                    (statement) =>
                        isAwaitVariableStatement(statement) &&
                        (statement.declarationList.flags & NodeFlags.Let) === 1
                );
                const declarationList = factory.createVariableDeclarationList(
                    declarations,
                    // even though the user might declare vars with const, we
                    // want them all to be lets if one is
                    hasAnyLets ? NodeFlags.Let : NodeFlags.Const
                );

                return factory.createVariableStatement(
                    // modifiers
                    undefined,
                    declarationList
                );
            }
            return visitEachChild(node, visitor, context);
        };

        const visitSourceFile = (sourceFile: SourceFile): SourceFile => {
            return visitEachChild(sourceFile, visitor, context);
        };

        // transformation code here
        return chainBundle(context, visitSourceFile);
    };
}

