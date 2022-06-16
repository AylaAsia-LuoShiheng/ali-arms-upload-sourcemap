"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@ali-arms-upload-sourcemap/core"));
class AliArmsUploadSourcemapWebpackPlugin {
    constructor(config) {
        // 获取配置项，初始化插件
        this.config = config;
    }
    apply(compiler) {
        const outDirFinal = compiler.options.output.path;
        compiler.hooks.done.tap("AliArmsUploadSourcemapWebpackPlugin", () => {
            (0, core_1.default)(this.config, outDirFinal);
        });
    }
}
module.exports = AliArmsUploadSourcemapWebpackPlugin;
//# sourceMappingURL=index.js.map