import request from "../utils/request";

/**减免审核**/
// 分页减免审核列表
export async function findDeductListByPage(params) {
  const { pageSize, currentPage, searchParams, status } = params;
  const paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${searchParams}&status=${status}`;
  return request('/modules/manage/deduct/findDeductListByPage.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 批量通过审核
export async function updateListByIds(params) {
  const { ids } = params;
  const paramsStr = `ids=${ids}`;
  return request('/modules/manage/deduct/updateListByIds.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 通过 或拒绝（修改状态）
export async function updateDeductStatus(params) {
  const { id, status, desc } = params;
  const paramsStr = `id=${id}&status=${status}&desc=${desc}`;
  return request('/modules/manage/deduct/updateDeductStatus.htm', {
    method: 'POST',
    body: paramsStr,
  });
}
/**查账审核**/
// 0.条件枚举
export async function queryConfirmStatusStr() {
  return request('/modules/manage/account/statusinfo.htm', {
    method: 'POST',
  });
}

// 1.查账列表
export async function queryConfirmlist(params) {
  const { pageSize, currentPage, searchParams} = params;
  const paramsStr = `pageSize=${pageSize}&currentPage=${currentPage}&searchParams=${encodeURIComponent(searchParams)}`;
  return request('/modules/manage/account/repayconfirmlist.htm',{
    method: 'POST',
    body: paramsStr,
  });
}

// 2 订单 - 查账详情
export async function queryConfirmOrderDetail(params) {
  const paramsStr = `rcId=${params}`;
  return request('/modules/manage/account/repayconfirmdetail.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 3 订单 - 查账审核 - 通过/拒绝
export async function actionConfirmorderStatus(params) {
  const { rcId, status, refusedCause, payserialNumber } = params;
  const paramsStr = `rcId=${rcId}&status=${status}&refusedCause=${refusedCause}&payserialNumber=${payserialNumber}`;
  return request('/modules/manage/account/repayconfirmAudit.htm',{
    method: 'POST',
    body: paramsStr,
  });
}

/**人工入账**/

// 分页减免审核列表
export async function overdueorderlist(params) {
  const { phone, orderNo } = params;
  const paramsStr = `phone=${phone}&orderNo=${orderNo}`;
  return request('/modules/manage/account/overdueorderlist.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 代扣
export async function daikou(params) {
  const { userId, orderId, amount } = params;
  const paramsStr = `userId=${userId}&orderId=${orderId}&amount=${amount}`;
  return request('/modules/manage/account/daikou.htm', {
    method: 'POST',
    body: paramsStr,
  });
}

// 抓取角色身份
export async function sysUserInfo() {
  return request('/modules/manage/sys/sysUserInfo.htm', {
    method: 'POST',
  });
}

// 减免
export async function jianmian(params) {
  const { useAmount, amount, planId, orderId, userId } = params;
  const paramsStr = `useAmount=${useAmount}&amount=${amount}&planId=${planId}&orderId=${orderId}&userId=${userId}`;
  return request('/modules/manage/deduct/save.htm', {
    method: 'POST',
    body: paramsStr,
  });
}
// 查账
export async function chazhang(params) {
  return request('/modules/manage/account/repayconfirm.htm', {
    method: 'POST',
    body: params,
    contentType: 'formData'
  });
}
