const flag = "--ms-enable-electron-run-as-node";

if (!process.execArgv.includes(flag)) {
    process.execArgv = [...process.execArgv, flag];
}
