<template>
    <Row class="user-actions">
        <Button @click="handleLogout">{{$t('action.logout')}}</Button>
    </Row>
</template>
<script>
export default {
    name: "user-action",
    data: function() {
        return {};
    },
    methods: {
        handleLogout: function() {
            localStorage.clear();
            axios.defaults.headers.common["Authorization"] = undefined;
            document.cookie =
                this.$t("system.passport_token") +
                "=null;expires=" +
                new Date().toUTCString() +
                ";path=/;domain=." +
                window.site_config.APP_URL;
            this.$router.push("/login");
        }
    }
};
</script>
<style lang="less">
.user-actions {
    height: 100%;
    float: right;
    .ivu-btn {
        background: transparent;
        color: white;
    }
}
</style>
