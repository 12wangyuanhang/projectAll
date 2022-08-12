<script lang="tsx">
    import { ref, reactive, defineEmits } from "vue";
    export default {
        setup(props:any){
            // console.log(emit.attrs, 80000)
            const emit = defineEmits();
            const num = ref(0);
            const inputNumberData = {
                min: 0,
                max: 10,
                controlsPosition: 'right'
            }
            const numArr = ref<(number|string)[]>([]);
            const handleChange = (val:any) => {
                numArr.value.push(val)
                numArr.value = Array.from(new Set(numArr.value))
                console.log(numArr.value)
            }
            const handleBlur = (e:Event) => {
                console.log(e, 9000);
                const target = e.target as HTMLInputElement;
                console.log(target.value)
            }
            return () => (
                <>
                    <el-input-number
                        v-model={num.value}
                        {...inputNumberData}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </>
            )
        }
    }
</script>

<style scoped>
a {
    color: #42b983;
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
}
</style>
