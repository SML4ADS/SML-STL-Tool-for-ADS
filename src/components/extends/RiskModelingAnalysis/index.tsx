import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Col, FloatButton, Row } from "antd";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequirementDiagram from "./RequirementDiagram";
import BlockDefinitionDiagram from "./BlockDefinitionDiagram";
import ActivityDiagram from "./ActivityDiagram";

export const meta = {
  title: "自动驾驶系统风险建模与分析",
  description:
    "从软件生命周期的角度考量如何在各个不同阶段对自动驾驶系统本身进行建模。",
};

export default function RiskModelingAnalysis(): ReactElement {
  const navigate = useNavigate();
  const [router, setRouter] = useState<string>("/");

  const home = (
    <div className="extend-wrapper h-screen bg-stone-100 overflow-hidden">
      <Row gutter={16}>
        <Col span={12}>
          <Card title="自动驾驶系统建模" className="m-2" hoverable>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  定位
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  感知
                </Button>
              </Col>
            </Row>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  规划
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  决策
                </Button>
              </Col>
            </Row>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  控制
                </Button>
              </Col>
              <Col span={12}>
                <Button type="primary" block className="h-12">
                  无线通信
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="系统风险建模与分析" className="m-2" hoverable>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  className="h-12"
                  onClick={() => setRouter("/hara")}
                >
                  HARA需求分析
                </Button>
              </Col>
            </Row>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  className="h-12"
                  onClick={() => setRouter("/fmea")}
                >
                  FMEA组件分析
                </Button>
              </Col>
            </Row>
            <Row gutter={40} className="mt-10 mb-10 ml-5 mr-5">
              <Col span={24}>
                <Button
                  type="primary"
                  block
                  className="h-12"
                  onClick={() => setRouter("/fta")}
                >
                  FTA风险传播分析
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <FloatButton icon={<LeftOutlined />} onClick={() => navigate("/")} />
    </div>
  );

  const switchRouter = () => {
    switch (router) {
      case "/":
        return home;
      case "/hara":
        return <RequirementDiagram setRouter={setRouter} />;
      case "/fmea":
        return <BlockDefinitionDiagram setRouter={setRouter} />;
      case "/fta":
        return <ActivityDiagram setRouter={setRouter} />;
      default:
        return home;
    }
  };
  return <>{switchRouter()}</>;
}
