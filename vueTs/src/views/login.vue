<script lang="tsx">
import { defineComponent, reactive, ref, onMounted } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import SlideVerify from "vue3-slide-verify";
import type { SlideVerifyInstance } from "vue3-slide-verify";
import "vue3-slide-verify/dist/style.css";
export default defineComponent({
    components: { SlideVerify },
    setup(){
        const ruleFormRef = ref<FormInstance>()
        const formSize = ref('default')
        const ruleForm = reactive({
            userName: '',
            password: '',
            verifyCheck: '',
        })
        
        const submitForm = async (formEl: FormInstance | undefined) => {
            if (!formEl) return
            await formEl.validate((valid, fields) => {
                if (valid) {
                    console.log('submit!')
                } else {
                    console.log('error submit!', fields)
                }
            })
        }

        const resetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
        }
        const checkPopover = (rule: any, value: any, callback: any) => {

        }
        const rules = reactive<FormRules>({
            userName: [
                { required: true, message: 'Please Enter your userName', trigger: 'blur' },
            ],
            password: [
                { required: true, message: 'Please Enter your password', trigger: 'blur' }
            ],
            verifyCheck: [
                { validator: checkPopover, trigger: 'blur' }
            ]
        })

        // 滑块验证
        const msg = ref("");
        const popoverFlag = ref(false);
        const block = ref<SlideVerifyInstance>();
        const onAgain = () => {
            msg.value = "检测到非人为操作的哦！ try again";
            // 刷新
            block.value?.refresh();
        };
        function us<T>(arg:T):T{
            return arg
        }
        const onSuccess= (times: number) => {
            msg.value = `login success, 耗时${(times / 1000).toFixed(1)}s`;
            ElMessage.success('验证通过');
            popoverFlag.value = false;
            ruleForm.verifyCheck = 'isTrue'
            handleClick();
        };

        const onFail = () => {
            ElMessage.error("验证不通过");
        };

        const onRefresh = () => {
            // ElMessage.error("点击了刷新小图标");
            msg.value = "";
            // block.value?.refresh();
        };
    
        const handleClick = () => {
            // 刷新
            block.value?.refresh();
            msg.value = "";
        };


        const popoverSlots = () => {
            return {
                reference:()=><el-button onClick={()=>popoverFlag.value=!popoverFlag.value}>Click to activate</el-button>
            }
        }
        const options = [
            {
                value: 'Option1',
                label: 'Option1',
            },
            {
                value: 'Option2',
                label: 'Option2',
            },
            {
                value: 'Option3',
                label: 'Option3',
            },
            {
                value: 'Option4',
                label: 'Option4',
            },
            {
                value: 'Option5',
                label: 'Option5',
            },
        ]
        // <el-form-item label="用户名" prop="userName">
        //     <el-select class="m-2" placeholder="Select" size="large">
        //         {
        //             options.map((item)=>{
        //                 return <el-option key={item.value} label={item.label} value={item.value}></el-option>
        //             })
        //         }
        //     </el-select>
        // </el-form-item>
        const animateFlag = ref(true)
        const checkAnimate = () => {
            setTimeout(()=>{
                animateFlag.value = false
            },1000)
        }
        onMounted(()=>{
            checkAnimate()
        })
        return () => (
            <>
                <el-card v-waves class={{
                    'animate__jackInTheBox': !animateFlag.value,
                    'animate__backInDown': animateFlag.value,
                    'box-card animate__animated': true,
                }}>
                    <el-form
                        ref={ruleFormRef.value}
                        model={ruleForm}
                        rules={rules}
                        label-width="120px"
                        class="demo-ruleForm"
                        size={formSize.value}
                        status-icon
                    >
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model={ruleForm.userName} />
                        </el-form-item>
                        <el-form-item  label="密码" prop="password">
                            <el-input show-password type="password" v-model={ruleForm.password} />
                        </el-form-item>
                        <el-form-item  label="验证" prop="verifyCheck">
                            <el-popover
                                placement="top"
                                title="验证"
                                width="200"
                                v-slots={popoverSlots()}
                                v-model:visible={popoverFlag.value}
                                >
                                <slide-verify
                                    class="silde_box"
                                    ref={(el:any)=>block.value=el}
                                    slider-text="向右滑动"
                                    onAgain={onAgain}
                                    onSuccess={onSuccess}
                                    onFail={onFail}
                                    onRefresh={onRefresh}
                                    >
                                </slide-verify>
                                <span>{msg.value}</span>
                            </el-popover>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={()=>submitForm(ruleFormRef.value)}
                                >Create</el-button>
                            <el-button onClick={()=>resetForm(ruleFormRef.value)}>Reset</el-button>
                        </el-form-item>
                    </el-form>
                </el-card> 
            </>
        )
    }
})
</script>
<style lang="scss">
    .box-card {
        position: fixed;
        width: 50%;
        height: 50%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>