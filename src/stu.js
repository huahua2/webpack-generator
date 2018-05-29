/**
 * Created by HuaHua on 18/5/28.
 */
class StdInfo {
    constructor(){
        this.name = "job";
        this.age = 30;
    }
    //定义在类中的方法不需要添加function
    getNames() {
        let self=this;
        $("#btn").click(function () {
            alert("name：" + self.name);
        })
}
}
export default StdInfo;