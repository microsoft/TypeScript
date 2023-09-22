import { sys } from "../sys";
import { sleep } from "./sleep";

const cpuCount = sys.cpuCount?.() ?? 1;

export class SpinWait {
    private _count = 0;

    reset() {
        this._count = 0;
    }

    spinOnce() {
        const count = this._count;
        if (cpuCount > 0 && count < 10) {
            for (let i = 0; i < count; i++) {
                // busy loop, do nothing
            }
        }
        else if ((count - 10) % 20 === 19) {
            sleep(1);
        }
        // else if ((count - 10) % 5 === 4) {
        //     sleep(1);
        // }
        else {
            sleep(0);
        }
        this._count = (count + 1) >>> 0;
    }
}
