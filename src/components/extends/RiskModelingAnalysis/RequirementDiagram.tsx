import { ReactElement, useRef } from "react";
import Diagram from "./components/Diagram";
import { class_diagram_radius } from "./components/CustomNode/index";
import {
  odc,
  hara,
  safety_goal,
  functional_safety_requirement,
} from "./components/CustomNode/RequirementDiagram/index";
import {
  containment,
  dependency_copy,
  dependency_derive,
  dependency_satisfy,
  dependency_refine,
} from "./components/CustomEdge/requirementDiagram";
import { LeftOutlined } from "@ant-design/icons";
import { FloatButton, notification } from "antd";

export default function RequirementDiagram({
  setRouter,
}: {
  setRouter: (route: string) => void;
}): ReactElement {
  const diagram = useRef<any>(null);
  const selectedEdgeType = useRef<string>("");

  const initDndPanel = () => {
    const lf = diagram.current?.lf.current;
    lf.extension.dndPanel.setPatternItems([
      {
        label: "select area",
        icon: "/svg/选区.svg",
        callback: () => {
          lf.extension.selectionSelect.openSelectionSelect();
          //框选，选一次之后就关闭框选
          lf.once("selection:selected", () => {
            lf.extension.selectionSelect.closeSelectionSelect();
          });
        },
      },
      {
        type: "class_diagram_radius",
        label: "design constraint",
        properties: {
          title: "design constraint",
          type: "design constraint",
        },
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "class_diagram_radius",
        label: "funtional requirement",
        properties: {
          title: "funtional requirement",
          type: "funtional requirement",
        },
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "safety_goal",
        properties: {
          title: "safety goal",
          type: "safety goal",
        },
        label: "safety goal",
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "functional_safety_requirement",
        properties: {
          title: "functional safety requirement",
          type: "FSR",
        },
        label: "FSR",
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "odc",
        properties: {
          title: "ODC",
          type: "ODC",
        },
        label: "ODC",
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "hara",
        properties: {
          title: "HARA",
          type: "HARA",
        },
        label: "HARA",
        icon: "/svg/圆角矩形.svg",
      },
      {
        label: "containment",
        icon: "/svg/containment.svg",
        callback: () => {
          lf.setDefaultEdgeType("containment");
          selectedEdgeType.current = "containment";
        },
      },
      {
        label: "copy",
        icon: "/svg/dependency.svg",
        callback: () => {
          lf.setDefaultEdgeType("dependency_copy");
          selectedEdgeType.current = "dependency_copy";
        },
      },
      {
        label: "derive",
        icon: "/svg/dependency.svg",
        callback: () => {
          lf.setDefaultEdgeType("dependency_derive");
          selectedEdgeType.current = "dependency_derive";
        },
      },
      {
        label: "satisfy",
        icon: "/svg/dependency.svg",
        callback: () => {
          lf.setDefaultEdgeType("dependency_satisfy");
          selectedEdgeType.current = "dependency_satisfy";
        },
      },
      {
        label: "refine",
        icon: "/svg/dependency.svg",
        callback: () => {
          lf.setDefaultEdgeType("dependency_refine");
          selectedEdgeType.current = "dependency_refine";
        },
      },
    ]);
  };

  const initListener = () => {
    const lf = diagram.current?.lf.current;
    lf.on("connection:not-allowed", ({ msg }: { msg: string }) => {
      notification.error({
        message: "error",
        description: msg,
      });
    });
    lf.on("anchor:drop", ({ _, __, nodeModel, edgeModel }: any) => {
      const targetNode = lf.getNodeModelById(edgeModel.targetNodeId);
      if (
        nodeModel.type === "functional_safety_requirement" &&
        targetNode.type === "safety_goal"
      ) {
        if (selectedEdgeType.current !== "dependency_refine") {
          lf.deleteEdge(edgeModel.id);
          notification.error({
            message: "error",
            description:
              "safety goal 与 functional safety requirement之间的关系只能是refine",
          });
        }
      }
    });
  };

  const registerCustomNode = () => {
    diagram.current?.lf.current?.batchRegister([
      class_diagram_radius,
      odc,
      hara,
      safety_goal,
      functional_safety_requirement,
      containment,
      dependency_copy,
      dependency_derive,
      dependency_satisfy,
      dependency_refine,
    ]);
  };

  return (
    <>
      <Diagram
        initDndPanel={initDndPanel}
        initListener={initListener}
        registerCustomNode={registerCustomNode}
        ref={diagram}
      ></Diagram>
      <FloatButton icon={<LeftOutlined />} onClick={() => setRouter("/")} />
    </>
  );
}
