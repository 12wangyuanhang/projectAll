<template>
    <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        :border="true"
        row-key="date"
        @selection-change="handleSelectionChange"
    >
        <el-table-column :align="'center'" type="selection" width="55" />
        <el-table-column :align="'center'" label="Date" width="120">
            <template #default="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column :align="'center'" property="name" label="Name" width="120" />
        <el-table-column
            :align="'center'"
            property="address"
            label="Address"
            show-overflow-tooltip
        />
    </el-table>
</template>

<script setup lang="tsx">
import { ref, reactive, onMounted, nextTick } from "vue";
import type { Ref } from 'vue';
import lodash from 'lodash-es';
import Sortable from 'sortablejs';
import { ElTable } from 'element-plus';
interface User {
  date: string
  name: string
  address: string
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
// let keys = ref('0')

const tableData: any = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
// let newTableData;
const initSort = () => {
    const tbody = document.querySelector('.el-table__body-wrapper tbody')
    //初始化
    var sortable = Sortable.create(tbody, {
        animation: 300,
        // preventOnFilter: true,
        forceFallback: true,
        // disabled: true,
        //拖动结束
        onEnd: function ({newIndex,oldIndex}:any) {
            
            //获取拖动后的排序
            // tableData.value.splice(newIndex, 0, tableData.value.splice(oldIndex, 1)[0])
            const currentDragRow = tableData.value.splice(oldIndex, 1)[0] // 当前拖拽行
            tableData.value.splice(newIndex, 0, currentDragRow)
            // keys.value = Math.random().toString();
            // let newTableData = lodash.cloneDeep(tableData.value);
            // tableData.value[evt.newIndex] = newTableData[evt.oldIndex];
            // tableData.value[evt.oldIndex] = newTableData[evt.newIndex]
            // nextTick(()=>{
            //     console.log(tableData.value,' 123')
            //     sortable()
            // })

        }
    });
}
onMounted(()=>{
    nextTick(()=>{
        initSort()
    })
})
</script>

<style>
</style>