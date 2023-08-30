<template>
  <div>
    <u-button type="success" @click="jumpRouter">添加数据</u-button>
    <u-cell-group>
    	<u-cell-item v-for="(item,index) in arrData" :key="index" @click="jumpRouter1(item)" icon="share" :title="item.shortTitle.length>10?item.shortTitle.slice(0,10):item.shortTitle" :arrow="true" arrow-direction="right"></u-cell-item>
    </u-cell-group>
  </div>
</template>

<script>
import { memorandumGetAll } from '../../api/index/index';
export default {
  data() {
    return {
      arrData:[]
    }
  },
  created(){
    // console.log(this.mdValue1);
    // this.mdvalue1=`"<p>123123123</p><p><strong>123</strong></p><p><strong><em>123</em></strong></p><p><img src="blob:http://127.0.0.1:8080/193538a0-1dc0-4cd9-abff-98d00a1f12a3" data-local="blob:http://127.0.0.1:8080/193538a0-1dc0-4cd9-abff-98d00a1f12a3" alt="图像"></p>"`
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      memorandumGetAll().then(res=>{
        console.log(res.data);
        this.arrData=res.data
      })
    },
    jumpRouter(){
      this.$u.route({
        params: undefined,
				url: '/pages/index/add/editor'
			})
    },
    jumpRouter1(item){
      this.$u.route({
        params: {...item},
				url: '/pages/index/info'
			})
    },
  }
}
</script>

<style>

</style>
