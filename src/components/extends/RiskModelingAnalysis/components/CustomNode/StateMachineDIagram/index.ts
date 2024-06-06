import { CircleNode, CircleNodeModel, h } from "@logicflow/core";
import { ClassDiagram, ClassDiagramModel } from "../index";
import { HanzardousEventType } from "./type";
//State
class StateModel extends CircleNodeModel {
  setAttributes() {
    this.text.editable = false;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.r = 30;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.fill = "#fff";
    return style;
  }
}
class State extends CircleNode {}
export const state = {
  type: "state",
  model: StateModel,
  view: State,
};

//OriginalState
class OriginalStateModel extends CircleNodeModel {
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
class OriginalState extends CircleNode {
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
        fill: "none",
        stroke: "black",
        strokeWidth: 2,
      }),
    ]);
  }
}
export const original_state = {
  type: "original_state",
  model: OriginalStateModel,
  view: OriginalState,
};

//FailureState
class FailureStateModel extends CircleNodeModel {
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
class FailureState extends CircleNode {}
export const failure_state = {
  type: "failure_state",
  model: FailureStateModel,
  view: FailureState,
};

//HazadousEvent
class HazardousEventModel extends ClassDiagramModel {
  setAttributes() {
    this.text.editable = false;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(
      Object.assign(new HanzardousEventType(), data.properties)
    );
  }
}
class HazardousEvent extends ClassDiagram {}
export const hazardous_event = {
  type: "hazardous_event",
  model: HazardousEventModel,
  view: HazardousEvent,
};
