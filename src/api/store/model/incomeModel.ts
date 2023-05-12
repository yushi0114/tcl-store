/**
 * IncomingOrderResultModel
 * @desc 入库单
 */
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export interface IncomingOrderResultModel {
  /**
   * 创建人
   */
  createBy: string;
  /**
   * 创建时间
   */
  createTime: Date;
  /**
   * 主键
   */
  id: string;
  /**
   * 型号
   */
  model: string;
  /**
   * 仓位
   */
  position: number;
  /**
   * 单价
   */
  price: number;
  /**
   * 数量
   */
  quantity: number;
  /**
   * 品类
   */
  type: string;
  /**
   * 更新人
   */
  updateBy: string;
  /**
   * 更新时间
   */
  updateTime: Date;
}

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type IncomingOrderPageParams = BasicPageParams & {
  type?: string;
  model?: string;
};

export type AddIncomingOrderParams = Pick<
  IncomingOrderResultModel,
  'model' | 'type' | 'position' | 'price' | 'quantity'
>;

export type UpdateIncomingOrderParams = AddIncomingOrderParams &
  Pick<IncomingOrderResultModel, 'id'>;

/**
 * @description: Request list return value
 */
export type IncomingOrderPageResultModel = BasicFetchResult<IncomingOrderResultModel>;
