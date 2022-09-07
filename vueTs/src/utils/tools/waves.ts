import { nextTick } from 'vue';
type T1 = ReturnType<any>
export default {
    // v-waves: 波纹效果
    mounted(el:any, binding:any, vnode:any, oldVnode:any){
        // 获取拖拽内容头部
        nextTick(()=>{
            el.addEventListener('click', (e:T1) => {
                const customOpts = Object.assign({}, binding.value)
                const opts = Object.assign({
                  ele: el, // 波纹作用元素
                  type: 'hit', // hit点击位置扩散center中心点扩展
                  color: `rgba(${Math.round(Math.random()*225)}, ${Math.round(Math.random()*225)}, ${Math.round(Math.random()*225)}, 0.3)` // 波纹颜色
                }, customOpts)
                const target = opts.ele
                if (target) {
                //   target.style.position = 'fiexd'
                  target.style.overflow = 'hidden'
                  const rect = target.getBoundingClientRect();
                  let ripple = target.querySelector('.waves-ripple')
                  if (!ripple) {
                    ripple = document.createElement('span')
                    ripple.className = 'waves-ripple'
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
                    target.appendChild(ripple)
                  } else {
                    ripple.className = 'waves-ripple'
                  }
                  console.log(opts.type,1234)
                  switch (opts.type) {
                    case 'center':
                      ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
                      ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
                      break
                    default:
                      ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
                      ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
                  }
                  ripple.style.backgroundColor = opts.color
                  ripple.className = 'waves-ripple z-active'
                  return false
                }
              }, false)
        })
            
    }
}