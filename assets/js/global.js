
import binder from "./libs/binder";
import "./libs/slick";
import { constants, afteLoads, btnDecorate, headerActivities} from "./modules/globals";
import {introWrapper, introVideo} from "./modules/introWrapper";
import {mobileSlider, mobileSliderResize} from "./modules/homeAnimations";

let args = [
    {
        "html": [constants, afteLoads],
        ".btn": [btnDecorate],
        ".intro-wrapper": [introWrapper, introVideo],
        ".header": [headerActivities],
        ".long-animations": [mobileSlider, mobileSliderResize]
    },
];

binder(...args);
