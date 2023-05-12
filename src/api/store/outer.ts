import type {
  OuterOrderPageParams,
  AddOuterOrderParams,
  UpdateOuterOrderParams,
  OuterOrderPageResultModel,
  OuterOrderResultModel,
} from './model/outerModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  OuterList = '/store/outer/list',
  AddOuter = '/store/outer/add',
  DeleteOuter = '/store/outer/delete',
  UpdateOuter = '/store/outer/update',
  PositionOptions = '/store/outer/position',
  ExportOuter = '/store/outer/export',
}

export const getOuterOrderPage = (data?: OuterOrderPageParams) =>
  defHttp.post<OuterOrderPageResultModel>({ url: Api.OuterList, data });

export const addOuterOrder = (data?: AddOuterOrderParams) =>
  defHttp.post<null>(
    { url: Api.AddOuter, data },
    {
      successMessageMode: 'message',
    },
  );

export const updateOuterOrder = (data?: UpdateOuterOrderParams) =>
  defHttp.post<null>(
    { url: Api.UpdateOuter, data },
    {
      successMessageMode: 'message',
    },
  );

export const deleteOuterOrder = (data: Pick<OuterOrderResultModel, 'id'>) =>
  defHttp.post<null>(
    { url: Api.DeleteOuter, data },
    {
      successMessageMode: 'message',
    },
  );

export const exportOuterOrder = (data: Pick<OuterOrderResultModel, 'type' | 'model'>) =>
  defHttp.post<Blob>(
    { url: Api.ExportOuter, data, responseType: 'arraybuffer' },
    {
      isTransformResponse: false,
    },
  );
