(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({"/var/www/loopring/assets/js/global.js":[function(require,module,exports){
"use strict";

var _binder = require("./libs/binder");

var _binder2 = _interopRequireDefault(_binder);

var _global = require("./modules/global");

var _introWrapper = require("./modules/introWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = [{
    "html": [_global.constants, _global.afteLoads],
    ".btn": [_global.btnDecorate],
    ".intro-wrapper": [_introWrapper.introWrapper],
    ".header": [_global.headerActivities]
}];

_binder2.default.apply(undefined, args);

},{"./libs/binder":"/var/www/loopring/assets/js/libs/binder.js","./modules/global":"/var/www/loopring/assets/js/modules/global.js","./modules/introWrapper":"/var/www/loopring/assets/js/modules/introWrapper.js"}],"/var/www/loopring/assets/js/libs/binder.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

exports.default = binder;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// v.2.1

function binder(selectorsAndFunctionsBounds) {
    var runTests = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var t0 = void 0,
        t1 = void 0;
    if (runTests) t0 = performance.now();
    // polyfill for ".matches()" method
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector;
    }
    // gather all selectors in array
    var selectorsToFind = (0, _keys2.default)(selectorsAndFunctionsBounds);
    // find selectors in document
    var foundElements = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll(selectorsToFind.join(","))));
    // filter bounds for not founded selectors
    var filteredBounds = {};

    var _loop = function _loop(key) {
        if (foundElements.some(function (element) {
            return element.matches(key);
        })) {
            filteredBounds[key] = selectorsAndFunctionsBounds[key];
        } else {
            if (runTests) console.log("- " + key + " was not found");
        }
    };

    for (var key in selectorsAndFunctionsBounds) {
        _loop(key);
    }
    // gather all modules in one object
    var mergedModules = {};
    for (var bound in filteredBounds) {
        var module = filteredBounds[bound];
        var nature = Object.prototype.toString.call(module);
        if (nature === "[object Array]") {
            module.forEach(function (script) {
                if (Object.prototype.toString.call(script) === "[object Function]") {
                    mergedModules[script.name] = script;
                    mergedModules[script.name]();
                } else {
                    mergedModules = (0, _assign2.default)(mergedModules, script);
                }
            });
        } else if (nature === "[object Object]") {
            mergedModules = (0, _assign2.default)(mergedModules, module);
        } else if (nature === "[object Function]") {
            mergedModules[module.name] = module;
            mergedModules[module.name]();
        } else {
            console.log("! unsupported format: ", module);
        }
    }
    if (runTests) console.log("binderResultObject: ", mergedModules);
    if (runTests) t1 = performance.now();
    if (runTests) console.log("Binder html parsing took " + (t1 - t0) + " milliseconds.");
}

},{"babel-runtime/core-js/object/assign":"/var/www/loopring/node_modules/babel-runtime/core-js/object/assign.js","babel-runtime/core-js/object/keys":"/var/www/loopring/node_modules/babel-runtime/core-js/object/keys.js","babel-runtime/helpers/toConsumableArray":"/var/www/loopring/node_modules/babel-runtime/helpers/toConsumableArray.js"}],"/var/www/loopring/assets/js/modules/global.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.afteLoads = afteLoads;
exports.btnDecorate = btnDecorate;
exports.headerActivities = headerActivities;
var constants = exports.constants = {
    isTouch: "ontouchstart" in window ? function () {
        document.body.classList.add("touch");return true;
    }() : false,
    body: $("body")
};
function afteLoads() {
    var _this = this;

    window.addEventListener("load", function () {
        _this.body.addClass('load');
    });
}
function btnDecorate() {
    $('.btn, input[type="submit"], button').append('<span class="decor-top"></span><span class="decor-bot"></span>');
}
function headerActivities() {
    $('.btn-menu').on('click', function () {
        var $this = $(this);
        $this.closest('.header').toggleClass('opened');
        $this.toggleClass('active');
        $this.closest('.header').find('nav').fadeToggle();
        $('body').toggleClass('ovh');
    });
    $('.lang-box').on('click', function (e) {
        if (!$(e.target).closest('.btn-close').length) {
            $(this).find('.drop-down').fadeIn();
        }
    });
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.lang-box').length) {
            $('.drop-down').fadeOut();
        }
    });
    $('.btn-close').on('click', function () {
        $(this).closest('.drop-down').fadeOut();
    });
}

},{}],"/var/www/loopring/assets/js/modules/introWrapper.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.introWrapper = introWrapper;
function introWrapper() {
    $(document).on("mousemove", function (e) {
        var cx1 = (e.pageX - $(window).innerWidth() / 2) / 80;
        var cy1 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 80;
        var cx2 = (e.pageX - $(window).innerWidth() / 2) / 40;
        var cy2 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 40;
        var cx3 = (e.pageX - $(window).innerWidth() / 2) / 20;
        var cy3 = (e.pageY - $(window).scrollTop() - $(window).innerHeight() / 2) / 20;
        if ($(window).width() >= 1024) {
            $('.parall.one').css({
                'margin-top': cy1 + 'px',
                'margin-left': cx1 + 'px'
            });
            $('.parall.two').css({
                'margin-top': cy2 + 'px',
                'margin-left': cx2 + 'px'
            });
            $('.parall.three').css({
                'margin-top': cy3 + 'px',
                'margin-left': cx3 + 'px'
            });
        }
    });
}
// todo

},{}],"/var/www/loopring/node_modules/babel-runtime/core-js/array/from.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":"/var/www/loopring/node_modules/core-js/library/fn/array/from.js"}],"/var/www/loopring/node_modules/babel-runtime/core-js/object/assign.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"/var/www/loopring/node_modules/core-js/library/fn/object/assign.js"}],"/var/www/loopring/node_modules/babel-runtime/core-js/object/keys.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":"/var/www/loopring/node_modules/core-js/library/fn/object/keys.js"}],"/var/www/loopring/node_modules/babel-runtime/helpers/toConsumableArray.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":"/var/www/loopring/node_modules/babel-runtime/core-js/array/from.js"}],"/var/www/loopring/node_modules/core-js/library/fn/array/from.js":[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.array.from":"/var/www/loopring/node_modules/core-js/library/modules/es6.array.from.js","../../modules/es6.string.iterator":"/var/www/loopring/node_modules/core-js/library/modules/es6.string.iterator.js"}],"/var/www/loopring/node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.object.assign":"/var/www/loopring/node_modules/core-js/library/modules/es6.object.assign.js"}],"/var/www/loopring/node_modules/core-js/library/fn/object/keys.js":[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","../../modules/es6.object.keys":"/var/www/loopring/node_modules/core-js/library/modules/es6.object.keys.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":"/var/www/loopring/node_modules/core-js/library/modules/_to-absolute-index.js","./_to-iobject":"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_classof.js":[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"/var/www/loopring/node_modules/core-js/library/modules/_cof.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_core.js":[function(require,module,exports){
var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_create-property.js":[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"/var/www/loopring/node_modules/core-js/library/modules/_a-function.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_export.js":[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_ctx":"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js","./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_fails.js":[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_has.js":[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_hide.js":[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_html.js":[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_dom-create":"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js","./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"/var/www/loopring/node_modules/core-js/library/modules/_cof.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js","./_object-create":"/var/www/loopring/node_modules/core-js/library/modules/_object-create.js","./_property-desc":"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var has = require('./_has');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js","./_iter-create":"/var/www/loopring/node_modules/core-js/library/modules/_iter-create.js","./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_library":"/var/www/loopring/node_modules/core-js/library/modules/_library.js","./_object-gpo":"/var/www/loopring/node_modules/core-js/library/modules/_object-gpo.js","./_redefine":"/var/www/loopring/node_modules/core-js/library/modules/_redefine.js","./_set-to-string-tag":"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports){
module.exports = {};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_library.js":[function(require,module,exports){
module.exports = true;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-assign.js":[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;

},{"./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js","./_iobject":"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js","./_object-gops":"/var/www/loopring/node_modules/core-js/library/modules/_object-gops.js","./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js","./_object-pie":"/var/www/loopring/node_modules/core-js/library/modules/_object-pie.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_dom-create":"/var/www/loopring/node_modules/core-js/library/modules/_dom-create.js","./_enum-bug-keys":"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js","./_html":"/var/www/loopring/node_modules/core-js/library/modules/_html.js","./_object-dps":"/var/www/loopring/node_modules/core-js/library/modules/_object-dps.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_ie8-dom-define":"/var/www/loopring/node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"/var/www/loopring/node_modules/core-js/library/modules/_to-primitive.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":"/var/www/loopring/node_modules/core-js/library/modules/_an-object.js","./_descriptors":"/var/www/loopring/node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-gops.js":[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":"/var/www/loopring/node_modules/core-js/library/modules/_array-includes.js","./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_shared-key":"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js","./_to-iobject":"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":"/var/www/loopring/node_modules/core-js/library/modules/_enum-bug-keys.js","./_object-keys-internal":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys-internal.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_object-pie.js":[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_fails":"/var/www/loopring/node_modules/core-js/library/modules/_fails.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":"/var/www/loopring/node_modules/core-js/library/modules/_hide.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":"/var/www/loopring/node_modules/core-js/library/modules/_has.js","./_object-dp":"/var/www/loopring/node_modules/core-js/library/modules/_object-dp.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"/var/www/loopring/node_modules/core-js/library/modules/_shared.js","./_uid":"/var/www/loopring/node_modules/core-js/library/modules/_uid.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_shared.js":[function(require,module,exports){
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js","./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js","./_iobject":"/var/www/loopring/node_modules/core-js/library/modules/_iobject.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"/var/www/loopring/node_modules/core-js/library/modules/_to-integer.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"/var/www/loopring/node_modules/core-js/library/modules/_defined.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"/var/www/loopring/node_modules/core-js/library/modules/_is-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/_uid.js":[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"/var/www/loopring/node_modules/core-js/library/modules/_wks.js":[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":"/var/www/loopring/node_modules/core-js/library/modules/_global.js","./_shared":"/var/www/loopring/node_modules/core-js/library/modules/_shared.js","./_uid":"/var/www/loopring/node_modules/core-js/library/modules/_uid.js"}],"/var/www/loopring/node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"/var/www/loopring/node_modules/core-js/library/modules/_classof.js","./_core":"/var/www/loopring/node_modules/core-js/library/modules/_core.js","./_iterators":"/var/www/loopring/node_modules/core-js/library/modules/_iterators.js","./_wks":"/var/www/loopring/node_modules/core-js/library/modules/_wks.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.array.from.js":[function(require,module,exports){
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":"/var/www/loopring/node_modules/core-js/library/modules/_create-property.js","./_ctx":"/var/www/loopring/node_modules/core-js/library/modules/_ctx.js","./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_is-array-iter":"/var/www/loopring/node_modules/core-js/library/modules/_is-array-iter.js","./_iter-call":"/var/www/loopring/node_modules/core-js/library/modules/_iter-call.js","./_iter-detect":"/var/www/loopring/node_modules/core-js/library/modules/_iter-detect.js","./_to-length":"/var/www/loopring/node_modules/core-js/library/modules/_to-length.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js","./core.get-iterator-method":"/var/www/loopring/node_modules/core-js/library/modules/core.get-iterator-method.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"/var/www/loopring/node_modules/core-js/library/modules/_export.js","./_object-assign":"/var/www/loopring/node_modules/core-js/library/modules/_object-assign.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_object-keys":"/var/www/loopring/node_modules/core-js/library/modules/_object-keys.js","./_object-sap":"/var/www/loopring/node_modules/core-js/library/modules/_object-sap.js","./_to-object":"/var/www/loopring/node_modules/core-js/library/modules/_to-object.js"}],"/var/www/loopring/node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":"/var/www/loopring/node_modules/core-js/library/modules/_iter-define.js","./_string-at":"/var/www/loopring/node_modules/core-js/library/modules/_string-at.js"}]},{},["/var/www/loopring/assets/js/global.js"])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvZ2xvYmFsLmpzIiwiYXNzZXRzL2pzL2xpYnMvYmluZGVyLmpzIiwiYXNzZXRzL2pzL21vZHVsZXMvZ2xvYmFsLmpzIiwiYXNzZXRzL2pzL21vZHVsZXMvaW50cm9XcmFwcGVyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0NBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFJLE9BQU8sQ0FDUDtBQUNJLFlBQVEsc0NBRFo7QUFFSSxZQUFRLHFCQUZaO0FBR0ksc0JBQWtCLDRCQUh0QjtBQUlJLGVBQVc7QUFKZixDQURPLENBQVg7O0FBU0Esa0NBQVUsSUFBVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ1p3QixNOzs7O0FBRnhCOztBQUVlLFNBQVMsTUFBVCxDQUFnQiwyQkFBaEIsRUFBK0Q7QUFBQSxRQUFsQixRQUFrQix1RUFBUCxLQUFPOztBQUMxRSxRQUFJLFdBQUo7QUFBQSxRQUFRLFdBQVI7QUFDQSxRQUFJLFFBQUosRUFBYyxLQUFLLFlBQVksR0FBWixFQUFMO0FBQ2Q7QUFDQSxRQUFJLENBQUMsUUFBUSxTQUFSLENBQWtCLE9BQXZCLEVBQWdDO0FBQzVCLGdCQUFRLFNBQVIsQ0FBa0IsT0FBbEIsR0FBNEIsUUFBUSxTQUFSLENBQWtCLGlCQUE5QztBQUNIO0FBQ0Q7QUFDQSxRQUFNLGtCQUFrQixvQkFBWSwyQkFBWixDQUF4QjtBQUNBO0FBQ0EsUUFBTSwyREFBb0IsU0FBUyxnQkFBVCxDQUEwQixnQkFBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBMUIsQ0FBcEIsRUFBTjtBQUNBO0FBQ0EsUUFBSSxpQkFBaUIsRUFBckI7O0FBWjBFLCtCQWFqRSxHQWJpRTtBQWN0RSxZQUFJLGNBQWMsSUFBZCxDQUFtQjtBQUFBLG1CQUFXLFFBQVEsT0FBUixDQUFnQixHQUFoQixDQUFYO0FBQUEsU0FBbkIsQ0FBSixFQUF5RDtBQUNyRCwyQkFBZSxHQUFmLElBQXNCLDRCQUE0QixHQUE1QixDQUF0QjtBQUNILFNBRkQsTUFFTztBQUNILGdCQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsUUFBaUIsR0FBakI7QUFDakI7QUFsQnFFOztBQWExRSxTQUFLLElBQUksR0FBVCxJQUFnQiwyQkFBaEIsRUFBNkM7QUFBQSxjQUFwQyxHQUFvQztBQU01QztBQUNEO0FBQ0EsUUFBSSxnQkFBZ0IsRUFBcEI7QUFDQSxTQUFLLElBQUksS0FBVCxJQUFrQixjQUFsQixFQUFrQztBQUM5QixZQUFJLFNBQVMsZUFBZSxLQUFmLENBQWI7QUFDQSxZQUFJLFNBQVMsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLE1BQS9CLENBQWI7QUFDQSxZQUFJLFdBQVcsZ0JBQWYsRUFBaUM7QUFDN0IsbUJBQU8sT0FBUCxDQUFlLGtCQUFVO0FBQ3JCLG9CQUFJLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixNQUEvQixNQUEyQyxtQkFBL0MsRUFBb0U7QUFDaEUsa0NBQWMsT0FBTyxJQUFyQixJQUE2QixNQUE3QjtBQUNBLGtDQUFjLE9BQU8sSUFBckI7QUFDSCxpQkFIRCxNQUdPO0FBQ0gsb0NBQWdCLHNCQUFjLGFBQWQsRUFBNkIsTUFBN0IsQ0FBaEI7QUFDSDtBQUNKLGFBUEQ7QUFRSCxTQVRELE1BU08sSUFBSSxXQUFXLGlCQUFmLEVBQWtDO0FBQ3JDLDRCQUFnQixzQkFBYyxhQUFkLEVBQTZCLE1BQTdCLENBQWhCO0FBQ0gsU0FGTSxNQUVBLElBQUksV0FBVyxtQkFBZixFQUFvQztBQUN2QywwQkFBYyxPQUFPLElBQXJCLElBQTZCLE1BQTdCO0FBQ0EsMEJBQWMsT0FBTyxJQUFyQjtBQUNILFNBSE0sTUFHQTtBQUNILG9CQUFRLEdBQVIsQ0FBWSx3QkFBWixFQUFzQyxNQUF0QztBQUNIO0FBQ0o7QUFDRCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSxzQkFBWixFQUFvQyxhQUFwQztBQUNkLFFBQUksUUFBSixFQUFjLEtBQUssWUFBWSxHQUFaLEVBQUw7QUFDZCxRQUFJLFFBQUosRUFBYyxRQUFRLEdBQVIsQ0FBWSwrQkFBK0IsS0FBSyxFQUFwQyxJQUEwQyxnQkFBdEQ7QUFDakI7Ozs7Ozs7O1FDNUNlLFMsR0FBQSxTO1FBS0EsVyxHQUFBLFc7UUFHQSxnQixHQUFBLGdCO0FBWlQsSUFBTSxnQ0FBWTtBQUNyQixhQUFTLGtCQUFrQixNQUFsQixHQUEyQixZQUFXO0FBQUMsaUJBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsR0FBeEIsQ0FBNEIsT0FBNUIsRUFBc0MsT0FBTyxJQUFQO0FBQWEsS0FBL0QsRUFBM0IsR0FBK0YsS0FEbkY7QUFFckIsVUFBTSxFQUFFLE1BQUY7QUFGZSxDQUFsQjtBQUlBLFNBQVMsU0FBVCxHQUFxQjtBQUFBOztBQUN4QixXQUFPLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDbEMsY0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixNQUFuQjtBQUNILEtBRkQ7QUFHSDtBQUNNLFNBQVMsV0FBVCxHQUF1QjtBQUMxQixNQUFFLG9DQUFGLEVBQXdDLE1BQXhDLENBQStDLGdFQUEvQztBQUNIO0FBQ00sU0FBUyxnQkFBVCxHQUE0QjtBQUMvQixNQUFFLFdBQUYsRUFBZSxFQUFmLENBQWtCLE9BQWxCLEVBQTJCLFlBQVk7QUFDbkMsWUFBSSxRQUFRLEVBQUUsSUFBRixDQUFaO0FBQ0EsY0FBTSxPQUFOLENBQWMsU0FBZCxFQUF5QixXQUF6QixDQUFxQyxRQUFyQztBQUNBLGNBQU0sV0FBTixDQUFrQixRQUFsQjtBQUNBLGNBQU0sT0FBTixDQUFjLFNBQWQsRUFBeUIsSUFBekIsQ0FBOEIsS0FBOUIsRUFBcUMsVUFBckM7QUFDQSxVQUFFLE1BQUYsRUFBVSxXQUFWLENBQXNCLEtBQXRCO0FBQ0gsS0FORDtBQU9BLE1BQUUsV0FBRixFQUFlLEVBQWYsQ0FBa0IsT0FBbEIsRUFBMkIsVUFBVSxDQUFWLEVBQWE7QUFDcEMsWUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFKLEVBQVksT0FBWixDQUFvQixZQUFwQixFQUFrQyxNQUF2QyxFQUErQztBQUMzQyxjQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsWUFBYixFQUEyQixNQUEzQjtBQUNIO0FBQ0osS0FKRDtBQUtBLE1BQUUsUUFBRixFQUFZLEVBQVosQ0FBZSxPQUFmLEVBQXdCLFVBQVUsQ0FBVixFQUFhO0FBQ2pDLFlBQUksQ0FBQyxFQUFFLEVBQUUsTUFBSixFQUFZLE9BQVosQ0FBb0IsV0FBcEIsRUFBaUMsTUFBdEMsRUFBOEM7QUFDMUMsY0FBRSxZQUFGLEVBQWdCLE9BQWhCO0FBQ0g7QUFDSixLQUpEO0FBS0EsTUFBRSxZQUFGLEVBQWdCLEVBQWhCLENBQW1CLE9BQW5CLEVBQTRCLFlBQVk7QUFDcEMsVUFBRSxJQUFGLEVBQVEsT0FBUixDQUFnQixZQUFoQixFQUE4QixPQUE5QjtBQUNILEtBRkQ7QUFJSDs7Ozs7Ozs7UUNsQ2UsWSxHQUFBLFk7QUFBVCxTQUFTLFlBQVQsR0FBd0I7QUFDM0IsTUFBRSxRQUFGLEVBQVksRUFBWixDQUFlLFdBQWYsRUFBNEIsVUFBVSxDQUFWLEVBQWE7QUFDckMsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBSSxNQUFNLENBQUMsRUFBRSxLQUFGLEdBQVUsRUFBRSxNQUFGLEVBQVUsVUFBVixLQUF1QixDQUFsQyxJQUF1QyxFQUFqRDtBQUNBLFlBQUksTUFBTSxDQUFFLEVBQUUsS0FBRixHQUFVLEVBQUUsTUFBRixFQUFVLFNBQVYsRUFBWCxHQUFvQyxFQUFFLE1BQUYsRUFBVSxXQUFWLEtBQXdCLENBQTdELElBQWtFLEVBQTVFO0FBQ0EsWUFBRyxFQUFFLE1BQUYsRUFBVSxLQUFWLE1BQXFCLElBQXhCLEVBQTZCO0FBQ3pCLGNBQUUsYUFBRixFQUFpQixHQUFqQixDQUFxQjtBQUNqQiw4QkFBYyxNQUFJLElBREQ7QUFFakIsK0JBQWUsTUFBSTtBQUZGLGFBQXJCO0FBSUEsY0FBRSxhQUFGLEVBQWlCLEdBQWpCLENBQXFCO0FBQ2pCLDhCQUFjLE1BQUksSUFERDtBQUVqQiwrQkFBZSxNQUFJO0FBRkYsYUFBckI7QUFJQSxjQUFFLGVBQUYsRUFBbUIsR0FBbkIsQ0FBdUI7QUFDbkIsOEJBQWMsTUFBSSxJQURDO0FBRW5CLCtCQUFlLE1BQUk7QUFGQSxhQUF2QjtBQUlIO0FBQ0osS0FyQkQ7QUF1Qkg7QUFDRDs7O0FDekJBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIlxuaW1wb3J0IGJpbmRlciBmcm9tIFwiLi9saWJzL2JpbmRlclwiO1xuaW1wb3J0IHsgY29uc3RhbnRzLCBhZnRlTG9hZHMsIGJ0bkRlY29yYXRlLCBoZWFkZXJBY3Rpdml0aWVzfSBmcm9tIFwiLi9tb2R1bGVzL2dsb2JhbFwiO1xuaW1wb3J0IHtpbnRyb1dyYXBwZXJ9IGZyb20gXCIuL21vZHVsZXMvaW50cm9XcmFwcGVyXCI7XG5cbmxldCBhcmdzID0gW1xuICAgIHtcbiAgICAgICAgXCJodG1sXCI6IFtjb25zdGFudHMsIGFmdGVMb2Fkc10sXG4gICAgICAgIFwiLmJ0blwiOiBbYnRuRGVjb3JhdGVdLFxuICAgICAgICBcIi5pbnRyby13cmFwcGVyXCI6IFtpbnRyb1dyYXBwZXJdLFxuICAgICAgICBcIi5oZWFkZXJcIjogW2hlYWRlckFjdGl2aXRpZXNdXG4gICAgfSxcbl07XG5cbmJpbmRlciguLi5hcmdzKTtcbiIsIi8vIHYuMi4xXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJpbmRlcihzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMsIHJ1blRlc3RzID0gZmFsc2UpIHtcbiAgICBsZXQgdDAsIHQxO1xuICAgIGlmIChydW5UZXN0cykgdDAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAvLyBwb2x5ZmlsbCBmb3IgXCIubWF0Y2hlcygpXCIgbWV0aG9kXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPSBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvcjtcbiAgICB9XG4gICAgLy8gZ2F0aGVyIGFsbCBzZWxlY3RvcnMgaW4gYXJyYXlcbiAgICBjb25zdCBzZWxlY3RvcnNUb0ZpbmQgPSBPYmplY3Qua2V5cyhzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpO1xuICAgIC8vIGZpbmQgc2VsZWN0b3JzIGluIGRvY3VtZW50XG4gICAgY29uc3QgZm91bmRFbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yc1RvRmluZC5qb2luKFwiLFwiKSldO1xuICAgIC8vIGZpbHRlciBib3VuZHMgZm9yIG5vdCBmb3VuZGVkIHNlbGVjdG9yc1xuICAgIGxldCBmaWx0ZXJlZEJvdW5kcyA9IHt9O1xuICAgIGZvciAobGV0IGtleSBpbiBzZWxlY3RvcnNBbmRGdW5jdGlvbnNCb3VuZHMpIHtcbiAgICAgICAgaWYgKGZvdW5kRWxlbWVudHMuc29tZShlbGVtZW50ID0+IGVsZW1lbnQubWF0Y2hlcyhrZXkpKSkge1xuICAgICAgICAgICAgZmlsdGVyZWRCb3VuZHNba2V5XSA9IHNlbGVjdG9yc0FuZEZ1bmN0aW9uc0JvdW5kc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhgLSAke2tleX0gd2FzIG5vdCBmb3VuZGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGdhdGhlciBhbGwgbW9kdWxlcyBpbiBvbmUgb2JqZWN0XG4gICAgbGV0IG1lcmdlZE1vZHVsZXMgPSB7fTtcbiAgICBmb3IgKGxldCBib3VuZCBpbiBmaWx0ZXJlZEJvdW5kcykge1xuICAgICAgICBsZXQgbW9kdWxlID0gZmlsdGVyZWRCb3VuZHNbYm91bmRdO1xuICAgICAgICBsZXQgbmF0dXJlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1vZHVsZSk7XG4gICAgICAgIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICAgICAgbW9kdWxlLmZvckVhY2goc2NyaXB0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHNjcmlwdCkgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzW3NjcmlwdC5uYW1lXSA9IHNjcmlwdDtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1tzY3JpcHQubmFtZV0oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXJnZWRNb2R1bGVzID0gT2JqZWN0LmFzc2lnbihtZXJnZWRNb2R1bGVzLCBzY3JpcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5hdHVyZSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlcyA9IE9iamVjdC5hc3NpZ24obWVyZ2VkTW9kdWxlcywgbW9kdWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChuYXR1cmUgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgICAgICAgbWVyZ2VkTW9kdWxlc1ttb2R1bGUubmFtZV0gPSBtb2R1bGU7XG4gICAgICAgICAgICBtZXJnZWRNb2R1bGVzW21vZHVsZS5uYW1lXSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIhIHVuc3VwcG9ydGVkIGZvcm1hdDogXCIsIG1vZHVsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJ1blRlc3RzKSBjb25zb2xlLmxvZyhcImJpbmRlclJlc3VsdE9iamVjdDogXCIsIG1lcmdlZE1vZHVsZXMpO1xuICAgIGlmIChydW5UZXN0cykgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBpZiAocnVuVGVzdHMpIGNvbnNvbGUubG9nKFwiQmluZGVyIGh0bWwgcGFyc2luZyB0b29rIFwiICsgKHQxIC0gdDApICsgXCIgbWlsbGlzZWNvbmRzLlwiKTtcbn1cbiIsImV4cG9ydCBjb25zdCBjb25zdGFudHMgPSB7XG4gICAgaXNUb3VjaDogXCJvbnRvdWNoc3RhcnRcIiBpbiB3aW5kb3cgPyBmdW5jdGlvbigpIHtkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ0b3VjaFwiKTsgcmV0dXJuIHRydWU7fSgpIDogZmFsc2UsXG4gICAgYm9keTogJChcImJvZHlcIilcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZnRlTG9hZHMoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5ib2R5LmFkZENsYXNzKCdsb2FkJylcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBidG5EZWNvcmF0ZSgpIHtcbiAgICAkKCcuYnRuLCBpbnB1dFt0eXBlPVwic3VibWl0XCJdLCBidXR0b24nKS5hcHBlbmQoJzxzcGFuIGNsYXNzPVwiZGVjb3ItdG9wXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiZGVjb3ItYm90XCI+PC9zcGFuPicpXG59XG5leHBvcnQgZnVuY3Rpb24gaGVhZGVyQWN0aXZpdGllcygpIHtcbiAgICAkKCcuYnRuLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLmNsb3Nlc3QoJy5oZWFkZXInKS50b2dnbGVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJHRoaXMuY2xvc2VzdCgnLmhlYWRlcicpLmZpbmQoJ25hdicpLmZhZGVUb2dnbGUoKTtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdvdmgnKTtcbiAgICB9KTtcbiAgICAkKCcubGFuZy1ib3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoISQoZS50YXJnZXQpLmNsb3Nlc3QoJy5idG4tY2xvc2UnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLmRyb3AtZG93bicpLmZhZGVJbigpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5jbG9zZXN0KCcubGFuZy1ib3gnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJy5kcm9wLWRvd24nKS5mYWRlT3V0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKCcuYnRuLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5kcm9wLWRvd24nKS5mYWRlT3V0KCk7XG4gICAgfSlcblxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGludHJvV3JhcHBlcigpIHtcbiAgICAkKGRvY3VtZW50KS5vbihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgY3gxID0gKGUucGFnZVggLSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpLzIpIC8gODA7XG4gICAgICAgIHZhciBjeTEgPSAoKGUucGFnZVkgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCkpIC0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCkvMikgLyA4MDtcbiAgICAgICAgdmFyIGN4MiA9IChlLnBhZ2VYIC0gJCh3aW5kb3cpLmlubmVyV2lkdGgoKS8yKSAvIDQwO1xuICAgICAgICB2YXIgY3kyID0gKChlLnBhZ2VZIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpKSAtICQod2luZG93KS5pbm5lckhlaWdodCgpLzIpIC8gNDA7XG4gICAgICAgIHZhciBjeDMgPSAoZS5wYWdlWCAtICQod2luZG93KS5pbm5lcldpZHRoKCkvMikgLyAyMDtcbiAgICAgICAgdmFyIGN5MyA9ICgoZS5wYWdlWSAtICQod2luZG93KS5zY3JvbGxUb3AoKSkgLSAkKHdpbmRvdykuaW5uZXJIZWlnaHQoKS8yKSAvIDIwO1xuICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA+PSAxMDI0KXtcbiAgICAgICAgICAgICQoJy5wYXJhbGwub25lJykuY3NzKHtcbiAgICAgICAgICAgICAgICAnbWFyZ2luLXRvcCc6IGN5MSsncHgnLFxuICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IGN4MSsncHgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5wYXJhbGwudHdvJykuY3NzKHtcbiAgICAgICAgICAgICAgICAnbWFyZ2luLXRvcCc6IGN5MisncHgnLFxuICAgICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6IGN4MisncHgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5wYXJhbGwudGhyZWUnKS5jc3Moe1xuICAgICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogY3kzKydweCcsXG4gICAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogY3gzKydweCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn1cbi8vIHRvZG8iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTtcbiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcbiIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIEFSRyA9IGNvZihmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcbiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMycgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG4iLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICghQlVHR1kgJiYgJG5hdGl2ZSkgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSkgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG4iLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciAkYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICB2YXIgQSA9IHt9O1xuICB2YXIgQiA9IHt9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIFMgPSBTeW1ib2woKTtcbiAgdmFyIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAoaykgeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCA9IHRvT2JqZWN0KHRhcmdldCk7XG4gIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgd2hpbGUgKGFMZW4gPiBpbmRleCkge1xuICAgIHZhciBTID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pO1xuICAgIHZhciBrZXlzID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIGogPSAwO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGopIGlmIChpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKSBUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcbiIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZFBzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIEVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJyk7XG4gIHZhciBpID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBndCA9ICc+JztcbiAgdmFyIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChpLS0pIGRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChPICE9PSBudWxsKSB7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eSgpO1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKE8pIHtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZiAoaGFzKE8sIElFX1BST1RPKSkgcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZiAodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVE9fU1RSSU5HKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGhhdCwgcG9zKSB7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSk7XG4gICAgdmFyIGkgPSB0b0ludGVnZXIocG9zKTtcbiAgICB2YXIgbCA9IHMubGVuZ3RoO1xuICAgIHZhciBhLCBiO1xuICAgIGlmIChpIDwgMCB8fCBpID49IGwpIHJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG4iLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcbiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG4iLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdChhcnJheUxpa2UpO1xuICAgIHZhciBDID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheTtcbiAgICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIG1hcGZuID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGl0ZXJGbiA9IGdldEl0ZXJGbihPKTtcbiAgICB2YXIgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmIChtYXBwaW5nKSBtYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmIChpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSkge1xuICAgICAgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQygpOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IgKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iXSwicHJlRXhpc3RpbmdDb21tZW50IjoiLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW01dlpHVmZiVzlrZFd4bGN5OWljbTkzYzJWeUxYQmhZMnN2WDNCeVpXeDFaR1V1YW5NaUxDSmhjM05sZEhNdmFuTXZaMnh2WW1Gc0xtcHpJaXdpWVhOelpYUnpMMnB6TDJ4cFluTXZZbWx1WkdWeUxtcHpJaXdpWVhOelpYUnpMMnB6TDIxdlpIVnNaWE12WjJ4dlltRnNMbXB6SWl3aVlYTnpaWFJ6TDJwekwyMXZaSFZzWlhNdmFXNTBjbTlYY21Gd2NHVnlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkpoWW1Wc0xYSjFiblJwYldVdlkyOXlaUzFxY3k5aGNuSmhlUzltY205dExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhZbVZzTFhKMWJuUnBiV1V2WTI5eVpTMXFjeTl2WW1wbFkzUXZZWE56YVdkdUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhZbVZzTFhKMWJuUnBiV1V2WTI5eVpTMXFjeTl2WW1wbFkzUXZhMlY1Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5aVlXSmxiQzF5ZFc1MGFXMWxMMmhsYkhCbGNuTXZkRzlEYjI1emRXMWhZbXhsUVhKeVlYa3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyWnVMMkZ5Y21GNUwyWnliMjB1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDI5aWFtVmpkQzloYzNOcFoyNHVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyWnVMMjlpYW1WamRDOXJaWGx6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTloTFdaMWJtTjBhVzl1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTloYmkxdlltcGxZM1F1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMkZ5Y21GNUxXbHVZMngxWkdWekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5amJHRnpjMjltTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlqYjJZdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJOdmNtVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyTnlaV0YwWlMxd2NtOXdaWEowZVM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWTNSNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5a1pXWnBibVZrTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlrWlhOamNtbHdkRzl5Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWkc5dExXTnlaV0YwWlM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWlc1MWJTMWlkV2N0YTJWNWN5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZlpYaHdiM0owTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTltWVdsc2N5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZloyeHZZbUZzTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlvWVhNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJocFpHVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyaDBiV3d1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmxsT0Mxa2IyMHRaR1ZtYVc1bExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5cGIySnFaV04wTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwY3kxaGNuSmhlUzFwZEdWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5cGN5MXZZbXBsWTNRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJsMFpYSXRZMkZzYkM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVhSbGNpMWpjbVZoZEdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJsMFpYSXRaR1ZtYVc1bExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5cGRHVnlMV1JsZEdWamRDNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmFYUmxjbUYwYjNKekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5c2FXSnlZWEo1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl2WW1wbFkzUXRZWE56YVdkdUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5dlltcGxZM1F0WTNKbFlYUmxMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXZZbXBsWTNRdFpIQXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyOWlhbVZqZEMxa2NITXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyOWlhbVZqZEMxbmIzQnpMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXZZbXBsWTNRdFozQnZMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXZZbXBsWTNRdGEyVjVjeTFwYm5SbGNtNWhiQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZiMkpxWldOMExXdGxlWE11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMXdhV1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMXpZWEF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM0J5YjNCbGNuUjVMV1JsYzJNdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNKbFpHVm1hVzVsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl6WlhRdGRHOHRjM1J5YVc1bkxYUmhaeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZjMmhoY21Wa0xXdGxlUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZjMmhoY21Wa0xtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5emRISnBibWN0WVhRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNSdkxXRmljMjlzZFhSbExXbHVaR1Y0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTkwYnkxcGJuUmxaMlZ5TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTkwYnkxcGIySnFaV04wTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTkwYnkxc1pXNW5kR2d1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM1J2TFc5aWFtVmpkQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZkRzh0Y0hKcGJXbDBhWFpsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTkxYVdRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNkcmN5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5amIzSmxMbWRsZEMxcGRHVnlZWFJ2Y2kxdFpYUm9iMlF1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZaWE0yTG1GeWNtRjVMbVp5YjIwdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxtOWlhbVZqZEM1aGMzTnBaMjR1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZaWE0yTG05aWFtVmpkQzVyWlhsekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDJWek5pNXpkSEpwYm1jdWFYUmxjbUYwYjNJdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3p0QlEwTkJPenM3TzBGQlEwRTdPMEZCUTBFN096czdRVUZGUVN4SlFVRkpMRTlCUVU4c1EwRkRVRHRCUVVOSkxGbEJRVkVzYzBOQlJGbzdRVUZGU1N4WlFVRlJMSEZDUVVaYU8wRkJSMGtzYzBKQlFXdENMRFJDUVVoMFFqdEJRVWxKTEdWQlFWYzdRVUZLWml4RFFVUlBMRU5CUVZnN08wRkJVMEVzYTBOQlFWVXNTVUZCVmpzN096czdPenM3T3pzN096czdPenM3T3pzN08ydENRMXAzUWl4Tk96czdPMEZCUm5oQ096dEJRVVZsTEZOQlFWTXNUVUZCVkN4RFFVRm5RaXd5UWtGQmFFSXNSVUZCSzBRN1FVRkJRU3hSUVVGc1FpeFJRVUZyUWl4MVJVRkJVQ3hMUVVGUE96dEJRVU14UlN4UlFVRkpMRmRCUVVvN1FVRkJRU3hSUVVGUkxGZEJRVkk3UVVGRFFTeFJRVUZKTEZGQlFVb3NSVUZCWXl4TFFVRkxMRmxCUVZrc1IwRkJXaXhGUVVGTU8wRkJRMlE3UVVGRFFTeFJRVUZKTEVOQlFVTXNVVUZCVVN4VFFVRlNMRU5CUVd0Q0xFOUJRWFpDTEVWQlFXZERPMEZCUXpWQ0xHZENRVUZSTEZOQlFWSXNRMEZCYTBJc1QwRkJiRUlzUjBGQk5FSXNVVUZCVVN4VFFVRlNMRU5CUVd0Q0xHbENRVUU1UXp0QlFVTklPMEZCUTBRN1FVRkRRU3hSUVVGTkxHdENRVUZyUWl4dlFrRkJXU3d5UWtGQldpeERRVUY0UWp0QlFVTkJPMEZCUTBFc1VVRkJUU3d5UkVGQmIwSXNVMEZCVXl4blFrRkJWQ3hEUVVFd1FpeG5Ra0ZCWjBJc1NVRkJhRUlzUTBGQmNVSXNSMEZCY2tJc1EwRkJNVUlzUTBGQmNFSXNSVUZCVGp0QlFVTkJPMEZCUTBFc1VVRkJTU3hwUWtGQmFVSXNSVUZCY2tJN08wRkJXakJGTEN0Q1FXRnFSU3hIUVdKcFJUdEJRV04wUlN4WlFVRkpMR05CUVdNc1NVRkJaQ3hEUVVGdFFqdEJRVUZCTEcxQ1FVRlhMRkZCUVZFc1QwRkJVaXhEUVVGblFpeEhRVUZvUWl4RFFVRllPMEZCUVVFc1UwRkJia0lzUTBGQlNpeEZRVUY1UkR0QlFVTnlSQ3d5UWtGQlpTeEhRVUZtTEVsQlFYTkNMRFJDUVVFMFFpeEhRVUUxUWl4RFFVRjBRanRCUVVOSUxGTkJSa1FzVFVGRlR6dEJRVU5JTEdkQ1FVRkpMRkZCUVVvc1JVRkJZeXhSUVVGUkxFZEJRVklzVVVGQmFVSXNSMEZCYWtJN1FVRkRha0k3UVVGc1FuRkZPenRCUVdFeFJTeFRRVUZMTEVsQlFVa3NSMEZCVkN4SlFVRm5RaXd5UWtGQmFFSXNSVUZCTmtNN1FVRkJRU3hqUVVGd1F5eEhRVUZ2UXp0QlFVMDFRenRCUVVORU8wRkJRMEVzVVVGQlNTeG5Ra0ZCWjBJc1JVRkJjRUk3UVVGRFFTeFRRVUZMTEVsQlFVa3NTMEZCVkN4SlFVRnJRaXhqUVVGc1FpeEZRVUZyUXp0QlFVTTVRaXhaUVVGSkxGTkJRVk1zWlVGQlpTeExRVUZtTEVOQlFXSTdRVUZEUVN4WlFVRkpMRk5CUVZNc1QwRkJUeXhUUVVGUUxFTkJRV2xDTEZGQlFXcENMRU5CUVRCQ0xFbEJRVEZDTEVOQlFTdENMRTFCUVM5Q0xFTkJRV0k3UVVGRFFTeFpRVUZKTEZkQlFWY3NaMEpCUVdZc1JVRkJhVU03UVVGRE4wSXNiVUpCUVU4c1QwRkJVQ3hEUVVGbExHdENRVUZWTzBGQlEzSkNMRzlDUVVGSkxFOUJRVThzVTBGQlVDeERRVUZwUWl4UlFVRnFRaXhEUVVFd1FpeEpRVUV4UWl4RFFVRXJRaXhOUVVFdlFpeE5RVUV5UXl4dFFrRkJMME1zUlVGQmIwVTdRVUZEYUVVc2EwTkJRV01zVDBGQlR5eEpRVUZ5UWl4SlFVRTJRaXhOUVVFM1FqdEJRVU5CTEd0RFFVRmpMRTlCUVU4c1NVRkJja0k3UVVGRFNDeHBRa0ZJUkN4TlFVZFBPMEZCUTBnc2IwTkJRV2RDTEhOQ1FVRmpMR0ZCUVdRc1JVRkJOa0lzVFVGQk4wSXNRMEZCYUVJN1FVRkRTRHRCUVVOS0xHRkJVRVE3UVVGUlNDeFRRVlJFTEUxQlUwOHNTVUZCU1N4WFFVRlhMR2xDUVVGbUxFVkJRV3RETzBGQlEzSkRMRFJDUVVGblFpeHpRa0ZCWXl4aFFVRmtMRVZCUVRaQ0xFMUJRVGRDTEVOQlFXaENPMEZCUTBnc1UwRkdUU3hOUVVWQkxFbEJRVWtzVjBGQlZ5eHRRa0ZCWml4RlFVRnZRenRCUVVOMlF5d3dRa0ZCWXl4UFFVRlBMRWxCUVhKQ0xFbEJRVFpDTEUxQlFUZENPMEZCUTBFc01FSkJRV01zVDBGQlR5eEpRVUZ5UWp0QlFVTklMRk5CU0Uwc1RVRkhRVHRCUVVOSUxHOUNRVUZSTEVkQlFWSXNRMEZCV1N4M1FrRkJXaXhGUVVGelF5eE5RVUYwUXp0QlFVTklPMEZCUTBvN1FVRkRSQ3hSUVVGSkxGRkJRVW9zUlVGQll5eFJRVUZSTEVkQlFWSXNRMEZCV1N4elFrRkJXaXhGUVVGdlF5eGhRVUZ3UXp0QlFVTmtMRkZCUVVrc1VVRkJTaXhGUVVGakxFdEJRVXNzV1VGQldTeEhRVUZhTEVWQlFVdzdRVUZEWkN4UlFVRkpMRkZCUVVvc1JVRkJZeXhSUVVGUkxFZEJRVklzUTBGQldTd3JRa0ZCSzBJc1MwRkJTeXhGUVVGd1F5eEpRVUV3UXl4blFrRkJkRVE3UVVGRGFrSTdPenM3T3pzN08xRkROVU5sTEZNc1IwRkJRU3hUTzFGQlMwRXNWeXhIUVVGQkxGYzdVVUZIUVN4blFpeEhRVUZCTEdkQ08wRkJXbFFzU1VGQlRTeG5RMEZCV1R0QlFVTnlRaXhoUVVGVExHdENRVUZyUWl4TlFVRnNRaXhIUVVFeVFpeFpRVUZYTzBGQlFVTXNhVUpCUVZNc1NVRkJWQ3hEUVVGakxGTkJRV1FzUTBGQmQwSXNSMEZCZUVJc1EwRkJORUlzVDBGQk5VSXNSVUZCYzBNc1QwRkJUeXhKUVVGUU8wRkJRV0VzUzBGQkwwUXNSVUZCTTBJc1IwRkJLMFlzUzBGRWJrWTdRVUZGY2tJc1ZVRkJUU3hGUVVGRkxFMUJRVVk3UVVGR1pTeERRVUZzUWp0QlFVbEJMRk5CUVZNc1UwRkJWQ3hIUVVGeFFqdEJRVUZCT3p0QlFVTjRRaXhYUVVGUExHZENRVUZRTEVOQlFYZENMRTFCUVhoQ0xFVkJRV2RETEZsQlFVMDdRVUZEYkVNc1kwRkJTeXhKUVVGTUxFTkJRVlVzVVVGQlZpeERRVUZ0UWl4TlFVRnVRanRCUVVOSUxFdEJSa1E3UVVGSFNEdEJRVU5OTEZOQlFWTXNWMEZCVkN4SFFVRjFRanRCUVVNeFFpeE5RVUZGTEc5RFFVRkdMRVZCUVhkRExFMUJRWGhETEVOQlFTdERMR2RGUVVFdlF6dEJRVU5JTzBGQlEwMHNVMEZCVXl4blFrRkJWQ3hIUVVFMFFqdEJRVU12UWl4TlFVRkZMRmRCUVVZc1JVRkJaU3hGUVVGbUxFTkJRV3RDTEU5QlFXeENMRVZCUVRKQ0xGbEJRVms3UVVGRGJrTXNXVUZCU1N4UlFVRlJMRVZCUVVVc1NVRkJSaXhEUVVGYU8wRkJRMEVzWTBGQlRTeFBRVUZPTEVOQlFXTXNVMEZCWkN4RlFVRjVRaXhYUVVGNlFpeERRVUZ4UXl4UlFVRnlRenRCUVVOQkxHTkJRVTBzVjBGQlRpeERRVUZyUWl4UlFVRnNRanRCUVVOQkxHTkJRVTBzVDBGQlRpeERRVUZqTEZOQlFXUXNSVUZCZVVJc1NVRkJla0lzUTBGQk9FSXNTMEZCT1VJc1JVRkJjVU1zVlVGQmNrTTdRVUZEUVN4VlFVRkZMRTFCUVVZc1JVRkJWU3hYUVVGV0xFTkJRWE5DTEV0QlFYUkNPMEZCUTBnc1MwRk9SRHRCUVU5QkxFMUJRVVVzVjBGQlJpeEZRVUZsTEVWQlFXWXNRMEZCYTBJc1QwRkJiRUlzUlVGQk1rSXNWVUZCVlN4RFFVRldMRVZCUVdFN1FVRkRjRU1zV1VGQlNTeERRVUZETEVWQlFVVXNSVUZCUlN4TlFVRktMRVZCUVZrc1QwRkJXaXhEUVVGdlFpeFpRVUZ3UWl4RlFVRnJReXhOUVVGMlF5eEZRVUVyUXp0QlFVTXpReXhqUVVGRkxFbEJRVVlzUlVGQlVTeEpRVUZTTEVOQlFXRXNXVUZCWWl4RlFVRXlRaXhOUVVFelFqdEJRVU5JTzBGQlEwb3NTMEZLUkR0QlFVdEJMRTFCUVVVc1VVRkJSaXhGUVVGWkxFVkJRVm9zUTBGQlpTeFBRVUZtTEVWQlFYZENMRlZCUVZVc1EwRkJWaXhGUVVGaE8wRkJRMnBETEZsQlFVa3NRMEZCUXl4RlFVRkZMRVZCUVVVc1RVRkJTaXhGUVVGWkxFOUJRVm9zUTBGQmIwSXNWMEZCY0VJc1JVRkJhVU1zVFVGQmRFTXNSVUZCT0VNN1FVRkRNVU1zWTBGQlJTeFpRVUZHTEVWQlFXZENMRTlCUVdoQ08wRkJRMGc3UVVGRFNpeExRVXBFTzBGQlMwRXNUVUZCUlN4WlFVRkdMRVZCUVdkQ0xFVkJRV2hDTEVOQlFXMUNMRTlCUVc1Q0xFVkJRVFJDTEZsQlFWazdRVUZEY0VNc1ZVRkJSU3hKUVVGR0xFVkJRVkVzVDBGQlVpeERRVUZuUWl4WlFVRm9RaXhGUVVFNFFpeFBRVUU1UWp0QlFVTklMRXRCUmtRN1FVRkpTRHM3T3pzN096czdVVU5zUTJVc1dTeEhRVUZCTEZrN1FVRkJWQ3hUUVVGVExGbEJRVlFzUjBGQmQwSTdRVUZETTBJc1RVRkJSU3hSUVVGR0xFVkJRVmtzUlVGQldpeERRVUZsTEZkQlFXWXNSVUZCTkVJc1ZVRkJWU3hEUVVGV0xFVkJRV0U3UVVGRGNrTXNXVUZCU1N4TlFVRk5MRU5CUVVNc1JVRkJSU3hMUVVGR0xFZEJRVlVzUlVGQlJTeE5RVUZHTEVWQlFWVXNWVUZCVml4TFFVRjFRaXhEUVVGc1F5eEpRVUYxUXl4RlFVRnFSRHRCUVVOQkxGbEJRVWtzVFVGQlRTeERRVUZGTEVWQlFVVXNTMEZCUml4SFFVRlZMRVZCUVVVc1RVRkJSaXhGUVVGVkxGTkJRVllzUlVGQldDeEhRVUZ2UXl4RlFVRkZMRTFCUVVZc1JVRkJWU3hYUVVGV0xFdEJRWGRDTEVOQlFUZEVMRWxCUVd0RkxFVkJRVFZGTzBGQlEwRXNXVUZCU1N4TlFVRk5MRU5CUVVNc1JVRkJSU3hMUVVGR0xFZEJRVlVzUlVGQlJTeE5RVUZHTEVWQlFWVXNWVUZCVml4TFFVRjFRaXhEUVVGc1F5eEpRVUYxUXl4RlFVRnFSRHRCUVVOQkxGbEJRVWtzVFVGQlRTeERRVUZGTEVWQlFVVXNTMEZCUml4SFFVRlZMRVZCUVVVc1RVRkJSaXhGUVVGVkxGTkJRVllzUlVGQldDeEhRVUZ2UXl4RlFVRkZMRTFCUVVZc1JVRkJWU3hYUVVGV0xFdEJRWGRDTEVOQlFUZEVMRWxCUVd0RkxFVkJRVFZGTzBGQlEwRXNXVUZCU1N4TlFVRk5MRU5CUVVNc1JVRkJSU3hMUVVGR0xFZEJRVlVzUlVGQlJTeE5RVUZHTEVWQlFWVXNWVUZCVml4TFFVRjFRaXhEUVVGc1F5eEpRVUYxUXl4RlFVRnFSRHRCUVVOQkxGbEJRVWtzVFVGQlRTeERRVUZGTEVWQlFVVXNTMEZCUml4SFFVRlZMRVZCUVVVc1RVRkJSaXhGUVVGVkxGTkJRVllzUlVGQldDeEhRVUZ2UXl4RlFVRkZMRTFCUVVZc1JVRkJWU3hYUVVGV0xFdEJRWGRDTEVOQlFUZEVMRWxCUVd0RkxFVkJRVFZGTzBGQlEwRXNXVUZCUnl4RlFVRkZMRTFCUVVZc1JVRkJWU3hMUVVGV0xFMUJRWEZDTEVsQlFYaENMRVZCUVRaQ08wRkJRM3BDTEdOQlFVVXNZVUZCUml4RlFVRnBRaXhIUVVGcVFpeERRVUZ4UWp0QlFVTnFRaXc0UWtGQll5eE5RVUZKTEVsQlJFUTdRVUZGYWtJc0swSkJRV1VzVFVGQlNUdEJRVVpHTEdGQlFYSkNPMEZCU1VFc1kwRkJSU3hoUVVGR0xFVkJRV2xDTEVkQlFXcENMRU5CUVhGQ08wRkJRMnBDTERoQ1FVRmpMRTFCUVVrc1NVRkVSRHRCUVVWcVFpd3JRa0ZCWlN4TlFVRkpPMEZCUmtZc1lVRkJja0k3UVVGSlFTeGpRVUZGTEdWQlFVWXNSVUZCYlVJc1IwRkJia0lzUTBGQmRVSTdRVUZEYmtJc09FSkJRV01zVFVGQlNTeEpRVVJETzBGQlJXNUNMQ3RDUVVGbExFMUJRVWs3UVVGR1FTeGhRVUYyUWp0QlFVbElPMEZCUTBvc1MwRnlRa1E3UVVGMVFrZzdRVUZEUkRzN08wRkRla0pCT3p0QlEwRkJPenRCUTBGQk96dEJRMEZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTndRa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU0VFN1FVRkRRVHRCUVVOQk96dEJRMFpCTzBGQlEwRTdRVUZEUVRzN1FVTkdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEwcEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5NUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRGRrSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU4yUWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEweEJPMEZCUTBFN1FVRkRRVHM3UVVOR1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNCQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRURUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTktRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFCQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTTNSRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOUVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOT1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOU1FUdEJRVU5CTzBGQlEwRTdPMEZEUmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMGhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEWWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTjBSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTjBRa0U3UVVGRFFUczdRVU5FUVR0QlFVTkJPenRCUTBSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRiRU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVONlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5vUWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5pUVR0QlFVTkJPenRCUTBSQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEWWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTJwQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUJCTzBGQlEwRTdPMEZEUkVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOV1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVrRTdRVUZEUVRzN1FVTkVRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFCQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk1RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk9RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRha0pCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFVFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFwQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk1RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFdFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRja05CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFZFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNG9LWHRtZFc1amRHbHZiaUJsS0hRc2JpeHlLWHRtZFc1amRHbHZiaUJ6S0c4c2RTbDdhV1lvSVc1YmIxMHBlMmxtS0NGMFcyOWRLWHQyWVhJZ1lUMTBlWEJsYjJZZ2NtVnhkV2x5WlQwOVhDSm1kVzVqZEdsdmJsd2lKaVp5WlhGMWFYSmxPMmxtS0NGMUppWmhLWEpsZEhWeWJpQmhLRzhzSVRBcE8ybG1LR2twY21WMGRYSnVJR2tvYnl3aE1DazdkbUZ5SUdZOWJtVjNJRVZ5Y205eUtGd2lRMkZ1Ym05MElHWnBibVFnYlc5a2RXeGxJQ2RjSWl0dksxd2lKMXdpS1R0MGFISnZkeUJtTG1OdlpHVTlYQ0pOVDBSVlRFVmZUazlVWDBaUFZVNUVYQ0lzWm4xMllYSWdiRDF1VzI5ZFBYdGxlSEJ2Y25Sek9udDlmVHQwVzI5ZFd6QmRMbU5oYkd3b2JDNWxlSEJ2Y25SekxHWjFibU4wYVc5dUtHVXBlM1poY2lCdVBYUmJiMTFiTVYxYlpWMDdjbVYwZFhKdUlITW9iajl1T21VcGZTeHNMR3d1Wlhod2IzSjBjeXhsTEhRc2JpeHlLWDF5WlhSMWNtNGdibHR2WFM1bGVIQnZjblJ6ZlhaaGNpQnBQWFI1Y0dWdlppQnlaWEYxYVhKbFBUMWNJbVoxYm1OMGFXOXVYQ0ltSm5KbGNYVnBjbVU3Wm05eUtIWmhjaUJ2UFRBN2J6eHlMbXhsYm1kMGFEdHZLeXNwY3loeVcyOWRLVHR5WlhSMWNtNGdjMzF5WlhSMWNtNGdaWDBwS0NraUxDSmNibWx0Y0c5eWRDQmlhVzVrWlhJZ1puSnZiU0JjSWk0dmJHbGljeTlpYVc1a1pYSmNJanRjYm1sdGNHOXlkQ0I3SUdOdmJuTjBZVzUwY3l3Z1lXWjBaVXh2WVdSekxDQmlkRzVFWldOdmNtRjBaU3dnYUdWaFpHVnlRV04wYVhacGRHbGxjMzBnWm5KdmJTQmNJaTR2Ylc5a2RXeGxjeTluYkc5aVlXeGNJanRjYm1sdGNHOXlkQ0I3YVc1MGNtOVhjbUZ3Y0dWeWZTQm1jbTl0SUZ3aUxpOXRiMlIxYkdWekwybHVkSEp2VjNKaGNIQmxjbHdpTzF4dVhHNXNaWFFnWVhKbmN5QTlJRnRjYmlBZ0lDQjdYRzRnSUNBZ0lDQWdJRndpYUhSdGJGd2lPaUJiWTI5dWMzUmhiblJ6TENCaFpuUmxURzloWkhOZExGeHVJQ0FnSUNBZ0lDQmNJaTVpZEc1Y0lqb2dXMkowYmtSbFkyOXlZWFJsWFN4Y2JpQWdJQ0FnSUNBZ1hDSXVhVzUwY204dGQzSmhjSEJsY2x3aU9pQmJhVzUwY205WGNtRndjR1Z5WFN4Y2JpQWdJQ0FnSUNBZ1hDSXVhR1ZoWkdWeVhDSTZJRnRvWldGa1pYSkJZM1JwZG1sMGFXVnpYVnh1SUNBZ0lIMHNYRzVkTzF4dVhHNWlhVzVrWlhJb0xpNHVZWEpuY3lrN1hHNGlMQ0l2THlCMkxqSXVNVnh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUJpYVc1a1pYSW9jMlZzWldOMGIzSnpRVzVrUm5WdVkzUnBiMjV6UW05MWJtUnpMQ0J5ZFc1VVpYTjBjeUE5SUdaaGJITmxLU0I3WEc0Z0lDQWdiR1YwSUhRd0xDQjBNVHRjYmlBZ0lDQnBaaUFvY25WdVZHVnpkSE1wSUhRd0lEMGdjR1Z5Wm05eWJXRnVZMlV1Ym05M0tDazdYRzRnSUNBZ0x5OGdjRzlzZVdacGJHd2dabTl5SUZ3aUxtMWhkR05vWlhNb0tWd2lJRzFsZEdodlpGeHVJQ0FnSUdsbUlDZ2hSV3hsYldWdWRDNXdjbTkwYjNSNWNHVXViV0YwWTJobGN5a2dlMXh1SUNBZ0lDQWdJQ0JGYkdWdFpXNTBMbkJ5YjNSdmRIbHdaUzV0WVhSamFHVnpJRDBnUld4bGJXVnVkQzV3Y205MGIzUjVjR1V1YlhOTllYUmphR1Z6VTJWc1pXTjBiM0k3WEc0Z0lDQWdmVnh1SUNBZ0lDOHZJR2RoZEdobGNpQmhiR3dnYzJWc1pXTjBiM0p6SUdsdUlHRnljbUY1WEc0Z0lDQWdZMjl1YzNRZ2MyVnNaV04wYjNKelZHOUdhVzVrSUQwZ1QySnFaV04wTG10bGVYTW9jMlZzWldOMGIzSnpRVzVrUm5WdVkzUnBiMjV6UW05MWJtUnpLVHRjYmlBZ0lDQXZMeUJtYVc1a0lITmxiR1ZqZEc5eWN5QnBiaUJrYjJOMWJXVnVkRnh1SUNBZ0lHTnZibk4wSUdadmRXNWtSV3hsYldWdWRITWdQU0JiTGk0dVpHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZja0ZzYkNoelpXeGxZM1J2Y25OVWIwWnBibVF1YW05cGJpaGNJaXhjSWlrcFhUdGNiaUFnSUNBdkx5Qm1hV3gwWlhJZ1ltOTFibVJ6SUdadmNpQnViM1FnWm05MWJtUmxaQ0J6Wld4bFkzUnZjbk5jYmlBZ0lDQnNaWFFnWm1sc2RHVnlaV1JDYjNWdVpITWdQU0I3ZlR0Y2JpQWdJQ0JtYjNJZ0tHeGxkQ0JyWlhrZ2FXNGdjMlZzWldOMGIzSnpRVzVrUm5WdVkzUnBiMjV6UW05MWJtUnpLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaG1iM1Z1WkVWc1pXMWxiblJ6TG5OdmJXVW9aV3hsYldWdWRDQTlQaUJsYkdWdFpXNTBMbTFoZEdOb1pYTW9hMlY1S1NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdacGJIUmxjbVZrUW05MWJtUnpXMnRsZVYwZ1BTQnpaV3hsWTNSdmNuTkJibVJHZFc1amRHbHZibk5DYjNWdVpITmJhMlY1WFR0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoeWRXNVVaWE4wY3lrZ1kyOXVjMjlzWlM1c2IyY29ZQzBnSkh0clpYbDlJSGRoY3lCdWIzUWdabTkxYm1SZ0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMWNiaUFnSUNBdkx5Qm5ZWFJvWlhJZ1lXeHNJRzF2WkhWc1pYTWdhVzRnYjI1bElHOWlhbVZqZEZ4dUlDQWdJR3hsZENCdFpYSm5aV1JOYjJSMWJHVnpJRDBnZTMwN1hHNGdJQ0FnWm05eUlDaHNaWFFnWW05MWJtUWdhVzRnWm1sc2RHVnlaV1JDYjNWdVpITXBJSHRjYmlBZ0lDQWdJQ0FnYkdWMElHMXZaSFZzWlNBOUlHWnBiSFJsY21Wa1FtOTFibVJ6VzJKdmRXNWtYVHRjYmlBZ0lDQWdJQ0FnYkdWMElHNWhkSFZ5WlNBOUlFOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jdVkyRnNiQ2h0YjJSMWJHVXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2JtRjBkWEpsSUQwOVBTQmNJbHR2WW1wbFkzUWdRWEp5WVhsZFhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHMXZaSFZzWlM1bWIzSkZZV05vS0hOamNtbHdkQ0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRTlpYW1WamRDNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY3VZMkZzYkNoelkzSnBjSFFwSUQwOVBTQmNJbHR2WW1wbFkzUWdSblZ1WTNScGIyNWRYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV1Z5WjJWa1RXOWtkV3hsYzF0elkzSnBjSFF1Ym1GdFpWMGdQU0J6WTNKcGNIUTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxbGNtZGxaRTF2WkhWc1pYTmJjMk55YVhCMExtNWhiV1ZkS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV1Z5WjJWa1RXOWtkV3hsY3lBOUlFOWlhbVZqZEM1aGMzTnBaMjRvYldWeVoyVmtUVzlrZFd4bGN5d2djMk55YVhCMEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h1WVhSMWNtVWdQVDA5SUZ3aVcyOWlhbVZqZENCUFltcGxZM1JkWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUcxbGNtZGxaRTF2WkhWc1pYTWdQU0JQWW1wbFkzUXVZWE56YVdkdUtHMWxjbWRsWkUxdlpIVnNaWE1zSUcxdlpIVnNaU2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2JtRjBkWEpsSUQwOVBTQmNJbHR2WW1wbFkzUWdSblZ1WTNScGIyNWRYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzFsY21kbFpFMXZaSFZzWlhOYmJXOWtkV3hsTG01aGJXVmRJRDBnYlc5a2RXeGxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2JXVnlaMlZrVFc5a2RXeGxjMXR0YjJSMWJHVXVibUZ0WlYwb0tUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktGd2lJU0IxYm5OMWNIQnZjblJsWkNCbWIzSnRZWFE2SUZ3aUxDQnRiMlIxYkdVcE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaHlkVzVVWlhOMGN5a2dZMjl1YzI5c1pTNXNiMmNvWENKaWFXNWtaWEpTWlhOMWJIUlBZbXBsWTNRNklGd2lMQ0J0WlhKblpXUk5iMlIxYkdWektUdGNiaUFnSUNCcFppQW9jblZ1VkdWemRITXBJSFF4SUQwZ2NHVnlabTl5YldGdVkyVXVibTkzS0NrN1hHNGdJQ0FnYVdZZ0tISjFibFJsYzNSektTQmpiMjV6YjJ4bExteHZaeWhjSWtKcGJtUmxjaUJvZEcxc0lIQmhjbk5wYm1jZ2RHOXZheUJjSWlBcklDaDBNU0F0SUhRd0tTQXJJRndpSUcxcGJHeHBjMlZqYjI1a2N5NWNJaWs3WEc1OVhHNGlMQ0psZUhCdmNuUWdZMjl1YzNRZ1kyOXVjM1JoYm5SeklEMGdlMXh1SUNBZ0lHbHpWRzkxWTJnNklGd2liMjUwYjNWamFITjBZWEowWENJZ2FXNGdkMmx1Wkc5M0lEOGdablZ1WTNScGIyNG9LU0I3Wkc5amRXMWxiblF1WW05a2VTNWpiR0Z6YzB4cGMzUXVZV1JrS0Z3aWRHOTFZMmhjSWlrN0lISmxkSFZ5YmlCMGNuVmxPMzBvS1NBNklHWmhiSE5sTEZ4dUlDQWdJR0p2WkhrNklDUW9YQ0ppYjJSNVhDSXBYRzU5WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWVdaMFpVeHZZV1J6S0NrZ2UxeHVJQ0FnSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpYkc5aFpGd2lMQ0FvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdVltOWtlUzVoWkdSRGJHRnpjeWduYkc5aFpDY3BYRzRnSUNBZ2ZTazdYRzU5WEc1bGVIQnZjblFnWm5WdVkzUnBiMjRnWW5SdVJHVmpiM0poZEdVb0tTQjdYRzRnSUNBZ0pDZ25MbUowYml3Z2FXNXdkWFJiZEhsd1pUMWNJbk4xWW0xcGRGd2lYU3dnWW5WMGRHOXVKeWt1WVhCd1pXNWtLQ2M4YzNCaGJpQmpiR0Z6Y3oxY0ltUmxZMjl5TFhSdmNGd2lQand2YzNCaGJqNDhjM0JoYmlCamJHRnpjejFjSW1SbFkyOXlMV0p2ZEZ3aVBqd3ZjM0JoYmo0bktWeHVmVnh1Wlhod2IzSjBJR1oxYm1OMGFXOXVJR2hsWVdSbGNrRmpkR2wyYVhScFpYTW9LU0I3WEc0Z0lDQWdKQ2duTG1KMGJpMXRaVzUxSnlrdWIyNG9KMk5zYVdOckp5d2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdKSFJvYVhNZ1BTQWtLSFJvYVhNcE8xeHVJQ0FnSUNBZ0lDQWtkR2hwY3k1amJHOXpaWE4wS0NjdWFHVmhaR1Z5SnlrdWRHOW5aMnhsUTJ4aGMzTW9KMjl3Wlc1bFpDY3BPMXh1SUNBZ0lDQWdJQ0FrZEdocGN5NTBiMmRuYkdWRGJHRnpjeWduWVdOMGFYWmxKeWs3WEc0Z0lDQWdJQ0FnSUNSMGFHbHpMbU5zYjNObGMzUW9KeTVvWldGa1pYSW5LUzVtYVc1a0tDZHVZWFluS1M1bVlXUmxWRzluWjJ4bEtDazdYRzRnSUNBZ0lDQWdJQ1FvSjJKdlpIa25LUzUwYjJkbmJHVkRiR0Z6Y3lnbmIzWm9KeWs3WEc0Z0lDQWdmU2s3WEc0Z0lDQWdKQ2duTG14aGJtY3RZbTk0SnlrdWIyNG9KMk5zYVdOckp5d2dablZ1WTNScGIyNGdLR1VwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLQ0VrS0dVdWRHRnlaMlYwS1M1amJHOXpaWE4wS0NjdVluUnVMV05zYjNObEp5a3ViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBa0tIUm9hWE1wTG1acGJtUW9KeTVrY205d0xXUnZkMjRuS1M1bVlXUmxTVzRvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVJQ0FnSUNRb1pHOWpkVzFsYm5RcExtOXVLQ2RqYkdsamF5Y3NJR1oxYm1OMGFXOXVJQ2hsS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doSkNobExuUmhjbWRsZENrdVkyeHZjMlZ6ZENnbkxteGhibWN0WW05NEp5a3ViR1Z1WjNSb0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBa0tDY3VaSEp2Y0Mxa2IzZHVKeWt1Wm1Ga1pVOTFkQ2dwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlNrN1hHNGdJQ0FnSkNnbkxtSjBiaTFqYkc5elpTY3BMbTl1S0NkamJHbGpheWNzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lDQWdKQ2gwYUdsektTNWpiRzl6WlhOMEtDY3VaSEp2Y0Mxa2IzZHVKeWt1Wm1Ga1pVOTFkQ2dwTzF4dUlDQWdJSDBwWEc1Y2JuMWNiaUlzSW1WNGNHOXlkQ0JtZFc1amRHbHZiaUJwYm5SeWIxZHlZWEJ3WlhJb0tTQjdYRzRnSUNBZ0pDaGtiMk4xYldWdWRDa3ViMjRvWENKdGIzVnpaVzF2ZG1WY0lpd2dablZ1WTNScGIyNGdLR1VwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR040TVNBOUlDaGxMbkJoWjJWWUlDMGdKQ2gzYVc1a2IzY3BMbWx1Ym1WeVYybGtkR2dvS1M4eUtTQXZJRGd3TzF4dUlDQWdJQ0FnSUNCMllYSWdZM2t4SUQwZ0tDaGxMbkJoWjJWWklDMGdKQ2gzYVc1a2IzY3BMbk5qY205c2JGUnZjQ2dwS1NBdElDUW9kMmx1Wkc5M0tTNXBibTVsY2tobGFXZG9kQ2dwTHpJcElDOGdPREE3WEc0Z0lDQWdJQ0FnSUhaaGNpQmplRElnUFNBb1pTNXdZV2RsV0NBdElDUW9kMmx1Wkc5M0tTNXBibTVsY2xkcFpIUm9LQ2t2TWlrZ0x5QTBNRHRjYmlBZ0lDQWdJQ0FnZG1GeUlHTjVNaUE5SUNnb1pTNXdZV2RsV1NBdElDUW9kMmx1Wkc5M0tTNXpZM0p2Ykd4VWIzQW9LU2tnTFNBa0tIZHBibVJ2ZHlrdWFXNXVaWEpJWldsbmFIUW9LUzh5S1NBdklEUXdPMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kzZ3pJRDBnS0dVdWNHRm5aVmdnTFNBa0tIZHBibVJ2ZHlrdWFXNXVaWEpYYVdSMGFDZ3BMeklwSUM4Z01qQTdYRzRnSUNBZ0lDQWdJSFpoY2lCamVUTWdQU0FvS0dVdWNHRm5aVmtnTFNBa0tIZHBibVJ2ZHlrdWMyTnliMnhzVkc5d0tDa3BJQzBnSkNoM2FXNWtiM2NwTG1sdWJtVnlTR1ZwWjJoMEtDa3ZNaWtnTHlBeU1EdGNiaUFnSUNBZ0lDQWdhV1lvSkNoM2FXNWtiM2NwTG5kcFpIUm9LQ2tnUGowZ01UQXlOQ2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtLQ2N1Y0dGeVlXeHNMbTl1WlNjcExtTnpjeWg3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSjIxaGNtZHBiaTEwYjNBbk9pQmplVEVySjNCNEp5eGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5iV0Z5WjJsdUxXeGxablFuT2lCamVERXJKM0I0SjF4dUlDQWdJQ0FnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtLQ2N1Y0dGeVlXeHNMblIzYnljcExtTnpjeWg3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSjIxaGNtZHBiaTEwYjNBbk9pQmplVElySjNCNEp5eGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW5iV0Z5WjJsdUxXeGxablFuT2lCamVESXJKM0I0SjF4dUlDQWdJQ0FnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWtLQ2N1Y0dGeVlXeHNMblJvY21WbEp5a3VZM056S0h0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBbmJXRnlaMmx1TFhSdmNDYzZJR041TXlzbmNIZ25MRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ2R0WVhKbmFXNHRiR1ZtZENjNklHTjRNeXNuY0hnblhHNGdJQ0FnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVYRzU5WEc0dkx5QjBiMlJ2SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN0lGd2laR1ZtWVhWc2RGd2lPaUJ5WlhGMWFYSmxLRndpWTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDJGeWNtRjVMMlp5YjIxY0lpa3NJRjlmWlhOTmIyUjFiR1U2SUhSeWRXVWdmVHNpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhzZ1hDSmtaV1poZFd4MFhDSTZJSEpsY1hWcGNtVW9YQ0pqYjNKbExXcHpMMnhwWW5KaGNua3ZabTR2YjJKcVpXTjBMMkZ6YzJsbmJsd2lLU3dnWDE5bGMwMXZaSFZzWlRvZ2RISjFaU0I5T3lJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2V5QmNJbVJsWm1GMWJIUmNJam9nY21WeGRXbHlaU2hjSW1OdmNtVXRhbk12YkdsaWNtRnllUzltYmk5dlltcGxZM1F2YTJWNWMxd2lLU3dnWDE5bGMwMXZaSFZzWlRvZ2RISjFaU0I5T3lJc0lsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNWxlSEJ2Y25SekxsOWZaWE5OYjJSMWJHVWdQU0IwY25WbE8xeHVYRzUyWVhJZ1gyWnliMjBnUFNCeVpYRjFhWEpsS0Z3aUxpNHZZMjl5WlMxcWN5OWhjbkpoZVM5bWNtOXRYQ0lwTzF4dVhHNTJZWElnWDJaeWIyMHlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZabkp2YlNrN1hHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNibVY0Y0c5eWRITXVaR1ZtWVhWc2RDQTlJR1oxYm1OMGFXOXVJQ2hoY25JcElIdGNiaUFnYVdZZ0tFRnljbUY1TG1selFYSnlZWGtvWVhKeUtTa2dlMXh1SUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F3TENCaGNuSXlJRDBnUVhKeVlYa29ZWEp5TG14bGJtZDBhQ2s3SUdrZ1BDQmhjbkl1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHRnljakpiYVYwZ1BTQmhjbkpiYVYwN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnY21WMGRYSnVJR0Z5Y2pJN1hHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2NtVjBkWEp1SUNnd0xDQmZabkp2YlRJdVpHVm1ZWFZzZENrb1lYSnlLVHRjYmlBZ2ZWeHVmVHNpTENKeVpYRjFhWEpsS0NjdUxpOHVMaTl0YjJSMWJHVnpMMlZ6Tmk1emRISnBibWN1YVhSbGNtRjBiM0luS1R0Y2JuSmxjWFZwY21Vb0p5NHVMeTR1TDIxdlpIVnNaWE12WlhNMkxtRnljbUY1TG1aeWIyMG5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk0dkxpNHZiVzlrZFd4bGN5OWZZMjl5WlNjcExrRnljbUY1TG1aeWIyMDdYRzRpTENKeVpYRjFhWEpsS0NjdUxpOHVMaTl0YjJSMWJHVnpMMlZ6Tmk1dlltcGxZM1F1WVhOemFXZHVKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhKbGNYVnBjbVVvSnk0dUx5NHVMMjF2WkhWc1pYTXZYMk52Y21VbktTNVBZbXBsWTNRdVlYTnphV2R1TzF4dUlpd2ljbVZ4ZFdseVpTZ25MaTR2TGk0dmJXOWtkV3hsY3k5bGN6WXViMkpxWldOMExtdGxlWE1uS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpNHZMaTR2Ylc5a2RXeGxjeTlmWTI5eVpTY3BMazlpYW1WamRDNXJaWGx6TzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJwZENBaFBTQW5ablZ1WTNScGIyNG5LU0IwYUhKdmR5QlVlWEJsUlhKeWIzSW9hWFFnS3lBbklHbHpJRzV2ZENCaElHWjFibU4wYVc5dUlTY3BPMXh1SUNCeVpYUjFjbTRnYVhRN1hHNTlPMXh1SWl3aWRtRnlJR2x6VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmFYTXRiMkpxWldOMEp5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0JwWmlBb0lXbHpUMkpxWldOMEtHbDBLU2tnZEdoeWIzY2dWSGx3WlVWeWNtOXlLR2wwSUNzZ0p5QnBjeUJ1YjNRZ1lXNGdiMkpxWldOMElTY3BPMXh1SUNCeVpYUjFjbTRnYVhRN1hHNTlPMXh1SWl3aUx5OGdabUZzYzJVZ0xUNGdRWEp5WVhramFXNWtaWGhQWmx4dUx5OGdkSEoxWlNBZ0xUNGdRWEp5WVhramFXNWpiSFZrWlhOY2JuWmhjaUIwYjBsUFltcGxZM1FnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTFwYjJKcVpXTjBKeWs3WEc1MllYSWdkRzlNWlc1bmRHZ2dQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXNaVzVuZEdnbktUdGNiblpoY2lCMGIwRmljMjlzZFhSbFNXNWtaWGdnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTFoWW5OdmJIVjBaUzFwYm1SbGVDY3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvU1ZOZlNVNURURlZFUlZNcElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVJQ2drZEdocGN5d2daV3dzSUdaeWIyMUpibVJsZUNrZ2UxeHVJQ0FnSUhaaGNpQlBJRDBnZEc5SlQySnFaV04wS0NSMGFHbHpLVHRjYmlBZ0lDQjJZWElnYkdWdVozUm9JRDBnZEc5TVpXNW5kR2dvVHk1c1pXNW5kR2dwTzF4dUlDQWdJSFpoY2lCcGJtUmxlQ0E5SUhSdlFXSnpiMngxZEdWSmJtUmxlQ2htY205dFNXNWtaWGdzSUd4bGJtZDBhQ2s3WEc0Z0lDQWdkbUZ5SUhaaGJIVmxPMXh1SUNBZ0lDOHZJRUZ5Y21GNUkybHVZMngxWkdWeklIVnpaWE1nVTJGdFpWWmhiSFZsV21WeWJ5QmxjWFZoYkdsMGVTQmhiR2R2Y21sMGFHMWNiaUFnSUNBdkx5QmxjMnhwYm5RdFpHbHpZV0pzWlMxdVpYaDBMV3hwYm1VZ2JtOHRjMlZzWmkxamIyMXdZWEpsWEc0Z0lDQWdhV1lnS0VsVFgwbE9RMHhWUkVWVElDWW1JR1ZzSUNFOUlHVnNLU0IzYUdsc1pTQW9iR1Z1WjNSb0lENGdhVzVrWlhncElIdGNiaUFnSUNBZ0lIWmhiSFZsSUQwZ1QxdHBibVJsZUNzclhUdGNiaUFnSUNBZ0lDOHZJR1Z6YkdsdWRDMWthWE5oWW14bExXNWxlSFF0YkdsdVpTQnVieTF6Wld4bUxXTnZiWEJoY21WY2JpQWdJQ0FnSUdsbUlDaDJZV3gxWlNBaFBTQjJZV3gxWlNrZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0x5OGdRWEp5WVhramFXNWtaWGhQWmlCcFoyNXZjbVZ6SUdodmJHVnpMQ0JCY25KaGVTTnBibU5zZFdSbGN5QXRJRzV2ZEZ4dUlDQWdJSDBnWld4elpTQm1iM0lnS0R0c1pXNW5kR2dnUGlCcGJtUmxlRHNnYVc1a1pYZ3JLeWtnYVdZZ0tFbFRYMGxPUTB4VlJFVlRJSHg4SUdsdVpHVjRJR2x1SUU4cElIdGNiaUFnSUNBZ0lHbG1JQ2hQVzJsdVpHVjRYU0E5UFQwZ1pXd3BJSEpsZEhWeWJpQkpVMTlKVGtOTVZVUkZVeUI4ZkNCcGJtUmxlQ0I4ZkNBd08xeHVJQ0FnSUgwZ2NtVjBkWEp1SUNGSlUxOUpUa05NVlVSRlV5QW1KaUF0TVR0Y2JpQWdmVHRjYm4wN1hHNGlMQ0l2THlCblpYUjBhVzVuSUhSaFp5Qm1jbTl0SURFNUxqRXVNeTQySUU5aWFtVmpkQzV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWNvS1Z4dWRtRnlJR052WmlBOUlISmxjWFZwY21Vb0p5NHZYMk52WmljcE8xeHVkbUZ5SUZSQlJ5QTlJSEpsY1hWcGNtVW9KeTR2WDNkcmN5Y3BLQ2QwYjFOMGNtbHVaMVJoWnljcE8xeHVMeThnUlZNeklIZHliMjVuSUdobGNtVmNiblpoY2lCQlVrY2dQU0JqYjJZb1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdZWEpuZFcxbGJuUnpPeUI5S0NrcElEMDlJQ2RCY21kMWJXVnVkSE1uTzF4dVhHNHZMeUJtWVd4c1ltRmpheUJtYjNJZ1NVVXhNU0JUWTNKcGNIUWdRV05qWlhOeklFUmxibWxsWkNCbGNuSnZjbHh1ZG1GeUlIUnllVWRsZENBOUlHWjFibU4wYVc5dUlDaHBkQ3dnYTJWNUtTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdsMFcydGxlVjA3WEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHNnTHlvZ1pXMXdkSGtnS2k4Z2ZWeHVmVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2RtRnlJRThzSUZRc0lFSTdYRzRnSUhKbGRIVnliaUJwZENBOVBUMGdkVzVrWldacGJtVmtJRDhnSjFWdVpHVm1hVzVsWkNjZ09pQnBkQ0E5UFQwZ2JuVnNiQ0EvSUNkT2RXeHNKMXh1SUNBZ0lDOHZJRUJBZEc5VGRISnBibWRVWVdjZ1kyRnpaVnh1SUNBZ0lEb2dkSGx3Wlc5bUlDaFVJRDBnZEhKNVIyVjBLRThnUFNCUFltcGxZM1FvYVhRcExDQlVRVWNwS1NBOVBTQW5jM1J5YVc1bkp5QS9JRlJjYmlBZ0lDQXZMeUJpZFdsc2RHbHVWR0ZuSUdOaGMyVmNiaUFnSUNBNklFRlNSeUEvSUdOdlppaFBLVnh1SUNBZ0lDOHZJRVZUTXlCaGNtZDFiV1Z1ZEhNZ1ptRnNiR0poWTJ0Y2JpQWdJQ0E2SUNoQ0lEMGdZMjltS0U4cEtTQTlQU0FuVDJKcVpXTjBKeUFtSmlCMGVYQmxiMllnVHk1allXeHNaV1VnUFQwZ0oyWjFibU4wYVc5dUp5QS9JQ2RCY21kMWJXVnVkSE1uSURvZ1FqdGNibjA3WEc0aUxDSjJZWElnZEc5VGRISnBibWNnUFNCN2ZTNTBiMU4wY21sdVp6dGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJSFJ2VTNSeWFXNW5MbU5oYkd3b2FYUXBMbk5zYVdObEtEZ3NJQzB4S1R0Y2JuMDdYRzRpTENKMllYSWdZMjl5WlNBOUlHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2V5QjJaWEp6YVc5dU9pQW5NaTQxTGpNbklIMDdYRzVwWmlBb2RIbHdaVzltSUY5ZlpTQTlQU0FuYm5WdFltVnlKeWtnWDE5bElEMGdZMjl5WlRzZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJHbHVaU0J1YnkxMWJtUmxabHh1SWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1ZG1GeUlDUmtaV1pwYm1WUWNtOXdaWEowZVNBOUlISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWtjQ2NwTzF4dWRtRnlJR055WldGMFpVUmxjMk1nUFNCeVpYRjFhWEpsS0NjdUwxOXdjbTl3WlhKMGVTMWtaWE5qSnlrN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLRzlpYW1WamRDd2dhVzVrWlhnc0lIWmhiSFZsS1NCN1hHNGdJR2xtSUNocGJtUmxlQ0JwYmlCdlltcGxZM1FwSUNSa1pXWnBibVZRY205d1pYSjBlUzVtS0c5aWFtVmpkQ3dnYVc1a1pYZ3NJR055WldGMFpVUmxjMk1vTUN3Z2RtRnNkV1VwS1R0Y2JpQWdaV3h6WlNCdlltcGxZM1JiYVc1a1pYaGRJRDBnZG1Gc2RXVTdYRzU5TzF4dUlpd2lMeThnYjNCMGFXOXVZV3dnTHlCemFXMXdiR1VnWTI5dWRHVjRkQ0JpYVc1a2FXNW5YRzUyWVhJZ1lVWjFibU4wYVc5dUlEMGdjbVZ4ZFdseVpTZ25MaTlmWVMxbWRXNWpkR2x2YmljcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9abTRzSUhSb1lYUXNJR3hsYm1kMGFDa2dlMXh1SUNCaFJuVnVZM1JwYjI0b1ptNHBPMXh1SUNCcFppQW9kR2hoZENBOVBUMGdkVzVrWldacGJtVmtLU0J5WlhSMWNtNGdabTQ3WEc0Z0lITjNhWFJqYUNBb2JHVnVaM1JvS1NCN1hHNGdJQ0FnWTJGelpTQXhPaUJ5WlhSMWNtNGdablZ1WTNScGIyNGdLR0VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1kyRnpaU0F5T2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dFc0lHSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQm1iaTVqWVd4c0tIUm9ZWFFzSUdFc0lHSXBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1kyRnpaU0F6T2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dFc0lHSXNJR01wSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXNJR0lzSUdNcE8xeHVJQ0FnSUgwN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNndktpQXVMaTVoY21keklDb3ZLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHWnVMbUZ3Y0d4NUtIUm9ZWFFzSUdGeVozVnRaVzUwY3lrN1hHNGdJSDA3WEc1OU8xeHVJaXdpTHk4Z055NHlMakVnVW1WeGRXbHlaVTlpYW1WamRFTnZaWEpqYVdKc1pTaGhjbWQxYldWdWRDbGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJR2xtSUNocGRDQTlQU0IxYm1SbFptbHVaV1FwSUhSb2NtOTNJRlI1Y0dWRmNuSnZjaWhjSWtOaGJpZDBJR05oYkd3Z2JXVjBhRzlrSUc5dUlDQmNJaUFySUdsMEtUdGNiaUFnY21WMGRYSnVJR2wwTzF4dWZUdGNiaUlzSWk4dklGUm9ZVzVySjNNZ1NVVTRJR1p2Y2lCb2FYTWdablZ1Ym5rZ1pHVm1hVzVsVUhKdmNHVnlkSGxjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnSVhKbGNYVnBjbVVvSnk0dlgyWmhhV3h6Snlrb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtIdDlMQ0FuWVNjc0lIc2daMlYwT2lCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQTNPeUI5SUgwcExtRWdJVDBnTnp0Y2JuMHBPMXh1SWl3aWRtRnlJR2x6VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmFYTXRiMkpxWldOMEp5azdYRzUyWVhJZ1pHOWpkVzFsYm5RZ1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LUzVrYjJOMWJXVnVkRHRjYmk4dklIUjVjR1Z2WmlCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBJR2x6SUNkdlltcGxZM1FuSUdsdUlHOXNaQ0JKUlZ4dWRtRnlJR2x6SUQwZ2FYTlBZbXBsWTNRb1pHOWpkVzFsYm5RcElDWW1JR2x6VDJKcVpXTjBLR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5RcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdjbVYwZFhKdUlHbHpJRDhnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDaHBkQ2tnT2lCN2ZUdGNibjA3WEc0aUxDSXZMeUJKUlNBNExTQmtiMjRuZENCbGJuVnRJR0oxWnlCclpYbHpYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJQ2hjYmlBZ0oyTnZibk4wY25WamRHOXlMR2hoYzA5M2JsQnliM0JsY25SNUxHbHpVSEp2ZEc5MGVYQmxUMllzY0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVc2RHOU1iMk5oYkdWVGRISnBibWNzZEc5VGRISnBibWNzZG1Gc2RXVlBaaWRjYmlrdWMzQnNhWFFvSnl3bktUdGNiaUlzSW5aaGNpQm5iRzlpWVd3Z1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LVHRjYm5aaGNpQmpiM0psSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjl5WlNjcE8xeHVkbUZ5SUdOMGVDQTlJSEpsY1hWcGNtVW9KeTR2WDJOMGVDY3BPMXh1ZG1GeUlHaHBaR1VnUFNCeVpYRjFhWEpsS0NjdUwxOW9hV1JsSnlrN1hHNTJZWElnVUZKUFZFOVVXVkJGSUQwZ0ozQnliM1J2ZEhsd1pTYzdYRzVjYm5aaGNpQWtaWGh3YjNKMElEMGdablZ1WTNScGIyNGdLSFI1Y0dVc0lHNWhiV1VzSUhOdmRYSmpaU2tnZTF4dUlDQjJZWElnU1ZOZlJrOVNRMFZFSUQwZ2RIbHdaU0FtSUNSbGVIQnZjblF1Ump0Y2JpQWdkbUZ5SUVsVFgwZE1UMEpCVENBOUlIUjVjR1VnSmlBa1pYaHdiM0owTGtjN1hHNGdJSFpoY2lCSlUxOVRWRUZVU1VNZ1BTQjBlWEJsSUNZZ0pHVjRjRzl5ZEM1VE8xeHVJQ0IyWVhJZ1NWTmZVRkpQVkU4Z1BTQjBlWEJsSUNZZ0pHVjRjRzl5ZEM1UU8xeHVJQ0IyWVhJZ1NWTmZRa2xPUkNBOUlIUjVjR1VnSmlBa1pYaHdiM0owTGtJN1hHNGdJSFpoY2lCSlUxOVhVa0ZRSUQwZ2RIbHdaU0FtSUNSbGVIQnZjblF1Vnp0Y2JpQWdkbUZ5SUdWNGNHOXlkSE1nUFNCSlUxOUhURTlDUVV3Z1B5QmpiM0psSURvZ1kyOXlaVnR1WVcxbFhTQjhmQ0FvWTI5eVpWdHVZVzFsWFNBOUlIdDlLVHRjYmlBZ2RtRnlJR1Y0Y0ZCeWIzUnZJRDBnWlhod2IzSjBjMXRRVWs5VVQxUlpVRVZkTzF4dUlDQjJZWElnZEdGeVoyVjBJRDBnU1ZOZlIweFBRa0ZNSUQ4Z1oyeHZZbUZzSURvZ1NWTmZVMVJCVkVsRElEOGdaMnh2WW1Gc1cyNWhiV1ZkSURvZ0tHZHNiMkpoYkZ0dVlXMWxYU0I4ZkNCN2ZTbGJVRkpQVkU5VVdWQkZYVHRjYmlBZ2RtRnlJR3RsZVN3Z2IzZHVMQ0J2ZFhRN1hHNGdJR2xtSUNoSlUxOUhURTlDUVV3cElITnZkWEpqWlNBOUlHNWhiV1U3WEc0Z0lHWnZjaUFvYTJWNUlHbHVJSE52ZFhKalpTa2dlMXh1SUNBZ0lDOHZJR052Ym5SaGFXNXpJR2x1SUc1aGRHbDJaVnh1SUNBZ0lHOTNiaUE5SUNGSlUxOUdUMUpEUlVRZ0ppWWdkR0Z5WjJWMElDWW1JSFJoY21kbGRGdHJaWGxkSUNFOVBTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ2FXWWdLRzkzYmlBbUppQnJaWGtnYVc0Z1pYaHdiM0owY3lrZ1kyOXVkR2x1ZFdVN1hHNGdJQ0FnTHk4Z1pYaHdiM0owSUc1aGRHbDJaU0J2Y2lCd1lYTnpaV1JjYmlBZ0lDQnZkWFFnUFNCdmQyNGdQeUIwWVhKblpYUmJhMlY1WFNBNklITnZkWEpqWlZ0clpYbGRPMXh1SUNBZ0lDOHZJSEJ5WlhabGJuUWdaMnh2WW1Gc0lIQnZiR3gxZEdsdmJpQm1iM0lnYm1GdFpYTndZV05sYzF4dUlDQWdJR1Y0Y0c5eWRITmJhMlY1WFNBOUlFbFRYMGRNVDBKQlRDQW1KaUIwZVhCbGIyWWdkR0Z5WjJWMFcydGxlVjBnSVQwZ0oyWjFibU4wYVc5dUp5QS9JSE52ZFhKalpWdHJaWGxkWEc0Z0lDQWdMeThnWW1sdVpDQjBhVzFsY25NZ2RHOGdaMnh2WW1Gc0lHWnZjaUJqWVd4c0lHWnliMjBnWlhod2IzSjBJR052Ym5SbGVIUmNiaUFnSUNBNklFbFRYMEpKVGtRZ0ppWWdiM2R1SUQ4Z1kzUjRLRzkxZEN3Z1oyeHZZbUZzS1Z4dUlDQWdJQzh2SUhkeVlYQWdaMnh2WW1Gc0lHTnZibk4wY25WamRHOXljeUJtYjNJZ2NISmxkbVZ1ZENCamFHRnVaMlVnZEdobGJTQnBiaUJzYVdKeVlYSjVYRzRnSUNBZ09pQkpVMTlYVWtGUUlDWW1JSFJoY21kbGRGdHJaWGxkSUQwOUlHOTFkQ0EvSUNobWRXNWpkR2x2YmlBb1F5a2dlMXh1SUNBZ0lDQWdkbUZ5SUVZZ1BTQm1kVzVqZEdsdmJpQW9ZU3dnWWl3Z1l5a2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeUJwYm5OMFlXNWpaVzltSUVNcElIdGNiaUFnSUNBZ0lDQWdJQ0J6ZDJsMFkyZ2dLR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnTURvZ2NtVjBkWEp1SUc1bGR5QkRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpZWE5sSURFNklISmxkSFZ5YmlCdVpYY2dReWhoS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR05oYzJVZ01qb2djbVYwZFhKdUlHNWxkeUJES0dFc0lHSXBPMXh1SUNBZ0lDQWdJQ0FnSUgwZ2NtVjBkWEp1SUc1bGR5QkRLR0VzSUdJc0lHTXBPMXh1SUNBZ0lDQWdJQ0I5SUhKbGRIVnliaUJETG1Gd2NHeDVLSFJvYVhNc0lHRnlaM1Z0Wlc1MGN5azdYRzRnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdSbHRRVWs5VVQxUlpVRVZkSUQwZ1ExdFFVazlVVDFSWlVFVmRPMXh1SUNBZ0lDQWdjbVYwZFhKdUlFWTdYRzRnSUNBZ0x5OGdiV0ZyWlNCemRHRjBhV01nZG1WeWMybHZibk1nWm05eUlIQnliM1J2ZEhsd1pTQnRaWFJvYjJSelhHNGdJQ0FnZlNrb2IzVjBLU0E2SUVsVFgxQlNUMVJQSUNZbUlIUjVjR1Z2WmlCdmRYUWdQVDBnSjJaMWJtTjBhVzl1SnlBL0lHTjBlQ2hHZFc1amRHbHZiaTVqWVd4c0xDQnZkWFFwSURvZ2IzVjBPMXh1SUNBZ0lDOHZJR1Y0Y0c5eWRDQndjbTkwYnlCdFpYUm9iMlJ6SUhSdklHTnZjbVV1SlVOUFRsTlVVbFZEVkU5U0pTNXRaWFJvYjJSekxpVk9RVTFGSlZ4dUlDQWdJR2xtSUNoSlUxOVFVazlVVHlrZ2UxeHVJQ0FnSUNBZ0tHVjRjRzl5ZEhNdWRtbHlkSFZoYkNCOGZDQW9aWGh3YjNKMGN5NTJhWEowZFdGc0lEMGdlMzBwS1Z0clpYbGRJRDBnYjNWME8xeHVJQ0FnSUNBZ0x5OGdaWGh3YjNKMElIQnliM1J2SUcxbGRHaHZaSE1nZEc4Z1kyOXlaUzRsUTA5T1UxUlNWVU5VVDFJbExuQnliM1J2ZEhsd1pTNGxUa0ZOUlNWY2JpQWdJQ0FnSUdsbUlDaDBlWEJsSUNZZ0pHVjRjRzl5ZEM1U0lDWW1JR1Y0Y0ZCeWIzUnZJQ1ltSUNGbGVIQlFjbTkwYjF0clpYbGRLU0JvYVdSbEtHVjRjRkJ5YjNSdkxDQnJaWGtzSUc5MWRDazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1OU8xeHVMeThnZEhsd1pTQmlhWFJ0WVhCY2JpUmxlSEJ2Y25RdVJpQTlJREU3SUNBZ0x5OGdabTl5WTJWa1hHNGtaWGh3YjNKMExrY2dQU0F5T3lBZ0lDOHZJR2RzYjJKaGJGeHVKR1Y0Y0c5eWRDNVRJRDBnTkRzZ0lDQXZMeUJ6ZEdGMGFXTmNiaVJsZUhCdmNuUXVVQ0E5SURnN0lDQWdMeThnY0hKdmRHOWNiaVJsZUhCdmNuUXVRaUE5SURFMk95QWdMeThnWW1sdVpGeHVKR1Y0Y0c5eWRDNVhJRDBnTXpJN0lDQXZMeUIzY21Gd1hHNGtaWGh3YjNKMExsVWdQU0EyTkRzZ0lDOHZJSE5oWm1WY2JpUmxlSEJ2Y25RdVVpQTlJREV5T0RzZ0x5OGdjbVZoYkNCd2NtOTBieUJ0WlhSb2IyUWdabTl5SUdCc2FXSnlZWEo1WUZ4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNBa1pYaHdiM0owTzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9aWGhsWXlrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhKbGRIVnliaUFoSVdWNFpXTW9LVHRjYmlBZ2ZTQmpZWFJqYUNBb1pTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCMGNuVmxPMXh1SUNCOVhHNTlPMXh1SWl3aUx5OGdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMM3BzYjJseWIyTnJMMk52Y21VdGFuTXZhWE56ZFdWekx6ZzJJMmx6YzNWbFkyOXRiV1Z1ZEMweE1UVTNOVGt3TWpoY2JuWmhjaUJuYkc5aVlXd2dQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMGdKM1Z1WkdWbWFXNWxaQ2NnSmlZZ2QybHVaRzkzTGsxaGRHZ2dQVDBnVFdGMGFGeHVJQ0EvSUhkcGJtUnZkeUE2SUhSNWNHVnZaaUJ6Wld4bUlDRTlJQ2QxYm1SbFptbHVaV1FuSUNZbUlITmxiR1l1VFdGMGFDQTlQU0JOWVhSb0lEOGdjMlZzWmx4dUlDQXZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0Ym1WM0xXWjFibU5jYmlBZ09pQkdkVzVqZEdsdmJpZ25jbVYwZFhKdUlIUm9hWE1uS1NncE8xeHVhV1lnS0hSNWNHVnZaaUJmWDJjZ1BUMGdKMjUxYldKbGNpY3BJRjlmWnlBOUlHZHNiMkpoYkRzZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJHbHVaU0J1YnkxMWJtUmxabHh1SWl3aWRtRnlJR2hoYzA5M2JsQnliM0JsY25SNUlEMGdlMzB1YUdGelQzZHVVSEp2Y0dWeWRIazdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZEN3Z2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlCb1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHbDBMQ0JyWlhrcE8xeHVmVHRjYmlJc0luWmhjaUJrVUNBOUlISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWtjQ2NwTzF4dWRtRnlJR055WldGMFpVUmxjMk1nUFNCeVpYRjFhWEpsS0NjdUwxOXdjbTl3WlhKMGVTMWtaWE5qSnlrN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZYMlJsYzJOeWFYQjBiM0p6SnlrZ1B5Qm1kVzVqZEdsdmJpQW9iMkpxWldOMExDQnJaWGtzSUhaaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlCa1VDNW1LRzlpYW1WamRDd2dhMlY1TENCamNtVmhkR1ZFWlhOaktERXNJSFpoYkhWbEtTazdYRzU5SURvZ1puVnVZM1JwYjI0Z0tHOWlhbVZqZEN3Z2EyVjVMQ0IyWVd4MVpTa2dlMXh1SUNCdlltcGxZM1JiYTJWNVhTQTlJSFpoYkhWbE8xeHVJQ0J5WlhSMWNtNGdiMkpxWldOME8xeHVmVHRjYmlJc0luWmhjaUJrYjJOMWJXVnVkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyZHNiMkpoYkNjcExtUnZZM1Z0Wlc1ME8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQmtiMk4xYldWdWRDQW1KaUJrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUTdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUNGeVpYRjFhWEpsS0NjdUwxOWtaWE5qY21sd2RHOXljeWNwSUNZbUlDRnlaWEYxYVhKbEtDY3VMMTltWVdsc2N5Y3BLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdjbVYwZFhKdUlFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlU2h5WlhGMWFYSmxLQ2N1TDE5a2IyMHRZM0psWVhSbEp5a29KMlJwZGljcExDQW5ZU2NzSUhzZ1oyVjBPaUJtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlBM095QjlJSDBwTG1FZ0lUMGdOenRjYm4wcE8xeHVJaXdpTHk4Z1ptRnNiR0poWTJzZ1ptOXlJRzV2YmkxaGNuSmhlUzFzYVd0bElFVlRNeUJoYm1RZ2JtOXVMV1Z1ZFcxbGNtRmliR1VnYjJ4a0lGWTRJSE4wY21sdVozTmNiblpoY2lCamIyWWdQU0J5WlhGMWFYSmxLQ2N1TDE5amIyWW5LVHRjYmk4dklHVnpiR2x1ZEMxa2FYTmhZbXhsTFc1bGVIUXRiR2x1WlNCdWJ5MXdjbTkwYjNSNWNHVXRZblZwYkhScGJuTmNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdUMkpxWldOMEtDZDZKeWt1Y0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVb01Da2dQeUJQWW1wbFkzUWdPaUJtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJR052WmlocGRDa2dQVDBnSjFOMGNtbHVaeWNnUHlCcGRDNXpjR3hwZENnbkp5a2dPaUJQWW1wbFkzUW9hWFFwTzF4dWZUdGNiaUlzSWk4dklHTm9aV05ySUc5dUlHUmxabUYxYkhRZ1FYSnlZWGtnYVhSbGNtRjBiM0pjYm5aaGNpQkpkR1Z5WVhSdmNuTWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGRHVnlZWFJ2Y25NbktUdGNiblpoY2lCSlZFVlNRVlJQVWlBOUlISmxjWFZwY21Vb0p5NHZYM2RyY3ljcEtDZHBkR1Z5WVhSdmNpY3BPMXh1ZG1GeUlFRnljbUY1VUhKdmRHOGdQU0JCY25KaGVTNXdjbTkwYjNSNWNHVTdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUhKbGRIVnliaUJwZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUNoSmRHVnlZWFJ2Y25NdVFYSnlZWGtnUFQwOUlHbDBJSHg4SUVGeWNtRjVVSEp2ZEc5YlNWUkZVa0ZVVDFKZElEMDlQU0JwZENrN1hHNTlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2NtVjBkWEp1SUhSNWNHVnZaaUJwZENBOVBUMGdKMjlpYW1WamRDY2dQeUJwZENBaFBUMGdiblZzYkNBNklIUjVjR1Z2WmlCcGRDQTlQVDBnSjJaMWJtTjBhVzl1Snp0Y2JuMDdYRzRpTENJdkx5QmpZV3hzSUhOdmJXVjBhR2x1WnlCdmJpQnBkR1Z5WVhSdmNpQnpkR1Z3SUhkcGRHZ2djMkZtWlNCamJHOXphVzVuSUc5dUlHVnljbTl5WEc1MllYSWdZVzVQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5aGJpMXZZbXBsWTNRbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwWlhKaGRHOXlMQ0JtYml3Z2RtRnNkV1VzSUdWdWRISnBaWE1wSUh0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0J5WlhSMWNtNGdaVzUwY21sbGN5QS9JR1p1S0dGdVQySnFaV04wS0haaGJIVmxLVnN3WFN3Z2RtRnNkV1ZiTVYwcElEb2dabTRvZG1Gc2RXVXBPMXh1SUNBdkx5QTNMalF1TmlCSmRHVnlZWFJ2Y2tOc2IzTmxLR2wwWlhKaGRHOXlMQ0JqYjIxd2JHVjBhVzl1S1Z4dUlDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdkbUZ5SUhKbGRDQTlJR2wwWlhKaGRHOXlXeWR5WlhSMWNtNG5YVHRjYmlBZ0lDQnBaaUFvY21WMElDRTlQU0IxYm1SbFptbHVaV1FwSUdGdVQySnFaV04wS0hKbGRDNWpZV3hzS0dsMFpYSmhkRzl5S1NrN1hHNGdJQ0FnZEdoeWIzY2daVHRjYmlBZ2ZWeHVmVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYm5aaGNpQmpjbVZoZEdVZ1BTQnlaWEYxYVhKbEtDY3VMMTl2WW1wbFkzUXRZM0psWVhSbEp5azdYRzUyWVhJZ1pHVnpZM0pwY0hSdmNpQTlJSEpsY1hWcGNtVW9KeTR2WDNCeWIzQmxjblI1TFdSbGMyTW5LVHRjYm5aaGNpQnpaWFJVYjFOMGNtbHVaMVJoWnlBOUlISmxjWFZwY21Vb0p5NHZYM05sZEMxMGJ5MXpkSEpwYm1jdGRHRm5KeWs3WEc1MllYSWdTWFJsY21GMGIzSlFjbTkwYjNSNWNHVWdQU0I3ZlR0Y2JseHVMeThnTWpVdU1TNHlMakV1TVNBbFNYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVbFcwQkFhWFJsY21GMGIzSmRLQ2xjYm5KbGNYVnBjbVVvSnk0dlgyaHBaR1VuS1NoSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlN3Z2NtVnhkV2x5WlNnbkxpOWZkMnR6Snlrb0oybDBaWEpoZEc5eUp5a3NJR1oxYm1OMGFXOXVJQ2dwSUhzZ2NtVjBkWEp1SUhSb2FYTTdJSDBwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaERiMjV6ZEhKMVkzUnZjaXdnVGtGTlJTd2dibVY0ZENrZ2UxeHVJQ0JEYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVZ1BTQmpjbVZoZEdVb1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVc0lIc2dibVY0ZERvZ1pHVnpZM0pwY0hSdmNpZ3hMQ0J1WlhoMEtTQjlLVHRjYmlBZ2MyVjBWRzlUZEhKcGJtZFVZV2NvUTI5dWMzUnlkV04wYjNJc0lFNUJUVVVnS3lBbklFbDBaWEpoZEc5eUp5azdYRzU5TzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dWRtRnlJRXhKUWxKQlVsa2dQU0J5WlhGMWFYSmxLQ2N1TDE5c2FXSnlZWEo1SnlrN1hHNTJZWElnSkdWNGNHOXlkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyVjRjRzl5ZENjcE8xeHVkbUZ5SUhKbFpHVm1hVzVsSUQwZ2NtVnhkV2x5WlNnbkxpOWZjbVZrWldacGJtVW5LVHRjYm5aaGNpQm9hV1JsSUQwZ2NtVnhkV2x5WlNnbkxpOWZhR2xrWlNjcE8xeHVkbUZ5SUdoaGN5QTlJSEpsY1hWcGNtVW9KeTR2WDJoaGN5Y3BPMXh1ZG1GeUlFbDBaWEpoZEc5eWN5QTlJSEpsY1hWcGNtVW9KeTR2WDJsMFpYSmhkRzl5Y3ljcE8xeHVkbUZ5SUNScGRHVnlRM0psWVhSbElEMGdjbVZ4ZFdseVpTZ25MaTlmYVhSbGNpMWpjbVZoZEdVbktUdGNiblpoY2lCelpYUlViMU4wY21sdVoxUmhaeUE5SUhKbGNYVnBjbVVvSnk0dlgzTmxkQzEwYnkxemRISnBibWN0ZEdGbkp5azdYRzUyWVhJZ1oyVjBVSEp2ZEc5MGVYQmxUMllnUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdFozQnZKeWs3WEc1MllYSWdTVlJGVWtGVVQxSWdQU0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duYVhSbGNtRjBiM0luS1R0Y2JuWmhjaUJDVlVkSFdTQTlJQ0VvVzEwdWEyVjVjeUFtSmlBbmJtVjRkQ2NnYVc0Z1cxMHVhMlY1Y3lncEtUc2dMeThnVTJGbVlYSnBJR2hoY3lCaWRXZG5lU0JwZEdWeVlYUnZjbk1nZHk5dklHQnVaWGgwWUZ4dWRtRnlJRVpHWDBsVVJWSkJWRTlTSUQwZ0owQkFhWFJsY21GMGIzSW5PMXh1ZG1GeUlFdEZXVk1nUFNBbmEyVjVjeWM3WEc1MllYSWdWa0ZNVlVWVElEMGdKM1poYkhWbGN5YzdYRzVjYm5aaGNpQnlaWFIxY201VWFHbHpJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z2RHaHBjenNnZlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9RbUZ6WlN3Z1RrRk5SU3dnUTI5dWMzUnlkV04wYjNJc0lHNWxlSFFzSUVSRlJrRlZURlFzSUVsVFgxTkZWQ3dnUms5U1EwVkVLU0I3WEc0Z0lDUnBkR1Z5UTNKbFlYUmxLRU52Ym5OMGNuVmpkRzl5TENCT1FVMUZMQ0J1WlhoMEtUdGNiaUFnZG1GeUlHZGxkRTFsZEdodlpDQTlJR1oxYm1OMGFXOXVJQ2hyYVc1a0tTQjdYRzRnSUNBZ2FXWWdLQ0ZDVlVkSFdTQW1KaUJyYVc1a0lHbHVJSEJ5YjNSdktTQnlaWFIxY200Z2NISnZkRzliYTJsdVpGMDdYRzRnSUNBZ2MzZHBkR05vSUNocmFXNWtLU0I3WEc0Z0lDQWdJQ0JqWVhObElFdEZXVk02SUhKbGRIVnliaUJtZFc1amRHbHZiaUJyWlhsektDa2dleUJ5WlhSMWNtNGdibVYzSUVOdmJuTjBjblZqZEc5eUtIUm9hWE1zSUd0cGJtUXBPeUI5TzF4dUlDQWdJQ0FnWTJGelpTQldRVXhWUlZNNklISmxkSFZ5YmlCbWRXNWpkR2x2YmlCMllXeDFaWE1vS1NCN0lISmxkSFZ5YmlCdVpYY2dRMjl1YzNSeWRXTjBiM0lvZEdocGN5d2dhMmx1WkNrN0lIMDdYRzRnSUNBZ2ZTQnlaWFIxY200Z1puVnVZM1JwYjI0Z1pXNTBjbWxsY3lncElIc2djbVYwZFhKdUlHNWxkeUJEYjI1emRISjFZM1J2Y2loMGFHbHpMQ0JyYVc1a0tUc2dmVHRjYmlBZ2ZUdGNiaUFnZG1GeUlGUkJSeUE5SUU1QlRVVWdLeUFuSUVsMFpYSmhkRzl5Snp0Y2JpQWdkbUZ5SUVSRlJsOVdRVXhWUlZNZ1BTQkVSVVpCVlV4VUlEMDlJRlpCVEZWRlV6dGNiaUFnZG1GeUlGWkJURlZGVTE5Q1ZVY2dQU0JtWVd4elpUdGNiaUFnZG1GeUlIQnliM1J2SUQwZ1FtRnpaUzV3Y205MGIzUjVjR1U3WEc0Z0lIWmhjaUFrYm1GMGFYWmxJRDBnY0hKdmRHOWJTVlJGVWtGVVQxSmRJSHg4SUhCeWIzUnZXMFpHWDBsVVJWSkJWRTlTWFNCOGZDQkVSVVpCVlV4VUlDWW1JSEJ5YjNSdlcwUkZSa0ZWVEZSZE8xeHVJQ0IyWVhJZ0pHUmxabUYxYkhRZ1BTQW9JVUpWUjBkWklDWW1JQ1J1WVhScGRtVXBJSHg4SUdkbGRFMWxkR2h2WkNoRVJVWkJWVXhVS1R0Y2JpQWdkbUZ5SUNSbGJuUnlhV1Z6SUQwZ1JFVkdRVlZNVkNBL0lDRkVSVVpmVmtGTVZVVlRJRDhnSkdSbFptRjFiSFFnT2lCblpYUk5aWFJvYjJRb0oyVnVkSEpwWlhNbktTQTZJSFZ1WkdWbWFXNWxaRHRjYmlBZ2RtRnlJQ1JoYm5sT1lYUnBkbVVnUFNCT1FVMUZJRDA5SUNkQmNuSmhlU2NnUHlCd2NtOTBieTVsYm5SeWFXVnpJSHg4SUNSdVlYUnBkbVVnT2lBa2JtRjBhWFpsTzF4dUlDQjJZWElnYldWMGFHOWtjeXdnYTJWNUxDQkpkR1Z5WVhSdmNsQnliM1J2ZEhsd1pUdGNiaUFnTHk4Z1JtbDRJRzVoZEdsMlpWeHVJQ0JwWmlBb0pHRnVlVTVoZEdsMlpTa2dlMXh1SUNBZ0lFbDBaWEpoZEc5eVVISnZkRzkwZVhCbElEMGdaMlYwVUhKdmRHOTBlWEJsVDJZb0pHRnVlVTVoZEdsMlpTNWpZV3hzS0c1bGR5QkNZWE5sS0NrcEtUdGNiaUFnSUNCcFppQW9TWFJsY21GMGIzSlFjbTkwYjNSNWNHVWdJVDA5SUU5aWFtVmpkQzV3Y205MGIzUjVjR1VnSmlZZ1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVdWJtVjRkQ2tnZTF4dUlDQWdJQ0FnTHk4Z1UyVjBJRUJBZEc5VGRISnBibWRVWVdjZ2RHOGdibUYwYVhabElHbDBaWEpoZEc5eWMxeHVJQ0FnSUNBZ2MyVjBWRzlUZEhKcGJtZFVZV2NvU1hSbGNtRjBiM0pRY205MGIzUjVjR1VzSUZSQlJ5d2dkSEoxWlNrN1hHNGdJQ0FnSUNBdkx5Qm1hWGdnWm05eUlITnZiV1VnYjJ4a0lHVnVaMmx1WlhOY2JpQWdJQ0FnSUdsbUlDZ2hURWxDVWtGU1dTQW1KaUFoYUdGektFbDBaWEpoZEc5eVVISnZkRzkwZVhCbExDQkpWRVZTUVZSUFVpa3BJR2hwWkdVb1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVc0lFbFVSVkpCVkU5U0xDQnlaWFIxY201VWFHbHpLVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdMeThnWm1sNElFRnljbUY1STN0MllXeDFaWE1zSUVCQWFYUmxjbUYwYjNKOUxtNWhiV1VnYVc0Z1ZqZ2dMeUJHUmx4dUlDQnBaaUFvUkVWR1gxWkJURlZGVXlBbUppQWtibUYwYVhabElDWW1JQ1J1WVhScGRtVXVibUZ0WlNBaFBUMGdWa0ZNVlVWVEtTQjdYRzRnSUNBZ1ZrRk1WVVZUWDBKVlJ5QTlJSFJ5ZFdVN1hHNGdJQ0FnSkdSbFptRjFiSFFnUFNCbWRXNWpkR2x2YmlCMllXeDFaWE1vS1NCN0lISmxkSFZ5YmlBa2JtRjBhWFpsTG1OaGJHd29kR2hwY3lrN0lIMDdYRzRnSUgxY2JpQWdMeThnUkdWbWFXNWxJR2wwWlhKaGRHOXlYRzRnSUdsbUlDZ29JVXhKUWxKQlVsa2dmSHdnUms5U1EwVkVLU0FtSmlBb1FsVkhSMWtnZkh3Z1ZrRk1WVVZUWDBKVlJ5QjhmQ0FoY0hKdmRHOWJTVlJGVWtGVVQxSmRLU2tnZTF4dUlDQWdJR2hwWkdVb2NISnZkRzhzSUVsVVJWSkJWRTlTTENBa1pHVm1ZWFZzZENrN1hHNGdJSDFjYmlBZ0x5OGdVR3gxWnlCbWIzSWdiR2xpY21GeWVWeHVJQ0JKZEdWeVlYUnZjbk5iVGtGTlJWMGdQU0FrWkdWbVlYVnNkRHRjYmlBZ1NYUmxjbUYwYjNKelcxUkJSMTBnUFNCeVpYUjFjbTVVYUdsek8xeHVJQ0JwWmlBb1JFVkdRVlZNVkNrZ2UxeHVJQ0FnSUcxbGRHaHZaSE1nUFNCN1hHNGdJQ0FnSUNCMllXeDFaWE02SUVSRlJsOVdRVXhWUlZNZ1B5QWtaR1ZtWVhWc2RDQTZJR2RsZEUxbGRHaHZaQ2hXUVV4VlJWTXBMRnh1SUNBZ0lDQWdhMlY1Y3pvZ1NWTmZVMFZVSUQ4Z0pHUmxabUYxYkhRZ09pQm5aWFJOWlhSb2IyUW9TMFZaVXlrc1hHNGdJQ0FnSUNCbGJuUnlhV1Z6T2lBa1pXNTBjbWxsYzF4dUlDQWdJSDA3WEc0Z0lDQWdhV1lnS0VaUFVrTkZSQ2tnWm05eUlDaHJaWGtnYVc0Z2JXVjBhRzlrY3lrZ2UxeHVJQ0FnSUNBZ2FXWWdLQ0VvYTJWNUlHbHVJSEJ5YjNSdktTa2djbVZrWldacGJtVW9jSEp2ZEc4c0lHdGxlU3dnYldWMGFHOWtjMXRyWlhsZEtUdGNiaUFnSUNCOUlHVnNjMlVnSkdWNGNHOXlkQ2drWlhod2IzSjBMbEFnS3lBa1pYaHdiM0owTGtZZ0tpQW9RbFZIUjFrZ2ZId2dWa0ZNVlVWVFgwSlZSeWtzSUU1QlRVVXNJRzFsZEdodlpITXBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQnRaWFJvYjJSek8xeHVmVHRjYmlJc0luWmhjaUJKVkVWU1FWUlBVaUE5SUhKbGNYVnBjbVVvSnk0dlgzZHJjeWNwS0NkcGRHVnlZWFJ2Y2ljcE8xeHVkbUZ5SUZOQlJrVmZRMHhQVTBsT1J5QTlJR1poYkhObE8xeHVYRzUwY25rZ2UxeHVJQ0IyWVhJZ2NtbDBaWElnUFNCYk4xMWJTVlJGVWtGVVQxSmRLQ2s3WEc0Z0lISnBkR1Z5V3lkeVpYUjFjbTRuWFNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnVTBGR1JWOURURTlUU1U1SElEMGdkSEoxWlRzZ2ZUdGNiaUFnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxYUm9jbTkzTFd4cGRHVnlZV3hjYmlBZ1FYSnlZWGt1Wm5KdmJTaHlhWFJsY2l3Z1puVnVZM1JwYjI0Z0tDa2dleUIwYUhKdmR5QXlPeUI5S1R0Y2JuMGdZMkYwWTJnZ0tHVXBJSHNnTHlvZ1pXMXdkSGtnS2k4Z2ZWeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hsZUdWakxDQnphMmx3UTJ4dmMybHVaeWtnZTF4dUlDQnBaaUFvSVhOcmFYQkRiRzl6YVc1bklDWW1JQ0ZUUVVaRlgwTk1UMU5KVGtjcElISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2RtRnlJSE5oWm1VZ1BTQm1ZV3h6WlR0Y2JpQWdkSEo1SUh0Y2JpQWdJQ0IyWVhJZ1lYSnlJRDBnV3pkZE8xeHVJQ0FnSUhaaGNpQnBkR1Z5SUQwZ1lYSnlXMGxVUlZKQlZFOVNYU2dwTzF4dUlDQWdJR2wwWlhJdWJtVjRkQ0E5SUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlIc2daRzl1WlRvZ2MyRm1aU0E5SUhSeWRXVWdmVHNnZlR0Y2JpQWdJQ0JoY25KYlNWUkZVa0ZVVDFKZElEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnYVhSbGNqc2dmVHRjYmlBZ0lDQmxlR1ZqS0dGeWNpazdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIc2dMeW9nWlcxd2RIa2dLaThnZlZ4dUlDQnlaWFIxY200Z2MyRm1aVHRjYm4wN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSHQ5TzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjBjblZsTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dUx5OGdNVGt1TVM0eUxqRWdUMkpxWldOMExtRnpjMmxuYmloMFlYSm5aWFFzSUhOdmRYSmpaU3dnTGk0dUtWeHVkbUZ5SUdkbGRFdGxlWE1nUFNCeVpYRjFhWEpsS0NjdUwxOXZZbXBsWTNRdGEyVjVjeWNwTzF4dWRtRnlJR2RQVUZNZ1BTQnlaWEYxYVhKbEtDY3VMMTl2WW1wbFkzUXRaMjl3Y3ljcE8xeHVkbUZ5SUhCSlJTQTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzF3YVdVbktUdGNiblpoY2lCMGIwOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFc5aWFtVmpkQ2NwTzF4dWRtRnlJRWxQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGIySnFaV04wSnlrN1hHNTJZWElnSkdGemMybG5iaUE5SUU5aWFtVmpkQzVoYzNOcFoyNDdYRzVjYmk4dklITm9iM1ZzWkNCM2IzSnJJSGRwZEdnZ2MzbHRZbTlzY3lCaGJtUWdjMmh2ZFd4a0lHaGhkbVVnWkdWMFpYSnRhVzVwYzNScFl5QndjbTl3WlhKMGVTQnZjbVJsY2lBb1ZqZ2dZblZuS1Z4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNBaEpHRnpjMmxuYmlCOGZDQnlaWEYxYVhKbEtDY3VMMTltWVdsc2N5Y3BLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdkbUZ5SUVFZ1BTQjdmVHRjYmlBZ2RtRnlJRUlnUFNCN2ZUdGNiaUFnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxYVnVaR1ZtWEc0Z0lIWmhjaUJUSUQwZ1UzbHRZbTlzS0NrN1hHNGdJSFpoY2lCTElEMGdKMkZpWTJSbFptZG9hV3ByYkcxdWIzQnhjbk4wSnp0Y2JpQWdRVnRUWFNBOUlEYzdYRzRnSUVzdWMzQnNhWFFvSnljcExtWnZja1ZoWTJnb1puVnVZM1JwYjI0Z0tHc3BJSHNnUWx0clhTQTlJR3M3SUgwcE8xeHVJQ0J5WlhSMWNtNGdKR0Z6YzJsbmJpaDdmU3dnUVNsYlUxMGdJVDBnTnlCOGZDQlBZbXBsWTNRdWEyVjVjeWdrWVhOemFXZHVLSHQ5TENCQ0tTa3VhbTlwYmlnbkp5a2dJVDBnU3p0Y2JuMHBJRDhnWm5WdVkzUnBiMjRnWVhOemFXZHVLSFJoY21kbGRDd2djMjkxY21ObEtTQjdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRkVzUxYzJWa0xYWmhjbk5jYmlBZ2RtRnlJRlFnUFNCMGIwOWlhbVZqZENoMFlYSm5aWFFwTzF4dUlDQjJZWElnWVV4bGJpQTlJR0Z5WjNWdFpXNTBjeTVzWlc1bmRHZzdYRzRnSUhaaGNpQnBibVJsZUNBOUlERTdYRzRnSUhaaGNpQm5aWFJUZVcxaWIyeHpJRDBnWjA5UVV5NW1PMXh1SUNCMllYSWdhWE5GYm5WdElEMGdjRWxGTG1ZN1hHNGdJSGRvYVd4bElDaGhUR1Z1SUQ0Z2FXNWtaWGdwSUh0Y2JpQWdJQ0IyWVhJZ1V5QTlJRWxQWW1wbFkzUW9ZWEpuZFcxbGJuUnpXMmx1WkdWNEt5dGRLVHRjYmlBZ0lDQjJZWElnYTJWNWN5QTlJR2RsZEZONWJXSnZiSE1nUHlCblpYUkxaWGx6S0ZNcExtTnZibU5oZENoblpYUlRlVzFpYjJ4ektGTXBLU0E2SUdkbGRFdGxlWE1vVXlrN1hHNGdJQ0FnZG1GeUlHeGxibWQwYUNBOUlHdGxlWE11YkdWdVozUm9PMXh1SUNBZ0lIWmhjaUJxSUQwZ01EdGNiaUFnSUNCMllYSWdhMlY1TzF4dUlDQWdJSGRvYVd4bElDaHNaVzVuZEdnZ1BpQnFLU0JwWmlBb2FYTkZiblZ0TG1OaGJHd29VeXdnYTJWNUlEMGdhMlY1YzF0cUt5dGRLU2tnVkZ0clpYbGRJRDBnVTF0clpYbGRPMXh1SUNCOUlISmxkSFZ5YmlCVU8xeHVmU0E2SUNSaGMzTnBaMjQ3WEc0aUxDSXZMeUF4T1M0eExqSXVNaUF2SURFMUxqSXVNeTQxSUU5aWFtVmpkQzVqY21WaGRHVW9UeUJiTENCUWNtOXdaWEowYVdWelhTbGNiblpoY2lCaGJrOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMkZ1TFc5aWFtVmpkQ2NwTzF4dWRtRnlJR1JRY3lBOUlISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWtjSE1uS1R0Y2JuWmhjaUJsYm5WdFFuVm5TMlY1Y3lBOUlISmxjWFZwY21Vb0p5NHZYMlZ1ZFcwdFluVm5MV3RsZVhNbktUdGNiblpoY2lCSlJWOVFVazlVVHlBOUlISmxjWFZwY21Vb0p5NHZYM05vWVhKbFpDMXJaWGtuS1NnblNVVmZVRkpQVkU4bktUdGNiblpoY2lCRmJYQjBlU0E5SUdaMWJtTjBhVzl1SUNncElIc2dMeW9nWlcxd2RIa2dLaThnZlR0Y2JuWmhjaUJRVWs5VVQxUlpVRVVnUFNBbmNISnZkRzkwZVhCbEp6dGNibHh1THk4Z1EzSmxZWFJsSUc5aWFtVmpkQ0IzYVhSb0lHWmhhMlVnWUc1MWJHeGdJSEJ5YjNSdmRIbHdaVG9nZFhObElHbG1jbUZ0WlNCUFltcGxZM1FnZDJsMGFDQmpiR1ZoY21Wa0lIQnliM1J2ZEhsd1pWeHVkbUZ5SUdOeVpXRjBaVVJwWTNRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDOHZJRlJvY21GemFDd2dkMkZ6ZEdVZ1lXNWtJSE52Wkc5dGVUb2dTVVVnUjBNZ1luVm5YRzRnSUhaaGNpQnBabkpoYldVZ1BTQnlaWEYxYVhKbEtDY3VMMTlrYjIwdFkzSmxZWFJsSnlrb0oybG1jbUZ0WlNjcE8xeHVJQ0IyWVhJZ2FTQTlJR1Z1ZFcxQ2RXZExaWGx6TG14bGJtZDBhRHRjYmlBZ2RtRnlJR3gwSUQwZ0p6d25PMXh1SUNCMllYSWdaM1FnUFNBblBpYzdYRzRnSUhaaGNpQnBabkpoYldWRWIyTjFiV1Z1ZER0Y2JpQWdhV1p5WVcxbExuTjBlV3hsTG1ScGMzQnNZWGtnUFNBbmJtOXVaU2M3WEc0Z0lISmxjWFZwY21Vb0p5NHZYMmgwYld3bktTNWhjSEJsYm1SRGFHbHNaQ2hwWm5KaGJXVXBPMXh1SUNCcFpuSmhiV1V1YzNKaklEMGdKMnBoZG1GelkzSnBjSFE2SnpzZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJHbHVaU0J1YnkxelkzSnBjSFF0ZFhKc1hHNGdJQzh2SUdOeVpXRjBaVVJwWTNRZ1BTQnBabkpoYldVdVkyOXVkR1Z1ZEZkcGJtUnZkeTVQWW1wbFkzUTdYRzRnSUM4dklHaDBiV3d1Y21WdGIzWmxRMmhwYkdRb2FXWnlZVzFsS1R0Y2JpQWdhV1p5WVcxbFJHOWpkVzFsYm5RZ1BTQnBabkpoYldVdVkyOXVkR1Z1ZEZkcGJtUnZkeTVrYjJOMWJXVnVkRHRjYmlBZ2FXWnlZVzFsUkc5amRXMWxiblF1YjNCbGJpZ3BPMXh1SUNCcFpuSmhiV1ZFYjJOMWJXVnVkQzUzY21sMFpTaHNkQ0FySUNkelkzSnBjSFFuSUNzZ1ozUWdLeUFuWkc5amRXMWxiblF1UmoxUFltcGxZM1FuSUNzZ2JIUWdLeUFuTDNOamNtbHdkQ2NnS3lCbmRDazdYRzRnSUdsbWNtRnRaVVJ2WTNWdFpXNTBMbU5zYjNObEtDazdYRzRnSUdOeVpXRjBaVVJwWTNRZ1BTQnBabkpoYldWRWIyTjFiV1Z1ZEM1R08xeHVJQ0IzYUdsc1pTQW9hUzB0S1NCa1pXeGxkR1VnWTNKbFlYUmxSR2xqZEZ0UVVrOVVUMVJaVUVWZFcyVnVkVzFDZFdkTFpYbHpXMmxkWFR0Y2JpQWdjbVYwZFhKdUlHTnlaV0YwWlVScFkzUW9LVHRjYm4wN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdUMkpxWldOMExtTnlaV0YwWlNCOGZDQm1kVzVqZEdsdmJpQmpjbVZoZEdVb1R5d2dVSEp2Y0dWeWRHbGxjeWtnZTF4dUlDQjJZWElnY21WemRXeDBPMXh1SUNCcFppQW9UeUFoUFQwZ2JuVnNiQ2tnZTF4dUlDQWdJRVZ0Y0hSNVcxQlNUMVJQVkZsUVJWMGdQU0JoYms5aWFtVmpkQ2hQS1R0Y2JpQWdJQ0J5WlhOMWJIUWdQU0J1WlhjZ1JXMXdkSGtvS1R0Y2JpQWdJQ0JGYlhCMGVWdFFVazlVVDFSWlVFVmRJRDBnYm5Wc2JEdGNiaUFnSUNBdkx5QmhaR1FnWENKZlgzQnliM1J2WDE5Y0lpQm1iM0lnVDJKcVpXTjBMbWRsZEZCeWIzUnZkSGx3WlU5bUlIQnZiSGxtYVd4c1hHNGdJQ0FnY21WemRXeDBXMGxGWDFCU1QxUlBYU0E5SUU4N1hHNGdJSDBnWld4elpTQnlaWE4xYkhRZ1BTQmpjbVZoZEdWRWFXTjBLQ2s3WEc0Z0lISmxkSFZ5YmlCUWNtOXdaWEowYVdWeklEMDlQU0IxYm1SbFptbHVaV1FnUHlCeVpYTjFiSFFnT2lCa1VITW9jbVZ6ZFd4MExDQlFjbTl3WlhKMGFXVnpLVHRjYm4wN1hHNGlMQ0oyWVhJZ1lXNVBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTloYmkxdlltcGxZM1FuS1R0Y2JuWmhjaUJKUlRoZlJFOU5YMFJGUmtsT1JTQTlJSEpsY1hWcGNtVW9KeTR2WDJsbE9DMWtiMjB0WkdWbWFXNWxKeWs3WEc1MllYSWdkRzlRY21sdGFYUnBkbVVnUFNCeVpYRjFhWEpsS0NjdUwxOTBieTF3Y21sdGFYUnBkbVVuS1R0Y2JuWmhjaUJrVUNBOUlFOWlhbVZqZEM1a1pXWnBibVZRY205d1pYSjBlVHRjYmx4dVpYaHdiM0owY3k1bUlEMGdjbVZ4ZFdseVpTZ25MaTlmWkdWelkzSnBjSFJ2Y25NbktTQS9JRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVNBNklHWjFibU4wYVc5dUlHUmxabWx1WlZCeWIzQmxjblI1S0U4c0lGQXNJRUYwZEhKcFluVjBaWE1wSUh0Y2JpQWdZVzVQWW1wbFkzUW9UeWs3WEc0Z0lGQWdQU0IwYjFCeWFXMXBkR2wyWlNoUUxDQjBjblZsS1R0Y2JpQWdZVzVQWW1wbFkzUW9RWFIwY21saWRYUmxjeWs3WEc0Z0lHbG1JQ2hKUlRoZlJFOU5YMFJGUmtsT1JTa2dkSEo1SUh0Y2JpQWdJQ0J5WlhSMWNtNGdaRkFvVHl3Z1VDd2dRWFIwY21saWRYUmxjeWs3WEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHNnTHlvZ1pXMXdkSGtnS2k4Z2ZWeHVJQ0JwWmlBb0oyZGxkQ2NnYVc0Z1FYUjBjbWxpZFhSbGN5QjhmQ0FuYzJWMEp5QnBiaUJCZEhSeWFXSjFkR1Z6S1NCMGFISnZkeUJVZVhCbFJYSnliM0lvSjBGalkyVnpjMjl5Y3lCdWIzUWdjM1Z3Y0c5eWRHVmtJU2NwTzF4dUlDQnBaaUFvSjNaaGJIVmxKeUJwYmlCQmRIUnlhV0oxZEdWektTQlBXMUJkSUQwZ1FYUjBjbWxpZFhSbGN5NTJZV3gxWlR0Y2JpQWdjbVYwZFhKdUlFODdYRzU5TzF4dUlpd2lkbUZ5SUdSUUlEMGdjbVZ4ZFdseVpTZ25MaTlmYjJKcVpXTjBMV1J3SnlrN1hHNTJZWElnWVc1UFltcGxZM1FnUFNCeVpYRjFhWEpsS0NjdUwxOWhiaTF2WW1wbFkzUW5LVHRjYm5aaGNpQm5aWFJMWlhseklEMGdjbVZ4ZFdseVpTZ25MaTlmYjJKcVpXTjBMV3RsZVhNbktUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDE5a1pYTmpjbWx3ZEc5eWN5Y3BJRDhnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25ScFpYTWdPaUJtZFc1amRHbHZiaUJrWldacGJtVlFjbTl3WlhKMGFXVnpLRThzSUZCeWIzQmxjblJwWlhNcElIdGNiaUFnWVc1UFltcGxZM1FvVHlrN1hHNGdJSFpoY2lCclpYbHpJRDBnWjJWMFMyVjVjeWhRY205d1pYSjBhV1Z6S1R0Y2JpQWdkbUZ5SUd4bGJtZDBhQ0E5SUd0bGVYTXViR1Z1WjNSb08xeHVJQ0IyWVhJZ2FTQTlJREE3WEc0Z0lIWmhjaUJRTzF4dUlDQjNhR2xzWlNBb2JHVnVaM1JvSUQ0Z2FTa2daRkF1WmloUExDQlFJRDBnYTJWNWMxdHBLeXRkTENCUWNtOXdaWEowYVdWelcxQmRLVHRjYmlBZ2NtVjBkWEp1SUU4N1hHNTlPMXh1SWl3aVpYaHdiM0owY3k1bUlEMGdUMkpxWldOMExtZGxkRTkzYmxCeWIzQmxjblI1VTNsdFltOXNjenRjYmlJc0lpOHZJREU1TGpFdU1pNDVJQzhnTVRVdU1pNHpMaklnVDJKcVpXTjBMbWRsZEZCeWIzUnZkSGx3WlU5bUtFOHBYRzUyWVhJZ2FHRnpJRDBnY21WeGRXbHlaU2duTGk5ZmFHRnpKeWs3WEc1MllYSWdkRzlQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXZZbXBsWTNRbktUdGNiblpoY2lCSlJWOVFVazlVVHlBOUlISmxjWFZwY21Vb0p5NHZYM05vWVhKbFpDMXJaWGtuS1NnblNVVmZVRkpQVkU4bktUdGNiblpoY2lCUFltcGxZM1JRY205MGJ5QTlJRTlpYW1WamRDNXdjbTkwYjNSNWNHVTdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnVDJKcVpXTjBMbWRsZEZCeWIzUnZkSGx3WlU5bUlIeDhJR1oxYm1OMGFXOXVJQ2hQS1NCN1hHNGdJRThnUFNCMGIwOWlhbVZqZENoUEtUdGNiaUFnYVdZZ0tHaGhjeWhQTENCSlJWOVFVazlVVHlrcElISmxkSFZ5YmlCUFcwbEZYMUJTVDFSUFhUdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCUExtTnZibk4wY25WamRHOXlJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdUeUJwYm5OMFlXNWpaVzltSUU4dVkyOXVjM1J5ZFdOMGIzSXBJSHRjYmlBZ0lDQnlaWFIxY200Z1R5NWpiMjV6ZEhKMVkzUnZjaTV3Y205MGIzUjVjR1U3WEc0Z0lIMGdjbVYwZFhKdUlFOGdhVzV6ZEdGdVkyVnZaaUJQWW1wbFkzUWdQeUJQWW1wbFkzUlFjbTkwYnlBNklHNTFiR3c3WEc1OU8xeHVJaXdpZG1GeUlHaGhjeUE5SUhKbGNYVnBjbVVvSnk0dlgyaGhjeWNwTzF4dWRtRnlJSFJ2U1U5aWFtVmpkQ0E5SUhKbGNYVnBjbVVvSnk0dlgzUnZMV2x2WW1wbFkzUW5LVHRjYm5aaGNpQmhjbkpoZVVsdVpHVjRUMllnUFNCeVpYRjFhWEpsS0NjdUwxOWhjbkpoZVMxcGJtTnNkV1JsY3ljcEtHWmhiSE5sS1R0Y2JuWmhjaUJKUlY5UVVrOVVUeUE5SUhKbGNYVnBjbVVvSnk0dlgzTm9ZWEpsWkMxclpYa25LU2duU1VWZlVGSlBWRThuS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9iMkpxWldOMExDQnVZVzFsY3lrZ2UxeHVJQ0IyWVhJZ1R5QTlJSFJ2U1U5aWFtVmpkQ2h2WW1wbFkzUXBPMXh1SUNCMllYSWdhU0E5SURBN1hHNGdJSFpoY2lCeVpYTjFiSFFnUFNCYlhUdGNiaUFnZG1GeUlHdGxlVHRjYmlBZ1ptOXlJQ2hyWlhrZ2FXNGdUeWtnYVdZZ0tHdGxlU0FoUFNCSlJWOVFVazlVVHlrZ2FHRnpLRThzSUd0bGVTa2dKaVlnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ0x5OGdSRzl1SjNRZ1pXNTFiU0JpZFdjZ0ppQm9hV1JrWlc0Z2EyVjVjMXh1SUNCM2FHbHNaU0FvYm1GdFpYTXViR1Z1WjNSb0lENGdhU2tnYVdZZ0tHaGhjeWhQTENCclpYa2dQU0J1WVcxbGMxdHBLeXRkS1NrZ2UxeHVJQ0FnSUg1aGNuSmhlVWx1WkdWNFQyWW9jbVZ6ZFd4MExDQnJaWGtwSUh4OElISmxjM1ZzZEM1d2RYTm9LR3RsZVNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4wN1hHNGlMQ0l2THlBeE9TNHhMakl1TVRRZ0x5QXhOUzR5TGpNdU1UUWdUMkpxWldOMExtdGxlWE1vVHlsY2JuWmhjaUFrYTJWNWN5QTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzFyWlhsekxXbHVkR1Z5Ym1Gc0p5azdYRzUyWVhJZ1pXNTFiVUoxWjB0bGVYTWdQU0J5WlhGMWFYSmxLQ2N1TDE5bGJuVnRMV0oxWnkxclpYbHpKeWs3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1QySnFaV04wTG10bGVYTWdmSHdnWm5WdVkzUnBiMjRnYTJWNWN5aFBLU0I3WEc0Z0lISmxkSFZ5YmlBa2EyVjVjeWhQTENCbGJuVnRRblZuUzJWNWN5azdYRzU5TzF4dUlpd2laWGh3YjNKMGN5NW1JRDBnZTMwdWNISnZjR1Z5ZEhsSmMwVnVkVzFsY21GaWJHVTdYRzRpTENJdkx5QnRiM04wSUU5aWFtVmpkQ0J0WlhSb2IyUnpJR0o1SUVWVE5pQnphRzkxYkdRZ1lXTmpaWEIwSUhCeWFXMXBkR2wyWlhOY2JuWmhjaUFrWlhod2IzSjBJRDBnY21WeGRXbHlaU2duTGk5ZlpYaHdiM0owSnlrN1hHNTJZWElnWTI5eVpTQTlJSEpsY1hWcGNtVW9KeTR2WDJOdmNtVW5LVHRjYm5aaGNpQm1ZV2xzY3lBOUlISmxjWFZwY21Vb0p5NHZYMlpoYVd4ekp5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hMUlZrc0lHVjRaV01wSUh0Y2JpQWdkbUZ5SUdadUlEMGdLR052Y21VdVQySnFaV04wSUh4OElIdDlLVnRMUlZsZElIeDhJRTlpYW1WamRGdExSVmxkTzF4dUlDQjJZWElnWlhod0lEMGdlMzA3WEc0Z0lHVjRjRnRMUlZsZElEMGdaWGhsWXlobWJpazdYRzRnSUNSbGVIQnZjblFvSkdWNGNHOXlkQzVUSUNzZ0pHVjRjRzl5ZEM1R0lDb2dabUZwYkhNb1puVnVZM1JwYjI0Z0tDa2dleUJtYmlneEtUc2dmU2tzSUNkUFltcGxZM1FuTENCbGVIQXBPMXh1ZlR0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR0pwZEcxaGNDd2dkbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJSHRjYmlBZ0lDQmxiblZ0WlhKaFlteGxPaUFoS0dKcGRHMWhjQ0FtSURFcExGeHVJQ0FnSUdOdmJtWnBaM1Z5WVdKc1pUb2dJU2hpYVhSdFlYQWdKaUF5S1N4Y2JpQWdJQ0IzY21sMFlXSnNaVG9nSVNoaWFYUnRZWEFnSmlBMEtTeGNiaUFnSUNCMllXeDFaVG9nZG1Gc2RXVmNiaUFnZlR0Y2JuMDdYRzRpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhKbGNYVnBjbVVvSnk0dlgyaHBaR1VuS1R0Y2JpSXNJblpoY2lCa1pXWWdQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhBbktTNW1PMXh1ZG1GeUlHaGhjeUE5SUhKbGNYVnBjbVVvSnk0dlgyaGhjeWNwTzF4dWRtRnlJRlJCUnlBOUlISmxjWFZwY21Vb0p5NHZYM2RyY3ljcEtDZDBiMU4wY21sdVoxUmhaeWNwTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ3dnZEdGbkxDQnpkR0YwS1NCN1hHNGdJR2xtSUNocGRDQW1KaUFoYUdGektHbDBJRDBnYzNSaGRDQS9JR2wwSURvZ2FYUXVjSEp2ZEc5MGVYQmxMQ0JVUVVjcEtTQmtaV1lvYVhRc0lGUkJSeXdnZXlCamIyNW1hV2QxY21GaWJHVTZJSFJ5ZFdVc0lIWmhiSFZsT2lCMFlXY2dmU2s3WEc1OU8xeHVJaXdpZG1GeUlITm9ZWEpsWkNBOUlISmxjWFZwY21Vb0p5NHZYM05vWVhKbFpDY3BLQ2RyWlhsekp5azdYRzUyWVhJZ2RXbGtJRDBnY21WeGRXbHlaU2duTGk5ZmRXbGtKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoclpYa3BJSHRjYmlBZ2NtVjBkWEp1SUhOb1lYSmxaRnRyWlhsZElIeDhJQ2h6YUdGeVpXUmJhMlY1WFNBOUlIVnBaQ2hyWlhrcEtUdGNibjA3WEc0aUxDSjJZWElnWjJ4dlltRnNJRDBnY21WeGRXbHlaU2duTGk5ZloyeHZZbUZzSnlrN1hHNTJZWElnVTBoQlVrVkVJRDBnSjE5ZlkyOXlaUzFxYzE5emFHRnlaV1JmWHljN1hHNTJZWElnYzNSdmNtVWdQU0JuYkc5aVlXeGJVMGhCVWtWRVhTQjhmQ0FvWjJ4dlltRnNXMU5JUVZKRlJGMGdQU0I3ZlNrN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHJaWGtwSUh0Y2JpQWdjbVYwZFhKdUlITjBiM0psVzJ0bGVWMGdmSHdnS0hOMGIzSmxXMnRsZVYwZ1BTQjdmU2s3WEc1OU8xeHVJaXdpZG1GeUlIUnZTVzUwWldkbGNpQTlJSEpsY1hWcGNtVW9KeTR2WDNSdkxXbHVkR1ZuWlhJbktUdGNiblpoY2lCa1pXWnBibVZrSUQwZ2NtVnhkV2x5WlNnbkxpOWZaR1ZtYVc1bFpDY3BPMXh1THk4Z2RISjFaU0FnTFQ0Z1UzUnlhVzVuSTJGMFhHNHZMeUJtWVd4elpTQXRQaUJUZEhKcGJtY2pZMjlrWlZCdmFXNTBRWFJjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0ZSUFgxTlVVa2xPUnlrZ2UxeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLSFJvWVhRc0lIQnZjeWtnZTF4dUlDQWdJSFpoY2lCeklEMGdVM1J5YVc1bktHUmxabWx1WldRb2RHaGhkQ2twTzF4dUlDQWdJSFpoY2lCcElEMGdkRzlKYm5SbFoyVnlLSEJ2Y3lrN1hHNGdJQ0FnZG1GeUlHd2dQU0J6TG14bGJtZDBhRHRjYmlBZ0lDQjJZWElnWVN3Z1lqdGNiaUFnSUNCcFppQW9hU0E4SURBZ2ZId2dhU0ErUFNCc0tTQnlaWFIxY200Z1ZFOWZVMVJTU1U1SElEOGdKeWNnT2lCMWJtUmxabWx1WldRN1hHNGdJQ0FnWVNBOUlITXVZMmhoY2tOdlpHVkJkQ2hwS1R0Y2JpQWdJQ0J5WlhSMWNtNGdZU0E4SURCNFpEZ3dNQ0I4ZkNCaElENGdNSGhrWW1abUlIeDhJR2tnS3lBeElEMDlQU0JzSUh4OElDaGlJRDBnY3k1amFHRnlRMjlrWlVGMEtHa2dLeUF4S1NrZ1BDQXdlR1JqTURBZ2ZId2dZaUErSURCNFpHWm1abHh1SUNBZ0lDQWdQeUJVVDE5VFZGSkpUa2NnUHlCekxtTm9ZWEpCZENocEtTQTZJR0ZjYmlBZ0lDQWdJRG9nVkU5ZlUxUlNTVTVISUQ4Z2N5NXpiR2xqWlNocExDQnBJQ3NnTWlrZ09pQW9ZU0F0SURCNFpEZ3dNQ0E4UENBeE1Da2dLeUFvWWlBdElEQjRaR013TUNrZ0t5QXdlREV3TURBd08xeHVJQ0I5TzF4dWZUdGNiaUlzSW5aaGNpQjBiMGx1ZEdWblpYSWdQU0J5WlhGMWFYSmxLQ2N1TDE5MGJ5MXBiblJsWjJWeUp5azdYRzUyWVhJZ2JXRjRJRDBnVFdGMGFDNXRZWGc3WEc1MllYSWdiV2x1SUQwZ1RXRjBhQzV0YVc0N1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBibVJsZUN3Z2JHVnVaM1JvS1NCN1hHNGdJR2x1WkdWNElEMGdkRzlKYm5SbFoyVnlLR2x1WkdWNEtUdGNiaUFnY21WMGRYSnVJR2x1WkdWNElEd2dNQ0EvSUcxaGVDaHBibVJsZUNBcklHeGxibWQwYUN3Z01Da2dPaUJ0YVc0b2FXNWtaWGdzSUd4bGJtZDBhQ2s3WEc1OU8xeHVJaXdpTHk4Z055NHhMalFnVkc5SmJuUmxaMlZ5WEc1MllYSWdZMlZwYkNBOUlFMWhkR2d1WTJWcGJEdGNiblpoY2lCbWJHOXZjaUE5SUUxaGRHZ3VabXh2YjNJN1hHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQnlaWFIxY200Z2FYTk9ZVTRvYVhRZ1BTQXJhWFFwSUQ4Z01DQTZJQ2hwZENBK0lEQWdQeUJtYkc5dmNpQTZJR05sYVd3cEtHbDBLVHRjYm4wN1hHNGlMQ0l2THlCMGJ5QnBibVJsZUdWa0lHOWlhbVZqZEN3Z2RHOVBZbXBsWTNRZ2QybDBhQ0JtWVd4c1ltRmpheUJtYjNJZ2JtOXVMV0Z5Y21GNUxXeHBhMlVnUlZNeklITjBjbWx1WjNOY2JuWmhjaUJKVDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmFXOWlhbVZqZENjcE8xeHVkbUZ5SUdSbFptbHVaV1FnUFNCeVpYRjFhWEpsS0NjdUwxOWtaV1pwYm1Wa0p5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdTVTlpYW1WamRDaGtaV1pwYm1Wa0tHbDBLU2s3WEc1OU8xeHVJaXdpTHk4Z055NHhMakUxSUZSdlRHVnVaM1JvWEc1MllYSWdkRzlKYm5SbFoyVnlJRDBnY21WeGRXbHlaU2duTGk5ZmRHOHRhVzUwWldkbGNpY3BPMXh1ZG1GeUlHMXBiaUE5SUUxaGRHZ3ViV2x1TzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2NtVjBkWEp1SUdsMElENGdNQ0EvSUcxcGJpaDBiMGx1ZEdWblpYSW9hWFFwTENBd2VERm1abVptWm1abVptWm1abVptS1NBNklEQTdJQzh2SUhCdmR5Z3lMQ0ExTXlrZ0xTQXhJRDA5SURrd01EY3hPVGt5TlRRM05EQTVPVEZjYm4wN1hHNGlMQ0l2THlBM0xqRXVNVE1nVkc5UFltcGxZM1FvWVhKbmRXMWxiblFwWEc1MllYSWdaR1ZtYVc1bFpDQTlJSEpsY1hWcGNtVW9KeTR2WDJSbFptbHVaV1FuS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCUFltcGxZM1FvWkdWbWFXNWxaQ2hwZENrcE8xeHVmVHRjYmlJc0lpOHZJRGN1TVM0eElGUnZVSEpwYldsMGFYWmxLR2x1Y0hWMElGc3NJRkJ5WldabGNuSmxaRlI1Y0dWZEtWeHVkbUZ5SUdselQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZhWE10YjJKcVpXTjBKeWs3WEc0dkx5QnBibk4wWldGa0lHOW1JSFJvWlNCRlV6WWdjM0JsWXlCMlpYSnphVzl1TENCM1pTQmthV1J1SjNRZ2FXMXdiR1Z0Wlc1MElFQkFkRzlRY21sdGFYUnBkbVVnWTJGelpWeHVMeThnWVc1a0lIUm9aU0J6WldOdmJtUWdZWEpuZFcxbGJuUWdMU0JtYkdGbklDMGdjSEpsWm1WeWNtVmtJSFI1Y0dVZ2FYTWdZU0J6ZEhKcGJtZGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwTENCVEtTQjdYRzRnSUdsbUlDZ2hhWE5QWW1wbFkzUW9hWFFwS1NCeVpYUjFjbTRnYVhRN1hHNGdJSFpoY2lCbWJpd2dkbUZzTzF4dUlDQnBaaUFvVXlBbUppQjBlWEJsYjJZZ0tHWnVJRDBnYVhRdWRHOVRkSEpwYm1jcElEMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ0lXbHpUMkpxWldOMEtIWmhiQ0E5SUdadUxtTmhiR3dvYVhRcEtTa2djbVYwZFhKdUlIWmhiRHRjYmlBZ2FXWWdLSFI1Y0dWdlppQW9abTRnUFNCcGRDNTJZV3gxWlU5bUtTQTlQU0FuWm5WdVkzUnBiMjRuSUNZbUlDRnBjMDlpYW1WamRDaDJZV3dnUFNCbWJpNWpZV3hzS0dsMEtTa3BJSEpsZEhWeWJpQjJZV3c3WEc0Z0lHbG1JQ2doVXlBbUppQjBlWEJsYjJZZ0tHWnVJRDBnYVhRdWRHOVRkSEpwYm1jcElEMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ0lXbHpUMkpxWldOMEtIWmhiQ0E5SUdadUxtTmhiR3dvYVhRcEtTa2djbVYwZFhKdUlIWmhiRHRjYmlBZ2RHaHliM2NnVkhsd1pVVnljbTl5S0Z3aVEyRnVKM1FnWTI5dWRtVnlkQ0J2WW1wbFkzUWdkRzhnY0hKcGJXbDBhWFpsSUhaaGJIVmxYQ0lwTzF4dWZUdGNiaUlzSW5aaGNpQnBaQ0E5SURBN1hHNTJZWElnY0hnZ1BTQk5ZWFJvTG5KaGJtUnZiU2dwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlBblUzbHRZbTlzS0NjdVkyOXVZMkYwS0d0bGVTQTlQVDBnZFc1a1pXWnBibVZrSUQ4Z0p5Y2dPaUJyWlhrc0lDY3BYeWNzSUNncksybGtJQ3NnY0hncExuUnZVM1J5YVc1bktETTJLU2s3WEc1OU8xeHVJaXdpZG1GeUlITjBiM0psSUQwZ2NtVnhkV2x5WlNnbkxpOWZjMmhoY21Wa0p5a29KM2RyY3ljcE8xeHVkbUZ5SUhWcFpDQTlJSEpsY1hWcGNtVW9KeTR2WDNWcFpDY3BPMXh1ZG1GeUlGTjViV0p2YkNBOUlISmxjWFZwY21Vb0p5NHZYMmRzYjJKaGJDY3BMbE41YldKdmJEdGNiblpoY2lCVlUwVmZVMWxOUWs5TUlEMGdkSGx3Wlc5bUlGTjViV0p2YkNBOVBTQW5ablZ1WTNScGIyNG5PMXh1WEc1MllYSWdKR1Y0Y0c5eWRITWdQU0J0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzRnSUhKbGRIVnliaUJ6ZEc5eVpWdHVZVzFsWFNCOGZDQW9jM1J2Y21WYmJtRnRaVjBnUFZ4dUlDQWdJRlZUUlY5VFdVMUNUMHdnSmlZZ1UzbHRZbTlzVzI1aGJXVmRJSHg4SUNoVlUwVmZVMWxOUWs5TUlEOGdVM2x0WW05c0lEb2dkV2xrS1NnblUzbHRZbTlzTGljZ0t5QnVZVzFsS1NrN1hHNTlPMXh1WEc0a1pYaHdiM0owY3k1emRHOXlaU0E5SUhOMGIzSmxPMXh1SWl3aWRtRnlJR05zWVhOemIyWWdQU0J5WlhGMWFYSmxLQ2N1TDE5amJHRnpjMjltSnlrN1hHNTJZWElnU1ZSRlVrRlVUMUlnUFNCeVpYRjFhWEpsS0NjdUwxOTNhM01uS1NnbmFYUmxjbUYwYjNJbktUdGNiblpoY2lCSmRHVnlZWFJ2Y25NZ1BTQnlaWEYxYVhKbEtDY3VMMTlwZEdWeVlYUnZjbk1uS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjl5WlNjcExtZGxkRWwwWlhKaGRHOXlUV1YwYUc5a0lEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJR2xtSUNocGRDQWhQU0IxYm1SbFptbHVaV1FwSUhKbGRIVnliaUJwZEZ0SlZFVlNRVlJQVWwxY2JpQWdJQ0I4ZkNCcGRGc25RRUJwZEdWeVlYUnZjaWRkWEc0Z0lDQWdmSHdnU1hSbGNtRjBiM0p6VzJOc1lYTnpiMllvYVhRcFhUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc1MllYSWdZM1I0SUQwZ2NtVnhkV2x5WlNnbkxpOWZZM1I0SnlrN1hHNTJZWElnSkdWNGNHOXlkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyVjRjRzl5ZENjcE8xeHVkbUZ5SUhSdlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YjJKcVpXTjBKeWs3WEc1MllYSWdZMkZzYkNBOUlISmxjWFZwY21Vb0p5NHZYMmwwWlhJdFkyRnNiQ2NwTzF4dWRtRnlJR2x6UVhKeVlYbEpkR1Z5SUQwZ2NtVnhkV2x5WlNnbkxpOWZhWE10WVhKeVlYa3RhWFJsY2ljcE8xeHVkbUZ5SUhSdlRHVnVaM1JvSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YkdWdVozUm9KeWs3WEc1MllYSWdZM0psWVhSbFVISnZjR1Z5ZEhrZ1BTQnlaWEYxYVhKbEtDY3VMMTlqY21WaGRHVXRjSEp2Y0dWeWRIa25LVHRjYm5aaGNpQm5aWFJKZEdWeVJtNGdQU0J5WlhGMWFYSmxLQ2N1TDJOdmNtVXVaMlYwTFdsMFpYSmhkRzl5TFcxbGRHaHZaQ2NwTzF4dVhHNGtaWGh3YjNKMEtDUmxlSEJ2Y25RdVV5QXJJQ1JsZUhCdmNuUXVSaUFxSUNGeVpYRjFhWEpsS0NjdUwxOXBkR1Z5TFdSbGRHVmpkQ2NwS0daMWJtTjBhVzl1SUNocGRHVnlLU0I3SUVGeWNtRjVMbVp5YjIwb2FYUmxjaWs3SUgwcExDQW5RWEp5WVhrbkxDQjdYRzRnSUM4dklESXlMakV1TWk0eElFRnljbUY1TG1aeWIyMG9ZWEp5WVhsTWFXdGxMQ0J0WVhCbWJpQTlJSFZ1WkdWbWFXNWxaQ3dnZEdocGMwRnlaeUE5SUhWdVpHVm1hVzVsWkNsY2JpQWdabkp2YlRvZ1puVnVZM1JwYjI0Z1puSnZiU2hoY25KaGVVeHBhMlVnTHlvZ0xDQnRZWEJtYmlBOUlIVnVaR1ZtYVc1bFpDd2dkR2hwYzBGeVp5QTlJSFZ1WkdWbWFXNWxaQ0FxTHlrZ2UxeHVJQ0FnSUhaaGNpQlBJRDBnZEc5UFltcGxZM1FvWVhKeVlYbE1hV3RsS1R0Y2JpQWdJQ0IyWVhJZ1F5QTlJSFI1Y0dWdlppQjBhR2x6SUQwOUlDZG1kVzVqZEdsdmJpY2dQeUIwYUdseklEb2dRWEp5WVhrN1hHNGdJQ0FnZG1GeUlHRk1aVzRnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvTzF4dUlDQWdJSFpoY2lCdFlYQm1iaUE5SUdGTVpXNGdQaUF4SUQ4Z1lYSm5kVzFsYm5Seld6RmRJRG9nZFc1a1pXWnBibVZrTzF4dUlDQWdJSFpoY2lCdFlYQndhVzVuSUQwZ2JXRndabTRnSVQwOUlIVnVaR1ZtYVc1bFpEdGNiaUFnSUNCMllYSWdhVzVrWlhnZ1BTQXdPMXh1SUNBZ0lIWmhjaUJwZEdWeVJtNGdQU0JuWlhSSmRHVnlSbTRvVHlrN1hHNGdJQ0FnZG1GeUlHeGxibWQwYUN3Z2NtVnpkV3gwTENCemRHVndMQ0JwZEdWeVlYUnZjanRjYmlBZ0lDQnBaaUFvYldGd2NHbHVaeWtnYldGd1ptNGdQU0JqZEhnb2JXRndabTRzSUdGTVpXNGdQaUF5SUQ4Z1lYSm5kVzFsYm5Seld6SmRJRG9nZFc1a1pXWnBibVZrTENBeUtUdGNiaUFnSUNBdkx5QnBaaUJ2WW1wbFkzUWdhWE51SjNRZ2FYUmxjbUZpYkdVZ2IzSWdhWFFuY3lCaGNuSmhlU0IzYVhSb0lHUmxabUYxYkhRZ2FYUmxjbUYwYjNJZ0xTQjFjMlVnYzJsdGNHeGxJR05oYzJWY2JpQWdJQ0JwWmlBb2FYUmxja1p1SUNFOUlIVnVaR1ZtYVc1bFpDQW1KaUFoS0VNZ1BUMGdRWEp5WVhrZ0ppWWdhWE5CY25KaGVVbDBaWElvYVhSbGNrWnVLU2twSUh0Y2JpQWdJQ0FnSUdadmNpQW9hWFJsY21GMGIzSWdQU0JwZEdWeVJtNHVZMkZzYkNoUEtTd2djbVZ6ZFd4MElEMGdibVYzSUVNb0tUc2dJU2h6ZEdWd0lEMGdhWFJsY21GMGIzSXVibVY0ZENncEtTNWtiMjVsT3lCcGJtUmxlQ3NyS1NCN1hHNGdJQ0FnSUNBZ0lHTnlaV0YwWlZCeWIzQmxjblI1S0hKbGMzVnNkQ3dnYVc1a1pYZ3NJRzFoY0hCcGJtY2dQeUJqWVd4c0tHbDBaWEpoZEc5eUxDQnRZWEJtYml3Z1czTjBaWEF1ZG1Gc2RXVXNJR2x1WkdWNFhTd2dkSEoxWlNrZ09pQnpkR1Z3TG5aaGJIVmxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2JHVnVaM1JvSUQwZ2RHOU1aVzVuZEdnb1R5NXNaVzVuZEdncE8xeHVJQ0FnSUNBZ1ptOXlJQ2h5WlhOMWJIUWdQU0J1WlhjZ1F5aHNaVzVuZEdncE95QnNaVzVuZEdnZ1BpQnBibVJsZURzZ2FXNWtaWGdyS3lrZ2UxeHVJQ0FnSUNBZ0lDQmpjbVZoZEdWUWNtOXdaWEowZVNoeVpYTjFiSFFzSUdsdVpHVjRMQ0J0WVhCd2FXNW5JRDhnYldGd1ptNG9UMXRwYm1SbGVGMHNJR2x1WkdWNEtTQTZJRTliYVc1a1pYaGRLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUNBZ2NtVnpkV3gwTG14bGJtZDBhQ0E5SUdsdVpHVjRPMXh1SUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc0Z0lIMWNibjBwTzF4dUlpd2lMeThnTVRrdU1TNHpMakVnVDJKcVpXTjBMbUZ6YzJsbmJpaDBZWEpuWlhRc0lITnZkWEpqWlNsY2JuWmhjaUFrWlhod2IzSjBJRDBnY21WeGRXbHlaU2duTGk5ZlpYaHdiM0owSnlrN1hHNWNiaVJsZUhCdmNuUW9KR1Y0Y0c5eWRDNVRJQ3NnSkdWNGNHOXlkQzVHTENBblQySnFaV04wSnl3Z2V5QmhjM05wWjI0NklISmxjWFZwY21Vb0p5NHZYMjlpYW1WamRDMWhjM05wWjI0bktTQjlLVHRjYmlJc0lpOHZJREU1TGpFdU1pNHhOQ0JQWW1wbFkzUXVhMlY1Y3loUEtWeHVkbUZ5SUhSdlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YjJKcVpXTjBKeWs3WEc1MllYSWdKR3RsZVhNZ1BTQnlaWEYxYVhKbEtDY3VMMTl2WW1wbFkzUXRhMlY1Y3ljcE8xeHVYRzV5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0YzJGd0p5a29KMnRsZVhNbkxDQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlCclpYbHpLR2wwS1NCN1hHNGdJQ0FnY21WMGRYSnVJQ1JyWlhsektIUnZUMkpxWldOMEtHbDBLU2s3WEc0Z0lIMDdYRzU5S1R0Y2JpSXNJaWQxYzJVZ2MzUnlhV04wSnp0Y2JuWmhjaUFrWVhRZ1BTQnlaWEYxYVhKbEtDY3VMMTl6ZEhKcGJtY3RZWFFuS1NoMGNuVmxLVHRjYmx4dUx5OGdNakV1TVM0ekxqSTNJRk4wY21sdVp5NXdjbTkwYjNSNWNHVmJRRUJwZEdWeVlYUnZjbDBvS1Z4dWNtVnhkV2x5WlNnbkxpOWZhWFJsY2kxa1pXWnBibVVuS1NoVGRISnBibWNzSUNkVGRISnBibWNuTENCbWRXNWpkR2x2YmlBb2FYUmxjbUYwWldRcElIdGNiaUFnZEdocGN5NWZkQ0E5SUZOMGNtbHVaeWhwZEdWeVlYUmxaQ2s3SUM4dklIUmhjbWRsZEZ4dUlDQjBhR2x6TGw5cElEMGdNRHNnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThnYm1WNGRDQnBibVJsZUZ4dUx5OGdNakV1TVM0MUxqSXVNU0FsVTNSeWFXNW5TWFJsY21GMGIzSlFjbTkwYjNSNWNHVWxMbTVsZUhRb0tWeHVmU3dnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0IyWVhJZ1R5QTlJSFJvYVhNdVgzUTdYRzRnSUhaaGNpQnBibVJsZUNBOUlIUm9hWE11WDJrN1hHNGdJSFpoY2lCd2IybHVkRHRjYmlBZ2FXWWdLR2x1WkdWNElENDlJRTh1YkdWdVozUm9LU0J5WlhSMWNtNGdleUIyWVd4MVpUb2dkVzVrWldacGJtVmtMQ0JrYjI1bE9pQjBjblZsSUgwN1hHNGdJSEJ2YVc1MElEMGdKR0YwS0U4c0lHbHVaR1Y0S1R0Y2JpQWdkR2hwY3k1ZmFTQXJQU0J3YjJsdWRDNXNaVzVuZEdnN1hHNGdJSEpsZEhWeWJpQjdJSFpoYkhWbE9pQndiMmx1ZEN3Z1pHOXVaVG9nWm1Gc2MyVWdmVHRjYm4wcE8xeHVJbDE5In0=
