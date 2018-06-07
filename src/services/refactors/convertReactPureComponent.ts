/** @internal */
namespace ts.refactor.convertReactPureComponent {
    const refactorName = "Convert React pure component";
    const actionNameComponentToSFC = "Covert React.Component to SFC";
    const actionNameSFCToPureComponent = "Covert React.SFC to PureComponent";

    const removeEmpty = (s: string) => s.replace(/\s/g, "");

    type SFCLikeDeclaration =
        | FunctionDeclaration
        | FunctionExpression
        | ArrowFunction;
    function isSFCLikeDeclaration(node: Node): node is SFCLikeDeclaration {
        return isFunctionDeclaration(node) || isFunctionExpression(node) || isArrowFunction(node);
    }

    type Component = {
        name?: Identifier;
        render: Block;
        propsType?: TypeNode;
        originNode: SFCLikeDeclaration | ClassLikeDeclaration;
    }

    /**
     * This refactor follows this rule.
     * * Is optional.
     *
     * 1. [x] Check if JSX Factory is React. If not, no actions will be provided
     * 2. [x] If the selection is a function declaration of type `React.SFC`
     *        [ ] Provide an action to convert it to `React.PureComponent`
     *        [ ] * Make a function with 1 to 2 arguments (treat as props & context)
     *              and explicit returnType T and T subtypeable to React.Element also convertible
     * 3. [x] If the selection is a subclass of `React.Component` or `React.PureComponent`
     *        [x] and if it satisifies `isConvertableClass()`
     *        [ ] Provide an action to convert it to `React.SFC` or `React.PureComponent` (if it is `React.Component`)
     * 4. [x] Resolve React by `getReferenceToReact()`
     * 5. [ ] * Also support `propTypes`, `contextTypes`, `defaultProps`, `displayName` (Only Class -> Function)
     * 6. [ ] * Also support convert of reference to `this.context` (in both ways)
     */

