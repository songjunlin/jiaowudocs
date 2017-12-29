/**
 * Created by llr on 2017/5/15.
 */
//文件检查,file:该文件size:文件大小(MB)
 function checkFiles(file,size) {
  var fileName,fileSize;
  size=size || 5;
  if (file == null || file.size == 0) {
    console.error("文件不能为空");
    return false;
  }
  fileSize=Math.ceil(file.size/1024/1024);
  fileName=file.name;
  if (fileSize > size) {
    console.error("文件不能大于"+size);
    return false;
  }
  //去重暂时没有做
  var sExp = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(); //文件扩展名
  if (sExp != ".jpg" && sExp != ".gif" && sExp != ".png" && sExp != ".tif" && sExp != ".tiff") {
    console.error("图片格式不对");
    return false;
  }
  return true;
}
export {checkFiles}
