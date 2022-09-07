<script lang="tsx">
import { defineComponent, ref } from 'vue';
import {
  ArrowLeft,
  ArrowRight,
  Delete,
  Edit,
  Share,
} from '@element-plus/icons-vue'
export default defineComponent({
    components:{
        ArrowLeft
    },
    props: {

    },
    setup(){
        let pageSizes = ref([10, 20, 30, 40, 50, 100])
        let total = ref(0)
        let goValue = ref('')
        const changeInput = () => {
            console.log(123)
        }
        
        return () => (
            <>
                <div class="container">
                    <div class="total">Total {total.value}</div>
                    <el-select class="">
                        {
                            pageSizes.value.map((item)=>{
                                return <el-option label={item+'/page'} value={item}></el-option>
                            })
                        }
                    </el-select>
                    <div class="pagerBox">
                        <el-button style text type="" icon={ArrowLeft}></el-button>
                        <ul class>
                            <el-button style text type="primary">1</el-button>
                            <el-button style text type="">2</el-button>
                            <el-button style text type="">3</el-button>
                            <el-button style text type="">4</el-button>
                        </ul>
                        <el-button text type="" icon={ArrowRight}></el-button>
                    </div>
                    <div class="go">
                        Go to <el-input onKeyDown={changeInput} onChange={changeInput} class="goPageValue" v-model={goValue.value}></el-input>
                    </div>
                </div>
            </>
        )
    }
})
</script>

<style lang="scss">
    .container {
        display: flex;
        align-items: center;
        .pagerBox {
            display: flex;
        }
        .total {
            padding-right: 10px;
        }
        .go {
            align-items: center;
            padding-left: 10px;
            display: flex;
            .goPageValue {
                padding-left: 10px;
                width: 60px;
            }
        }
    }
</style>