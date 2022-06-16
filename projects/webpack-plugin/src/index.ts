import handleUpload, { ConfigType } from "@ali-arms-upload-sourcemap/core";

class AliArmsUploadSourcemapWebpackPlugin {
  private config: ConfigType;
  constructor(config: ConfigType) {
    // 获取配置项，初始化插件
    this.config = config;
  }

  apply(compiler) {
    const outDirFinal = compiler.options.output.path;
    compiler.hooks.done.tap("AliArmsUploadSourcemapWebpackPlugin", () => {
      handleUpload(this.config, outDirFinal);
    });
  }
}

module.exports = AliArmsUploadSourcemapWebpackPlugin;
