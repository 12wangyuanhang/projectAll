<script lang="tsx">
import { defineComponent, watch, getCurrentInstance, ref, h, resolveComponent } from 'vue';
import Test2 from './test2.vue'
import { Aim } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router';
export default defineComponent({
    props:{
        name:{
            type:[String, Number]
        }
    },
    components:{
        Test2,
        Aim
    },
    setup(props){
        const { proxy }:any = getCurrentInstance();
        console.log(props)
        watch(()=>props.name,(val)=>{
            console.log(val,props, 9000)
        })
        const fullscreenLoading = ref<boolean>(false)
        // const action = await 
        // console.log( 12344);
        const appenHmtl = async () =>{
            await proxy.$getHtml({
                component: Test2,
            })
        }
        const setCompnent = () => {
            return (<el-icon>{h(resolveComponent('AddLocation'))}</el-icon>)
        }
        return ()=>(
            <>
                <div style="display:flex;">
                    <router-link to="/test3/child1">Child1</router-link>
                    |
                    <router-link to="/test3/child2">Child2</router-link>
                </div>
                <div style="width:400px;height:400px;">
                    <RouterView></RouterView>
                </div>
                <img src="src/assets/logo.png"/>
                <el-button onClick={()=>appenHmtl()}>咋肥四</el-button>

                <el-button v-loading_fullscreen_lock={fullscreenLoading.value} onClick={()=>fullscreenLoading.value  = !fullscreenLoading.value}>loading</el-button>
                <div>
                    {setCompnent()}
                </div>
            </>
        )
    }
})

</script>
