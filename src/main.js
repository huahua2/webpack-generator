/**
 * Created by HuaHua on 18/5/28.
 */
import bar from './test';
import stu from './stu';
// require("./css/index.css");
import './css/index.css';
import './css/test.css';

$(function () {
    alert(bar.data);
    var s=new stu();
    s.getNames();
})