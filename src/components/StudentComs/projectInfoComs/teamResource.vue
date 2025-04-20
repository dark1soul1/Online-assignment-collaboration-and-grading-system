<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180" />
      <el-table-column prop="name" label="资源" width="180" />
      <el-table-column prop="fileLayout" label="文件格式" />
    </el-table>
</template>
<script lang="ts" setup>
  const tableData = [
    {
      date: '2016-05-03',
      name: '1',
      fileLayout: '.pdf',
    },
    {
      date: '2016-05-02',
      name: '2',
      fileLayout: '.zip',
    },
    {
      date: '2016-05-04',
      name: '3',
      fileLayout: '.rar',
    },
    {
      date: '2016-05-01',
      name: '4',
      fileLayout: 'txt',
    },
  ]
</script>