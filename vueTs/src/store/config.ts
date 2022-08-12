import { reactive } from 'vue'
import { defineStore } from 'pinia'
const WORKING_LIST = 'workingList'
export const useConfig = defineStore(
    'config',
    () => {
        const layout: any = reactive({
            /* 全局 */
            showDrawer: false,
            name: 'wangyuanhang',
            
        })

        const lang = reactive({
            // 默认语言，可选值<zh-cn|en>
            defaultLang: 'zh-cn',
            // 当在默认语言包找不到翻译时，继续在 fallbackLang 语言包内查找翻译
            fallbackLang: 'zh-cn',
            // 支持的语言列表
            langArray: [
                { name: 'zh-cn', value: '中文简体' },
                { name: 'en', value: 'English' },
            ],
        })
        const changeName = (name:string) => {
            layout.name = name;
        }
        function menuWidth() {
            if (layout.shrink) {
                return layout.menuCollapse ? '0px' : layout.menuWidth + 'px'
            }
            // 菜单是否折叠
            return layout.menuCollapse ? '64px' : layout.menuWidth + 'px'
        }

        function setLang(val: string) {
            lang.defaultLang = val
        }

        function setLayoutMode(data: string) {
            layout.layoutMode = data

            // 切换布局时，如果是为默认配色方案，对菜单激活背景色重新赋值
            if (data == 'Classic' && layout.headerBarBackground == '#ffffff' && layout.headerBarBackground == '#ffffff') {
                layout.headerBarTabActiveBackground = '#f5f5f5'
            } else if (data == 'Default' && layout.headerBarBackground == '#ffffff' && layout.headerBarTabActiveBackground == '#f5f5f5') {
                layout.headerBarTabActiveBackground = '#ffffff'
            }
        }

        const setLayout = (name: keyof any, value: any) => {
            layout[name] = value as never
        }

        return { layout, lang, changeName, menuWidth, setLang, setLayoutMode, setLayout }
    },
    {
        persist: {
            key: WORKING_LIST,
            storage: window.sessionStorage,
        },
    }
)
