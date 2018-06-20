// @flow

import GeoLocation from '../GeoLocation';

class DirectionWalkingStep {
  instruction: string;
  road: string | [];
  distance: number;
  orientation: string | [];
  duration: number;
  polyline: GeoLocation[];
  action: string | [];
  assistant_action: string | [];
  constructor(prop: Object) {
    this.instruction = prop.instruction;
    this.orientation = prop.orientation;
    this.road = prop.road;
    this.distance = prop.distance;
    this.duration = prop.duration;
    this.polyline = prop.polyline
      .split(';')
      .map(value => GeoLocation.fromString(value));
    this.action = prop.action;
    this.assistant_action = prop.assistant_action;
  }
}

export class DirectionWalingPath {
  distance: number;
  duration: number;
  steps: DirectionWalkingStep | DirectionWalkingStep[];
  constructor(prop: Object) {
    this.distance = Number.parseFloat(prop.distance);
    this.duration = Number.parseFloat(prop.duration);
    this.steps = Array.isArray(prop.steps)
      ? prop.steps.map(value => new DirectionWalkingStep(value))
      : new DirectionWalkingStep(prop.steps);
  }
}

class DirectionWalkingRoute {
  origin: GeoLocation;
  destination: GeoLocation;
  paths: DirectionWalingPath[];
  constructor(prop: Object) {
    this.origin = GeoLocation.fromString(prop.origin);
    this.destination = GeoLocation.fromString(prop.destination);
    this.paths = prop.paths.map(value => new DirectionWalingPath(value));
  }
}

export default class WalkingResponseType {
  count: number;
  route: DirectionWalkingRoute | DirectionWalkingRoute[];
  constructor(prop: Object) {
    this.count = Number.parseInt(prop.count, 10);
    this.route = Array.isArray(prop.route)
      ? prop.route.map(value => new DirectionWalkingRoute(value))
      : new DirectionWalkingRoute(prop.route);
  }
}
