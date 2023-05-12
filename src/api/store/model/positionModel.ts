/**
 * PositionResultModel
 * @desc 入库单
 */

export interface PositionResultModel {
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
  label: string;
  description?: string;
  /**
   * 更新人
   */
  updateBy: string;
  /**
   * 更新时间
   */
  updateTime: Date;
}

export type AddPositionParams = Pick<PositionResultModel, 'label' | 'description'>;

export type UpdatePositionParams = AddPositionParams & Pick<PositionResultModel, 'id'>;
