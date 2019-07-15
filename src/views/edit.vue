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
          :config="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
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
export default {
  data: function() {
    return {
      content: "<h1>Hello Happy World</h1>",
      editorOption: {
        // something config
      },
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
    onEditorBlur(editor) {
      // 同步草稿
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log("editor ready!");
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      // this.content = html
    },
    handleSave:function(){

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

