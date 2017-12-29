/**
 * Created by zc on 17-4-13.
 */

//自动判断是否加问号
let qsMark = function (value) {
  if (value === undefined) {
    return false;
  }
  if (value.substr(value.length - 1) === "?" || value.substr(value.length - 1) === "？") {
    return value;
  } else {
    return value + "？";
  }
}

//处理Html标签
let descOmit = function (value, wordnum) {
  wordnum = wordnum || 25;
  if (value === undefined) {
    return false;
  }
  let dd = value.replace(/<\/?.+?>/g, "");
  let desc = dd.replace(/ /g, "").trim();//desc为得到后的内容
  if (desc.length > wordnum) {
    return desc.substr(0, wordnum) + "...";
  } else {
    return desc + "...";
  }
}

//设置头像的默认图片
let defaultImg = function (value) {
  if (value === "") {
    return "/static/img/logo.png";
  } else {
    let img_url = value.replace('http://ymall-1251950860.cossh.myqcloud.com/', "");
    if (img_url==="null"||img_url === "") {
      return "/static/img/logo.png";
    }
    return value;
  }
}

let toTime = function (ns) {
  var d = new Date(ns * 1000);
  var dformat = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  return dformat;
}


//格式化时间(yyyy-MM-dd)
let formateData = function (value) {
  return value.substring(0, 10);

}


export {qsMark, descOmit, defaultImg, toTime, formateData}
