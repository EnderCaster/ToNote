<template>
  <div class="edit">
    <Row>
      <Col span="12">
        <Input class="title" v-model="page.name" />
        <hr />
      </Col>
      <Col span="12"></Col>
    </Row>
    <Row>{{$t('msg.modify-date')}}:{{formatDate(page.modify_date)}}</Row>
    <Row>这里一会放一个富文本编辑器</Row>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      page: {
        id: "",
        name: "测试页面",
        content: "",
        modify_date: 0
      }
    };
  },
  methods: {
    formatDate: function(timestamp) {
      var date = new Date(timestamp);
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    initThisPage:function(){
      var _this=this;
      axios.get('pages/'+_this.$route.params.page_uuid).then(function(resp){
        _this.page=resp.data;
      });
    }
  },
  mounted: function() {
    this.initThisPage();
  }
};
</script>

<style lang="less">
.edit {
  .title {
    .ivu-input.ivu-input-default {
      border: 1px solid transparent;
    }
  }
}
</style>