    registerRefactor(refactorName, {
        getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
            if (!checkJSXFactoryIsReact(context.host)) return;
            if (!getReferenceToReact(context.file)) return;
            const node = getSelectedNode(context);
            if (!node) { return; }

            if (isConvertibleReactClassComponent(node, context.file)) {
                // const description = Diagnostics.???
                const description = actionNameComponentToSFC;
                return [{
                    name: refactorName,
                    description,
                    actions: [{ description: description, name: actionNameComponentToSFC }]
                }];
            } else if (isReactSFCDeclaration(node, context.file)) {
                // const description = Diagnostics.???
                const description = actionNameSFCToPureComponent;
                return [{
                    name: refactorName,
                    description,
                    actions: [{ description: description, name: actionNameSFCToPureComponent }]
                }];
            }
        },
        getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
            Debug.assert(actionName === actionNameComponentToSFC || actionName === actionNameSFCToPureComponent);
            if (actionName === actionNameSFCToPureComponent) {
                const node = getSelectedNode(context) as Node;
                return transformSFCtoComponent(isReactSFCDeclaration(node, context.file)!, context);
            }
            return;
        }
    });

    function checkJSXFactoryIsReact(host: LanguageServiceHost) {
        const config = host.getCompilationSettings();
        if (config.jsxFactory === undefined) { if (config.jsx) return true }
        // In vue, people use jsxFactory: "h" insteadof React.createElement
        else { if (config.jsxFactory.match(/React/)) return true; }
        return false;
    }

    function getSelectedNode(context: RefactorContext): Node | false {
        const { file } = context;
        const span = getRefactorContextSpan(context);
        const token = getTokenAtPosition(file, span.start, /*includeJsDocComment*/ false);
        const component = getParentNodeInSpan(token, file, span);
        if (!component) { return false; }
        return component;
    }

    /** Get name binding to React, React.Component, React.PureComponent, React.SFC, React.StatelessComponent */
    function getReferenceToReact(sourcefile: SourceFile) {
        const result: Record<"React" | "Component" | "PureComponent" | "SFC" | "StatelessComponent", string> = {
            Component: undefined,
            PureComponent: undefined,
            React: undefined,
            SFC: undefined,
            StatelessComponent: undefined,
        } as any;
        let importClause: ImportClause;
        sourcefile.forEachChild(c => {
            if (!isImportDeclaration(c)) { return; }
            if (!c.importClause) { return; }
            if ((c.moduleSpecifier as StringLiteral).text !== "react") { return; }
            const { name, namedBindings } = c.importClause;
            importClause = c.importClause;
            const names: (keyof typeof result)[] = ["Component", "PureComponent", "SFC", "StatelessComponent"];
            // In case of:
            // import * as ns from "mod" => name = undefined, namedBinding: NamespaceImport = { name: ns }
            if (namedBindings && isNamespaceImport(namedBindings)) { result.React = namedBindings.name.text; }
            // import d from "mod" => name = d, namedBinding = undefined
            else if (name) { result.React = name.text; }
            // import d, * as ns from "mod" => name = d, namedBinding: NamespaceImport = { name: ns }
            // ? No this case
            // import { a, b as x } from "mod" => name = undefined, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
            if (namedBindings && isNamedImports(namedBindings)) {
                namedBindings.elements.forEach(e => {
                    if (e.propertyName) {
                        let p: keyof typeof result = e.propertyName.text as any;
                        if (names.indexOf(p) !== -1) { result[p] = e.name.text; }
                    } else {
                        let n: keyof typeof result = e.name.text as any;
                        if (names.indexOf(n) !== -1) { result[n] = n; }
                    }
                })
            }
            // import d, { a, b as x } from "mod" => name = d, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
            // ? No this case
        })
        if (result.React) {
            result.Component = result.Component || result.React + ".Component";
            result.PureComponent = result.PureComponent || result.React + ".PureComponent";
            result.SFC = result.SFC || result.React + ".SFC";
            result.StatelessComponent = result.StatelessComponent || result.StatelessComponent + ".StatelessComponent";
        } else if (!result.Component && !result.PureComponent && !result.React && !result.SFC && !result.StatelessComponent) {
            return undefined;
        }
        return { ...result, importClause: importClause! };
    }

    function isReactSFCDeclaration(node: Node, sourcefile: SourceFile): Component | undefined {
        if (!isSFCLikeDeclaration(node)) { return; }
        if (node.asteriskToken) { return; }
        if (!node.body) { return; }

        // TODO: Should also check the actual type insteadof only receive explicit typed
        const typeNode = node.type;
        if (!typeNode) { return; }
        const binding = getReferenceToReact(sourcefile)!;
        const type = removeEmpty(typeNode.getFullText(sourcefile));
        if (type !== binding.SFC && type !== binding.Component) { return; }

        let propsType: TypeNode | undefined;
        if (isTypeReferenceNode(typeNode)) {
            if (typeNode.typeArguments) { propsType = typeNode.typeArguments[0]; }
        }

        let render: Block;
        if (isBlock(node.body)) {
            render = node.body;
        } else if (isExpression(node.body!)) {
            render = createBlock([createReturn(node.body)]);
        }
        return {
            propsType: propsType,
            name: node.name,
            render: render!,
            originNode: node,
        }
    }

    function isConvertibleReactClassComponent(node: Node, sourcefile: SourceFile): Component | undefined {
        if (!isClassLike(node)) { return; }
        /** Check if expression is a React Component Class, then get its name and PropType */
        function isReactComponentClass(expression: ClassLikeDeclaration, sourcefile: SourceFile) {
            let is = false;
            let name: Identifier | undefined;
            let reference = getReferenceToReact(sourcefile)!;
            let propsType: TypeNode | undefined;
            if (expression.heritageClauses) {
                if (expression.heritageClauses.some(x =>
                    x.types.some(y => {
                        const text = removeEmpty(y.getText(sourcefile));
                        if (text === reference.Component || text === reference.PureComponent) {
                            propsType = y.typeArguments && y.typeArguments[0];
                            return true;
                        }
                        return false;
                    })
                )) {
                    is = true;
                    if (isClassDeclaration(expression)) {
                        name = expression.name;
                    }
                }
            }
            if (is) return { name, propsType };
            return undefined;
        }
        const ircs = isReactComponentClass(node, sourcefile);
        if (!ircs) return;
        /**
         * 1. If have any property than `render`, return false
         * 2. If have reference to `setState` or `state`, return false
         */
        function isConvertibleComponent(expression: ClassLikeDeclaration, sourcefile: SourceFile) {
            let render: Block;
            let convertable = every(expression.members, val => {
                // * Should include `["render"]() {}` and `render = () => {}`, but that's crazy, no one code like this
                if (isMethodDeclaration(val) && val.modifiers) {
                    const isMethodNamedRender = isIdentifier(val.name) && val.name.escapedText === "render"
                    const isStatic = val.modifiers.some(mod => mod.kind === SyntaxKind.StaticKeyword);
                    if (isMethodNamedRender && !isStatic) {
                        render = val.body!;
                        return true;
                    }
                }
                // TODO: Should include staic `propTypes`, `contextTypes`, `defaultProps`, `displayName`. Not now.
                return false;
            })
            // ? Now check reference to `state` or `setState`
            if (convertable) {
                // OK let's do this quick
                if (removeEmpty(render!.getText(sourcefile)).match(/this\.(state|setState)/)) {
                    convertable = false;
                }
            }
            return { convertable, render: render! };
        }
        const icc = isConvertibleComponent(node, sourcefile);
        if (!icc.convertable) return;
        return { name: ircs.name, propsType: ircs.propsType, render: icc.render, originNode: node };
    }

    function transformSFCtoComponent(component: Component, context: RefactorContext): RefactorEditInfo {
        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        const react = getReferenceToReact(context.file)!;

        const extendsClause = createHeritageClause(SyntaxKind.ExtendsKeyword, [
            createExpressionWithTypeArguments(component.propsType ? [component.propsType] : undefined,
            createIdentifier(react.PureComponent))
        ]);
        const renderMethod = createMethod(undefined, undefined, undefined, "render",
            undefined, undefined, [], undefined, component.render);

        let newNode: ClassLikeDeclaration;
        if (component.name) {
            newNode = createClassDeclaration(undefined, undefined, component.name, undefined, [extendsClause], [renderMethod]);
        } else {
            newNode = createClassExpression(undefined, undefined, undefined, [extendsClause], [renderMethod]);
        }
        changeTracker.replaceNode(context.file, component.originNode, newNode);
        return { edits: changeTracker.getChanges() };
    }
}
