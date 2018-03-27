<template >
  <div class="block-one">
    <el-row>
      <el-form class="inline-wrap" :inline="true" :model="formInline">
      <el-col :span="8">
        <el-form-item label="姓名:">
          <el-input v-model="formInline.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item>
          <el-radio-group v-model="formInline.sex">
            <el-radio :label="1" border size="small">男</el-radio>
            <el-radio :label="2" border size="small">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年龄">
          <el-input v-model="formInline.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
       </el-col>
        <el-col :span="4">
          <el-form-item >
            <el-button type="primary" @click="addBtn">添加</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-table
      :data = "tablea"
      style="width: 100%">
      <el-table-column
        :label="allMan"
        width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column
        :label="sexNum"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      size="mini"
      type="danger"
      @click="analysisOpen()">点击开始分析</el-button>
  </div>
</template>

<script>
  import {Bus} from '../bus.js'
export default {
  data () {
    return {
      sex:'',
      formInline: {
        name:'',
        sex:1,
        age:0
      },
      tableData: [],
      tableDataSearch: []
    }
  },
  created(){
    this.tableData = JSON.parse(localStorage.getItem("tableData"));
  },
  methods:{
    addBtn () {
      var obj = {
        name:this.formInline.name,
        sex:this.formInline.sex,
        age:this.formInline.age
      }
      this.tableData.push(obj);
      localStorage.setItem('tableData',JSON.stringify(this.tableData));
      Bus.$emit('add-tableData', this.tableData);
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1);
      var contrastdata = JSON.parse(localStorage.getItem('tableData'));
      contrastdata.splice(index,1);
      localStorage.setItem('tableData',JSON.stringify(contrastdata));
    },
    searchUserArr(namedata){
      console.log(namedata);
      return this.tableDataSearch = this.tableData.filter(item => item.name == namedata)
    },
    refresh(){
      return this.tableDataSearch = [];
    },
    analysisOpen () {
      Bus.$emit('analysis-open', true);
    }
  },
  computed:{
    tablea () {
      return this.tableDataSearch.length ? this.tableDataSearch : this.tableData;
    },
    allMan(){
      return '姓名有'  + this.tableData.length + '人';
    },
    sexNum(){
      var sexM = 0;
      var sexW = 0;
      for(var i = 0;i < this.tableData.length; i++){
        if(this.tableData[i].sex === 1){
          sexM++;
        }else if(this.tableData[i].sex === 2){
          sexW++;
        }
      }
      return '性别男:'  + sexM + '人|女:' + sexW + '人';
    }
  },
  mounted () {
    Bus.$emit('add-tableData', this.tableData);
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/base';
  .block-one{
    @include el-main-block;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .inline-wrap{
    max-height: 60px;
  }
  .el-form-item{
    line-height: 40px;
  }

</style>
