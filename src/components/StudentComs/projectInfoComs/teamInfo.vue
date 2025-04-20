<template>
    <div class="card">
        <h5 class="card-header">团队介绍</h5>
        <div class="card-body">
            <p></p>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header">主管简介</h5>
        <div class="card-body">
            <p></p>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header">团队公告</h5>
        <div class="card-body">
            <p></p>
        </div>
    </div>
</template>

<style scoped>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
}
.card-header {
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .03);
    border-bottom: 1px solid rgba(0, 0, 0, .125);
}
.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1.25rem;
}
.card-body p {
    line-height: 2em;
}
</style>