import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import Axios from 'axios';
import quillEditor from 'vue-quill-editor';

Vue.use(VueRouter);
Vue.use(iView);

// 国际化配置
Vue.use(VueI18n);
const messages={
    'zh':require('./i18n/zh-CN.json')
}
const i18n=new VueI18n({
    locale:'zh',
    messages
})
//AXIOS
Axios.defaults.baseURL = '//api.tonote.me/api/';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
window.axios=Axios;
//富文本编辑器
Vue.use(quillEditor);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    i18n,
    render: h => h(App)
});
