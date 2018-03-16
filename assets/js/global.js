
import binder from "./libs/binder";
import { constants, afteLoads, btnDecorate, headerActivities} from "./modules/global";
import {introWrapper} from "./modules/introWrapper";

let args = [
    {
        "html": [constants, afteLoads],
        ".btn": [btnDecorate],
        ".intro-wrapper": [introWrapper],
        ".header": [headerActivities]
    },
];

binder(...args);
