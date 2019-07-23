<template>
  <Row type="flex" justify="center" align="middle">
    <Col span="12">
      <Card>
        <p slot="title">{{$t('notebook.header')}}</p>
        <Tabs>
          <TabPane :label="$t('notebook.list-header')">
            <Row>
              <Col span="4">
                <Button long size="small" @click="showAddModal">{{$t("action.new")}}</Button>
              </Col>
              <Col span="16">&nbsp;</Col>
              <Col span="4">
                <Button long size="small" @click="is_show_action=!is_show_action">{{$t("action.manage")}}</Button>
              </Col>
            </Row>
            <hr />
            <Row
              type="flex"
              justify="center"
              align="middle"
              v-for="(notebook,index) in notebooks"
              :key="index"
            >
              <Col span="20" class="text-center">
              <a @click="handleSelect(index)">{{notebook.name}}</a>
              </Col>
              <Col v-if="is_show_action" span="4">
                  <Icon type="md-trash" @click="handleDelete(notebook.uuid)" class="action"/>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
      <Modal
      :title="$t('notebook.add-title')"
      v-model="is_show_add_modal"
      >
      <Row type="flex" justify="center" align="middle">
          <Col span="4">{{$t('notebook.label.name')}}</Col>
          <Col span="20">
            <Input v-model="notebook.name" />
          </Col>
          
        </Row>
      <template slot="footer">
        <Button type="primary" @click="handleAdd">{{$t('action.new')}}</Button>
      </template>
      </Modal>
    </Col>
  </Row>
</template>

<script>
export default {
  data: function() {
    return {
      notebooks: [],
      is_show_add_modal: false,
      notebook:{name:""},
      is_show_action:false
    };
  },
  methods: {
    handleSelect: function(index) {
      this.$router.push({
        name: "partition",
        params: {
          notebook_uuid: this.notebooks[index].uuid
        }
      });
    },
    showAddModal: function() {
      this.is_show_add_modal = true;
    },
    getNotebooks: function() {
      var _this = this;
      axios.get("notebooks").then(function(resp) {
        _this.notebooks = resp.data;
      });
    },
    handleAdd: function() {
      var _this = this;
      axios.post("notebooks", this.notebook).then(function(resp) {
        _this.getNotebooks();
        _this.is_show_add_modal=false;
        _this.notebook={};
        _this.$Message.success({content:_this.$t('msg.operation-success')});
      });
    },
    handleDelete:function(uuid){
      var _this=this;
      axios.delete('notebooks/'+uuid).then(function(resp){
        _this.getNotebooks();
        _this.$Message.success({content:_this.$t('msg.operation-success')});
      })
    }
  },
  mounted: function() {
    this.getNotebooks();
  }
};
</script>
<style lang="less" scoped>
.text-center{
  text-align: center;
}
.ivu-icon.action {
  cursor: pointer;
}
</style>

