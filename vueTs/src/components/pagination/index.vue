<script lang="tsx">
import { defineComponent, ref, computed, watch } from 'vue';
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
    emits:['size-change', 'current-change'],
    props: {
        pageSize:{
            type: [Number, Array],
            default: () => [10, 20, 30, 40, 50, 100],
        },
        layout: {
            type: String,
            default: () => "total, sizes, prev, pager, next, jumper",
        },
        total: {
            type: Number,
            default: () => 0,
        }
    },
    setup(props, { emit }){
        const { pageSize, layout, total } = props;
        console.log(layout,total)
        const pageSizes = ref(pageSize); // 下拉选项
        const pageVal = ref(10); // 下拉v-model
        const _total = ref(total); // 总数
        const goValue = ref(1); // input v-model
        const nums = ref(1); // button的高亮项
        const _layout = ref(layout)
        
        // 初始化赋值一次
        const pages = ref(Math.round(_total.value/pageVal.value));
        // 计算总数/下拉选中的个数向上取整
        const comP = computed(()=>{
            return Number(Math.round(_total.value/pageVal.value))
        })
        // 监听一下watch值得变化进行赋值
        watch(()=>comP.value, (val:number) => {
            pages.value = val;
        },{
            deep: true
        })
        watch(()=>nums.value, (val:number) => {
            goValue.value = val;
            emit('current-change', val);
        },{
            deep:true
        })
        // 是否显示每一个模块接受一个string
        const isShowModule = (modString:string) => {
            return _layout.value.split(', ').includes(modString);
        }
        // 切换prev
        const changeInput = (value:number) => {
            nums.value = value;
        }
        // prev切换上一个
        const prePage = () => {
            if(nums.value <= 1)return;
            nums.value -= 1
        }
        // prev切换下一个
        const nextPage = () => {
            if(nums.value >= pages.value)return;
            nums.value += 1
            
        }
        const sizesChange = (val:number) => {
            emit('size-change', val);
        }
        return () => (
            <>
                <div class="container">
                    {isShowModule('total')?<div class="total">Total {_total.value}</div>:null}
                    {
                        isShowModule('sizes')?Array.isArray(pageSizes.value)?(<el-select onChange={sizesChange} v-model={pageVal.value} class="">
                            {
                                pageSizes.value.map((item)=>{
                                    return <el-option label={item+'/page'} value={item}></el-option>
                                })
                            }
                        </el-select>):null:null
                    }
                    <div class="pagerBox">
                        {isShowModule('prev')?<el-button disabled={nums.value<=1}  onClick={prePage} style text type="" icon={ArrowLeft}></el-button>:null}
                        {
                            isShowModule('pager')?(<ul class>
                                {
                                    new Array(pages.value).fill(1).map((item, index)=>{
                                        return <el-button onClick={()=>nums.value = index+1} style text type={nums.value == index+1?'primary':''}>{index+1}</el-button>
                                    })
                                }
                            </ul>):null
                        }
                        {isShowModule('next')?<el-button disabled={nums.value>=pages.value}  onClick={nextPage} text type="" icon={ArrowRight}></el-button>:null}
                    </div>
                    <div class="go">
                        Go to {isShowModule('jumper')?<el-input-number controls={false} min={1} onKeyDown={changeInput} onChange={changeInput} class="goPageValue" v-model={goValue.value}></el-input-number>:null}
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