import { ClientConfigType, UploadDefaultConfigType } from "./client";
export declare type ConfigType = {
    clientConfig: ClientConfigType;
    uploadDefaultConfig: UploadDefaultConfigType;
    maxRetryTimes?: number;
    disabled?: boolean;
};
export default function ({ clientConfig, uploadDefaultConfig, maxRetryTimes, disabled }: ConfigType, outDirFinal: string): void;
