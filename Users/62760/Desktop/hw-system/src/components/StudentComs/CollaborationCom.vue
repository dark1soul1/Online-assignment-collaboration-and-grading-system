
// 提交任务
const submitTask = () => {
    if (selectedTask.value) {
        console.log('提交任务:', selectedTask.value);

        // 根据任务类型获取编辑器内容
        let content = '';
        if (currentTaskType.value === 'code') {
            content = codeContent.value; // 代码编辑器内容
        } else if (currentTaskType.value === 'text') {
            content = valueHtml.value; // 富文本编辑器内容
        } else if (currentTaskType.value === 'attachment') {
            console.warn('文件上传任务无需提交内容');
            return;
        }

        // 创建 Blob 对象并生成下载链接
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // 创建隐藏的 <a> 标签并触发下载
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedTask.value.title}.txt`; // 文件名
        document.body.appendChild(a);
        a.click();

        // 清理资源
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 调用后端接口提交任务
        const submissionData = {
            userId: 14, // 示例用户ID
            assignmentId: selectedTask.value.id,
            filePath: `/submissions/${selectedTask.value.title}.txt`, // 文件路径
            version: 1 // 示例版本号
        };
        submiteWork(submissionData).then(response => {
            console.log('任务提交成功:', response);
        }).catch(error => {
            console.error('任务提交失败:', error);
        });
    }
};
