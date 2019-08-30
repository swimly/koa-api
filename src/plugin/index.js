export default class Plugin {
  static arrayToTree(source, id, parentId, children) {
    let cloneData = JSON.parse(JSON.stringify(source))
    return cloneData.filter(father => {
      let branchArr = cloneData.filter(child => father[id] == child[parentId]);
      branchArr.length > 0 ? father[children] = branchArr : ''
      return father[parentId] == undefined || ''      // 如果第一层不是parentId=0，请自行修改
    })
  }
  static renderFileSize(value) {
    if (null == value || value == '') {
      return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
  }
}