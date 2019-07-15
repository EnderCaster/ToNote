<template>
  <Layout class="fullscreen">
    <Header>
      <img src="../images/logo.png" class="layout-logo" />
      <Select v-model="current_notebook" class="layout-notebook-select">
        <Option
          v-for="(notebook,index) in notebooks"
          :key="index"
          :value="notebook.uuid"
        >{{notebook.name}}</Option>
      </Select>
    </Header>
    <Layout>
      <Sider>
        <Menu width="auto">
          <MenuItem
            v-for="(partition,index) in partitions"
            :key="index"
            :name="partition.uuid"
            :to="{name:'page',params:{partition_name:partition.name,partition_uuid:partition.uuid}}"
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
      current_notebook: "",
      partitions: [
      ],
      notebooks: [
      ]
    };
  },
  methods: {
    initNotebooks: function() {
      var _this = this;
      axios.get("notebooks").then(function(resp) {
        _this.notebooks = resp.data;
        _this.current_notebook = _this.$route.params.notebook_uuid;
      });
    },
    initPartitions: function() {
      var _this = this;
      var data = {
        params: { parent: this.$route.params.notebook_uuid }
      };
      axios.get("partitions", data).then(function(resp) {
        _this.partitions = resp.data;
      });
    },
    handleChange: function() {
      //切换笔记本
    }
  },
  mounted: function() {
    //console.log(this.$route)
    this.initNotebooks();
    this.initPartitions();
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
