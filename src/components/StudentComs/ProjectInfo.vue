<template>
    <div class="pro-container">
        <div class="col-1">
            <h5 class="col-name">
                <div style="color: #6c757d;">
                    <strong>团队信息</strong>
                </div>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==1}" @click="userStore.changeActive(1)">详情</a>
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==2}" @click="userStore.changeActive(2)">团队资源</a>
            </div>
        </div>
        <div class="col-2 col-gap">
             <teamInfo v-if="userStore.proIsActive==1" />
             <teamResource v-if="userStore.proIsActive==2" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../../store';
import teamInfo from './projectInfoComs/teamInfo.vue';
import teamResource from './projectInfoComs/teamResource.vue';

const userStore = useUserStore();
</script>

<style scoped>
.pro-container{
  display: flex;
  flex-wrap: wrap;
}
.col-1 {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
}
.col-2 {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
}
.col-1,.col-2{
    padding-left: 15px;
    padding-right: 15px;
}
.col-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: large;
}
.col-list {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-top: 12px;
    margin-bottom: 0;
    border-radius: .25rem;
}
.col-list-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #f5f5f5;
    width: 100%;
    color: #495057;
    text-align: inherit;
}
.col-list-item:first-child {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
}
.list-group-item:last-child {
    border-bottom-right-radius: inherit;
    border-bottom-left-radius: inherit;
}
.col-list-item.active {
    z-index: 2;
    color: #fff;
    background-color: #409eff;
    border-color: #6db5fc;
}
</style>