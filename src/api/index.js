import { request } from "./apiService";

//登录接口
export async function login(data) {
  return request('POST', '/login',data );
}
//注册接口
export async function register(data) {
  return request('POST', '/user',data );
}



//个人信息查询
export async function getPersonalInfo(id) {
  return request('GET', `/user/${id}`);
}
//个人信息更新
export async function updatePersonalInfo(data) {
  return request('PUT', '/user',data );
}



//学生作业查询
export async function getStudentWork(id){
  return request ('GET',`/assignments/${id}`);
}
//学生作业提交
export async function submiteWork(data){
  return request ('POST',`submission`,data);
}
//学生加入老师团队
export async function joinTeam(data){
  return request ('GET','/teams',data);
}



//老师新建作业
export async function createWork(data){
  return request ('POST','/assignments',data);
}
//老师查询作业
export async function getWork(id){
  return request ('GET',`/teacher/${id}`);
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
  return request ('GET',`/submission/`,data);
}