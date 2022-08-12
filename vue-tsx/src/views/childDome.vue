<script lang="tsx">
    import { h } from 'vue';
    export default {
        setup(){
            return () => h('div',{class:'divBox'},['不能当人', h('h4',{class:'isH4'},'有点东西')])
        }
    }
</script>