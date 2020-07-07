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
        <Row>
            <div>{{$t('msg.modify-date')}}:{{page.updated_at}}</div>
            <div v-show="auto_save_show">{{auto_save_at}}</div>
        </Row>
        <Row>
            <Col span="16">
                <quill-editor ref="myTextEditor" v-model="page.content" :options="editorOption"></quill-editor>
            </Col>
            <Col span="2"></Col>
        </Row>
    </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import quillConfig from "../libs/quill-config";
export default {
    components: {
        quillConfig
    },
    data: function() {
        return {
            editorOption: quillConfig,
            page: {},
            modified: false,
            auto_save_show: false,
            auto_save_at: this.$t("msg.auto-save-at"),
            is_auto_save: false
        };
    },
    methods: {
        formatTimestamp: function(timestamp) {
            var date = new Date(timestamp);
            return this.formatDate(date);
        },
        formatDate: function(date) {
            return (
                date.getFullYear() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getDate() +
                " " +
                date.getHours() +
                ":" +
                date.getMinutes() +
                ":" +
                date.getSeconds()
            );
        },
        initThisPage: function() {
            var _this = this;
            axios
                .get("pages/" + _this.$route.params.page_uuid)
                .then(function(resp) {
                    _this.page = resp.data.data;
                });
        },
        handleSave: function() {
            var _this = this;
            var data = {
                content: this.page.content,
                title: this.page.title
            };
            axios
                .patch("pages/" + _this.$route.params.page_uuid, data)
                .then(function(resp) {
                    if (!_this.is_auto_save) {
                        _this.$Message.success({
                            content: _this.$t("msg.save-success")
                        });
                    } else {
                        _this.auto_save_at =
                            _this.$t("msg.auto-save-at") +
                            _this.formatDate(new Date());
                    }
                    _this.auto_save_show = _this.is_auto_save;
                    _this.is_auto_save = false;
                    _this.modified = false;
                });
        },
        autoSave: function() {
            //5秒后自动保存
            setTimeout(() => {
                this.is_auto_save = true;
                this.handleSave();
            }, 5000);
        }
    },
    watch: {
        $route: function(to, from) {
            this.initThisPage();
        },
        "page.content": function(after_value, before_value) {
            if (after_value != before_value) {
                this.autoSave();
            }
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

