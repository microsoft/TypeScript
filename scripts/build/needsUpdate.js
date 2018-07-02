// @ts-check
const fs = require("fs");

module.exports = needsUpdate;

/**
 * @param {string | string[]} source
 * @param {string | string[]} dest
 * @returns {boolean}
 */
function needsUpdate(source, dest) {
    if (typeof source === "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            const {mtime: inTime} = fs.statSync(source);
            if (+inTime <= +outTime) {
                return false;
            }
        }
    }
    else if (typeof source === "string" && typeof dest !== "string") {
        const {mtime: inTime} = fs.statSync(source);
        for (const filepath of dest) {
            if (fs.existsSync(filepath)) {
                const {mtime: outTime} = fs.statSync(filepath);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    else if (typeof source !== "string" && typeof dest === "string") {
        if (fs.existsSync(dest)) {
            const {mtime: outTime} = fs.statSync(dest);
            for (const filepath of source) {
                if (fs.existsSync(filepath)) {
                    const {mtime: inTime} = fs.statSync(filepath);
                    if (+inTime > +outTime) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
            return false;
        }
    }
    else if (typeof source !== "string" && typeof dest !== "string") {
        for (let i = 0; i < source.length; i++) {
            if (!dest[i]) {
                continue;
            }
            if (fs.existsSync(dest[i])) {
                const {mtime: outTime} = fs.statSync(dest[i]);
                const {mtime: inTime} = fs.statSync(source[i]);
                if (+inTime > +outTime) {
                    return true;
                }
            }
            else {
                return true;
            }
        }
        return false;
    }
    return true;
}