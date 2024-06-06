import { PolylineEdge, PolylineEdgeModel, h } from "@logicflow/core";
//EqualConnector
class EqualConnectorModel extends PolylineEdgeModel {
  setAttributes() {
    this.updateText("《equal》");
  }
  getEdgeStyle() {
    return super.getEdgeStyle();
  }
}
class EqualConnector extends PolylineEdge {
  getEndArrow() {
    //渲染文字
    return h("g", { transform: "translate(-12, 20)" }, [
      h(
        "text",
        {
          "font-size": 12,
        },
        [1]
      ),
    ]);
  }
  getStartArrow() {
    //渲染文字
    return h("g", { transform: "translate(4, 20)" }, [
      h(
        "text",
        {
          "font-size": 12,
        },
        [1]
      ),
    ]);
  }
}
export const equal_connector = {
  type: "equal_connector",
  view: EqualConnector,
  model: EqualConnectorModel,
};

//BiDirectionConnector
class BidirectionConnectorModel extends PolylineEdgeModel {
  setAttributes() {
    this.updateText("《bidirection》");
  }
  getEdgeStyle() {
    return super.getEdgeStyle();
  }
}
class BidirectionConnector extends PolylineEdge {
  getStartArrow() {
    //渲染文字
    return h("g", { transform: "translate(4, 20)" }, [
      h(
        "text",
        {
          "font-size": 12,
        },
        ["0...1"]
      ),
    ]);
  }
  getEndArrow() {
    //渲染文字
    return h("g", { transform: "translate(-20, 20)" }, [
      h(
        "text",
        {
          "font-size": 12,
        },
        ["0...*"]
      ),
    ]);
  }
}
export const bidirection_connector = {
  type: "bidirection_connector",
  view: BidirectionConnector,
  model: BidirectionConnectorModel,
};

//UnidirectionConnector
class UnidirectionConnectorModel extends PolylineEdgeModel {
  setAttributes() {
    this.updateText("《unidirection》");
  }
  getEdgeStyle() {
    return super.getEdgeStyle();
  }
}
class UnidirectionConnector extends PolylineEdge {
  getStartArrow() {
    //渲染文字
    return h("g", { transform: "translate(4, 16)" }, [
      h(
        "text",
        {
          "font-size": 12,
        },
        ["0...1"]
      ),
    ]);
  }
  getEndArrow() {
    //渲染文字
    const { model } = this.props;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      fill: "none",
      stroke: stroke,
      strokeWidth: strokeWidth,
    };
    //渲染文字
    return h("g", {}, [
      h(
        "text",
        {
          transform: "translate(-24, 16)",
          "font-size": 12,
        },
        ["0...1"]
      ),
      h("path", {
        ...pathAttr,
        d: "M -8 -8 L 0 0 M -8 8 L 0 0",
      }),
    ]);
  }
}
export const unidirection_connector = {
  type: "unidirection_connector",
  view: UnidirectionConnector,
  model: UnidirectionConnectorModel,
};
