import { ReactElement, useState } from "react";
import ScenarioTable from "./ScenarioTable";
import { LeftOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import ScenarioDetail from "./ScenarioDetail";

import "./index.less";

export const meta = {
  title: "场景库",
  description: "场景库",
};

const db = [
  {
    name: "Scenario 1",
    type: "Type 1",
    tags: ["nice", "developer"],
    sceneryItems: [
      "Broken line",
      "Motorway",
      "Divided road",
      "Number of lanes[1]",
      "Drive on the right",
    ],
    environmentItems: ["Cloudiness", "Sun in front", "Day", "Wind [Speed 0]"],
    dynamicItems: ["Pedestrian", "Vehicle"],
    behaviorItems: ["Pedestrian crossing"],
    sml4ads2: "sml4ads2",
    openScenario: "openScenario",
    id: '00000001',
    videoPath: "C:/Users/Jack/Desktop/yy/SML4ADS.js/.example/case2/.records/2024-02-27_12-08-43_1/scenario/mp4/default.mp4"
  },
];

export default function ScenarioLibrary(): ReactElement {
  const navigate = useNavigate();
  const [route, setRoute] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="extend-wrapper h-screen bg-stone-100 overflow-x-hidden p-5 box-border">
      {route === "detail" ? (
        <ScenarioDetail setRoute={setRoute} db={db} currentIndex={currentIndex}/>
      ) : (
        <ScenarioTable setRoute={setRoute} db={db} setCurrentIndex={setCurrentIndex}/>
      )}
      <FloatButton icon={<LeftOutlined />} onClick={() => navigate("/")} />
    </div>
  );
}
