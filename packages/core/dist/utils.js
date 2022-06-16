"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.readDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// 读文件夹
function readDir(dirPath) {
    const fileList = [];
    const handleRead = (dirPathVal) => {
        fs_1.default.readdirSync(dirPathVal, { withFileTypes: true }).forEach(item => {
            const filePath = path_1.default.join(dirPathVal, item.name);
            if (item.isFile()) {
                fileList.push(filePath);
            }
            else if (item.isDirectory()) {
                handleRead(filePath);
            }
        });
    };
    try {
        handleRead(dirPath);
        return fileList;
    }
    catch (err) {
        console.log(err);
    }
}
exports.readDir = readDir;
// 读文件
function readFile(filePath) {
    try {
        const buff = fs_1.default.readFileSync(filePath);
        return buff.toString();
    }
    catch (err) {
        console.log(err);
    }
}
exports.readFile = readFile;
//# sourceMappingURL=utils.js.map