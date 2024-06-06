import { LeftOutlined } from "@ant-design/icons";
import { FloatButton, notification } from "antd";
import { ReactElement, useRef } from "react";
import Diagram from "./components/Diagram";
import { trigger } from "./components/CustomEdge/stateMachineDiagram";
import { class_diagram_radius } from "./components/CustomNode";
import {
  original_state,
  failure_state,
  state,
  hazardous_event,
} from "./components/CustomNode/StateMachineDIagram";

export default function StateMachineDiagram({
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
        properties: {
          title: "Region",
          type: "Region",
        },
        label: "Region",
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "state",
        label: "State",
        icon: "/svg/state.svg",
      },
      {
        type: "original_state",
        label: "Original State",
        icon: "/svg/originalState.svg",
      },
      {
        type: "failure_state",
        label: "Failure State",
        icon: "/svg/failureState.svg",
      },
      {
        type: "hazardous_event",
        label: "Hazardous Event",
        properties: {
          type: "Hazardous Event",
          title: "Hazardous Event",
        },
        icon: "/svg/矩形.svg",
      },
      {
        label: "trigger",
        icon: "/svg/trigger.svg",
        callback: () => {
          lf.setDefaultEdgeType("trigger");
          selectedEdgeType.current = "trigger";
        },
      },
    ]);
  };

  const initListener = () => {
    const lf = diagram.current?.lf.current;
    lf.on("connection:not-allowed", ({ msg }: { msg: string }) => {
      msg &&
        notification.error({
          message: "error",
          description: msg,
        });
    });
    lf.on("node:dnd-add", ({ data }: { data: any }) => {
      //hazardous event自动连接一个failure state
      if (data.type === "hazardous_event") {
        const sourceNodeId = data.id;
        const targetNodeId = lf.addNode({
          type: "failure_state",
          x: data.x + 180,
          y: data.y + 100,
        }).id;
        lf.addEdge({
          type: "trigger",
          sourceNodeId,
          targetNodeId,
        });
      }
    });
  };

  const registerCustomNode = () => {
    diagram.current?.lf.current.batchRegister([
      class_diagram_radius,
      original_state,
      failure_state,
      state,
      hazardous_event,
      trigger,
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
