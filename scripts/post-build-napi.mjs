import fs from "fs";
import { glob } from "glob";

// create if it doesn't exist
fs.mkdirSync("built/local", { recursive: true });

const napiBinFiles = glob.sync("typescript.*", { ignore: "node_modules/**" });

napiBinFiles.forEach(binFile => fs.renameSync(binFile, `./built/local/${binFile}`));
