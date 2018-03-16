
import binder from "./libs/binder";
import { staticFunctions, constants, commonFunction, anotherCommonFunction, navFunction } from "./modules/module";

let args = [
    {
        "html": [constants, staticFunctions],
        "body": [commonFunction, anotherCommonFunction],
        ".header": navFunction
    },
    // true
];

binder(...args);
