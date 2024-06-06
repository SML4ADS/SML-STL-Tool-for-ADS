import { ClassDiagramRadius, ClassDiagramRadiusModel } from "../index";
import { ODCType, HARAType } from "./type";
class ODCModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(Object.assign(new ODCType(), data.properties));
  }
}
class ODC extends ClassDiagramRadius {}
export const odc = {
  type: "odc",
  model: ODCModel,
  view: ODC,
};

class HARAModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.setProperties(Object.assign(new HARAType(), data.properties));
  }
}
class HARA extends ClassDiagramRadius {}
export const hara = {
  type: "hara",
  model: HARAModel,
  view: HARA,
};

//SafetyGoal
class SafetyGoalModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    // const rule1 = {
    //   message: "safty goal 的下一个节点只能是 functional safety requirement",
    //   validate: (_: any, targetNode: any) => {
    //     return targetNode.type === "functional_safety_requirement";
    //   },
    // };
    // this.sourceRules.push(rule1);
  }
}
class SafetyGoal extends ClassDiagramRadius {}
export const safety_goal = {
  type: "safety_goal",
  model: SafetyGoalModel,
  view: SafetyGoal,
};

//FunctionalSafetyRequirement
class FunctionalSafetyRequirementModel extends ClassDiagramRadiusModel {
  initNodeData(data: any) {
    super.initNodeData(data);
  }
}
class FunctionalSafetyRequirement extends ClassDiagramRadius {}
export const functional_safety_requirement = {
  type: "functional_safety_requirement",
  model: FunctionalSafetyRequirementModel,
  view: FunctionalSafetyRequirement,
};
