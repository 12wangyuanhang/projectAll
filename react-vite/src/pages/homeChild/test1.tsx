import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState, useEffect } from 'react'
import type { TableRowSelection } from 'antd/es/table/interface';
import './test1.less';
import { useDispatch, useSelector } from 'react-redux'
import store from '../../store'
import { handleColumn, changeColumns } from '../../reducers/tableColumn'
interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
    pos: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        pos: '河北',
        address: `London Park no. ${i}`,
    });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};


const Test1: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const dispatch = useDispatch();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRowDatas, setSelectedRowDatas] = useState<Item[]>([]);
    
    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: Item[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        console.log('selectedRows changed: ', selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRowDatas(selectedRows)
    };
    const rowSelection: TableRowSelection<Item> = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: changableRowKeys => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', pos: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    let columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        }, {
            title: 'pos',
            dataIndex: 'pos',
            width: 'auto',
            editable: true,
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
        },
        {
            title: 'address',
            dataIndex: 'address',
            width: '30%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={()=>cancel()}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    // const [resultMergedColumns, setResultMergedColumns] = useState(columns)
    const mergedColumns = (cols:any) => {
        return cols?.map((col:any) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record: Item) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }),
            };
        });
    }
    let resMergedColumns = mergedColumns(columns);
    const [htmlCols, setHtmlCols] = useState(resMergedColumns)
    const getStoreColumns = (cols:any) => {
        const columns = cols?.map((col:any)=>{
            return {
                title: col.title,
                dataIndex: col.dataIndex,
            }
        })
        return columns
    }
    // // console.log(resultMergedColumns)
    useEffect(()=>{
        dispatch(changeColumns(getStoreColumns(columns)))
    },[])
    // const resultColumns = useSelector((state:any)=>state.resultColumns)
    store.subscribe(()=>{
        const tableColumn = store.getState().tableColumn;
        console.log(tableColumn)
        const resCol = () => {
            let arr:any[] = [];
            tableColumn.resultColumns.forEach((item:any)=>{
                arr.push(columns.find(jtem=>jtem.title == item.title));
            })
            return arr;
        }
        resMergedColumns = mergedColumns(resCol())
        setHtmlCols(resMergedColumns)
    })
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         console.log(resultColumns, 'resultColumns')
    //     },500)
    //         // resMergedColumns = mergedColumns(resultColumns)
    // },[resultColumns])
    
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                tableLayout='fixed'
                bordered
                rowSelection={rowSelection}
                dataSource={data}
                columns={htmlCols}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
}
export default Test1