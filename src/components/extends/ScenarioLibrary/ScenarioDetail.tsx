import { ArrowLeftOutlined } from "@ant-design/icons";
import { Badge, Card, Descriptions, Divider, Tabs, TabsProps } from "antd";
import Title from "antd/es/typography/Title";
import { ReactElement, useEffect, useState } from "react";
import VideoJS from "../../content/virtual/VideoJS";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/mode/xml/xml";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/scroll/simplescrollbars.css";
import "codemirror/addon/scroll/simplescrollbars";

import "./index.less";

const tabListNoTitle = [
  {
    key: "Tags",
    label: "Tags",
  },
  {
    key: "Definition",
    label: "Definition",
  },
];

export default function ScenarioDetail({
  setRoute,
  db,
  currentIndex,
}: {
  setRoute: (route: string) => void;
  db: {
    name: string;
    type: string;
    tags: string[];
    sceneryItems: string[];
    environmentItems: string[];
    dynamicItems: string[];
    behaviorItems: string[];
    id: string;
    videoPath: string;
    [key: string]: any;
  }[];
  currentIndex: number;
}): ReactElement {
  const [activeTabKey, setActiveTabKey] = useState("Tags");
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const [videoOptions, setVideoOptions] = useState<any>({
    autoplay: true,
    controls: true,
    width: "300px",
    height: "300px",
    responsive: true,
    fluid: true,
  });

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "SML4ADS2.0",
      children: (
        <CodeMirror
          value={db[currentIndex].sml4ads2}
          options={{
            mode: "application/json",
            lineNumbers: true,
            scrollbarStyle: "simple",
          }}
          editorDidMount={(editor: any) => {
            editor.setSize("auto", "100%");
          }}
          onBeforeChange={(editor, data, value) => {}}
          onChange={(editor, data, value) => {}}
        />
      ),
    },
    {
      key: "2",
      label: "OpenScenario",
      children:  (
        <CodeMirror
          value={db[currentIndex].openScenario}
          options={{
            mode: "application/json",
            lineNumbers: true,
            scrollbarStyle: "simple",
          }}
          editorDidMount={(editor: any) => {
            editor.setSize("auto", "100%");
          }}
          onBeforeChange={(editor, data, value) => {}}
          onChange={(editor, data, value) => {}}
        />
      ),
    },
  ];

  useEffect(() => {
    const videoPath = db[currentIndex].videoPath;
    const asyncFn = async () => {
      const message = await window.electronAPI.onVideoFileSelected(videoPath);
      setVideoOptions({
        autoplay: true,
        controls: true,
        width: "300px",
        height: "300px",
        responsive: true,
        fluid: true,
        sources: [
          {
            src: message.videoSource,
            type: "video/mp4",
          },
        ],
        techOrder: ["StreamPlay"],
        StreamPlay: { duration: message.duration },
      });
    };
    asyncFn();
  }, []);

  const contentListNoTitle: Record<string, React.ReactNode> = {
    Tags: (
      <>
        <Descriptions
          title="Scenery"
          items={db[currentIndex].sceneryItems.map((item, index) => {
            return {
              key: index.toString(),
              children: <Badge status="processing" text={item} />,
            };
          })}
          className="p-5"
          column={2}
        />
        <Divider />
        <Descriptions
          title="Environmental Conditions"
          items={db[currentIndex].environmentItems.map((item, index) => {
            return {
              key: index.toString(),
              children: <Badge status="processing" text={item} />,
            };
          })}
          className="p-5"
          column={2}
        />
        <Divider />
        <Descriptions
          title="Dynamic Elements"
          items={db[currentIndex].dynamicItems.map((item, index) => {
            return {
              key: index.toString(),
              children: <Badge status="processing" text={item} />,
            };
          })}
          className="p-5"
          column={2}
        />
        <Divider />
        <Descriptions
          title="Behaviors"
          items={db[currentIndex].behaviorItems.map((item, index) => {
            return {
              key: index.toString(),
              children: <Badge status="processing" text={item} />,
            };
          })}
          className="p-5"
          column={2}
        />
      </>
    ),
    Definition: <Tabs defaultActiveKey="1" items={tabItems} className="p-5" />,
  };
  return (
    <>
      <div>
        <Title level={2}>
          <ArrowLeftOutlined onClick={() => setRoute("")} />
          &nbsp;&nbsp;&nbsp;Scenario
        </Title>
      </div>
      <Title level={4}>Scenario Name</Title>
      <div className="flex w-full gap-5">
        <Card
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{
            size: "middle",
          }}
          className="scenario-detail flex-grow-0 w-2/3"
        >
          {contentListNoTitle[activeTabKey]}
        </Card>
        <Card title="General" className="flex-grow-0 w-1/3">
          <div className="flex flex-col justify-center items-center">
            <VideoJS options={videoOptions} />
            <Divider />
            <Descriptions title="Basic Information" className="p-5">
              <Descriptions.Item label="ID">
                {db[currentIndex].id}
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </div>
    </>
  );
}
