import type {
  SaleOrderPageParams,
  AddSaleOrderParams,
  UpdateSaleOrderParams,
  SaleOrderPageResultModel,
  SaleOrderResultModel,
} from './model/saleModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  IncomeList = '/store/sale/list',
  AddIncome = '/store/sale/add',
  DeleteIncome = '/store/sale/delete',
  UpdateIncome = '/store/sale/update',
  TypeOptions = '/store/sale/type',
  ExportSale = '/store/sale/export',
}

export const getSaleOrderPage = (data?: SaleOrderPageParams) =>
  defHttp.post<SaleOrderPageResultModel>({ url: Api.IncomeList, data });

export const addSaleOrder = (data?: AddSaleOrderParams) =>
  defHttp.post<null>(
    { url: Api.AddIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const updateSaleOrder = (data?: UpdateSaleOrderParams) =>
  defHttp.post<null>(
    { url: Api.UpdateIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const deleteSaleOrder = (data: Pick<SaleOrderResultModel, 'id'>) =>
  defHttp.post<null>(
    { url: Api.DeleteIncome, data },
    {
      successMessageMode: 'message',
    },
  );

export const exportSaleOrder = (data: Pick<SaleOrderResultModel, 'type' | 'model'>) =>
  defHttp.post<Blob>(
    { url: Api.ExportSale, data, responseType: 'arraybuffer' },
    {
      isTransformResponse: false,
    },
  );
