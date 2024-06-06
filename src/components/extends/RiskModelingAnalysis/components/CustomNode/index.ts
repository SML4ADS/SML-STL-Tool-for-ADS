import { HtmlResize } from "@logicflow/extension";
import { h } from "@logicflow/core";
export const whiteList = [
  "nodeSize",
  "title",
  "iconClass",
  "type",
  "borderColor",
  "backgroundColor",
  "textColor",
  "borderWidth",
  "dashed",
];
export const getPropertiesStr = (prop: any) => {
  const initArray = (prop: any) => {
    //构造treeData，写一个递归函数
    function convertObjectToArray(obj: Object) {
      const treeArray: Array<Object> = [];
      function traverse(input: Object) {
        for (const [key, value] of Object.entries(input)) {
          const node = { key, value };
          if (whiteList.indexOf(key) !== -1) {
            continue;
          }
          if (typeof value === "object" && value !== null) {
            traverse(value);
          } else if (value) {
            treeArray.push(node);
          }
        }

        return treeArray;
      }
      return traverse(obj);
    }

    return convertObjectToArray(prop);
  };
  return initArray(prop)
    .map((item: any) => {
      return `<div>${item.key} = ${item.value}</div>`;
    })
    .join("");
};
//近似类图
export class ClassDiagramRadiusModel extends HtmlResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 80;
    this.setProperties(
      Object.assign(
        {
          description: "",
          borderColor: "#000",
          borderWidth: 1,
          textColor: "#000",
          backgroundColor: "#fff",
          dashed: false,
        },
        data.properties
      )
    );
  }
  setAttributes() {
    this.text.editable = false;
  }
}

export class ClassDiagramRadius extends HtmlResize.view {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    const propertiesStr = getPropertiesStr(properties);
    const {
      iconClass,
      type,
      title,
      dashed,
      borderWidth,
      borderColor,
      textColor,
      backgroundColor,
    } = properties;
    const borderStr = `${borderWidth}px ${
      dashed ? "dashed" : "solid"
    } ${borderColor}`;
    const el = document.createElement("div");
    el.className = `uml-wrapper`;

    const html = `
      <div>
        <div class="${iconClass || ""} icon"></div>
        <div class="uml-head"
        style = "border-bottom : ${borderStr}">
          <div class='uml-type'>《${type}》</div> 
          <div class='uml-title'>${title}</div>
        </div>
        <div class="uml-body">
         ${propertiesStr}
        </div>
      </div>
    `;
    el.innerHTML = html;
    el.style.border = borderStr;
    el.style.color = textColor;
    el.style.backgroundColor = backgroundColor;
    el.style.width = `${this.props.model.width - 2}px`;
    el.style.height = `${this.props.model.height - 2}px`;
    // 需要先把之前渲染的子节点清除掉。
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
  }
}

export const class_diagram_radius = {
  type: "class_diagram_radius",
  model: ClassDiagramRadiusModel,
  view: ClassDiagramRadius,
};

//渲染一个svg图
export class SvgModel extends HtmlResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 80;
  }
  setAttributes() {
    this.text.editable = true;
    this.text.y = this.y + this.height / 2 + 10;
  }
}

export class Svg extends HtmlResize.view {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    const el = document.createElement("div");
    el.className = "svg-wrapper";
    const html = `
      <img src='${properties.src}'>
    `;
    el.innerHTML = html;
    // 需要先把之前渲染的子节点清除掉。
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
  }
}

export const svg = {
  type: "svg",
  model: SvgModel,
  view: Svg,
};

//类图
export class ClassDiagramModel extends HtmlResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 80;
    this.setProperties(
      Object.assign(
        {
          description: "",
          borderWidth: 1,
          borderColor: "#000",
          textColor: "#000",
          backgroundColor: "#fff",
          dashed: false,
        },
        data.properties
      )
    );
  }
  setAttributes() {
    this.text.editable = false;
  }
}

export class ClassDiagram extends HtmlResize.view {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;

    const propertiesStr = getPropertiesStr(properties);
    const {
      type,
      title,
      dashed,
      borderWidth,
      borderColor,
      textColor,
      backgroundColor,
    } = properties;
    const borderStr = `${borderWidth}px ${
      dashed ? "dashed" : "solid"
    } ${borderColor}`;
    const el = document.createElement("div");
    el.className = `class-wrapper`;

    const html = `
      <div>
        <div class="class-head"
        style = "border-bottom :${borderStr}">
          <span>${title}:</span>
          <span>${type}</span> 
        </div>
        <div class="class-body">
         ${propertiesStr}
        </div>
      </div>
    `;
    el.innerHTML = html;
    el.style.border = borderStr;
    el.style.backgroundColor = backgroundColor;
    el.style.color = textColor;
    el.style.width = `${this.props.model.width - 2}px`;
    el.style.height = `${this.props.model.height - 2}px`;
    // 需要先把之前渲染的子节点清除掉。
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
  }
}

