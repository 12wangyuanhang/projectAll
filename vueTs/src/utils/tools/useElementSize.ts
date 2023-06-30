import type { PropType } from 'vue';
// type ElD = PropType<HTMLDivElement>;
// type Partial<T> = {
//     [P in keyof T]?: T[P]
// }
const useElementSize = (cEl:any) => {
    let el:HTMLElement = cEl;
    if(typeof cEl == 'string'){
        el = document.getElementById(cEl) as HTMLElement;
    }
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    let divW:any = document.createElement('div');
    let divH:any = document.createElement('div');
    el.style.position = 'relative';
    divW.style = `width:${width}px;height:1px;position: absolute;bottom: 0;cursor:n-resize;`;
    divH.style = `width:1px ;height:${height}px;position: absolute;right: 0;cursor:e-resize;`;
    el.appendChild(divW)
    el.appendChild(divH)
    divW.onmousedown = function(elO:MouseEvent){
        let resO = elO.clientY;
        const hO = el.offsetHeight;
        document.onmousemove = function (elD:MouseEvent) {
            let resD = elD.clientY;
            let r = resD - resO;
            let h = hO + r;
            el.style.height = h + 'px';
            divH.style.height = h + 'px';
        }
        document.addEventListener('mouseup', ()=>{
            document.onmousemove = null;
        })
    }
    divH.onmousedown = function(elO:MouseEvent){
        const wO = el.offsetWidth;
        let resO = elO.clientX;
        document.onmousemove = function (elD:MouseEvent) {
            let resD = elD.clientX;
            let r = resD - resO;
            let w = wO + r;
            el.style.width = w + 'px';
            divW.style.width = w + 'px';
        }
        document.addEventListener('mouseup', ()=>{
            document.onmousemove = null;
        })
    }
}

export default useElementSize