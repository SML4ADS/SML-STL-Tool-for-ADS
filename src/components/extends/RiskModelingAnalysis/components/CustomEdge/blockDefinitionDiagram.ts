import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";

//Generalization
class GeneralizatioinModel extends PolylineEdgeModel {
  setAttributes() {}
  getEdgeStyle() {
    return super.getEdgeStyle();
  }
}
class Generalizatioin extends PolylineEdge {
  getEndArrow() {
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "white",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    // 半圆
    return h("path", {
      ...pathAttr,
      d: "M 0 0 -10 -5 -10 5 z",
    });
  }
}
export const generalization = {
  type: "generalization",
  view: Generalizatioin,
  model: GeneralizatioinModel,
};

//Dependency
class DependencyModel extends PolylineEdgeModel {
  setAttributes() {
    this.updateText("dependency");
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.strokeDasharray = "4 4";
    return style;
  }
}
class Dependency extends PolylineEdge {
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
export const dependency = {
  type: "dependency",
  view: Dependency,
  model: DependencyModel,
};

//Aggregation
class AggregationModel extends PolylineEdgeModel {
  // setAttributes() {
  //   this.updateText("aggregation");
  // }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    return style;
  }
}
class Aggregation extends PolylineEdge {
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
  getStartArrow() {
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "#fff",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    // 半箭
    return h("path", {
      ...pathAttr,
      d: "M 12 -6 L 24 0 L 12 6 L 0 0 Z",
    });
  }
}
export const aggregation = {
  type: "aggregation",
  view: Aggregation,
  model: AggregationModel,
};

//Composition
class CompositionModel extends PolylineEdgeModel {
  // setAttributes() {
  //   this.updateText("composition");
  // }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    return style;
  }
}
class Composition extends PolylineEdge {
  getEndArrow() {
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "#fff",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    // 半箭
    return h("path", {
      ...pathAttr,
      d: "M -8 -8 L 0 0 M -8 8 L 0 0",
    });
  }
  getStartArrow() {
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "#000",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    // 半箭
    return h("path", {
      ...pathAttr,
      d: "M 12 -6 L 24 0 L 12 6 L 0 0 Z",
    });
  }
}
export const composition = {
  type: "composition",
  view: Composition,
  model: CompositionModel,
};
