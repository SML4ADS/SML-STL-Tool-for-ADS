import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";
import {
  DndPanel,
  Menu,
  Control,
  SelectionSelect,
  Snapshot,
} from "@logicflow/extension";

import "./index.less";
import { Button, Drawer } from "antd";
import EditProperties from "./EditProperties";

export default forwardRef(
  (
    {
      initDndPanel,
      initListener,
      registerCustomNode,
    }: {
      initDndPanel: () => void;
      initListener: () => void;
      registerCustomNode: () => void;
    },
    ref: any
  ) => {
    const container = useRef<HTMLDivElement>(null);
    const lf = useRef<LogicFlow | null>(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const currentNode = useRef<any>(null);
    const propertiesTmp = useRef(null);

    useImperativeHandle(ref, () => ({
      lf,
    }));

    const saveProperties = () => {
      lf.current!.setProperties(
        currentNode.current.id,
        JSON.parse(JSON.stringify(propertiesTmp.current))
      );
      setShowDrawer(false);
    };

    useEffect(() => {
      lf.current = new LogicFlow({
        container: container.current!,
        grid: true,
        keyboard: {
          enabled: true,
        },
        plugins: [Menu, Control, SelectionSelect, DndPanel, Snapshot],
      });

      const initControl = () => {
        lf.current!.extension.control.addItem({
          key: "mini-import-xml",
          iconClass: "lf-control-import-xml",
          title: "",
          text: "导入json",
          onClick: async (lf: LogicFlow) => {
            const { filePaths } = await window.electronAPI.chooseFile(["json"]);
            const path = filePaths[0];
            if (path) {
              const data = JSON.parse(
                await window.electronAPI.readFile(path)
              );
              lf.renderRawData(data);
            }
          },
        });
        lf.current!.extension.control.addItem({
          key: "mini-export-xml",
          iconClass: "lf-control-export-xml",
          title: "",
          text: "导出json",
          onClick: async (lf: LogicFlow) => {
            const { filePath } = await window.electronAPI.showSaveDialog(
              "json"
            );
            if (filePath) {
              window.electronAPI.writeFile(
                filePath,
                JSON.stringify(lf.getGraphData())
              );
            }
          },
        });
        lf.current!.extension.control.addItem({
          key: "mini-export-img",
          iconClass: "lf-control-export-img",
          title: "",
          text: "导出图片",
          onClick: (lf: LogicFlow) => {
            lf.getSnapshot();
          },
        });

        // lf.current!.extension.control.addItem({
        //   key: "mini-save-img",
        //   iconClass: "lf-control-save",
        //   title: "",
        //   text: "保存",
        //   onClick: async (lf: LogicFlow) => {},
        // });
      };

      const initMenu = () => {
        lf.current!.extension.menu.addMenuConfig({
          nodeMenu: [
            {
              text: "编辑属性",
              callback: (node: any) => {
                currentNode.current = node;
                propertiesTmp.current = JSON.parse(
                  JSON.stringify(node.properties)
                );
                setShowDrawer(true);
              },
            },
          ],
        });
      };

      initControl();
      initMenu();
      initDndPanel();
      initListener();
      registerCustomNode();
      lf.current.render();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <>
        <div className="diagram-container" ref={container}></div>
        <Drawer
          title="编辑节点"
          onClose={() => setShowDrawer(false)}
          open={showDrawer}
        >
          <EditProperties propertiesTmp={propertiesTmp}></EditProperties>
          <Button type="primary" onClick={saveProperties}>
            保存
          </Button>
        </Drawer>
      </>
    );
  }
);
