"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("./utils");
const client_1 = __importDefault(require("./client"));
// 兜底， 最大重试次数
let maxRetryTimesVal = 6;
function default_1({ clientConfig, uploadDefaultConfig, maxRetryTimes, disabled }, outDirFinal) {
    const { accessKeyId, accessKeySecret } = clientConfig;
    const { pid } = uploadDefaultConfig;
    if (!accessKeyId || !accessKeySecret || !pid) {
        console.log("请输入必填项");
        return;
    }
    if (!fs_1.default.existsSync(outDirFinal)) {
        console.log("path is not exists");
        return;
    }
    if (disabled) {
        return;
    }
    if (typeof maxRetryTimes === "number") {
        maxRetryTimesVal = maxRetryTimes;
    }
    console.log("start time:", new Date().toISOString());
    const allMapFiles = (0, utils_1.readDir)(outDirFinal).filter(file => file.endsWith(".map"));
    const uploadClient = new client_1.default(clientConfig, uploadDefaultConfig);
    // allMapFiles.forEach(file => {
    //   const fileData = readFile(outDirFinal + "/" + file);
    //   uploadClient.main({ fileName: file, file: fileData });
    //   console.log(new Date().toISOString());
    // });
    // return;
    // 上面可能会触发阿里云风控，端口调用限制，
    // 处理方案是一个一个上传， 触发风控后就让未上传的列表等等， 5秒后继续
    let laterList = [];
    let retryInfo = {};
    const handleUpload = (fileList, index) => {
        if (index > fileList.length - 1)
            return;
        const filePath = fileList[index];
        const fileData = (0, utils_1.readFile)(filePath);
        const pathArr = filePath.split("/");
        const fileName = pathArr[pathArr.length - 1];
        uploadClient
            .main({ fileName, file: fileData })
            .then(() => {
            console.log(`'${fileName}' upload success`);
            if (index < fileList.length - 1) {
                handleUpload(fileList, index + 1);
            }
            else {
                console.log("end time:", new Date().toISOString());
            }
        })
            .catch(err => {
            console.log(err);
            laterList = fileList.slice(index);
            retryInfo[fileName] = retryInfo[fileName] ? retryInfo[fileName] + 1 : 1;
            // 同一个文件阻塞最大次数， 跳过
            if (retryInfo[fileName] >= maxRetryTimesVal) {
                console.log("failed upload: " + fileName);
                index < fileList.length - 1 && handleUpload(laterList, 1);
                return;
            }
            console.log("wait 5 sec...");
            setTimeout(() => {
                handleUpload(laterList, 0);
            }, 1000 * 5);
        });
    };
    handleUpload(allMapFiles, 0);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map