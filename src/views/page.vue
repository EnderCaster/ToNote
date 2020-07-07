<template>
    <Layout>
        <Sider>
            <Row class="action-row" type="flex" justify="center" align="middle">
                <Button @click="showAddModal">{{$t('action.new')}}</Button>
                <Button @click="is_show_action=!is_show_action">{{$t('action.manage')}}</Button>
            </Row>
            <Menu width="auto">
                <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    v-for="(page,index) in pages"
                    :key="index"
                >
                    <Col span="20" v-if="is_show_action">
                        <MenuItem
                            :name="page.title"
                            :to="{name:'edit_field',params:{page_name:page.title,page_uuid:page.uuid}}"
                        >{{page.title}}</MenuItem>
                    </Col>
                    <Col span="24" v-else>
                        <MenuItem
                            :name="page.title"
                            :to="{name:'edit_field',params:{page_name:page.title,page_uuid:page.uuid}}"
                        >{{page.title}}</MenuItem>
                    </Col>
                    <Col span="4" v-if="is_show_action">
                        <Icon type="md-trash" class="action" @click="handleDelete(page.uuid)" />
                    </Col>
                </Row>
            </Menu>
        </Sider>
        <Content>
            <router-view />
            <Modal v-model="is_show_add_modal" :title="$t('page.add-title')">
                <Row type="flex" justify="center" align="middle">
                    <Col span="4">{{$t('page.label.name')}}</Col>
                    <Col span="20">
                        <Input v-model="page.title" />
                    </Col>
                </Row>
                <template slot="footer">
                    <Button type="primary" @click="handleAdd">{{$t('action.new')}}</Button>
                </template>
            </Modal>
        </Content>
    </Layout>
</template>

<script>
export default {
    data: function() {
        return {
            pages: [],
            is_show_add_modal: false,
            is_show_action: false,
            page: {
                title: ""
            }
        };
    },
    methods: {
        initPages: function() {
            var _this = this;
            var data = {
                params: {
                    parent: this.$route.params.partition_uuid
                }
            };
            axios.get("pages", data).then(function(resp) {
                _this.pages = resp.data.data;
            });
        },
        handleDelete: function(uuid) {
            var _this = this;
            axios.delete("pages/" + uuid).then(function(resp) {
                _this.initPages();
                _this.$router.push({
                    name: "page"
                });
            });
        },
        showAddModal: function() {
            this.is_show_add_modal = true;
        },
        handleAdd: function() {
            var _this = this;
            this.page.parent = this.$route.params.partition_uuid;
            axios.post("pages", this.page).then(function(resp) {
                _this.initPages();
                _this.is_show_add_modal = false;
            });
        }
    },
    watch: {
        $route: function(to, from) {
            this.initPages();
        }
    },
    mounted: function() {
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
            height: 100%;
        }
    }
}
</style>

