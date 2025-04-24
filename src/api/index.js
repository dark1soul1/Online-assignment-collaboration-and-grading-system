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
export async function getPersonalInfo() {
  return request('GET', `/user/${id}`);
}
//个人信息更新
export async function updatePersonalInfo(data) {
  return request('PUT', '/user',data );
}
//学生作业查询
export async function getStudentWork(){
  return request ('GET',`/user/${id}`);
}
//学生作业提交
export async function updateWork(data){
  return request ('POST',`assignment`,data);
}
//学生加入老师团队
export async function joinTeam(data){
  return request ('GET','/teams',data);
}
//老师作业查询
export async function getWork(){
  return request ('GET',`/assignment/${id}`);
}