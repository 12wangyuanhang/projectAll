export default class RecordVideo {
    video: any;

    mediaRecorder: any;

    chunks: [];
    /**
    * 构造函数
    *
    * @param  {Object}   videoObj 视频对象
    */
    constructor(videoObj: any) {
        this.video = videoObj
        this.mediaRecorder = null;
        this.chunks = [];
    }
    /**
    * 初始化
    *
    * @return {Object} promise
    */
    init(): Promise<unknown> {
        return new Promise(async ()=>{
            let stream: any = await navigator.
                    mediaDevices.
                        getUserMedia({
                            audio: true,
                            video: true,
                        })
            if('srcObject' in this.video){
                this.video.srcObject = stream;
            } else {
                 // 兼容旧的浏览器
                this.video.src = window.URL.createObjectURL(stream);
            }
            // 当视频的元数据已经加载时触发
            this.video.addEventListener('loadmetadata', () => {
                this.video.play();
            });
            
        })
    }
}