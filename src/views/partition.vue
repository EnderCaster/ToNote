<template>
  <Layout class="fullscreen">
    <Header>
      <img src="../images/logo.png" class="layout-logo" />
      <Select class="layout-notebook-select">
        <Option
          v-for="(notebook,index) in notebooks"
          :key="index"
          :value="notebook.id"
        >{{notebook.name}}</Option>
      </Select>
    </Header>
    <Layout>
      <Sider>
        <Menu width="auto">
          <MenuItem
            v-for="(partition,index) in partitions"
            :key="index"
            :name="partition.name"
            :to="{name:'page',params:{partition_name:partition.name,partition_id:partition.id}}"
          >{{partition.name}}</MenuItem>
        </Menu>
      </Sider>
      <Content>
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data: function() {
    return {
        current_notebook:"",
      partitions: [
        {
          id: "9ASD4F9WE4GD65",
          name: "分区名"
        }
      ],
      notebooks: [
        {
          id: "AS8DF74A6F65SFA748S",
          name: "XXX的笔记本"
        }
      ]
    };
  },
  methods: {
    handleSelect: function(index) {
      console.log(this.partitions[index]);
    }
  },
  mounted: function() {
    //console.log(this.$route)
    this.current_notebook=this.$route.params.notebook_id    
  }
};
</script>

<style lang="less" scoped>
.ivu-layout.fullscreen {
  position: fixed;
  height: 100%;
  width: 100%;
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-notebook-select {
    width: 150px;
    float: left;
    position: relative;
    top: 20px;
    left: 30px;
  }
  .ivu-layout.ivu-layout-has-sider {
    .ivu-layout-sider {
      height: 100%;
      .ivu-menu {
        height: 100%;
      }
    }
  }
}
</style>
