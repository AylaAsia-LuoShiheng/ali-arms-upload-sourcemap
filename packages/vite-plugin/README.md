**基于@ali-arms-upload-sourcemap/core 的 vite 插件套壳**

通过 vite 的自带钩子 configResolved 获取到打包后的路径,

在 closeBundle 钩子执行 core 抛出的方法
