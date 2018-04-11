/**
 * 用户管理菜单目录 -  所有请求接口
 */
import request from '../utils/request';

// 用户管理 - 获取所有注册列表
export async function queryAllChannel() {
  return request('/modules/manage/user/registerChannelEnum.htm');
}

// 用户管理 - 用户信息管理列表
export async function queryUserInfoList(params) {
  const { pageSize, currentPage, searchParams } = params;
  const paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/user/list.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 用户管理 - 单个用户详细信息
export async function queryUserInfoDetail(params) {
  // console.log(params, 'params2');
  return request(`/modules/manage/user/detail.htm?userId=${params}`);
}