export const class_diagram = {
  type: "class_diagram",
  model: ClassDiagramModel,
  view: ClassDiagram,
};

//端口图
class PortComponentModel extends HtmlResize.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 200;
    this.height = 80;
    this.setProperties(
      Object.assign(
        {
          description: "",
          borderColor: "#000",
          borderWidth: 1,
          textColor: "#000",
          backgroundColor: "#fff",
          dashed: false,
          port: {
            left: {
              leftPortType: "n",
            },
            right: {
              rightPortType: "n",
            },
            top: {
              topPortType: "n",
            },
            bottom: {
              bottomPortType: "n",
            },
          },
        },
        data.properties
      )
    );
  }
  setAttributes() {
    this.text.editable = false;
  }
  getDefaultAnchor() {
    const { width, height, x, y, id } = this;
    const { left, right, top, bottom } = this.properties.port;
    const anchorList: {
      x: number;
      y: number;
      name: string;
      id: string;
    }[] = [];
    if (left.leftPortType === "f" || left.leftPortType === "p") {
      anchorList.push({
        x: x - width / 2,
        y,
        name: "left",
        id: `${id}_1`,
      });
    }
    if (right.rightPortType === "f" || right.rightPortType === "p") {
      anchorList.push({
        x: x + width / 2,
        y,
        name: "right",
        id: `${id}_3`,
      });
    }
    if (bottom.bottomPortType === "f" || bottom.bottomPortType === "p") {
      anchorList.push({
        x: x,
        y: y - height / 2,
        name: "bottom",
        id: `${id}_2`,
      });
    }
    if (top.topPortType === "n" || top.topPortType === "p") {
      anchorList.push({
        x: x,
        y: y + height / 2,
        name: "top",
        id: `${id}_4`,
      });
    }
    return anchorList;
  }
}

class PortComponent extends HtmlResize.view {
  setHtml(rootEl: HTMLElement) {
    const { properties } = this.props.model;
    const { left, right, bottom, top } = properties.port;
    const propertiesStr = getPropertiesStr(properties);
    const {
      type,
      iconClass,
      title,
      dashed,
      borderWidth,
      borderColor,
      textColor,
      backgroundColor,
    } = properties;
    const borderStr = `${borderWidth}px ${
      dashed ? "dashed" : "solid"
    } ${borderColor}`;
    let portStr = "";
    //生成portStr
    switch (left.leftPortType) {
      case "n": {
        break;
      }
      case "f": {
        portStr += `<div class="port pleft"  style='border:${borderStr}'>f1</div>`;
        break;
      }
      case "p": {
        portStr += `<div class="port pleft"  style='border:${borderStr}'>p1</div>`;
        break;
      }
    }
    switch (right.rightPortType) {
      case "n": {
        break;
      }
      case "f": {
        portStr += `<div class="port pright"  style='border:${borderStr}'>f3</div>`;
        break;
      }
      case "p": {
        portStr += `<div class="port pright"  style='border:${borderStr}'>p3</div>`;
        break;
      }
    }
    switch (bottom.bottomPortType) {
      case "n": {
        break;
      }
      case "f": {
        portStr += `<div class="port pbottom"  style='border:${borderStr}'>f2</div>`;
        break;
      }
      case "p": {
        portStr += `<div class="port pbottom"  style='border:${borderStr}'>p2</div>`;
        break;
      }
    }
    switch (top.topPortType) {
      case "n": {
        break;
      }
      case "f": {
        portStr += `<div class="port ptop" style='border:${borderStr}'>f4</div>`;
        break;
      }
      case "p": {
        portStr += `<div class="port ptop"  style='border:${borderStr}'>p4</div>`;
        break;
      }
    }
    const el = document.createElement("div");
    el.className = "uml-wrapper";
    const html = `
        <div class="uml-wrapper-content">
          <div class="${iconClass || ""} icon"></div>
          <div class="uml-head" style = "border-bottom : ${borderStr}">
            <div>《${type}》</div> 
            <div>${title}</div>
          </div>
          <div class="uml-body">
           ${propertiesStr}
          </div>
         ${portStr}
        </div> 
       
      `;
    el.innerHTML = html;
    el.style.border = borderStr;
    el.style.color = textColor;
    el.style.backgroundColor = backgroundColor;
    el.style.width = `${this.props.model.width - 2}px`;
    el.style.height = `${this.props.model.height - 2}px`;
    // 需要先把之前渲染的子节点清除掉。
    rootEl.innerHTML = "";
    rootEl.appendChild(el);
  }
  getAnchorShape(anchorData: any) {
    const { x, y } = anchorData;

    return h("rect", {
      x: x - 10,
      y: y - 10,
      width: 20,
      height: 20,
      strokeWidth: 0,
      fill: "transparent",
    });
  }
}

export const port_component = {
  type: "port_component",
  view: PortComponent,
  model: PortComponentModel,
};
