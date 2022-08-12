import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
	  uni(),
	 //  Components({
		// resolvers: [VantResolver()],
	 //  }),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	server:{
		port:8080,
		proxy: {
			'/api': {
				target: 'https://www.kuaikanmanhua.com',//接口的前缀
				// ws:true,//代理websocked
				changeOrigin:true,//虚拟的站点需要更管origin
				rewrite: path => {
					console.log(path); // 打印[/api/userInfo] 这就是http-proxy要请求的url,我们基地址实际是没有/api 所以replace掉
					return path.replace(/^\/api/, '');
				}
			},
			'/v2': {
				target: 'https://www.kuaikanmanhua.com',//接口的前缀
				// ws:true,//代理websocked
				changeOrigin:true,//虚拟的站点需要更管origin
				// rewrite: (path) => {
				// 	return path.replace('/^\/api/','')
				// }
			}
		}
	}
});

// function createViteProxy(viteEnv) {
//    const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'true';
//   if (!isOpenProxy) return undefined;

//   const { http } = getEnvConfig(viteEnv);

//   const proxy = {
//     [http.proxy]: {
//       target: http.url,
//       changeOrigin: true,
//       rewrite: path => path.replace(new RegExp(`^${http.proxy}`), '')
//     }
//   };
//   return proxy; 
// }