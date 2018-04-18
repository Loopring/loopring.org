
import binder from "./libs/binder";
import "./libs/slick";
import "./libs/odometer";
import {constants, afteLoads, btnDecorate, headerActivities} from "./modules/globals";
import {odometer} from "./modules/odometer";
import {accordeon} from "./modules/accordeon";
import {sidebarSticky} from "./modules/sidebarSticky";
import {introWrapper, introVideo} from "./modules/introWrapper";
import {mobileSlider, mobileSliderResize, videoSlider, historySlider, scrollAnimations} from "./modules/homeAnimations";

let args = [
    {
        "html": [constants, afteLoads],
        ".btn": [btnDecorate],
        ".parall": [introWrapper, introVideo],
        ".header": [headerActivities],
        ".long-animations": [mobileSlider, mobileSliderResize],
        ".animateMe": [scrollAnimations],
        ".history-slider-nav": [historySlider],
        ".odometer": [odometer],
        ".accordeon": [accordeon],
        ".sidebar": [sidebarSticky],
        ".video-slider": [videoSlider]
    },
];

binder(...args);
