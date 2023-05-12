import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RolePageParams,
  AccountListItem,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '@/utils/http/axios';
import { arrayToObject } from '/@/utils';

enum Api {
  AccountList = '/user/page',
  IsAccountExist = '/user/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/role/list',
  AddUser = '/user/add',
  UpdateUser = '/user/update',
  DeleteUser = '/user/delete',
}

export const getAccountList = (data: AccountParams) =>
  defHttp.post<AccountListGetResultModel>({ url: Api.AccountList, data });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = async ({ isMap = false } = {}) => {
  const res = await defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList });
  return arrayToObject(res, isMap);
};

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (username: string) =>
  defHttp.post({ url: Api.IsAccountExist, data: { username } }, { errorMessageMode: 'none' });

export const addUser = (data: AccountListItem) => defHttp.post({ url: Api.AddUser, data });
export const updateUser = (data: AccountListItem) => defHttp.post({ url: Api.UpdateUser, data });
export const deleteUser = (data: AccountListItem) => defHttp.post({ url: Api.DeleteUser, data });
