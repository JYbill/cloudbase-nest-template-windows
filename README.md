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





# 遗留问题（已解决）

使用webpack构建后打出来的main.js文件，可以直接用node.js启动`npm run prod`，但是无法通过serverless的app.js拿到编译后的main.js里导出的模块

![image-20220217231247507](https://gitee.com/JYbill/typroa_pic/raw/master/%E5%8D%9A%E5%AE%A2/image-20220217231247507.png)

> 目前的解决办法就是：使用`npm run build` / `npm run deploy`都会使用`tsc`编译成传统的多文件包。如果我是用webpack打包的上传后serverless就会构建失败。
> 目前问题是webpack打包后无法导出模块。



+ 遗留问题已解决：通过`webpack.output.library.type`设置为`commonjs`即可导出

```js
module.exports = {
  // …
  output: {
    library: {
      // name: 'MyLibrary', // 不设置即默认名称
      type: 'commjs2', // 导出类型Commonjs2
    },
  },
};
```

上传成功，运行成功，舒舒服服。😀





# npm命令

+ `npm run dev`：使用webpack构建、打包方式，`npm run dev:tsc`传统的Tsc编译打包
+ `npm run deploy`部署到云函数
+ `npm run prod`如果想部署到自己的服务端可以用该命令，等价于`node dist/main.js`

> 欢迎大家使用该套模板，我也会使用该模板进行云开发。好用的话，可以给个🌟噢，3Q了





# 一键部署/腾讯云部署失败问题

+ 可能会构建失败，因为部署会根据`cloudbaserc.json`文件内的`envId`、`region`校验是否正确，这个看运气，我有成功也有失败，成功按照上面的走。

+ 解决：

  1. 拉取仓库内容到本地
  2. 修改`cloudbaserc.json`文件

  ```json
  "envId": "你的环境",
  "region": "ap-你的地域"
  ```

  3. `npm run deploy`





# 构建此模板遇到的Bug

1. `ts-loader`问题

```js
(node:69430) [DEP_WEBPACK_MODULE_ERRORS] DeprecationWarning: Module.errors was removed (use getErrors instead)
```

解决地址：

+ [https://github.com/TypeStrong/ts-loader/issues/1194](https://github.com/TypeStrong/ts-loader/issues/1194)
+ [https://github.com/TypeStrong/ts-loader/pull/1195](https://github.com/TypeStrong/ts-loader/pull/1195)

> 总结点：`ts-loader`版本问题，`package.json`设置版本为8.0.5即可

2. webpack打包后导出问题

解决地址：[https://webpack.docschina.org/configuration/output/#outputlibrarytype](https://webpack.docschina.org/configuration/output/#outputlibrarytype)

3. node模块规则：使用的是`commonjs2`，不是`commonjs`，不是`commonjs`，不是`commonjs`





# npm run build事项

在没有集成`webpack`时，`npm run build也就是不用webpack打包`(tsc打包打出多个文件)运行完就自动退出了。
而`npm run build:webpack打包`打完之后会卡住，所以我在`cloudbaserc.json`文件内修改了命令行

```js
"buildCommand": "npm install --prefer-offline --no-audit --progress=false & npm run build",
// 修改成如下, 不然部署会卡死, 报错
"buildCommand": "npm install --prefer-offline --no-audit --progress=false"
```

所以，如果你希望用`tsc打包`

```bash
npm run build
npm run deploy
```

用webpack打

```bash
npm run build:webpack
# ctrl + C 退出
npm run deploy

# 或者直接npm run dev写完代码后
npm run deploy
```

