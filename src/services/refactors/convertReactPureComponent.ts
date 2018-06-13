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

    interface Component {
        name?: Identifier;
        render: Block;
        propsType?: TypeNode;
        originNode: SFCLikeDeclaration | ClassLikeDeclaration;
    }

    /**
     * This refactor follows this rule.
     * 0. [ ] Continue if we are in a .jsx or .tsx file.
     * 1. [ ] Get the current JSX config (reactNamespace, jsxFactory, jsx).
     *            Continue if there is a JSX provider
     *            ? It's better be React, ReactNative and Preact ?
     * 2. [ ] Continue if the selection include a SFCLikeDeclaration | ClassLikeDeclaration
     *        [ ] and the declaration is the direct child of the current SourceFile
     *        [ ] and we can find the name (Class name, or variable name) in the declaration
     *
     * For ClassLikeDeclaration detection:
     * A. [ ] Continue if the declaration is a subclass of `PureComponent` or `Component`
     * B. [ ] Continue if there is no reference to `this.state` or `this.setState`
     * C. [ ] Continue if there is no any property more than listed below
     *            [ ] `render`
     *            [ ] static `propTypes`
     *            [ ] static `contextTypes`
     *            [ ] static `defaultProps`
     *            [ ] static `displayName`
     *            [ ] static `childContextTypes`
     * D. [ ] Continue if the `render` method is not invalid
     * E. [ ] Provide an action, Convert `PureComponent` or `Component` to SFC
     *
     * For SFCLikeDeclaration detection:
     * a. [ ] Goto c, if the selection is a function declaration of type `React.SFC`.
     * b. [ ] Continue if we guess the selection is an SFC
     *            In @types/react, ReactNode is =
     *                ReactElement<any> | ReactText (number | string) // ReactChild
     *                | {} | ReactNode[] // ReactFragment
     *                | { key: Key | null; children: ReactNode; } // ReactPortal
     *                | string
     *                | number | boolean | null | undefined
     *         define type MeaningfulReactNode =
     *                     ReactElement<any> | MeaningfulReactNode[] | ReactPortal | string
     *         Guess as follow rules.
     *             [ ] i. Check all return path, make then an union undefined
     *             [ ] ii. Continue if parameters length < 3 (props?, context?)
     *             [ ] iii. Continue if all of member of U is compatiable with ReactNode
     *             [ ] iv. Continue if there is MeaningfulReactNode in U
     *             [ ] v. Continue if there is no reference to `this`
     *             [ ] vi. This is an SFC
     * c. [ ] Continue if there is a body
     * c. [ ] Provide an action, Convert SFC to `PureComponent` or `Component`
     *
     * For ClassLikeDeclaration transformation:
     * A. [ ] Get the Class `C`, get the class name `Name` (by ClassDeclaration, or variable declaration)
     * B. [ ] Collect the properties below
     *            [ ] `render`
     *            [ ] static `propTypes`?
     *            [ ] static `contextTypes`?
     *            [ ] static `defaultProps`?
     *            [ ] static `displayName`?
     *            [ ] static `childContextTypes`?
     * C. [ ] Replace
     *        [ ] all `this.props` to `props` in `render`,
     *        [ ] all `this.context` to `context` in `render`,
     *        [ ] and make sure there is no name conflict in the current lexical scope
     *        [ ] if there is, generate a random name other than `props` and `context`?
     * D. [ ] Create a FunctionDeclaration `F` named `Name`, with body `render`
     *        [ ] In .tsx file, add type annoation
     *        [ ] In .jsx file, add JSDoc Type annoation?
     * E. [ ] For those static properties, add something like `Name`.propTypes = ...
     * F. [ ] Replace `C` with `F`
     *
     * For SFCLikeDeclaration transformation:
     * A. [ ] Get the SFC `F`, get the class name `Name` (by FunctionDeclaration, or variable declaration)
     * B. [ ] Collect the properties below
     *            [ ] function body as `render`
     * C. [ ] Replace
     *        [ ] first parameter to `this.props` in `render`,
     *        [ ] second parameter to `this.context` in `render`,
     * D. [ ] Create a ClassDeclaration `C` named `Name` extends (React|Preact).PureComponent
     *        [ ] In .tsx file, add type arguments `T` if `F` is typed `(React|Preact).(Pure)?Component<T>`
     * E. [ ] Replace `F` with `C`
     */

    registerRefactor(refactorName, {
        getAvailableActions(context: RefactorContext): ApplicableRefactorInfo[] | undefined {
            // if (!checkJSXFactoryIsReact(context.host)) return undefined;
            if (!getReferenceToReact(context.file)) return undefined;
            const node = getSelectedNode(context);
            if (!node) { return undefined; }

            if (isConvertibleReactClassComponent(node, context.file)) {
                // const description = Diagnostics.???
                const description = actionNameComponentToSFC;
                return [{
                    name: refactorName,
                    description,
                    actions: [{ description, name: actionNameComponentToSFC }]
                }];
            }
            else if (isReactSFCDeclaration(node, context.file)) {
                // const description = Diagnostics.???
                const description = actionNameSFCToPureComponent;
                return [{
                    name: refactorName,
                    description,
                    actions: [{ description, name: actionNameSFCToPureComponent }]
                }];
            }
        },
        getEditsForAction(context: RefactorContext, actionName: string): RefactorEditInfo | undefined {
            Debug.assert(actionName === actionNameComponentToSFC || actionName === actionNameSFCToPureComponent);
            const node = getSelectedNode(context) as Node;
            if (actionName === actionNameSFCToPureComponent) {
                return transformSFCtoComponent(isReactSFCDeclaration(node, context.file)!, context);
            }
            else if (actionName === actionNameComponentToSFC) {
                return transformComponentToSFC(isConvertibleReactClassComponent(node, context.file)!, context);
            }
            return undefined;
        }
    });

    // function checkJSXFactoryIsReact(host: LanguageServiceHost) {
    //     const config = host.getCompilationSettings();
    //     if (config.jsxFactory === undefined) { if (config.jsx) return true; }
    //     // In vue, people use jsxFactory: "h" insteadof React.createElement
    //     else { if (config.jsxFactory.match(/React/)) return true; }
    //     return false;
    // }

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
            if (!isImportDeclaration(c)) { return undefined; }
            if (!c.importClause) { return undefined; }
            if ((c.moduleSpecifier as StringLiteral).text !== "react") { return undefined; }
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
                        const p: keyof typeof result = e.propertyName.text as any;
                        if (names.indexOf(p) !== -1) { result[p] = e.name.text; }
                    }
                    else {
                        const n: keyof typeof result = e.name.text as any;
                        if (names.indexOf(n) !== -1) { result[n] = n; }
                    }
                });
            }
            // import d, { a, b as x } from "mod" => name = d, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
            // ? No this case
        });
        if (result.React) {
            result.Component = result.Component || result.React + ".Component";
            result.PureComponent = result.PureComponent || result.React + ".PureComponent";
            result.SFC = result.SFC || result.React + ".SFC";
            result.StatelessComponent = result.StatelessComponent || result.StatelessComponent + ".StatelessComponent";
        }
        else if (!result.Component && !result.PureComponent && !result.React && !result.SFC && !result.StatelessComponent) {
            return undefined;
        }
        return { ...result, importClause: importClause! };
    }

    function isReactSFCDeclaration(node: Node, sourcefile: SourceFile): Component | undefined {
        if (!isSFCLikeDeclaration(node) || node.asteriskToken || !node.body) { return undefined; }

        // TODO: Should also check the actual type insteadof only receive explicit typed
        const typeNode = node.type;
        if (!typeNode) { return undefined; }
        const binding = getReferenceToReact(sourcefile)!;
        const type = removeEmpty(typeNode.getFullText(sourcefile));
        if (type !== binding.SFC && type !== binding.Component) { return undefined; }

        let propsType: TypeNode | undefined;
        if (isTypeReferenceNode(typeNode)) {
            if (typeNode.typeArguments) { propsType = typeNode.typeArguments[0]; }
        }

        let render: Block;
        if (isBlock(node.body)) {
            render = node.body;
        }
        else if (isExpression(node.body!)) {
            render = createBlock([createReturn(node.body)]);
        }
        return {
            propsType,
            name: node.name,
            render: render!,
            originNode: node,
        };
    }

    function isConvertibleReactClassComponent(node: Node, sourcefile: SourceFile): Component | undefined {
        if (!isClassLike(node)) { return undefined; }
        /** Check if expression is a React Component Class, then get its name and PropType */
        function isReactComponentClass(expression: ClassLikeDeclaration, sourcefile: SourceFile) {
            let is = false;
            let name: Identifier | undefined;
            const reference = getReferenceToReact(sourcefile)!;
            let propsType: TypeNode | undefined;
            if (expression.heritageClauses) {
                if (expression.heritageClauses.some(x =>
                    x.types.some(y => {
                        const text = removeEmpty(y.expression.getText(sourcefile));
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
        if (!ircs) return undefined;
        /**
         * 1. If have any property than `render`, return false
         * 2. If have reference to `setState` or `state`, return false
         */
        function isConvertibleComponent(expression: ClassLikeDeclaration, sourcefile: SourceFile) {
            let render: Block;
            let convertable = every(expression.members, val => {
                // * Should include `["render"]() {}` and `render = () => {}`, but that's crazy, no one code like this
                if (isMethodDeclaration(val)) {
                    const isMethodNamedRender = isIdentifier(val.name) && val.name.escapedText === "render";
                    const isStatic = val.modifiers && val.modifiers.some(mod => mod.kind === SyntaxKind.StaticKeyword);
                    if (isMethodNamedRender && !isStatic) {
                        render = val.body!;
                        return true;
                    }
                }
                // TODO: Should include staic `propTypes`, `contextTypes`, `defaultProps`, `displayName`. Not now.
                return false;
            });
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
        if (!icc.convertable) return undefined;
        return { name: ircs.name, propsType: ircs.propsType, render: icc.render, originNode: node };
    }

    function transformSFCtoComponent(component: Component, context: RefactorContext): RefactorEditInfo {
        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        const react = getReferenceToReact(context.file)!;

        const extendsClause = createHeritageClause(SyntaxKind.ExtendsKeyword, [
            createExpressionWithTypeArguments(component.propsType ? [component.propsType] : undefined,
                createIdentifier(react.PureComponent))
        ]);
        const renderMethod = createMethod([], [], void 0, "render",
            void 0, void 0, [], void 0, component.render);

        let newNode: ClassLikeDeclaration;
        if (component.name) {
            newNode = createClassDeclaration(void 0, void 0, component.name, void 0, [extendsClause], [renderMethod]);
        }
        else {
            newNode = createClassExpression(void 0, void 0, void 0, [extendsClause], [renderMethod]);
        }
        changeTracker.replaceNode(context.file, component.originNode, newNode);
        return {
            edits: changeTracker.getChanges().map(x => ({
                ...x, textChanges: x.textChanges.map(y => ({
                    ...y, newText: y.newText.replace(/props/g, "this.props")
                }))
            }))
        };
    }

    function transformComponentToSFC(component: Component, context: RefactorContext): RefactorEditInfo {
        const changeTracker = textChanges.ChangeTracker.fromContext(context);

        const react = getReferenceToReact(context.file)!;

        const newNode: FunctionDeclaration = createFunctionDeclaration(
            void 0, void 0, void 0, component.name, void 0,
            [createParameter(void 0, void 0, void 0, "props", void 0)],
            createTypeReferenceNode(react.SFC, component.propsType ? [component.propsType] : undefined),
            component.render
        );

        changeTracker.replaceNode(context.file, component.originNode, newNode);
        return {
            edits: changeTracker.getChanges().map(x => ({
                ...x, textChanges: x.textChanges.map(y => ({
                    ...y, newText: y.newText.replace(/this\.props/g, "props")
                }))
            }))
        };
    }
}
