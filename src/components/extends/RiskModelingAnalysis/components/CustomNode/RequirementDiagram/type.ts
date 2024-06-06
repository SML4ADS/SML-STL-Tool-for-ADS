//ODC
class FunctionState {
  loc: string = "";
  per: string = "";
  dm_p: string = "";
  con: string = "";
  v2x: string = "";
  stor: string = "";
}
class VehicleState {
  speed: string = "";
  function: FunctionState = new FunctionState();
}

class HumanState {
  driver: string = "";
  passenger: string = "";
}
class StaticEntity {
  road: string = "";
  lane: string = "";
  sign: string = "";
  infrastucre: string = "";
  zone: string = "";
}
class DynamicEntity {
  situation: string = "";
  tp: string = "";
  ntp: string = "";
}
class Environment {
  weather: string = "";
  illumination: string = "";
  temperature: string = "";
  moisture: string = "";
  communication: string = "";
}
class OperationDesignDomain {
  static: StaticEntity = new StaticEntity();
  dynamic: DynamicEntity = new DynamicEntity();
  env: Environment = new Environment();
}
export class ODCType {
  domain: OperationDesignDomain = new OperationDesignDomain();
  h_state: HumanState = new HumanState();
  v_state: VehicleState = new VehicleState();
  condition: string = "";
}

//HARA
export class HARAType {
  Hazard: string = "";
  s: string = "";
  e: string = "";
  c: string = "";
  level: string = "";
}
