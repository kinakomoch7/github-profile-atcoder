"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("../constants/constants");
const writeFile = (fileName, content) => {
    (0, fs_1.mkdirSync)(constants_1.OUTPUT_FOLDER, { recursive: true });
    (0, fs_1.writeFileSync)(`${constants_1.OUTPUT_FOLDER}/${fileName}`, content);
};
exports.default = writeFile;
