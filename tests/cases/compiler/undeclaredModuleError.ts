//@module: amd
import fs = require('fs');
function readdir(path: string, accept: (stat: fs.Stats, name: string) => boolean, callback: (error: Error, results: { name: string; stat: fs.Stats; }[]) => void ) {}

function join(...paths: string[]) {}

function instrumentFile(covFileDir: string, covFileName: string, originalFilePath: string) {
    fs.readFile(originalFilePath, () => {       
        readdir(covFileDir, () => {
        } , (error: Error, files: {}[]) => {
                files.forEach((file) => {
                    var fullPath = join(IDoNotExist);
                } );
            } );
    } );
}