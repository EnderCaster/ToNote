<template>
  <Layout class="fullscreen">
    <Header>
      <img src="../images/logo.png" class="layout-logo" @click="handleIndex" />
      <Select v-model="current_notebook" class="layout-notebook-select" @on-change="handleChange">
        <Option
          v-for="(notebook,index) in notebooks"
          :key="index"
          :value="notebook.uuid"
        >{{notebook.name}}</Option>
      </Select>
      <UserAction/>
    </Header>
    <Layout>
      <Sider>
        <Row class="action-row" type="flex" justify="center" align="middle">
          <Button @click="showAddModal">{{$t('action.new')}}</Button>
          <Button @click="is_show_action=!is_show_action">{{$t('action.manage')}}</Button>
        </Row>
        <Menu width="auto">
          <Row
            v-for="(partition,index) in partitions"
            :key="index"
            type="flex"
            justify="center"
            align="middle"
          >
            
              <Col span="20" v-if="is_show_action">
                <MenuItem
                  :name="partition.uuid"
                  :to="{name:'page',params:{partition_name:partition.name,partition_uuid:partition.uuid}}"
                >{{partition.name}}</MenuItem>
              </Col>
              <Col span="24" v-else>
                <MenuItem
                  :name="partition.uuid"
                  :to="{name:'page',params:{partition_name:partition.name,partition_uuid:partition.uuid}}"
                >{{partition.name}}</MenuItem>
              </Col>
              <Col span="4" v-if="is_show_action">
                <Icon class="action" type="md-trash" @click="handleDelete(partition.uuid)" />
              </Col>
              
          </Row>
        </Menu>
      </Sider>
      <Content>
        <router-view />
        <Modal v-model="is_show_add_modal" :title="$t('partition.add-title')">
          <Row type="flex" justify="center" align="middle">
            <Col span="4">{{$t('partition.label.name')}}</Col>
            <Col span="20">
              <Input v-model="partition.name" />
            </Col>
          </Row>
          <template slot="footer">
            <Button type="primary" @click="handleAdd">{{$t('action.new')}}</Button>
          </template>
        </Modal>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import UserAction from '../components/user_action';
export default {
  
  data: function() {
    return {
      current_notebook: "",
      is_show_add_modal: false,
      is_show_action: false,
      partitions: [],
      notebooks: [],
      partition: {
        name: ""
      }
    };
  },
  components:{
    UserAction,
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
    handleChange: function(value) {
      this.$router.push({
        name: "partition",
        params: {
          notebook_uuid: value
        }
      });
    },
    handleAdd: function() {
      this.partition.parent = this.$route.params.notebook_uuid;
      var _this = this;
      axios.post("partitions", this.partition).then(function(resp) {
        _this.initPartitions();
        _this.is_show_add_modal = false;
        _this.partition = {};
      });
    },
    showAddModal: function() {
      this.is_show_add_modal = true;
    },
    handleIndex: function() {
      this.$router.push("/");
    },
    handleDelete: function(uuid) {
      var _this = this;
      axios.delete("partitions/" + uuid).then(function(resp) {
        _this.$Message.success({
          content: _this.$t("msg.operation-success")
        });
        _this.handleChange(_this.$route.params.notebook_uuid);
      });
    }
  },
  watch: {
    $route: function(to, from) {
      this.initNotebooks();
      this.initPartitions();
    }
  },
  mounted: function() {
    if(!this.checkLogin()){
      return this.$router.push({name:"login"});
    }
    this.initNotebooks();
    this.initPartitions();
  }
};
</script>
<style>
.ivu-icon.action {
  cursor: pointer;
}
</style>

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
      .action-row {
        height: 5%;
        background-color: white;
      }
      .action-row:after {
        content: "";
        display: block;
        width: 1px;
        height: 100%;
        background: #dcdee2;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
      }
      .ivu-menu {
        height: 95%;
      }
    }
  }
}
</style>
