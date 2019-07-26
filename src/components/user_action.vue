<template>
    <Row class="user-actions">
        <Button @click="handleLogout">{{$t('action.logout')}}</Button>
    </Row>
</template>
<script>
export default {
    name: 'user-action',
    data:function(){
        return {};
    },
    methods:{
        handleLogout:function(){
            axios.defaults.headers.common["Authorization"]=undefined;
            this.$router.push('/login');
        }
    }
}
</script>
<style lang="less">
    .user-actions{
        position: fixed;
        height: 100%;
        float: right;
    }
</style>
