import ARMS20190808, * as $ARMS20190808 from "@alicloud/arms20190808";
import * as $OpenApi from "@alicloud/openapi-client";
import * as $Util from "@alicloud/tea-util";

// https://next.api.aliyun.com/api/ARMS/2019-08-08/Upload?lang=TYPESCRIPT&params={}

// $OpenApi.Config， 但是可选
export type ClientConfigType = {
  accessKeyId: string;
  accessKeySecret: string;
  regionId?: string;
  [key: string]: any;
};
export type UploadFileType = {
  fileName: string;
  file: string;
};

// $ARMS20190808.UploadRequest
export type UploadDefaultConfigType = {
  pid: string;
  [key: string]: any;
};
export default class Client {
  private client: ARMS20190808;
  private uploadDefaultConfig: UploadDefaultConfigType;

  constructor(clientConfig: ClientConfigType, uploadDefaultConfig: UploadDefaultConfigType) {
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
  createClient(clientConfig: ClientConfigType): void {
    let config = new $OpenApi.Config({
      readTimeout: 10000,
      ...clientConfig
    });
    // 访问的域名
    config.endpoint = `arms.${clientConfig.regionId || "cn-hangzhou"}.aliyuncs.com`;
    this.client = new ARMS20190808(config);
  }

  main(uploadFile: UploadFileType): Promise<$ARMS20190808.UploadResponse> {
    let uploadRequest = new $ARMS20190808.UploadRequest({
      regionId: "cn-hangzhou",
      version: "1.0.0",
      ...this.uploadDefaultConfig,
      ...uploadFile
    });
    let runtime = new $Util.RuntimeOptions({});
    return this.client.uploadWithOptions(uploadRequest, runtime);
  }
}
