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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// hair, expression, midsection, background, accessories
const merge_images_1 = __importDefault(require("merge-images"));
const node_canvas_1 = require("node-canvas");
const fs = __importStar(require("fs"));
const rng_1 = require("./rng");
const weights = {
    Torso: { T1: 0.4, T2: 0.4, T3: 0.2 },
    Face: { F1: 0.2, F2: 0.2, F3: 0.6 },
    Hat: { H1: 0.1, H2: 0.1, H3: 0.8 },
};
function weightedRand(spec) {
    const rand = rng_1.csprng(0, 100) * 0.01;
    let sum = 0;
    for (let i in spec) {
        sum += spec[i];
        if (rand <= sum)
            return i;
    }
    return '';
}
function generateSet(total, body) {
    const arr = [];
    for (let i = 0; i < total;) {
        const temp = Object.keys(body).reduce((acc, curr) => [...acc, weightedRand(body[curr])], []);
        if (!arr.some((item) => item.every((v, i) => v === temp[i]))) {
            arr.push(temp);
            i++;
        }
    }
    return arr;
}
function createImage(layers, path) {
    return merge_images_1.default(layers, { Canvas: node_canvas_1.Canvas, Image: node_canvas_1.Image }).then((b64) => fs.writeFile(path, b64.replace(/^data:image\/png;base64,/, ''), 'base64', () => false));
}
function generateImages(arr) {
    let promises = [];
    const directories = Object.keys(weights);
    const dir = __dirname;
    for (let i = 0; i < arr.length; i++) {
        const paths = directories.reduce((acc, curr, j) => [...acc, `${dir}/${curr}/${arr[i][j]}.png`], []);
        console.log(paths);
        promises = [...promises, createImage(paths, `${dir}/out/img${i}.png`)];
    }
    Promise.all(promises);
}
generateImages(generateSet(27, weights));
