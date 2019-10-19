<template>
  <div class="warpper">
    <img class="background" src="../images/background.jpg" />
    <Row type="flex" justify="center" align="middle">
      <Card class="login-warpper">
        <p slot="title">{{$t('login.title')}}</p>
        <Form label-position="top">
            <FormItem :label="$t('login.label.username')">
                <Input v-model="user.username"/>
            </FormItem>
            <FormItem :label="$t('login.label.password')">
                <Input  v-model="user.password" type="password"/>
            </FormItem>
            <FormItem>
              <Checkbox v-model="remember_me" >
                <span>{{$t('login.label.remember-me')}}</span>
              </Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleLogin" long>{{$t('login.label.login')}}</Button>
            </FormItem>
        </Form>
      </Card>
    </Row>
  </div>
</template>

<script>
export default {
    data:function(){
        return {
            user:{

            },
            remember_me:false
        }
    },
    methods:{
        handleLogin:function(){
          var _this=this;
            axios.post('login',this.user).then(function(resp){
                axios.defaults.headers.common['Authorization']=resp.data.token_type+" "+resp.data.access_token;
                if(_this.remember_me){
                  localStorage.setItem('Authorization',axios.defaults.headers.common['Authorization']);
                }
                _this.$router.push({name:"notebook"});
            }).catch(function(error){
              _this.$Message.error({content:_this.$t('msg.login-failed')});
            });
        }
    },
    mounted:function(){
        if(this.checkLogin()){
            return this.$router.push({name:"notebook"});
        }
    }
};
</script>
<style lang="less" scoped>
.warpper {
  position: fixed;
  height: 100%;
  width: 100%;
  .background {
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -5;
  }
  .ivu-row-flex {
    height: 100%;
  }
  .login-warpper {
      width: 280px;
  }
}
</style>
