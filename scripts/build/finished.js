// @ts-check
module.exports = finished;

/**
 * @param {NodeJS.ReadableStream | NodeJS.WritableStream} stream
 * @returns {Promise<void>}
 */
function finished(stream) {
    return new Promise((resolve, reject) => {
        const readable = "readable" in stream && stream.readable;
        const writable = "writable" in stream && stream.writable;
        
        let countdown = 0;
        const cleanup = () => { 
            if (readable) stream.removeListener("end", signal);
            if (writable) stream.removeListener("finish", signal);
            stream.removeListener("error", onerror); 
        };
        const signal = () => {
            if (countdown > 0) {
                countdown--;
                if (countdown === 0) {
                    cleanup();
                    resolve();
                }
            }
        };
        const onerror = (error) => { 
            if (countdown > 0) {
                countdown = 0;
                cleanup();
                reject(error);
            }
        };
        stream.once("error", onerror);
        if (readable) {
            countdown++;
            stream.once("end", signal);
        }
        if (writable) {
            countdown++;
            stream.once("finish", signal);
        }
        if (countdown === 0) signal();
    });
}