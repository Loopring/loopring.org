
// these properies are available from anywhere via this.propery
export const constants = {
    isTouch: "ontouchstart" in window ? function() {document.body.classList.add("touch"); return true;}() : false,
    body: $("body")
}

// these functions won't run at once, but can be executed by demand from anywhere via this.functionName
export const staticFunctions = {
    sparedFunction() {
        console.log("spareFunction executed");
    },
    anotherSparedFunction(arg) {
        console.log(`anotherSpareFunction executed with args: ${arg}`);
    }
}

// runs at once. runs on all pages because of bound with 'body' selector
export function commonFunction() {
    console.log("window was loaded");
    // isTouch is available from anywhere via this.isTouch
    console.log(`is touch: ${this.isTouch}`);
}

// runs at once. runs on all pages because of bound with 'body' selector
export function anotherCommonFunction() {
    window.addEventListener("resize", () => {
        setTimeout(() => {
            console.log("window was resized");
        },500);
    });
}

// runs at once. runs anywhere, where .header selector can be found
export function navFunction() {
    console.log("navFunction executed");
    // body is available from anywhere via this.body
    console.log('body height:', this.body.height());
    // static function is available from anywhere via this.functionName
    this.anotherSparedFunction('myArg');
}
