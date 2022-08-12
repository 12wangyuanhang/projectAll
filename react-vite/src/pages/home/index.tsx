import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import * as Icons from '@ant-design/icons';
import { Layout, Menu, Switch, Modal, Transfer } from 'antd';
import React, { useState } from 'react';
import type { MenuProps, MenuTheme } from 'antd';
import { useNavigate, Outlet, useLocation, useOutlet } from 'react-router-dom';
import type { TransferDirection } from 'antd/es/transfer';
import routes from '../../router/index';
import { useSelector, useDispatch } from 'react-redux'
import { handleColumn, changeColumns } from '../../reducers/tableColumn'
import store from '../../store'
import './index.less';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface RecordType {
    key: string;
    title: string;
    description: string;
}


const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter(item => Number(item.key) > 10).map(item => item.key);

const App: React.FC = () => {
    // 路由跳转
    const navigate = useNavigate();
    // const location = useLocation();
    // const result = useOutlet();
    // console.log(location, 'location')
    // console.log(result, 'result')
    // 表格列控制
    const dispatch = useDispatch();
    // 从页面拿过来的table列表
    const tableColumns = useSelector((state:any) => state.columns);
    const [transferCols, setTransferCols] = useState(tableColumns);
    // 穿梭框控制键
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    // dialog visible
    const [isModalVisible, setIsModalVisible] = useState(false);
    // 菜单的收缩
    const [collapsed, setCollapsed] = useState(false);
    // 路由key
    const [current, setCurrent] = useState('/home/test1');
    // 暗黑和白天key
    const [theme, setTheme] = useState<MenuTheme>('dark');

    // 菜单栏的选中以及路由跳转
    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
        navigate(e.key)
    };
    // 白天和黑天切换
    const changeTheme = (value:boolean) => {
        setTheme(value ? 'dark' : 'light');
    }
    // 菜单栏的配置生成
    function getItem(
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    // 菜单栏处理
    const handleMenu = (list:any) => {
        return list.map((item:any)=>{
            const icon = React.createElement((Icons as any)[item.icon]);
            if(item.children&&item.children.length>0){
                return getItem(item.name, item.path, icon, handleMenu(item.children));
            } else {
                return getItem(item.name, item.path, icon);
            }
        })
    }
    const item:MenuItem[] = handleMenu(routes[0].children);

    // dialog显示隐藏
    const handleColumnVisible = () => {
        setIsModalVisible(true);
    }
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
            width: '40%',
            editable: true,
        },
    ];
    const handleOk = () => {
        dispatch(handleColumn(columns))

        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    // 左右改变事件
    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };
    // 改变
    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    // console.log(item, 'item')
    return (
        <Layout >
            <Sider style={{'background':theme === 'light'?'#fff':'rgba(0, 0, 0, 0.85)'}} trigger={null} collapsible collapsed={collapsed}>
                <div style={{'background':theme === 'dark'?'rgba(255, 255, 255, 0.3)':'rgba(0, 0, 0, 0.3)'}} className="logo" >我是脑瓜子</div>
                <Menu
                    theme={theme}
                    mode="inline"
                    onClick={onClick}
                    selectedKeys={[current]}
                    items={item}
                />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <Switch
                        checked={theme === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                    <PushpinOutlined 
                        onClick={handleColumnVisible}
                        className='trigger'
                    />
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        overflowY: 'scroll',
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Transfer
                        dataSource={mockData}
                        titles={['Source', 'Target']}
                        targetKeys={targetKeys}
                        listStyle={{
                            width: 250,
                            height: 300,
                        }}
                        selectedKeys={selectedKeys}
                        onChange={onChange}
                        onSelectChange={onSelectChange}
                        // onScroll={onScroll}
                        render={item => item.title}
                    />
                    </Modal>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;

