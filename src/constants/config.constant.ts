/**
 * yaml配置文件的key，便于后期自定义修改，后期维护/修改 > 前期开发
 */
export class ConfigKeyConstant {
  // application.yml 配置key常量
  public static readonly app = "app";
  public static readonly project = "project";
  public static readonly port = "port";

  public static readonly cloudBase = "cloudBase";

  // 云数据库collection
  public static readonly url = "url";
}