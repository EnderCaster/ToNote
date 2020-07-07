<template>
    <div class="wrapper">
        <ECHeader />
        <Row type="flex" justify="center" align="middle">
            <Card class="login-wrapper">
                <p slot="title">{{$t('register.title')}}</p>
                <Form label-position="top">
                    <FormItem :label="$t('register.label.username')">
                        <Input v-model="user.username" />
                    </FormItem>
                    <FormItem :label="$t('register.label.password')">
                        <Input v-model="user.password" type="password" />
                    </FormItem>
                    <FormItem :label="$t('register.label.check-password')">
                        <Input v-model="user.password_confirmation" type="password" />
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            @click="handleRegister"
                            long
                        >{{$t('register.label.register')}}</Button>
                    </FormItem>
                    <FormItem>
                        <span>
                            <a
                                class="pull-right"
                                @click="backToLogin"
                            >{{$t('register.label.back-to-login')}}</a>
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
        handleRegister: function() {
            var _this = this;
            axios
                .post("register", this.user)
                .then(function(resp) {
                    _this.$router.push({ name: "login" });
                })
                .catch(function(error) {
                    _this.$Message.error({
                        content: _this.$t("msg.register-failed")
                    });
                });
        },
        backToLogin: function() {
            return this.$router.push({ name: "login" });
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
