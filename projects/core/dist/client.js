"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const arms20190808_1 = __importStar(require("@alicloud/arms20190808")), $ARMS20190808 = arms20190808_1;
const $OpenApi = __importStar(require("@alicloud/openapi-client"));
const $Util = __importStar(require("@alicloud/tea-util"));
class Client {
    constructor(clientConfig, uploadDefaultConfig) {
        this.createClient(clientConfig);
        this.uploadDefaultConfig = uploadDefaultConfig;
    }
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @param regionId
     * @return
     * @throws Exception
     */
    createClient(clientConfig) {
        let config = new $OpenApi.Config(Object.assign({ readTimeout: 10000 }, clientConfig));
        // 访问的域名
        config.endpoint = `arms.${clientConfig.regionId || "cn-hangzhou"}.aliyuncs.com`;
        this.client = new arms20190808_1.default(config);
    }
    main(uploadFile) {
        let uploadRequest = new $ARMS20190808.UploadRequest(Object.assign(Object.assign({ regionId: "cn-hangzhou", version: "1.0.0" }, this.uploadDefaultConfig), uploadFile));
        let runtime = new $Util.RuntimeOptions({});
        return this.client.uploadWithOptions(uploadRequest, runtime);
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map