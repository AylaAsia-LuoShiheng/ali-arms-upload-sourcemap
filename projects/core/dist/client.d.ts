import * as $ARMS20190808 from "@alicloud/arms20190808";
export declare type ClientConfigType = {
    accessKeyId: string;
    accessKeySecret: string;
    regionId?: string;
    [key: string]: any;
};
export declare type UploadFileType = {
    fileName: string;
    file: string;
};
export declare type UploadDefaultConfigType = {
    pid: string;
    [key: string]: any;
};
export default class Client {
    private client;
    private uploadDefaultConfig;
    constructor(clientConfig: ClientConfigType, uploadDefaultConfig: UploadDefaultConfigType);
    /**
     * 使用AK&SK初始化账号Client
     * @param accessKeyId
     * @param accessKeySecret
     * @param regionId
     * @return
     * @throws Exception
     */
    createClient(clientConfig: ClientConfigType): void;
    main(uploadFile: UploadFileType): Promise<$ARMS20190808.UploadResponse>;
}
