import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";
class TriggerModel extends PolylineEdgeModel {}
class Trigger extends PolylineEdge {
  getEndArrow() {
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "none",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    // 半箭
    return h("path", {
      ...pathAttr,
      d: "M -8 -8 L 0 0 M -8 8 L 0 0",
    });
  }
}
export const trigger = {
  type: "trigger",
  view: Trigger,
  model: TriggerModel,
};
