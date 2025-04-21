<template>
    <div class="pro-container">
        <div class="col-1">
            <h5 class="col-name">
                <span style="color: #6c757d;">
                    <strong>团队信息</strong>
                </span>
            </h5>
            <div class="col-list">
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==1}" @click="userStore.changeActive(1)">详情</a>
                <a href="#" :class="{'col-list-item':true,' active':userStore.proIsActive==2}" @click="userStore.changeActive(2)">团队资源</a>
            </div>
        </div>
        <div class="col-2">
             <teamInfo v-if="userStore.proIsActive==1" />
             <teamResource v-if="userStore.proIsActive==2" />
        </div>
    </div>
</template>

<script setup>
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