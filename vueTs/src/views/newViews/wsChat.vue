<template>
    <div class="home">
        <el-dialog v-model="showInfoDialog">
            <el-input type="text" v-model="nickname" placeholder="请输入你的昵称"></el-input>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="showInfoDialog = false">取 消</el-button>
                    <el-button type="primary" @click="sure">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <div class="right">
            <div class="body im-record" id="im-record">
                <div class="ul">
                    <!-- user为靠右展示样式，如果uid一致说明是本人 -->
                    <div class="li" :class="{ user: item.uid == uid }" v-for="(item, index) in messageList"
                        :key="index">
                        <template v-if="item.type === 1">
                            <p class="join-tips">{{ item.msg }}</p>
                        </template>
                        <template v-else>
                            <p class="message-date">
                                <span class="m-nickname">{{ item.nickname }}</span> {{ item.date }}
                            </p>
                            <p class="message-box">{{ item.msg }}</p>
                        </template>
                    </div>
                </div>
            </div>
            <div class="im-footer">
                <el-input placeholder="请输入你想说的内容..." v-model="msg" class="im-footer_inp" />
                <el-button class="im-footer_btn" type="primary" @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, toRefs, onMounted } from 'vue';
import type { Ref } from 'vue';
import moment from 'moment' // 需要下载moment。npm install moment --save
interface User {
    nickname: string,
    uid: string,
}
console.log(import.meta.url, 'url')
const data = reactive({
    ws: null as any,
    showInfoDialog: false,
    nickname: '',
    uid: '',
    messageList: [] as any[],
    msg: '' // 输入的消息内容
})
const { ws, showInfoDialog, nickname, uid, messageList, msg } = toRefs(data);
// TODO
const init = () => {
    if (window.WebSocket) {
        let user = {} as User;
        if (localStorage.getItem('WEB_IM_USER')) user = JSON.parse(localStorage.getItem('WEB_IM_USER')||'{}')
        nickname.value = user.nickname || ''
        uid.value = user.uid || ''

        // 没有当前人信息就弹窗去填写
        if (!uid.value) {
            showInfoDialog.value = true
        } else {
            contactSocket()
        }

        // 监听回车事件
        document.onkeydown = function (event) {
            const e = event || window.event;
            if (e && e.keyCode == 13) {
                console.log('触发enter')
                send()
            }
        }
    } else {
        console.log('当前浏览器不支持WebSocket！')
    }
}
 // 连接websocket
const contactSocket = () => {
    const that = this
    ws.value = new WebSocket('ws://10.99.167.167:8081')
    // const ws = this.ws
    ws.value.onopen = function () {
        console.log('连接服务器成功')

        // 没有当前人信息的话，需要缓存下
        if (!uid.value) {
            uid.value = 'web_im_' + moment().valueOf();
            localStorage.setItem('WEB_IM_USER', JSON.stringify({
                uid: uid.value,
                nickname: nickname.value
            }))
        }
        sendMessage(1)
    }
    ws.value.onmessage = function (e:any) {
        messageList.value.push((JSON).parse(e.data))
    }
    ws.value.onclose = function () {
        console.log('连接已关闭')
    }
}

// 发送信息给客户端
const sendMessage = (type:(number | string), msgr?:string) => {
    const data = {
        uid: uid.value,
        type,
        nickname: nickname.value,
        msg:msgr
    }
    ws.value.send(JSON.stringify(data))
    msg.value = ''
}
// 模态框确认事件
const sure = () => {
    showInfoDialog.value = false
    contactSocket()
}
// enter触发 或者 点击“发送”触发
const send = () => {
    if (!msg.value) return;
    sendMessage(2, msg.value)
}
onMounted(()=>{
    init()
})
</script>
<style scoped lang="scss">
  .right {
      position: relative;
      flex: 1;
      height: 600px;
      margin: 0 auto;
      .im-title {
        height: 30px;
        padding-left: 20px;
        border-bottom: 1px solid #ccc;
        line-height: 30px;
        font-size: 16px;
      }
      .im-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        .im-footer_inp {
          width: 80%;
        }
        .im-footer_btn {
          width: 20%;
        }
      }
      
      .im-record {
        width: 100%;
        height: 540px;
        overflow-y: auto;
        .join-tips {
          position: relative!important;
          display: block;
          width: 100%;
          left: 0!important;
          transform: none!important;
          color: #cccccc;
          font-size: 15px;
          text-align: center;
        }
        .li {
          position: relative;
          margin-bottom: 15px;
          text-align: left;
          color: #46b0ff;
          &:after {
            content: '';
            display: block;
            clear: both;
          }
          .message-date {
            font-size: 16px;
            color: #b9b8b8;
          }
          .m-nickname {
            color: #46b0ff;
          }
          &.user {
            text-align: right;
          }
        }
        .message-box {
          line-height: 30px;
          font-size: 20px;
        }
      }
    }
</style>