<template>
  <div class="edit">
    <Row>
      <Col span="12">
        <Input class="title" v-model="page.title" />
        <hr />
      </Col>
      <Col span="12">
        <Button size="large" @click="handleSave">{{$t('action.save')}}</Button>
      </Col>
    </Row>
    <Row>{{$t('msg.modify-date')}}:{{page.updated_at}}</Row>
    <Row>
      <Col span="16">
        <quill-editor
          ref="myTextEditor"
          v-model="page.content"
          :options="editorOption"
        ></quill-editor>
      </Col>
      <Col span="2">
      </Col>
    </Row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import quillConfig from '../libs/quill-config';
export default {
  components:{
    quillConfig
  },
  data: function() {
    return {
      editorOption: quillConfig,
      page: {}
    };
  },
  methods: {
    formatDate: function(timestamp) {
      var date = new Date(timestamp);
      return (
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      );
    },
    initThisPage: function() {
      var _this = this;
      axios.get("pages/" + _this.$route.params.page_uuid).then(function(resp) {
        _this.page = resp.data;
      });
    },
    handleSave:function(){
      var _this=this;
      var data={
        content:this.page.content,
        title:this.page.title
      }
      axios.patch("pages/" + _this.$route.params.page_uuid,data).then(function(resp){
        _this.$Message.success({content:_this.$t('msg.operation-success')});
      })
    }
  },
  watch: {
    $route: function(to, from) {
      this.initThisPage();
    }
  },
  mounted: function() {
    this.initThisPage();
  }
};
</script>

<style lang="less">
.edit {
  background-color: #fff;
  .title {
    .ivu-input.ivu-input-default {
      border: 1px solid transparent;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>

