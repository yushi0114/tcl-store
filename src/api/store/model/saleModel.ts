/**
 * SaleOrderResultModel
 * @desc 入库单
 */
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

/**
 * SaleOrderResultModel
 */
export interface SaleOrderResultModel {
  /**
   * 收货人地址
   */
  consigneeAddress?: string;
  /**
   * 收货人姓名
   */
  consigneeName?: string;
  /**
   * 收货人电话
   */
  consigneePhone?: string;
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 主键
   */
  id?: string;
  /**
   * 型号
   */
  model?: string;
  /**
   * 仓位
   */
  position?: number;
  /**
   * 单价
   */
  price?: number;
  /**
   * 数量
   */
  quantity?: number;
  /**
   * 备注
   */
  remark?: string;
  saleTime?: Date;
  /**
   * 品类
   */
  type?: number;
  /**
   * 更新人
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: Date;
}

export type SaleOrderPageParams = BasicPageParams & {
  type?: string;
  model?: string;
};

export type AddSaleOrderParams = Pick<
  SaleOrderResultModel,
  'model' | 'type' | 'position' | 'price' | 'quantity'
>;

export type UpdateSaleOrderParams = AddSaleOrderParams & Pick<SaleOrderResultModel, 'id'>;

/**
 * @description: Request list return value
 */
export type SaleOrderPageResultModel = BasicFetchResult<SaleOrderResultModel>;
