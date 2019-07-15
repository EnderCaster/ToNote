<template>
  <Layout>
    <Sider>
      <Menu width="auto">
        <MenuItem
          v-for="(page,index) in pages"
          :key="index"
          :name="page.title"
          :to="{name:'edit_field',params:{page_name:page.title,page_uuid:page.uuid}}"
        >{{page.title}}</MenuItem>
      </Menu>
    </Sider>
    <Content>
      <router-view />
    </Content>
  </Layout>
</template>

<script>
export default {
  data: function() {
    return {
      pages: [
      ]
    };
  },
  methods: {
    initPages: function() {
      var _this = this;
      var data={
        params:{
          parent:this.$route.params.partition_uuid
        }
      };
      axios.get("pages",data).then(function(resp) {
        _this.pages = resp.data;
      });
    }
  },
  watch:{
    '$route':function(to,from){
       this.initPages();
    }
  },
  mounted:function(){
    this.initPages();
  }
};
</script>

<style lang="less" scoped>
.ivu-layout.ivu-layout-has-sider {
  position: fixed;
  width: 100%;
  height: 100%;
  .ivu-layout-sider {
    height: 100%;
    .ivu-menu {
      height: 100%;
    }
  }
}
</style>

