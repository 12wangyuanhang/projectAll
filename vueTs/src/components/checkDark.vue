<script lang="tsx">
import { defineComponent } from 'vue';
import { useDark, useToggle } from '@vueuse/core'

export default defineComponent({
    setup() {

        const isDark = useDark({
            storageKey: 'vue-theme-appearance',
        })
        const toggleDark = useToggle(isDark)
        return () => (
            <>
                <el-button onClick={()=>toggleDark}>切换</el-button>
            </>
        )

    },
})
</script>
