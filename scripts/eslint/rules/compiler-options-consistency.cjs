const { AST_NODE_TYPES, ESLintUtils } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const ts = require("typescript");

/**
 * @typedef {{name: string, internal: boolean}} OptionData
 */

module.exports = createRule({
    name: "compiler-options-consistency",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            notInOptionsParser: `Add this option to src/compiler/commandLineParser.ts`,
            notInOptionsType: `Add this option to CompilerOptions in src/compiler/types.ts`,
            missingAtInternal: `Add @internal to this option to align it with the internal setting on the option description.`,
            missingInternalSetting: `Add internal: true to this option descriptor to align it with the CompilerOption type member.`,
        },
        schema: [],
        type: "problem",
        fixable: "code",
    },
    defaultOptions: [],

    create(context) {
        const sourceCode = context.sourceCode;
        const parserServices = ESLintUtils.getParserServices(context, /*allowWithoutFullTypeInformation*/ true);
        if (!parserServices.program) {
            return {};
        }
        const types = parserServices.program.getSourceFile("src/compiler/types.ts");
        if (!types) {
            return {};
        }
        const commandLineParser = parserServices.program.getSourceFile("src/compiler/commandLineParser.ts");
        if (!commandLineParser) {
            return {};
        }

        const interfaceDecl = /** @type {ts.InterfaceDeclaration} */ (types.statements.find(s => s.kind === ts.SyntaxKind.InterfaceDeclaration && /** @type {ts.InterfaceDeclaration} */ (s).name.text === "CompilerOptions"));

        const optionsFromType = interfaceDecl.members.reduce((map, elem) => {
            if (!elem.name || elem.name.kind !== ts.SyntaxKind.Identifier || elem.kind !== ts.SyntaxKind.PropertySignature) return map;
            const name = elem.name.text;
            if (name === "configFile" || name === "configFilePath") return map;
            const internal = !!elem.getFullText().includes("@internal");
            /** @type {OptionData} */
            const option = {
                name,
                internal,
            };
            map[name] = option;
            return map;
        }, /** @type {Record<string, OptionData>} */ ({}));

        /** @type {Record<string, OptionData>} */
        const optionsFromParser = {};

        /**
         * @param {ts.Node} node
         */
        const parserVisitor = node => {
            // Collects what are, by-convention, all the options defined in the command line parser
            if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
                const obj = /** @type {ts.ObjectLiteralExpression} */ (node);
                const nameProp = obj.properties.find(p => p.kind === ts.SyntaxKind.PropertyAssignment && p.name.kind === ts.SyntaxKind.Identifier && p.name.escapedText === "name" && /** @type {ts.PropertyAssignment} */ (p).initializer.kind === ts.SyntaxKind.StringLiteral);
                const typeProp = obj.properties.find(p => p.kind === ts.SyntaxKind.PropertyAssignment && p.name.kind === ts.SyntaxKind.Identifier && p.name.escapedText === "type");
                if (nameProp && typeProp) {
                    const name = /** @type {ts.StringLiteral} */ (/** @type {ts.PropertyAssignment} */ (nameProp).initializer).text;
                    const internalProp = /** @type {ts.PropertyAssignment | undefined} */ (obj.properties.find(p => p.kind === ts.SyntaxKind.PropertyAssignment && p.name.kind === ts.SyntaxKind.Identifier && p.name.escapedText === "internal"));
                    optionsFromParser[name] = { name, internal: !!(internalProp && internalProp.initializer.kind === ts.SyntaxKind.TrueKeyword) };
                }
                return; // no nested objects - these are element descriptors
            }
            return ts.visitEachChild(node, parserVisitor, /*context*/ undefined);
        };
        const targetParserDeclarations = ["commonOptionsWithBuild", "targetOptionDeclaration", "moduleOptionDeclaration", "commandOptionsWithoutBuild"];
        commandLineParser.statements.filter(d => {
            if (d.kind !== ts.SyntaxKind.VariableStatement) return false;
            const name = /** @type {ts.VariableStatement} */ (d).declarationList.declarations[0].name;
            if (name.kind !== ts.SyntaxKind.Identifier) return false;
            return targetParserDeclarations.includes(name.text);
        }).forEach(d => {
            ts.visitNode(d, parserVisitor);
        });

        /** @type {(node: import("@typescript-eslint/utils").TSESTree.TSInterfaceDeclaration) => void} */
        const checkInterface = node => {
            if (!context.physicalFilename.endsWith("compiler/types.ts") && !context.physicalFilename.endsWith("compiler\\types.ts")) {
                return;
            }
            if (node.id.name !== "CompilerOptions") {
                return;
            }
            node.body.body.forEach(e => {
                if (e.type !== AST_NODE_TYPES.TSPropertySignature) return;
                if (e.key.type !== AST_NODE_TYPES.Identifier) return;
                if (e.key.name === "configFile" || e.key.name === "configFilePath") return;

                const comments = sourceCode.getCommentsBefore(e);
                /** @type {import("@typescript-eslint/utils").TSESTree.Comment | undefined} */
                const comment = comments[comments.length - 1];
                let internal = false;
                if (comment && comment.type === "Block") {
                    internal = !!comment.value.includes("@internal");
                }

                /** @type {OptionData} */
                const option = {
                    name: e.key.name,
                    internal,
                };

                if (!optionsFromParser[option.name]) {
                    context.report({ messageId: "notInOptionsParser", node: e.key });
                }
                else if (!option.internal && optionsFromParser[option.name].internal) {
                    context.report({ messageId: "missingAtInternal", node: e.key, fix: fixer => fixer.insertTextBefore(e, "/** @internal */ ") });
                }
            });
        };

        /** @type {(node: import("@typescript-eslint/utils").TSESTree.Property) => void} */
        const checkProperty = node => {
            if (!context.physicalFilename.endsWith("commandLineParser.ts")) {
                return;
            }
            if (node.key.type !== AST_NODE_TYPES.Identifier || node.key.name !== "name" || node.parent.type !== AST_NODE_TYPES.ObjectExpression || node.value.type !== AST_NODE_TYPES.Literal || typeof node.value.value !== "string") {
                return;
            }
            if (!node.parent.properties.some(e => e.type === AST_NODE_TYPES.Property && e.key.type === AST_NODE_TYPES.Identifier && e.key.name === "type")) {
                return;
            }
            /**
             * @type {import("@typescript-eslint/utils").TSESTree.Node | undefined}
             */
            let p = node.parent.parent;
            let isHostedByTarget = false;
            while (p) {
                if (p.type === AST_NODE_TYPES.ObjectExpression) return; // Nested descriptor
                if (p.type === AST_NODE_TYPES.VariableDeclarator) {
                    if (p.id.type !== AST_NODE_TYPES.Identifier) return; // non-identifier host
                    if (!targetParserDeclarations.includes(p.id.name)) return; // not a declaration we care about
                    isHostedByTarget = true;
                }
                p = p.parent;
            }
            if (!isHostedByTarget) return; // Not on a variable declaration we care about

            /** @type {OptionData} */
            const option = {
                name: node.value.value,
                internal: !!node.parent.properties.some(e => e.type === AST_NODE_TYPES.Property && e.key.type === AST_NODE_TYPES.Identifier && e.key.name === "internal" && e.value.type === AST_NODE_TYPES.Literal && e.value.value === true),
            };

            if (!optionsFromType[option.name]) {
                context.report({ messageId: "notInOptionsType", node: node.key });
            }
            else if (!option.internal && optionsFromType[option.name].internal) {
                context.report({ messageId: "missingInternalSetting", node: node.key, fix: fixer => fixer.insertTextAfterRange([0, node.range[1] + 1], " internal: true,") });
            }
        };

        return {
            Property: checkProperty,
            TSInterfaceDeclaration: checkInterface,
        };
    },
});
