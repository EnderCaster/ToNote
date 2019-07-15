<template>
  <Row type="flex" justify="center" align="middle">
    <Col span="12">
      <Card>
        <p slot="title">{{$t('notebook.header')}}</p>
        <Tabs>
          <TabPane :label="$t('notebook.list-header')">
              <Row>
                  <Col span="4">
                    <Button long size="small">{{$t("action.new")}}</Button>
                  </Col>
                  <Col span="16">
                  &nbsp;
                  </Col>
                  <Col span="4">
                    <Button long size="small">{{$t("action.manage")}}</Button>
                  </Col>
              </Row>
              <hr />
              <Row type="flex" justify="center" align="middle" v-for="(notebook,index) in notebooks" :key="index">
                <a @click="handleSelect(index)">{{notebook.name}}</a>
              </Row>
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
</template>

<script>
export default {
  data: function() {
    return {
      notebooks: [
      ]
    };
  },
  methods:{
      handleSelect:function(index){
          this.$router.push({
              name:"partition",
              params:{
                  notebook_uuid:this.notebooks[index].uuid
              }
          })
      }
  },
  mounted:function(){
    var _this=this;
    axios.get('notebooks').then(function(resp){
      _this.notebooks=resp.data;
    })
  }
  
};
</script>

<style>
</style>
