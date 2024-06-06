import { svg } from "../index";
import { EllipseResize, GroupNode } from "@logicflow/extension";
//Actor
class ActorModel extends svg.model {
  setAttributes() {
    this.text.editable = true;
    this.text.y = this.y + this.height / 2 - super.getTextStyle().fontSize! / 2;
    this.updateText("Actor");
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 72;
    this.height = 96;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.fontSize = 16;
    return style;
  }
}
class Actor extends svg.view {}
export const actor = {
  type: "actor",
  model: ActorModel,
  view: Actor,
};

//Use Case
class UseCaseModel extends EllipseResize.model {
  setAttributes() {
    this.updateText("Use Case");
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 70;
    this.ry = 50;
  }
}
class UseCase extends EllipseResize.view {}
export const use_case = {
  type: "use_case",
  model: UseCaseModel,
  view: UseCase,
};

//System Boundary
class SystemBoundary extends GroupNode.view {}
class SystemBoundaryModel extends GroupNode.model {
  initNodeData(data: any): void {
    super.initNodeData(data);
    this.foldable = true;
    this.resizable = true;
  }
  getAddableOutlineStyle() {
    const style = super.getAddableOutlineStyle();
    style.stroke = "#AEAFAE";
    style.strokeDasharray = "3 3";
    return style;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = "#000";
    style.strokeWidth = 1;
    return style;
  }
}

export const system_boundary = {
  type: "system_boundary",
  model: SystemBoundaryModel,
  view: SystemBoundary,
};
