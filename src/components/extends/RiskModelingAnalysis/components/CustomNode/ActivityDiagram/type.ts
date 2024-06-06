export class RiskPropagationType {
  riskType:
    | "software"
    | "hardware"
    | "human error"
    | "performance limitation"
    | "" = "";
  riskFlow: RiskFlow = new RiskFlow();
}

class RiskFlow {
  path: string = "";
  source: string = "";
  end: string = "";
  direction: "in" | "out" | "" = "";
}
