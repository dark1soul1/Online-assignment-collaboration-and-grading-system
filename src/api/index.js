import { request } from "./apiService";

//登录接口
export async function login(data) {
  return request('POST', '/login',data );
}
//注册接口
export async function register(data) {
  return request('POST', '/user',data );
}



//用户信息查询
export async function getPersonalInfo(id) {
  return request('GET', `/user/${id}`);
}
//用户信息更新
export async function updatePersonalInfo(data) {
  return request('PUT', '/user',data );
}
//用户头像查询
export async function getPersonalAvatar(id) {
  return request('GET', `/image`,id);
}



//学生作业查询
export async function getStudentWork(id){
  return request ('GET',`/assignments/${id}`);
}
//学生作业提交
export async function submiteWork(data){
  return request ('POST',`submission`,data);
}

//学生模糊搜索查询老师、团队
export async function searchTeacher(data){
  return request ('GET','/teams',data);
}
//学生加入老师团队
export async function joinTeam(data){
  return request ('GET','/addUser',data);
}
//学生查团队
export async function getTeam(sid){
  return request ('GET',`/teamSid`,sid);
}
//学生查团队信息
export async function getTeamInfo(tid){
  return request ('GET',`/teamStid`,tid);
}
//学生查团队资源
export async function getTeamResource(tid){
  return request ('GET',`/getFile`,tid);
}
//学生查评分
export async function getScore(sid){
  return request ('GET',`grades/${sid}`);
}




//老师新建作业
export async function createWork(data){
  return request ('POST','/assignments',data);
}
//老师查询作业（所有）
export async function getWork(tid){
  return request ('GET',`/teacher/${tid}`);
}
//老师更新作业
export async function updateWork(data){
  return request ('PUT',`/assignment`,data);
}
//老师删除作业
export async function deleteWork(id){
  return request ('DELETE',`/assignment/${id}`);
}

//老师查询提交记录
export async function getSubmission(data){
  return request ('GET',`/submission`,data);
}
//老师提交记录查文件
export async function getFile(id){
  return request ('GET',`/getTeam`,id);
}

//老师评分
export async function gradeWork(data){
  return request ('POST',`/grade`,data);
}
//老师更新评分
export async function updateGrade(data){
  return request ('PUT',`/grade`,data);
}

//老师查团队信息
export async function getTeamTid(tid){
  return request ('GET',`/teamTid`,tid);
}
//老师修改团队信息
export async function updateTeam(data){
  return request ('PUT',`/teamTid`,data);
}