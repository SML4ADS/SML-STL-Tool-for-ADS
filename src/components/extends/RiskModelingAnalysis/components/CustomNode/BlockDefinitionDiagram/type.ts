//FMEA
class FailureMode {
  detectability: string = "";
}
class Cause {
  occurence: string = "";
}
class Effect {
  severity: string = "";
}
export class FMEAType {
  caculation: string = "";
  RPN: string = "";
  description: string = "";
  failtureMode: FailureMode = new FailureMode();
  cause: Cause = new Cause();
  effect: Effect = new Effect();
}

//ANN

class Property {
  fairness: string = "";
  robustness: string = "";
  ethical: string = "";
  explainability: string = "";
  accountability: string = "";
  transparency: string = "";
}
class Trustworthy {
  num: string = "";
  property: Property = new Property();
}

class Way {
  forwardPropagation: string = "";
  backwardPropagation: string = "";
}
class Propagation {
  way: Way = new Way();
  description: string = "";
}
class LayerType {
  coreLayer: string = "";
  convolutionLayer: string = "";
  recurrentLayer: string = "";
  poolingLayer: string = "";
  activationLayer: string = "";
  reshapingLayer: string = "";
  regularizationLayer: string = "";
}
class Layer {
  layerNum: string = "";
  layerType: LayerType = new LayerType();
}

class Compile {
  optimizer: string = "";
  parameters: string = "";
  metrics: string = "";
  loss: string = "";
}
export class CNNType {
  description: string = "";
  trustworthy: Trustworthy = new Trustworthy();
  propagation: Propagation = new Propagation();
  layer: Layer = new Layer();
  compile: Compile = new Compile();
}

//Object Perception
class Input {
  dataset: string = "";
  datasetSize: string = "";
  feature: string = "";
  preprocessing: string = "";
  requirementDescrip: string = "";
}

class EvaluationMetric {
  name: string = "";
  description: string = "";
}

class Output {
  dataFormat: string = "";
  description: string = "";
}
export class ObjectPerceptionType {
  name: string = "";
  aiAlgorithm: string = "";
  usageDescription: string = "";
  input: Input = new Input();
  evaluationMetric: EvaluationMetric = new EvaluationMetric();
  output: Output = new Output();
}
