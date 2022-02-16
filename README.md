<a href="https://github.com/TencentCloudBase/cloudbase-templates"><img src="https://main.qcloudimg.com/raw/79fdd61df8b2154ccaa479301fcc57a6.png"></a>

# Nest 应用示例

这个目录是基于云开发的一个 [Nest](https://nestjs.com/) 应用示例，包含 Nest + 云函数，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境



# 此模板目的

1. 原模板在构建时因为一些版本的问题导致构建失败，修复了版本问题

2. 在window开发中npm传参的`NODE_ENV=development`是不一样

   + linux：`NODE_ENV=development`
   + winodws：`SET NODE_ENV=development`

   所以我这里用了`cross-env`库做了统一处理

3. 修改了`package.json`里的启动脚本信息，追加`cross-env`操作，也就是说可以上传云函数，也可以用`npm run start:prod`去服务器里跑

```json
"script": {
    // ...
    "start": "cross-env NODE_ENV=development nest start",
    "dev": "cross-env NODE_ENV=development nest start --watch",
    "deploy": "tcb framework deploy",
    "start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
    "start:prod": "cross-env NODE_ENV=development node dist/main.js"
    // ...
}
```

4. 因为测试`tcb framework deploy`发现`@cloudbase/framework-plugin-node`会把`package.json`修改和压缩，所以我这里添加了`package copy.json`

   + 目的：如果团队有人不小心`tcb framework deploy`后拉下来的`package.json`是无法用`npm run ...`的， 可以考虑将`copy`文件的内容拷贝到`package.json`

   > 本人刚玩cloudbase没几天，可能插件方面没了解全，但是`tcb framework deploy`既然是发布给云函数，那么去除`package.json`的没有用(`dev`、`script`...)的信息也是情理之中的



# 原模板

+ 原始模板地址：[https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter)



# 原模板Bug

1. 上面提到的启动脚本信息（window不兼容问题）
2. `package.json`版本锁定的问题



# 使用模板教程

![QQ截图20220216125339](https://gitee.com/JYbill/typroa_pic/raw/master//%E5%8D%9A%E5%AE%A2/QQ%E6%88%AA%E5%9B%BE20220216125339.png)

> 后续的操作我就不多说了，不懂的直接看下面的文章

+ 待创建完成，然后访问服务`http://cloudbase给你的默认域名/nest-starter/demo`，

```json
{
    "code": 200,
    "msg": "msg get 😀"
}
```



# 使用CloudBase + Nest教程

我的博客文章地址：

