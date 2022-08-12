<script lang="tsx">
import { ref, reactive, resolveDynamicComponent, } from "vue";
import type { FunctionalComponent } from 'vue';
import {
    ElButton,
    ElIcon,
    ElTag,
    ElTooltip,
    TableV2FixedDir,
} from "element-plus";
import { Timer } from "@element-plus/icons-vue";
import dayjs from 'dayjs';
import type { Column, ElInput } from "element-plus";
type SelectionCellProps = {
    value: string
    intermediate?: boolean
    onChange?: (value: string) => void
    forwardRef?: (el: InstanceType<typeof ElInput>) => void
}
export default {
    components:{
        ElButton,
        ElIcon,
        ElTag,
        ElTooltip,
        TableV2FixedDir,
        Timer
    },

    setup() {
        const Input = resolveDynamicComponent('ElInput') as typeof ElInput

        let id = 0;

        const dataGenerator = () => ({
            id: `random-id-${++id}`,
            name: "Tom",
            date: "2020-10-1",
            editing: false,
        });
        const columns: Column<any>[] = [
            {
                key: "date",
                title: "Date",
                dataKey: "date",
                width: 150,
                fixed: TableV2FixedDir.LEFT,
                cellRenderer: ({ cellData: date }) => (
                    <ElTooltip content="去一边去">
                        <span>
                            <el-icon>
                                <Timer />
                            </el-icon>
                            {date}
                        </span>
                    </ElTooltip>
                ),
            },
            {
                key: "name",
                title: "Name",
                dataKey: "name",
                width: 150,
                align: "center",
                cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
            },
            {
                key: "operations",
                title: "Operations",
                cellRenderer: ({ rowData, column }) => (
                    <>
                        <ElButton size="small">Edit</ElButton>
                        <ElButton onClick={() => doDelete(rowData, column)} size="small" type="danger">
                            Delete
                        </ElButton>
                    </>
                ),
                width: 150,
                align: "center",
            },
        ];
        const data = ref(Array.from({ length: 100 }).map(dataGenerator));
        columns[0] = {
            ...columns[0],
            title: 'Date',
            cellRenderer: ({ rowData, column }) => {
                const onChange = (value: string) => {
                    rowData[column.dataKey!] = value
                }
                const onEnterEditMode = () => {
                    rowData.editing = true
                }

                const onExitEditMode = () => (rowData.editing = false)
                const input = ref()
                const setRef = (el: any) => {
                    input.value = el
                    if (el) {
                        el.focus?.()
                    }
                }

                return rowData.editing ? (
                    <el-input onBlur={onExitEditMode} ref={setRef as any} onInput={onChange} modelValue={rowData[column.dataKey!]} />
                ) : (
                    <div class="table-v2-inline-editing-trigger" onClick={onEnterEditMode}>
                        <ElTooltip content={rowData[column.dataKey!]}>
                            <span>
                                <el-icon>
                                    <Timer />
                                </el-icon>
                                {rowData[column.dataKey!]}
                            </span>
                        </ElTooltip>
                    </div>
                )
            },
        }

        const doDelete = (item: any, column: any) => {
            console.log(item, 'item');
            console.log('item', column);
            // item.
        }
        const cellValue = ref('1234');
        return () => (
            <>
                <el-table-v2
                    columns={columns}
                    data={data.value}
                    width={700}
                    height={400}
                    fixed
                />
            </>
        );
    },
};
</script>

<style>
.table-v2-inline-editing-trigger {
    border: 1px transparent dotted;
    padding: 4px;
}

.table-v2-inline-editing-trigger:hover {
    border-color: var(--el-color-primary);
}
</style>