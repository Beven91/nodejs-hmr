"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractUpdater_1 = __importDefault(require("./AbstractUpdater"));
var ArrayUpdater = (function (_super) {
    __extends(ArrayUpdater, _super);
    function ArrayUpdater() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayUpdater.prototype.internalUpdate = function (ctor, newCtor) {
        var _this = this;
        var creatable = typeof newCtor === 'function';
        var elements = this.data;
        elements.forEach(function (element, index) {
            if (!creatable || !_this.needHotFn(element, ctor)) {
                return;
            }
            else if (!creatable) {
                console.warn("Hot fail: " + newCtor.name + " : No-parameter construction required");
            }
            elements[index] = _this.createInstance(newCtor, element);
        });
    };
    ArrayUpdater.prototype.cleanUpdate = function (oldCtor) {
        var _this = this;
        var elements = this.data;
        var items = elements.filter(function (m) { return !(_this.needHotFn(m, oldCtor)); });
        if (items.length !== elements.length) {
            elements.length = 0;
            elements.push.apply(elements, items);
        }
        ;
    };
    return ArrayUpdater;
}(AbstractUpdater_1.default));
exports.default = ArrayUpdater;