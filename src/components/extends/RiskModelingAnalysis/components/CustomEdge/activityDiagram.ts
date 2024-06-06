import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";

//ObjectFlow
class ObjectFlowModel extends PolylineEdgeModel {}
class ObjectFlow extends PolylineEdge {
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
export const object_flow = {
  type: "object_flow",
  view: ObjectFlow,
  model: ObjectFlowModel,
};

//ControlFlow
class ControlFlowModel extends PolylineEdgeModel {
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.strokeDasharray = "4 4";
    return style;
  }
}
class ControlFlow extends PolylineEdge {
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
export const control_flow = {
  type: "control_flow",
  view: ControlFlow,
  model: ControlFlowModel,
};
