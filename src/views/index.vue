<template>
    <div class="wrapper">
        <ECHeader />
        <Row type="flex" justify="center" align="middle">
            <Card class="login-wrapper">
                <p slot="title">{{$t('login.title')}}</p>
                <Form label-position="top">
                    <FormItem :label="$t('login.label.username')">
                        <Input v-model="user.username" />
                    </FormItem>
                    <FormItem :label="$t('login.label.password')">
                        <Input v-model="user.password" type="password" />
                    </FormItem>
                    <FormItem>
                        <Checkbox v-model="remember_me">
                            <span>{{$t('login.label.remember-me')}}</span>
                        </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleLogin" long>{{$t('login.label.login')}}</Button>
                    </FormItem>
                    <FormItem>
                        <span>
                            <a
                                class="pull-right"
                                @click="goToRegister"
                            >{{$t('login.label.to-register')}}</a>
                        </span>
                    </FormItem>
                </Form>
            </Card>
        </Row>
    </div>
</template>

<script>
import ECHeader from "../components/EC_header";
export default {
    data: function() {
        return {
            user: {},
            remember_me: false
        };
    },
    components: {
        ECHeader
    },
    methods: {
        handleLogin: function() {
            console.log(this.base_url);
            var _this = this;
            axios
                .post("login", this.user)
                .then(function(resp) {
                    axios.defaults.headers.common["Authorization"] =
                        resp.data.data.token_type +
                        " " +
                        resp.data.data.access_token;
                    document.cookie =
                        _this.$t("system.passport_token") +
                        "=" +
                        resp.data.data.access_token +
                        ";path=/;domain=." +
                        window.site_config.APP_URL;
                    if (_this.remember_me) {
                        localStorage.setItem(
                            "Authorization",
                            axios.defaults.headers.common["Authorization"]
                        );
                    }
                    _this.$router.push({ name: "notebook" });
                })
                .catch(function(error) {
                    _this.$Message.error({
                        content: _this.$t("msg.login-failed")
                    });
                });
        },
        goToRegister: function() {
            return this.$router.push({ name: "register" });
        }
    },
    mounted: function() {
        if (this.checkLogin()) {
            return this.$router.push({ name: "notebook" });
        }
    }
};
</script>
<style lang="less" scoped>
.wrapper {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #eee;
    .ivu-row-flex {
        height: 100%;
    }
    .login-wrapper {
        width: 300px;
        .pull-right {
            float: right;
        }
    }
}
</style>
