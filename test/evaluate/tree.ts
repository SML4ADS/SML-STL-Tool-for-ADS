const dummy = JSON.parse(
  `{"rootId":0,"behaviors":[{"id":0,"name":"Keep","params":{"duration":[0,0]},"position":{"x":301,"y":40}},{"id":1,"name":"Decelerate","params":{"acceleration":[2.8,3.2],"targetSpeed":[0,0],"duration":[null,null]},"position":{"x":106.88289874139144,"y":520.5121848066632}},{"id":6,"name":"Keep","params":{"duration":[null,null]},"position":{"x":465.29811791241275,"y":309.31557108044643}},{"id":8,"name":"Keep","params":{"duration":[null,null]},"position":{"x":105.03006326630526,"y":320.6694479289335}},{"id":11,"name":"Decelerate","params":{"acceleration":[2.8,3.2],"targetSpeed":[0,0],"duration":[null,null]},"position":{"x":467.7641354421464,"y":528.7184468307661}}],"branchPoints":[{"id":3,"position":{"x":437,"y":238.4000015258789}}],"commonTransitions":[{"id":5,"sourceId":0,"targetId":3,"guard":""},{"id":10,"sourceId":8,"targetId":1,"guard":"hasObjWithinDisInLane(Ego, 15)"},{"id":12,"sourceId":6,"targetId":11,"guard":"hasObjWithinDisInLane(Ego, 5)"}],"probabilityTransitions":[{"id":9,"sourceId":3,"targetId":8,"weight":{"type":"Manual","params":{"weight":1}}},{"id":7,"sourceId":3,"targetId":6,"weight":{"type":"Manual","params":{"weight":1}}}]}`
);

describe("Tree", () => {
  const chai = require("chai");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const should = chai.should();

  const evaluateTree =
    require("../../electron-dist/electron-node/evaluate/tree").evaluateTree;

  it("default tree", () => {
    console.log(evaluateTree(null, dummy));
  });
});
