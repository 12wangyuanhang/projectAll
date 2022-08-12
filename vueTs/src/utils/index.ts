// import Allcls from "./pkgManage";
const filePath = import.meta.globEager('./pkgManage/**.ts');
const filePath1 = import.meta.glob('./pkgManage/**.ts');
import type {App} from 'vue';
function retAll(dataName:string):any {
    // console.log(filePath1, 'filePath1')
    // for(let n in filePath1){
    //     console.log(filePath1[n]().then((res)=>{
    //         console.log(res, 'res')
    //     }))
    // }
    const name:any = dataName || localStorage.getItem('cityName') || 'index'
    let resClass: any;
    for(let pathName in filePath){
         if(pathName.includes(name))resClass=filePath[pathName].default;
    }
    return new resClass();
}

export default (app:App) =>{
    app.config.globalProperties.$resultCityData = (dataName:string) => retAll(dataName)
}