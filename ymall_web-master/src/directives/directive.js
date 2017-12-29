/**
 * Created by llr on 2017/5/20.
 */
let format={
  bind: function(el, binding, vnode) {
    if (binding.value.length<=binding.arg) {
      el.innerHTML="“"+binding.value+"”";
    }else{
      el.innerHTML="“"+binding.value.substr(0,binding.arg)+"...”";
    }
    el.style.cssText = 'word-wrap: break-word;' +
      'display: block;' +
      'font-family: monospace;' +
      'background-color: #f0f0f0;' +
      'border-radius: 3px;' +
      'white-space: pre-wrap;' +
      'margin-bottom: 5px;' +
      'margin-top: 5px;' +
      'padding: 5px 10px';
  }
}
export {format}
