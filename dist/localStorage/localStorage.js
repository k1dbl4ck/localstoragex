var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as localForage from "localforage";
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
var LocalStorageX = /** @class */ (function () {
    function LocalStorageX() {
        this.cache = {};
        this.store = false;
        this.loaded = false;
        this.defines = [
            { name: 'setItem', value: this.setItem },
            { name: 'getItem', value: this.getItem },
            { name: 'removeItem', value: this.removeItem },
            { name: 'key', value: this.key },
            { name: 'clear', value: this.clear },
            { name: 'override', value: this.override }
        ];
        this.config = {
            name: 'localStorageX',
            storeName: 'localStorageX',
            driverOrder: ['sqlite', 'indexeddb', 'websql', 'localstorage']
        };
    }
    LocalStorageX.prototype.init = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        return __awaiter(this, void 0, void 0, function () {
            var i, len, key, value, _a, _b, _i, key, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.loaded && !refresh)
                            return [2 /*return*/];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 15, , 16]);
                        if (!!refresh) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ready()];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        if (window.cordova) {
                            localForage.defineDriver(CordovaSQLiteDriver);
                        }
                        else {
                            this.config.driverOrder.splice(0, 1);
                        }
                        this.store = localForage.createInstance(this.config);
                        return [4 /*yield*/, this.store.ready()];
                    case 4:
                        _c.sent();
                        this.driver = this.store.driver();
                        i = 0, len = localStorage.length;
                        _c.label = 5;
                    case 5:
                        if (!(i < len)) return [3 /*break*/, 8];
                        key = localStorage.key(i);
                        value = localStorage.getItem(key);
                        if (!key) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.setItem(key, value)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 5];
                    case 8:
                        if (!refresh) return [3 /*break*/, 13];
                        _a = [];
                        for (_b in this.cache)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 9;
                    case 9:
                        if (!(_i < _a.length)) return [3 /*break*/, 12];
                        key = _a[_i];
                        if (!key) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.setItem(key, this.cache[key])];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11:
                        _i++;
                        return [3 /*break*/, 9];
                    case 12:
                        this.cache = {};
                        _c.label = 13;
                    case 13: return [4 /*yield*/, this.store.iterate(function (value, key, index) {
                            storage.cache[key] = value;
                        })];
                    case 14:
                        _c.sent();
                        this.defines.forEach(function (define) {
                            Storage.prototype[define.name] = define.value;
                        });
                        console.info("localstoragex ready");
                        this.loaded = true;
                        return [2 /*return*/];
                    case 15:
                        error_1 = _c.sent();
                        console.warn("Could not initialize localstoragex - falling back to native localStorage API");
                        Storage = Storage;
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Reloads (re-initializes) localstoragex
     */
    LocalStorageX.prototype.reload = function () {
        console.debug("localstoragex: reloading");
        storage.init(true);
    };
    /**
     * Waits for cordova to be ready if implemented
     * @returns {Promise<any>}
     */
    LocalStorageX.prototype.ready = function () {
        return new Promise(function (resolve, reject) {
            if (window.cordova)
                document.addEventListener("deviceready", resolve, false);
            else {
                window.readyHandlers = [];
                window.ready = function (handler) {
                    window.readyHandlers.push(handler);
                    window.handleState();
                };
                window.handleState = function () {
                    if (['interactive', 'complete'].indexOf(document.readyState) > -1) {
                        while (window.readyHandlers.length > 0) {
                            (window.readyHandlers.shift())();
                        }
                    }
                };
                document.onreadystatechange = window.handleState;
                window.ready(function () {
                    resolve();
                });
            }
        });
    };
    /**
     * Sets a value to localStorage by key
     *
     * @param {string} key
     * @param {any} value
     * @returns {Promise<any>}
     */
    LocalStorageX.prototype.setItem = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedKey, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        encodedKey = btoa(key);
                        if (JSON.stringify(storage.cache[encodedKey]) == JSON.stringify(value))
                            return [2 /*return*/];
                        storage.cache[encodedKey] = value;
                        return [4 /*yield*/, storage.store.setItem(encodedKey, value)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_2 = _a.sent();
                        console.warn("localstoragex.setItem() : " + error_2.stack);
                        storage.reload();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets value from localStorage by key
     *
     * @param {string} key
     * @returns {<any>}
     */
    LocalStorageX.prototype.getItem = function (key) {
        var encodedKey = btoa(key);
        return storage.cache[encodedKey] || null;
    };
    /**
     * Removes value in localStorage by key
     *
     * @param {string} key
     */
    LocalStorageX.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var encodedKey, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodedKey = btoa(key);
                        if (!(encodedKey && storage.cache[encodedKey])) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        delete storage.cache[encodedKey];
                        return [4 /*yield*/, storage.store.removeItem(encodedKey)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        error_3 = _a.sent();
                        console.warn("localstoragex.removeItem() : " + error_3.stack);
                        this.reload();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns a key name by index
     *
     * @param {number} index
     * @returns {string || null}
     */
    LocalStorageX.prototype.key = function (index) {
        var key = Object.keys(storage.cache)[index];
        return key ? atob(key) : null;
    };
    /**
     * Returns the total length of stored values
     *
     * @returns {number || null}
     */
    LocalStorageX.prototype.length = function () {
        return Object.keys(storage.cache).length || null;
    };
    /**
     * Clears all stored values
     */
    LocalStorageX.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        storage.cache = {};
                        return [4 /*yield*/, storage.store.clear()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        error_4 = _a.sent();
                        console.warn("localstoragex.clear() : " + error_4.stack);
                        this.reload();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Implicitly indicates if window.localstorage was overwritten (redefined by this class)
     */
    LocalStorageX.prototype.override = function () {
        return true;
    };
    return LocalStorageX;
}());
export { LocalStorageX };
export var storage = new LocalStorageX();
//# sourceMappingURL=localStorage.js.map