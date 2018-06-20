// @flow

import GeoLocation from '../GeoLocation';
import { DirectionWalingPath } from './WalkingResponseType';

class DirectionTransitWalking extends DirectionWalingPath {
  origin: GeoLocation;
  destination: GeoLocation;
  constructor(prop: Object) {
    super(prop);
    this.origin = GeoLocation.fromString(prop.origin);
    this.destination = GeoLocation.fromString(prop.destination);
  }
}

class DirectionTransitStop {
  name: string;
  id: string;
  location: GeoLocation;
  constructor(prop: Object) {
    this.name = prop.name;
    this.id = prop.id;
    this.location = GeoLocation.fromString(prop.location);
  }
}

const convertToDate = (str: string): Date => {
  const date = new Date();
  const hour = Number.parseInt(str.substring(0, 2), 10);
  const minute = Number.parseInt(str.substring(2, 4), 10);
  date.setHours(hour, minute);
  return date;
};

class DirectionTransitBus {
  departure_stop: DirectionTransitStop;
  arrival_stop: DirectionTransitStop;
  name: string;
  id: string;
  type: string;
  distance: number;
  duration: number;
  polyline: GeoLocation[];
  start_time: Date | [];
  end_time: Date | [];
  via_num: number;
  via_stops: DirectionTransitStop[];
  constructor(prop: Object) {
    this.departure_stop = new DirectionTransitStop(prop.departure_stop);
    this.arrival_stop = new DirectionTransitStop(prop.arrival_stop);
    this.name = prop.name;
    this.id = prop.id;
    this.type = prop.type;
    this.distance = Number.parseFloat(prop.distance);
    this.duration = Number.parseFloat(prop.duration);
    this.polyline = prop.polyline
      .split(';')
      .map(value => GeoLocation.fromString(value));
    this.via_stops = prop.via_stops.map(value => new DirectionTransitStop(value));
    this.via_num = Number.parseInt(prop.via_num, 10);
    this.start_time = (typeof prop.start_time === 'string')
      ? convertToDate(prop.start_time)
      : [];
    this.end_time = (typeof prop.end_time === 'string')
      ? convertToDate(prop.end_time)
      : [];
  }
}

class DirectionTransitLocation {
  name: string;
  location: GeoLocation;
  constructor(prop: Object) {
    this.name = prop.name;
    this.location = GeoLocation.fromString(prop.location);
  }
}

class DirectionTransitRailwayStop extends DirectionTransitStop {
  adcode: string;
  time: Date;
  start: 0 | 1;
  constructor(prop: Object) {
    super(prop);
    this.adcode = prop.adcode;
    this.time = convertToDate(prop.time);
    this.start = prop.start;
  }
}

class DirectionTransitRailwayViaStop extends DirectionTransitStop {
  time: Date;
  end: 0 | 1;
  constructor(prop: Object) {
    super(prop);
    this.time = convertToDate(prop.time);
    this.end = prop.end;
  }
}

class DirectionTransitRailway {
  id: ?string;
  time: ?number;
  name: ?string;
  trip: ?string;
  departure_stop: ?DirectionTransitRailwayStop;
  arrival_stop: ?DirectionTransitRailwayStop;
  via_stop: ?DirectionTransitRailwayViaStop[];
  alters: ?{id: string; name: string;}[];
  spaces: {code: string; cost: number;}[];
  constructor(prop: Object) {
    this.id = prop.id && prop.id;
    this.time = prop.time && Number.parseInt(prop.time, 10);
    this.name = prop.name && prop.name;
    this.trip = prop.trip && prop.trip;
    this.departure_stop = prop.departure_stop
      && new DirectionTransitRailwayStop(prop.departure_stop);
    this.arrival_stop = prop.arrival_stop
      && new DirectionTransitRailwayStop(prop.arrival_stop);
    this.via_stop = prop.via_stop
      && prop.via_stop.map(v => new DirectionTransitRailwayViaStop(v));
    this.alters = prop.alters;
    this.spaces = prop.spaces && prop.spaces.map((v) => {
      const { code, cost } = v;
      return {
        code,
        cost: Number.parseInt(cost, 10),
      };
    });
  }
}

class DirectionTransitSegment {
  walking: DirectionTransitWalking;
  bus: { buslines: DirectionTransitBus[] | DirectionTransitBus };
  entrance: DirectionTransitLocation | [];
  exit: DirectionTransitLocation | [];
  railway: DirectionTransitRailway;
  constructor(prop: Object) {
    this.walking = new DirectionTransitWalking(prop.walking);
    const { buslines } = prop.bus;
    this.bus = {
      buslines: Array.isArray(buslines)
        ? buslines.map(value => new DirectionTransitBus(value))
        : new DirectionTransitBus(buslines),
    };
    this.entrance = Array.isArray(prop.entrance)
      ? []
      : new DirectionTransitLocation(prop.entrance);
    this.exit = Array.isArray(prop.exit)
      ? []
      : new DirectionTransitLocation(prop.exit);
    this.railway = new DirectionTransitRailway(prop.railway);
  }
}

class DirectionTransitType {
  cost: number;
  duration: number;
  nightflag: 0 | 1;
  walking_distance: number;
  segments: DirectionTransitSegment | DirectionTransitSegment[];
  constructor(prop: Object) {
    this.cost = Number.parseFloat(prop.cost);
    this.duration = Number.parseFloat(prop.duration);
    this.nightflag = prop.nightflag;
    this.walking_distance = Number.parseFloat(prop.walking_distance);
    this.segments = Array.isArray(prop.segments)
      ? prop.segments.map(value => new DirectionTransitSegment(value))
      : new DirectionTransitSegment(prop.segments);
  }
}

class DirectionTransitRoute {
  origin: GeoLocation;
  destination: GeoLocation;
  distance: number;
  taxi_cost: number;
  transits: DirectionTransitType | DirectionTransitType[];
  constructor(prop: Object) {
    this.origin = GeoLocation.fromString(prop.origin);
    this.destination = GeoLocation.fromString(prop.destination);
    this.distance = Number.parseFloat(prop.distance);
    this.taxi_cost = Number.parseFloat(prop.taxi_cost);
    this.transits = Array.isArray(prop.transits)
      ? prop.transits.map(value => new DirectionTransitType(value))
      : new DirectionTransitType(prop.transits);
  }
}

export default class TransitResponseType {
  count: number;
  route: DirectionTransitRoute | DirectionTransitRoute[];
  constructor(prop: Object) {
    this.count = Number.parseInt(prop.count, 10);
    this.route = Array.isArray(prop.route)
      ? prop.route.map(value => new DirectionTransitRoute(value))
      : new DirectionTransitRoute(prop.route);
  }
}
