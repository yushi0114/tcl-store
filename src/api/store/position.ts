import type {
  AddPositionParams,
  UpdatePositionParams,
  PositionResultModel,
} from './model/positionModel';
import { arrayToObject } from '/@/utils';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  PositionList = '/store/position/list',
  AddPosition = '/store/position/add',
  DeletePosition = '/store/position/delete',
  UpdatePosition = '/store/position/update',
}

export const addPosition = (data?: AddPositionParams) =>
  defHttp.post<null>(
    { url: Api.AddPosition, data },
    {
      successMessageMode: 'message',
    },
  );

export const updatePosition = (data?: UpdatePositionParams) =>
  defHttp.post<null>(
    { url: Api.UpdatePosition, data },
    {
      successMessageMode: 'message',
    },
  );

export const deletePosition = (data: Pick<PositionResultModel, 'id'>) =>
  defHttp.post<null>(
    { url: Api.DeletePosition, data },
    {
      successMessageMode: 'message',
    },
  );

export const getPositionOptions = async ({ isMap = false } = {}) => {
  const res = await defHttp.get<LabelValueOptions<number>>({ url: Api.PositionList });
  return arrayToObject(res ?? [], isMap);
};
