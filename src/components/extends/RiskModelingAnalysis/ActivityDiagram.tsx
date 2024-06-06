import { ReactElement, useRef } from "react";
import Diagram from "./components/Diagram";
import { LeftOutlined } from "@ant-design/icons";
import { FloatButton, notification } from "antd";
import {
  object_flow,
  control_flow,
} from "./components/CustomEdge/activityDiagram";
import { svg, class_diagram } from "./components/CustomNode";
import {
  risk_propagation,
  initial,
  activity_final,
  flow_final,
  decision_node,
  merge_node,
  fork_node,
  join_node,
} from "./components/CustomNode/ActivityDiagram";

export default function ActivityDiagram({
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
        type: "risk_propagation",
        properties: {
          title: "Risk Propagation",
          type: "Risk Propagation",
        },
        label: "Risk Propagation",
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "initial",
        label: "Initial",
        icon: "/svg/initial.svg",
      },
      {
        type: "activity_final",
        label: "Activity Final",
        icon: "/svg/activityFinal.svg",
      },
      {
        type: "flow_final",
        label: "Flow Final",
        icon: "/svg/flowFinal.svg",
      },
      {
        type: "decision_node",
        label: "Decision Node",
        icon: "/svg/decisionNode.svg",
      },
      {
        type: "merge_node",
        label: "Merge Node",
        icon: "/svg/mergeNode.svg",
      },
      {
        type: "fork_node",
        label: "Fork Node",
        icon: "/svg/forkNode.svg",
      },
      {
        type: "join_node",
        label: "Join Node",
        icon: "/svg/joinNode.svg",
      },

      {
        label: "object flow",
        icon: "/svg/objectFlow.svg",
        callback: () => {
          lf.setDefaultEdgeType("object_flow");
          selectedEdgeType.current = "object_flow";
        },
      },
      {
        label: "control flow",
        icon: "/svg/controlFlow.svg",
        callback: () => {
          lf.setDefaultEdgeType("control_flow");
          selectedEdgeType.current = "control_flow";
        },
      },
    ]);
  };

  const initListener = () => {
    diagram.current?.lf.current.on(
      "connection:not-allowed",
      ({ msg }: { msg: string }) => {
        msg &&
          notification.error({
            message: "error",
            description: msg,
          });
      }
    );
  };

  const registerCustomNode = () => {
    diagram.current?.lf.current.batchRegister([
      risk_propagation,
      initial,
      activity_final,
      svg,
      class_diagram,
      object_flow,
      control_flow,
      flow_final,
      decision_node,
      merge_node,
      fork_node,
      join_node,
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
