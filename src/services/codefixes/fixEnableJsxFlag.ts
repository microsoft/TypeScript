/* @internal */

import { registerCodeFix, createCodeFixActionWithoutFixAll, codeFixAll } from "../codeFixProvider";
import { TsConfigSourceFile } from "../../compiler/types";
import { setJsonCompilerOptionValue } from "./helpers";
import { factory } from "../../../built/local/compiler";

    const fixID = "fixEnableJsxFlag";
    const errorCodes = [Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { configFile } = context.program.getCompilerOptions();
            if (configFile === undefined) {
                return undefined;
            }

            const changes = textChanges.ChangeTracker.with(context, changeTracker =>
                doChange(changeTracker, configFile)
            );
            return [
                createCodeFixActionWithoutFixAll(fixID, changes, Diagnostics.Enable_the_jsx_flag_in_your_configuration_file)
            ];
        },
        fixIds: [fixID],
        getAllCodeActions: context =>
            codeFixAll(context, errorCodes, changes => {
                const { configFile } = context.program.getCompilerOptions();
                if (configFile === undefined) {
                    return undefined;
                }

                doChange(changes, configFile);
            })
    });

    function doChange(changeTracker: textChanges.ChangeTracker, configFile: TsConfigSourceFile) {
        setJsonCompilerOptionValue(changeTracker, configFile, "jsx", factory.createStringLiteral("react"));
    }

