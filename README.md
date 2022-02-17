<a href="https://github.com/TencentCloudBase/cloudbase-templates"><img src="https://main.qcloudimg.com/raw/79fdd61df8b2154ccaa479301fcc57a6.png"></a>

# Nest-webpack构建版

这个目录是基于云开发的一个 [Nest](https://nestjs.com/) 应用示例，包含 Nest + 云函数，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境



# webpack构建的HRM热模块更新

nestjs官方文档：[https://docs.nestjs.com/recipes/hot-reload](https://docs.nestjs.com/recipes/hot-reload)

+ 大概读秒测试：

  + Tsc编译：17s，Tsc reload(修改一行)：3-4s
  + webpack编译：15-16s，webpack reload：1-2s

  > 我的电脑配置：lntelR CoreTM i5-10210U CPU @1.60GHz / 16G内存 3200MHZ / 固态硬盘
  > 我觉得webpack一套丝滑小连招后，俩字：舒服😀



# 一键部署

```js
https://console.cloud.tencent.com/tcb/env/index?&action=CreateAndDeployCloudBaseProject&appUrl=https://gitee.com/JYbill/cloudbase-nest-template-windows&branch=webpack-version&appName=nest-webpack
```



# 遗留问题

使用webpack构建后打出来的main.js文件，可以直接用node.js启动`npm run prod`，但是无法通过serverless的app.js拿到编译后的main.js里导出的模块

![image-20220217231247507](https://gitee.com/JYbill/typroa_pic/raw/master/%E5%8D%9A%E5%AE%A2/image-20220217231247507.png)

> 目前的解决办法就是：使用`npm run build` / `npm run deploy`都会使用`tsc`编译成传统的多文件包。如果我是用webpack打包的上传后serverless就会构建失败。
> 目前问题是webpack打包后无法导出模块。
