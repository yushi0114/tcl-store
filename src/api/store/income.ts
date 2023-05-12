import type {
  IncomingOrderPageParams,
  AddIncomingOrderParams,
  UpdateIncomingOrderParams,
  IncomingOrderPageResultModel,
  IncomingOrderResultModel,
} from './model/incomeModel';
import { defHttp } from '/@/utils/http/axios';
import { arrayToObject } from '@/utils';

enum Api {
  IncomeList = '/store/income/list',
  AddIncome = '/store/income/add',
  DeleteIncome = '/store/income/delete',
  UpdateIncome = '/store/income/update',
  TypeOptions = '/store/income/type',
}

export const getIncomingOrderPage = (data?: IncomingOrderPageParams) =>
  defHttp.post<IncomingOrderPageResultModel>({ url: Api.IncomeList, data });

export const addIncomingOrder = (data?: AddIncomingOrderParams) =>
  defHttp.post<null>(
    { url: Api.AddIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const updateIncomingOrder = (data?: UpdateIncomingOrderParams) =>
  defHttp.post<null>(
    { url: Api.UpdateIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const deleteIncomingOrder = (data: Pick<IncomingOrderResultModel, 'id'>) =>
  defHttp.post<null>(
    { url: Api.DeleteIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const getTypeOptions = async ({ isMap = false } = {}) => {
  const res = await defHttp.get<LabelValueOptions<number>>({ url: Api.TypeOptions });
  return arrayToObject(res ?? [], isMap);
};
