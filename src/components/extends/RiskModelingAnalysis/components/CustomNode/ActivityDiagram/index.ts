import { ClassDiagramRadius, ClassDiagramRadiusModel } from "../index";
import {
  CircleNode,
  CircleNodeModel,
  DiamondNode,
  DiamondNodeModel,
  RectNode,
  RectNodeModel,
  h,
} from "@logicflow/core";
import { RiskPropagationType } from "./type";

//RiskPropagation
class RiskPropagationModel extends ClassDiagramRadiusModel {
  setAttributes() {
    this.text.editable = false;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(
      Object.assign(new RiskPropagationType(), data.properties)
    );
  }
}
class RiskPropagation extends ClassDiagramRadius {}
export const risk_propagation = {
  type: "risk_propagation",
  model: RiskPropagationModel,
  view: RiskPropagation,
};

//Initial
class InitialModel extends CircleNodeModel {
  setAttributes() {
    this.text.editable = false;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.r = 30;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#000";
    return style;
  }
}
class Initial extends CircleNode {}
export const initial = {
  type: "initial",
  model: InitialModel,
  view: Initial,
};

//ActivityFinal
class ActivityFinalModel extends CircleNodeModel {
  setAttributes() {
    this.text.editable = false;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.r = 30;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#000";
    return style;
  }
}
class ActivityFinal extends CircleNode {
  getShape() {
    const { model } = this.props;
    const { x, y, r } = model;
    return h("g", {}, [
      h("circle", {
        cx: x,
        cy: y,
        r: r,
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
      }),
      h("circle", {
        cx: x,
        cy: y,
        r: r - 10,
        fill: "#000",
      }),
    ]);
  }
}
export const activity_final = {
  type: "activity_final",
  model: ActivityFinalModel,
  view: ActivityFinal,
};

//FlowFinal
class FlowFinalModel extends CircleNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.r = 30;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#000";
    return style;
  }
}
class FlowFinal extends CircleNode {
  getShape() {
    const { model } = this.props;
    const { x, y, r } = model;
    return h("g", {}, [
      h("circle", {
        cx: x,
        cy: y,
        r: r,
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
      }),
      h("line", {
        x1: x - 22,
        y1: y - 22,
        x2: x + 22,
        y2: y + 22,
        stroke: "#000",
        strokeWidth: 2,
      }),
      h("line", {
        x1: x - 22,
        y1: y + 22,
        x2: x + 22,
        y2: y - 22,
        stroke: "#000",
        strokeWidth: 2,
      }),
    ]);
  }
}
export const flow_final = {
  type: "flow_final",
  model: FlowFinalModel,
  view: FlowFinal,
};

//DecisionNode
class DecisionNodeModel extends DiamondNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 40;
  }
}
class DecisionNode extends DiamondNode {}
export const decision_node = {
  type: "decision_node",
  model: DecisionNodeModel,
  view: DecisionNode,
};

//MergeNode
class MergeNodeModel extends DiamondNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 40;
  }
}
class MergeNode extends DiamondNode {}
export const merge_node = {
  type: "merge_node",
  model: MergeNodeModel,
  view: MergeNode,
};

//ForkNode
class ForkNodeModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 10;
    this.height = 200;
    this.setProperties(Object.assign({ outcoming: 2 }, data.properties));
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#000";
    return style;
  }
  getDefaultAnchor() {
    const { id, width, height, x, y, properties } = this;
    const anchors = [
      {
        x: x - width / 2,
        y,
        name: "left",
        id: `${id}_0`,
      },
    ];
    for (let i = 1; i <= parseInt(properties.outcoming); i++) {
      anchors.push({
        x: x + width / 2,
        y: y - height / 2 + (height * i) / (parseInt(properties.outcoming) + 1),
        name: `right_${i}`,
        id: `${id}_${i}`,
      });
    }
    return anchors;
  }
}
class ForkNode extends RectNode {}
export const fork_node = {
  type: "fork_node",
  model: ForkNodeModel,
  view: ForkNode,
};

//JoinNode
class JoinNodeModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 10;
    this.height = 200;
    this.setProperties(
      Object.assign(
        {
          outcoming: 2,
        },
        data.properties
      )
    );
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#000";
    return style;
  }
  getDefaultAnchor() {
    const { id, width, height, x, y, properties } = this;
    const anchors = [
      {
        x: x + width / 2,
        y,
        name: "right",
        id: `${id}_0`,
      },
    ];
    for (let i = 1; i <= parseInt(properties.outcoming); i++) {
      anchors.push({
        x: x - width / 2,
        y: y - height / 2 + (height * i) / (parseInt(properties.outcoming) + 1),
        name: `left_${i}`,
        id: `${id}_${i}`,
      });
    }
    return anchors;
  }
}
class JoinNode extends RectNode {}
export const join_node = {
  type: "join_node",
  model: JoinNodeModel,
  view: JoinNode,
};
