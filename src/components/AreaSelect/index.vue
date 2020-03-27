<template>
  <span>
    <el-cascader
      :options="areaList"
      @change="handleAreaChange"
      :props="areaSelectProps"
      change-on-select
      placeholder="请选择区域"
      v-model="areaPath"
      class="mr5"
      clearable
    ></el-cascader>
    <el-cascader
      v-if="hasSchoolSelect"
      :options="schoolList"
      :props="schoolSelectProps"
      @change="handleSchoolChange"
      placeholder="请选择学校"
      class="mr5"
      clearable
    ></el-cascader>
  </span>
</template>

<script>
  import {getAreaList, getSchoolList} from '@/api/commons'
  export default {
    name: 'AreaSelect',
    props: {
      parentAreaId: {
        type: String
      },
      hasSchoolSelect: {
        type: Boolean,
        default: true
      },
      onChange: {
        type: Function 
      },
      selectAreaPath: {
        type: Array,
        default: function () {
          return []
        }
      }
    },

    data() {
      return {
        selectedData: {
          baseAreaId: '',
          areaName: '',
          baseSchoolId: '',
        },
        areaList: [],
        schoolList: [],
        areaSelectProps: {
          value: 'baseAreaId',
          label: 'areaName',
          children: 'children'
        },
        schoolSelectProps: {
          value: 'baseSchoolId',
          label: 'schoolName', 
        },
        areaPath: this.selectAreaPath
      };
    },

    async created(){
      //获取第一级区域id
      let areaList = await getAreaList(this.parentAreaId);
      areaList = areaList.map(v => {
        if(v.childCnt > 0){
          v.children = [];
        }
        return v;
      })
      this.areaList = areaList;

      //如果存在selectAreaPath,就进行数据回填
      if(this.selectAreaPath.length > 0){
        this.areaPath = this.selectAreaPath;
        this.initAreaDate();
      }
    },

    watch: {
      // 监听 selectAreaPath 变化，如果有值就进行数据回填
      selectAreaPath: function(newValue, oldValue) {
        if(newValue.length > 0) {
          this.initAreaDate();
          this.areaPath = newValue;
        }
      }
    },

    methods: {

      //改变区域选择的内容
      handleAreaChange(areaIds) {
        const selectedAreaId = areaIds[areaIds.length -1];
        let selectedAreaName = '';

        let selectIndex = 0;
        setAreaList(this.areaList);
        function setAreaList (areaList) {
          areaList.map(areaInfo => {
           if(areaIds[selectIndex] && areaInfo.baseAreaId == areaIds[selectIndex]){
                if(selectIndex != areaIds.length -1){
                  selectIndex = selectIndex + 1;
                  setAreaList(areaInfo.children);
                }else{
                  if(areaInfo.children.length === 0){

                    //保存当前选中的区域名称
                    selectedAreaName = areaInfo.areaName;

                    //请求下级区域
                    getAreaList(selectedAreaId).then(data => {
                      data = data.map(v => {
                        if(v.childCnt > 0){
                          v.children = [];
                        }
                        return v;
                      });
                      areaInfo.children = data;
                    })
                  }
                }
              } 
          })
        }

        //如果配置了学校，就获取学校列表
        if(this.hasSchoolSelect){
          if(areaIds.length > 0) {
            this.setSchoolList(selectedAreaId);
          } else {
            this.schoolList = [];
          }
        }

        // 保存当前选中的值
        let selectDate = this.selectedData;
        selectDate.baseAreaId = selectedAreaId;
        selectDate.areaName = selectedAreaName;
        this.selectedData = selectDate;
        this.onChange(selectDate);
      },

      // 改变学校下拉选择
      handleSchoolChange (v) {
        const selectedSchoolId = v[0];

        // 保存当前选中的值
        let selectDate = this.selectedData;
        selectDate.baseSchoolId = selectedSchoolId;
        this.selectDate = selectDate;
        this.onChange(selectDate);
      },

       // 获取学校列表
      setSchoolList (selectedAreaId) {
        getSchoolList(selectedAreaId).then(data => {
          this.schoolList = data;
        }) 
      },

      // 回填区域级联选择数据
      async initAreaDate () {

        //添加学校下拉
        this.setSchoolList(this.selectAreaPath[this.selectAreaPath.length -1]);

        let nextAreaList = this.areaList;
        for(let i=0; i< this.selectAreaPath.length; i++){
          let areaList = await getAreaList(this.selectAreaPath[i]);
          
          areaList = areaList.map(v => {
            if(v.childCnt > 0){
              v.children = [];
            }
            return v;
          });

          nextAreaList.map(areaInfo => {
            if(areaInfo.baseAreaId === this.selectAreaPath[i]){
              areaInfo.children = areaList;
              nextAreaList = areaList;
            }
          })
        }
      }
    }
  };
</script>

