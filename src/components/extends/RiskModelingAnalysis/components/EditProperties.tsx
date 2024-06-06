import { ColorPicker, Input, Switch, Tree } from "antd";
import { ReactElement, useEffect, useState } from "react";

export default function EditProperties({
  propertiesTmp,
}: {
  propertiesTmp: any;
}): ReactElement {
  const [treeData, setTreeData] = useState<any[]>([]);

  useEffect(() => {
    const whiteList = ["nodeSize", "iconClass", "type"];
    function convertObjectToTreeArray(obj: any) {
      function traverse(input: any) {
        const treeArray = [];

        for (const [key, value] of Object.entries(input)) {
          const node: {
            key: string;
            title: string;
            value?: any;
            children?: any;
          } = { key, title: key };
          if (whiteList.indexOf(key) !== -1) {
            //解决resize后出现nodeSize问题
            continue;
          }
          if (typeof value === "object" && value !== null) {
            node.value = undefined;
            node.children = traverse(value);
          } else {
            node.value = value;
          }
          treeArray.push(node);
        }

        return treeArray;
      }
      return traverse(obj);
    }

    const treeDataTmp: any[] = [];
    convertObjectToTreeArray(propertiesTmp.current).forEach((item) => {
      treeDataTmp.push(item);
    });
    setTreeData(treeDataTmp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertiesTmp.current]);

  const handleInput = (value: any, node: any) => {
    setTreeData((prev) => {
      const newTreeData = prev.map((item) => {
        if (item.key === node.key) {
          return {
            ...item,
            value,
          };
        }
        return item;
      });
      console.log(newTreeData);
      return newTreeData;
    });
    const setValueByKey = (obj: any, key: any, value: any) => {
      Object.entries(obj).forEach(([prop, val]) => {
        if (prop === key) {
          obj[prop] = value;
        } else if (typeof val === "object" && val !== null) {
          setValueByKey(val, key, value);
        }
      });
    };
    //同步propertiesTmp数据
    setValueByKey(propertiesTmp, node.title, value);
  };

  const h = (data: any) => {
    if (
      data.title === "backgroundColor" ||
      data.title === "textColor" ||
      data.title === "borderColor"
    ) {
      return (
        <>
          {data.title}:&nbsp;&nbsp;&nbsp;&nbsp;
          <ColorPicker
            value={data.value}
            onChange={(value) => handleInput(value.toRgbString(), data)}
          ></ColorPicker>
        </>
      );
    } else if (data.title === "dashed") {
      return (
        <>
          {data.title}:&nbsp;&nbsp;&nbsp;&nbsp;
          <Switch
            checked={data.value}
            onChange={(value) => handleInput(value, data)}
          ></Switch>
        </>
      );
    } else {
      return (
        <>
          {data.title}:&nbsp;&nbsp;&nbsp;&nbsp;
          <Input
            value={data.value}
            placeholder="Please input"
            style={{ width: "120px" }}
            onChange={(e) => handleInput(e.target.value, data)}
          ></Input>
        </>
      );
    }
  };

  return (
    <>
      <Tree
        treeData={treeData}
        defaultExpandAll
        className="edit-properties"
        titleRender={(data) => {
          return (
            <>
              {!data.children ? (
                <span className="leaf-node">{h(data)}</span>
              ) : (
                <span className="parent-node">{data.title}</span>
              )}
            </>
          );
        }}
      ></Tree>
    </>
  );
}
