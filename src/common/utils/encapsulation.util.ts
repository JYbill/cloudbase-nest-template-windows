/**
 * xiaoQinVar自己封装的常用工具类
 */
export class xiaoQinVarUtils {



  /**
   * 获取UUID
   * @returns 
   */
  static uuid() {
    return 'xxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



  /**
   * 日期格式化
   * @param fmt 
   * @param date 
   * @returns 
   */
  static dateFormat(fmt: string, date: Date) {
    date instanceof Date ? '' : date = new Date(date);

    let ret;
    const opt: any = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1)
          ?
          (opt[k])
          :
          (opt[k].padStart(ret[1].length, "0")));
      };
    };
    return fmt;
  }



  /**
   * 使用Ecmascript默认的时间处理格式化, 最后得到的数据是: 2022/2/23 15:38:46, 需要进一步可以转换自己
   * @param date 日期、时间戳
   * @param option 没有使用默认的, 有用自己的
   * @returns 
   */
  static dateFormatByEcma(date: Date | number, option?) {
    return option ?
      new Intl.DateTimeFormat('zh-CN', option).format(date)
      :
      new Intl.DateTimeFormat('zh-CN', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      }).format(date);
  }



  /**
   * 文件名获取随机文件名  abc.jpg => abc_89dac30047f7.jpg
   * @param filename 
   * @returns 
   */
  static randomFileName(filename: String): string {
    const separator: string = '.';
    const fileNameArr: Array<string> = filename.split(separator);
    return fileNameArr[0] + '_' + this.uuid() + '.' + fileNameArr[1];
  }


  static readonly httpRegExp = /^(http|https)\:\/\/\D+/;
}
