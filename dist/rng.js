"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.csprng = void 0;
const crypto = __importStar(require("crypto"));
function csprng(min, max) {
    // Some credit to https://github.com/joepie91/node-random-number-csprng
    /* Careful! This doesn't work with large ranges. Specifically, don't use
     * this with ranges larger than 2^32 - 1 */
    const range = max - min;
    if (range >= Math.pow(2, 32))
        console.log('Warning! Range is too large.');
    var tmp = range;
    var bitsNeeded = 0;
    var bytesNeeded = 0;
    var mask = 1;
    while (tmp > 0) {
        if (bitsNeeded % 8 === 0)
            bytesNeeded += 1;
        bitsNeeded += 1;
        mask = (mask << 1) | 1;
        tmp = tmp >>> 1;
    }
    const randomBytes = crypto.randomBytes(bytesNeeded);
    var randomValue = 0;
    for (var i = 0; i < bytesNeeded; i++) {
        randomValue |= randomBytes[i] << (8 * i);
    }
    randomValue = randomValue & mask;
    if (randomValue <= range) {
        return min + randomValue;
    }
    else {
        return csprng(min, max);
    }
}
exports.csprng = csprng;
