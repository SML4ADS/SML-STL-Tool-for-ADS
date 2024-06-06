import { ClassDiagramRadius, ClassDiagramRadiusModel } from "../index";
import { RectResize, GroupNode } from "@logicflow/extension";
import { FMEAType, CNNType, ObjectPerceptionType } from "./type";
//FMEA
class FMEAModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(Object.assign(new FMEAType(), data.properties));
  }
}
class FMEA extends ClassDiagramRadius {}
export const fmea = {
  type: "fmea",
  model: FMEAModel,
  view: FMEA,
};

//CNN
class CNNModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(Object.assign(new CNNType(), data.properties));
  }
}
class CNN extends ClassDiagramRadius {}
export const cnn = {
  type: "cnn",
  model: CNNModel,
  view: CNN,
};

//ObjectPerception
class ObjectPerceptionModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(
      Object.assign(new ObjectPerceptionType(), data.properties)
    );
  }
}
class ObjectPerception extends ClassDiagramRadius {}
export const object_perception = {
  type: "object_perception",
  model: ObjectPerceptionModel,
  view: ObjectPerception,
};
class CustomGroupModel extends GroupNode.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.text.y = this.y - this.height / 2 + 15;
  }
  setAttributes() {
    this.resizable = true;
    this.text.editable = true;
    this.text.y = this.y - this.height / 2 + 15;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeDasharray = "3 3";
    style.strokeWidth = 1;
    return style;
  }
  getAddableOutlineStyle() {
    const style = super.getAddableOutlineStyle();
    style.stroke = "#4874CBFF";
    style.strokeDasharray = "3 3";
    return style;
  }
}
class CustomGroup extends GroupNode.view {}
export const custom_group = {
  type: "custom_group",
  model: CustomGroupModel,
  view: CustomGroup,
};

//Perception
class PerceptionModel extends RectResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = "#E9BD5F";
    style.fill = "#FFE6CC";
    return style;
  }
}
class Perception extends RectResize.view {
}
export const perception = {
  type: "perception",
  model: PerceptionModel,
  view: Perception,
};

//RectRadius
class RectRadiusModel extends RectResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.radius = 4;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeWidth = 1;
    return style;
  }
}
class RectRadius extends RectResize.view {}
export const rect_radius = {
  type: "rect_radius",
  model: RectRadiusModel,
  view: RectRadius,
};

//RectDash
class RectDasharrayModel extends RectResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.strokeDasharray = "3 3";
    return style;
  }
}
class RectDasharray extends RectResize.view {}
export const rect_dasharray = {
  type: "rect_dasharray",
  model: RectDasharrayModel,
  view: RectDasharray,
};
