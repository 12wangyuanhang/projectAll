class Allcls {
    name:string = '1234'
    constructor(){
        console.log(this.name)
    }
    // 校验类型
    checkType(type:any) {
        return Object.prototype.toString.call(type).replace(/\[|]/g, '').split(' ')[1].toLowerCase();
    }
    abc = '不当人'
    getData(){
        return [1,2,3,4]
    }

}

export default Allcls