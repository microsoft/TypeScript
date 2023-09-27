const { AST_NODE_TYPES } = require("@typescript-eslint/utils");
const { createRule } = require("./utils.cjs");
const path = require("path");

const srcRoot = path.resolve(__dirname, "../../../src");

const tsNamespaceBarrelRegex = /_namespaces\/ts(?:\.ts|\.js|\.mts|\.mjs|\.cts|\.cjs)?$/;

/**
 * @type {Array<{ name: string; path: string; }>}
 */
const modules = [
    // {
    //     name: "Debug",
    //     path: "compiler/debug",
    // },
    {
        name: "Diagnostics",
        path: "compiler/diagnosticInformationMap.generated",
    },
];

module.exports = createRule({
    name: "prefer-direct-import",
    meta: {
        docs: {
            description: ``,
        },
        messages: {
            importError: `{{ name }} should be imported directly from {{ path }}`,
        },
        schema: [],
        type: "problem",
        fixable: "code",
    },
    defaultOptions: [],

    create(context) {
        /**
         * @param {string} p
         */
        function getImportPath(p) {
            let out = path.relative(path.dirname(context.filename), path.join(srcRoot, p)).replace(/\\/g, "/");
            if (!out.startsWith(".")) out = "./" + out;
            return out;
        }

        /** @type {any} */
        let program;
        let addedImport = false;

        return {
            Program: node => {
                program = node;
            },
            ImportDeclaration: node => {
                if (node.importKind !== "value" || !tsNamespaceBarrelRegex.test(node.source.value)) return;

                for (const specifier of node.specifiers) {
                    if (specifier.type !== AST_NODE_TYPES.ImportSpecifier || specifier.importKind !== "value") continue;

                    for (const mod of modules) {
                        if (specifier.imported.name !== mod.name) continue;

                        context.report({
                            messageId: "importError",
                            data: { name: mod.name, path: mod.path },
                            node: specifier,
                            fix: fixer => {
                                const newCode = `import * as ${mod.name} from "${getImportPath(mod.path)}";`;
                                const fixes = [];
                                if (node.specifiers.length === 1) {
                                    if (addedImport) {
                                        fixes.push(fixer.remove(node));
                                    }
                                    else {
                                        fixes.push(fixer.replaceText(node, newCode));
                                        addedImport = true;
                                    }
                                }
                                else {
                                    const comma = context.sourceCode.getTokenAfter(specifier, token => token.value === ",");
                                    if (!comma) throw new Error("comma is null");
                                    const prevNode = context.sourceCode.getTokenBefore(specifier);
                                    if (!prevNode) throw new Error("prevNode is null");
                                    fixes.push(
                                        fixer.removeRange([prevNode.range[1], specifier.range[0]]),
                                        fixer.remove(specifier),
                                        fixer.remove(comma),
                                    );
                                    if (!addedImport) {
                                        fixes.push(fixer.insertTextBefore(node, newCode + "\r\n"));
                                        addedImport = true;
                                    }
                                }

                                return fixes;
                            },
                        });
                    }
                }
            },
            MemberExpression: node => {
                if (node.object.type !== AST_NODE_TYPES.Identifier || node.object.name !== "ts") return;

                for (const mod of modules) {
                    if (node.property.type !== AST_NODE_TYPES.Identifier || node.property.name !== mod.name) continue;

                    context.report({
                        messageId: "importError",
                        data: { name: mod.name, path: mod.path },
                        node,
                        fix: fixer => {
                            const fixes = [fixer.replaceText(node, mod.name)];

                            if (!addedImport) {
                                fixes.push(fixer.insertTextBefore(program, `import * as ${mod.name} from "${getImportPath(mod.path)}";\r\n`));
                                addedImport = true;
                            }

                            return fixes;
                        },
                    });
                }
            },
        };
    },
});
