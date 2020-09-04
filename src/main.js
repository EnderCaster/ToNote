import Vue from 'vue';
import iView from 'view-design';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'view-design/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import Axios from 'axios';
import quillEditor from 'vue-quill-editor';

window.site_config = {
    APP_URL: "to-note.endercaster.lan",
    API_URL: "api.to-note.endercaster.lan"
}

Vue.use(VueRouter);
Vue.use(iView);

// 国际化配置
Vue.use(VueI18n);
const messages = {
    'zh': require('./i18n/zh-CN.json')
}
const i18n = new VueI18n({
    locale: 'zh',
    messages
})
//AXIOS
Axios.defaults.baseURL = "//" + window.site_config.API_URL;

window.axios = Axios;
//富文本编辑器
Vue.use(quillEditor);

Vue.prototype.checkLogin = function () {
    if (localStorage.getItem('Authorization')) {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem('Authorization');
    }
    return axios.defaults.headers.common["Authorization"];
}

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
