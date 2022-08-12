<script lang="tsx">
import { defineComponent, h, createVNode } from 'vue';
export default defineComponent({
    render(){
        return createVNode('div', {class:'box1'},[createVNode('input', {type:'text'}),'不当人'])
    }
})
</script>
