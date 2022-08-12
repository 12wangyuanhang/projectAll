export default class RecordVideo {
    video: any;

    mediaRecorder: any;

    chunks: any[];
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
        return new Promise<void>(async (resovle, reject) => {
            try {
                let stream: any = await navigator.
                    mediaDevices.
                    getUserMedia({
                        audio: true,
                        video: true,
                    })
                if ('srcObject' in this.video) {
                    this.video.srcObject = stream;
                } else {
                    // 兼容旧的浏览器
                    this.video.src = window.URL.createObjectURL(stream);
                }
                // 当视频的元数据已经加载时触发
                this.video.addEventListener('loadmetadata', () => {
                    this.video.play();
                });
                this.mediaRecorder = new MediaRecorder(stream);
                this.mediaRecorder.addEventListener('dataavailable', (ev: any) => {
                    this.chunks.push(ev.data);
                });
                resovle();
            } catch (err) {
                reject(err);
            }

        })// 异常抓取，包括用于禁用麦克风、摄像头
    }

    /**
   * 视频开始录制
   */
    startRecord(): void {
        if (this.mediaRecorder.state === 'inactive') {
            this.mediaRecorder.start();
        }
    }

    /**
     * 视频结束录制
     */
    stopRecord(): void {
        if (this.mediaRecorder.state === 'recording') {
            this.mediaRecorder.stop();
        }
    }

    /**
     * 检测当前浏览器对否支持
     *
     * @return {boolean} 当前浏览器是否支持
     */
    isSupport(): boolean | undefined {
        const flag = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
        if (!!flag) {
            return true;
        }
    }
}