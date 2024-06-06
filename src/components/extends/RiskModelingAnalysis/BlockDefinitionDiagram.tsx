import { LeftOutlined } from "@ant-design/icons";
import { FloatButton, notification } from "antd";
import { ReactElement, useRef } from "react";
import Diagram from "./components/Diagram";
import {
  generalization,
  dependency,
  aggregation,
  composition,
} from "./components/CustomEdge/blockDefinitionDiagram";
import { class_diagram_radius, svg } from "./components/CustomNode";
import {
  custom_group,
  rect_radius,
  rect_dasharray,
  cnn,
  fmea,
  object_perception,
  perception,
} from "./components/CustomNode/BlockDefinitionDiagram";

export default function BlockDefinitionDiagram({
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
        type: "rect_radius",
        label: "rounded rect",
        icon: "/svg/圆角矩形.svg",
      },
      // {
      //     type: 'rect_dasharray',
      //     label: 'dashed rect',
      //     icon: '/svg/虚线矩形.svg',
      // },
      {
        type: "class_diagram_radius",
        label: "component",
        properties: {
          title: "component",
          type: "component",
        },
        icon: "/svg/圆角矩形.svg",
      },
      {
        type: "class_diagram_radius",
        label: "AI Component",
        properties: {
          title: "AI Component",
          type: "AI Component",
        },
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "class_diagram_radius",
        label: "location",
        properties: {
          title: "Location",
          type: "AI Component",
        },
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "class_diagram_radius",
        properties: {
          title: "Control",
          type: "AI Component",
        },
        label: "control",
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "class_diagram_radius",
        properties: {
          title: "Planning",
          type: "AI Component",
        },
        label: "planning",
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "object_perception",
        properties: {
          title: "Perception",
          type: "AI Component",
        },
        label: "perception",
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "class_diagram_radius",
        properties: {
          title: "Decision-making",
          type: "AI Component",
        },
        label: "decision",
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "cnn",
        properties: {
          title: "CNN",
          iconClass: "AI-component",
          type: "CNN",
        },
        label: "CNN",
        icon: "/svg/AIcomponent.svg",
      },
      {
        type: "fmea",
        properties: {
          title: "FMEA",
          type: "FMEA",
        },
        label: "FMEA",
        icon: "/svg/圆角矩形.svg",
      },
      // {
      //     type: 'custom_group',
      //     label: 'group',
      //     icon: '/svg/虚线矩形.svg',
      // },
      // {
      //     type: 'perception',
      //     label: 'perception',
      //     properties: {
      //         iconClass: 'AI-component',
      //     },
      //     icon: '/svg/perception.svg',
      // },

      {},
      {},
      {},
      {
        type: "svg",
        text: "lane",
        properties: {
          src: "/svg/lane.svg",
        },
        label: "lane",
        icon: "/svg/lane.svg",
      },

      {
        type: "svg",
        text: "camera",
        properties: {
          src: "/svg/camera.svg",
        },
        label: "camera",
        icon: "/svg/camera.svg",
      },
      {
        type: "svg",
        text: "car",
        properties: {
          src: "/svg/car.svg",
        },
        label: "car",
        icon: "/svg/car.svg",
      },
      {
        type: "svg",
        text: "cyclist",
        properties: {
          src: "/svg/cyclist.svg",
        },
        label: "cyclist",
        icon: "/svg/cyclist.svg",
      },
      {
        type: "svg",
        text: "gps",
        properties: {
          src: "/svg/gps.svg",
        },
        label: "gps",
        icon: "/svg/gps.svg",
      },
      {
        type: "svg",
        text: "hdmap",
        properties: {
          src: "/svg/hdmap.svg",
        },
        label: "hdmap",
        icon: "/svg/hdmap.svg",
      },
      {
        type: "svg",
        text: "imu",
        properties: {
          src: "/svg/imu.svg",
        },
        label: "imu",
        icon: "/svg/imu.svg",
      },
      {
        type: "svg",
        text: "lidar",
        properties: {
          src: "/svg/lidar.svg",
        },
        label: "lidar",
        icon: "/svg/lidar.svg",
      },
      {
        type: "svg",
        text: "pedestrian",
        properties: {
          src: "/svg/pedestrian.svg",
        },
        label: "pedestrian",
        icon: "/svg/pedestrian.svg",
      },
      {
        type: "svg",
        text: "radar",
        properties: {
          src: "/svg/radar.svg",
        },
        label: "radar",
        icon: "/svg/radar.svg",
      },
      {
        type: "svg",
        text: "trafficlight",
        properties: {
          src: "/svg/trafficlight.svg",
        },
        label: "trafficlight",
        icon: "/svg/trafficlight.svg",
      },
      {
        type: "svg",
        text: "truck",
        properties: {
          src: "/svg/truck.svg",
        },
        label: "truck",
        icon: "/svg/truck.svg",
      },
      {},
      {
        label: "polyline",
        icon: "/svg/polyline.svg",
        callback: () => {
          lf.setDefaultEdgeType("polyline");
          selectedEdgeType.current = "polyline";
        },
      },
      {
        label: "generalization",
        icon: "/svg/generalization.svg",
        callback: () => {
          lf.setDefaultEdgeType("generalization");
          selectedEdgeType.current = "generalization";
        },
      },
      {
        label: "dependency",
        icon: "/svg/dependency.svg",
        callback: () => {
          lf.setDefaultEdgeType("dependency");
          selectedEdgeType.current = "dependency";
        },
      },
      {
        label: "aggregation",
        icon: "/svg/aggregation.svg",
        callback: () => {
          lf.setDefaultEdgeType("aggregation");
          selectedEdgeType.current = "aggregation";
        },
      },
      {
        label: "composition",
        icon: "/svg/composition.svg",
        callback: () => {
          lf.setDefaultEdgeType("composition");
          selectedEdgeType.current = "composition";
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
  };

  const registerCustomNode = () => {
    diagram.current?.lf.current.batchRegister([
      class_diagram_radius,
      custom_group,
      svg,
      rect_radius,
      rect_dasharray,
      cnn,
      fmea,
      object_perception,
      perception,
      generalization,
      dependency,
      aggregation,
      composition,
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
