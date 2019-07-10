<template>
    <Layout>
        <Sider>
            <Menu width="auto">
                <MenuItem
            v-for="(page,index) in pages"
            :key="index"
            :name="page.name"
            :to="{name:'edit_field',params:{page_name:page.name,page_id:page.id}}"
          >{{page.name}}</MenuItem>
            </Menu>
        </Sider>
        <Content>
            <router-view />
        </Content>
    </Layout>
</template>

<script>
export default {
    data:function(){
        return {
            pages:[{
                id:"A6D5F47WT1S6FG7",
                name:"测试页面"
            }]
        };
    }
}
</script>

<style lang="less" scoped>
.ivu-layout.ivu-layout-has-sider {
    position: fixed;
    width: 100%;
    height: 100%;
    .ivu-layout-sider {
      height: 100%;
      .ivu-menu{
          height: 100%;
      }
    }
  }
</style>

