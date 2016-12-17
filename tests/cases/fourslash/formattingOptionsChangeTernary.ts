///<reference path="fourslash.ts"/>

////const expectedScanAction =
////    shouldRescanGreaterThanToken(n)
////    ? ScanAction.RescanGreaterThanToken
////    : shouldRescanSlashToken(n)
////    ? ScanAction.RescanSlashToken
////    : shouldRescanTemplateToken(n)
////    ? ScanAction.RescanTemplateToken
////    : shouldRescanJsxIdentifier(n)
////    ? ScanAction.RescanJsxIdentifier
////    : shouldRescanJsxText(n)
////    ? ScanAction.RescanJsxText
////    : ScanAction.Scan;

format.setOption("indentInsideTernaryOperator", false);
format.document();
verify.currentFileContentIs(`const expectedScanAction =
    shouldRescanGreaterThanToken(n)
        ? ScanAction.RescanGreaterThanToken
        : shouldRescanSlashToken(n)
        ? ScanAction.RescanSlashToken
        : shouldRescanTemplateToken(n)
        ? ScanAction.RescanTemplateToken
        : shouldRescanJsxIdentifier(n)
        ? ScanAction.RescanJsxIdentifier
        : shouldRescanJsxText(n)
        ? ScanAction.RescanJsxText
        : ScanAction.Scan;`)

format.setOption("indentInsideTernaryOperator", true);
format.document();
verify.currentFileContentIs(`const expectedScanAction =
    shouldRescanGreaterThanToken(n)
        ? ScanAction.RescanGreaterThanToken
        : shouldRescanSlashToken(n)
            ? ScanAction.RescanSlashToken
            : shouldRescanTemplateToken(n)
                ? ScanAction.RescanTemplateToken
                : shouldRescanJsxIdentifier(n)
                    ? ScanAction.RescanJsxIdentifier
                    : shouldRescanJsxText(n)
                        ? ScanAction.RescanJsxText
                        : ScanAction.Scan;`)