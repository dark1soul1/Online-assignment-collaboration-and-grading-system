<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="论坛" width="180" />
      <el-table-column prop="message" label="消息(条)" width="180" />
      <el-table-column prop="date" label="最后一贴" />
    </el-table>
</template>
<script lang="ts" setup>
  const tableData = [
    {
      date: '2016-05-03',
      name: '1',
      message: '1000',
    },
    {
      date: '2016-05-02',
      name: '2',
      message: '10',
    },
    {
      date: '2016-05-04',
      name: '3',
      message: '100',
    },
    {
      date: '2016-05-01',
      name: '4',
      message: '1',
    },
  ]
</script>