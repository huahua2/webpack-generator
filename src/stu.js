/**
 * Created by HuaHua on 18/5/28.
 */
class StdInfo {
    constructor(){
        this.name = "job";
        this.age = 30;
    }
    //定义在类中的方法不需要添加function
    getNames(){
        alert("name："+this.name);
    }
}
export default StdInfo;