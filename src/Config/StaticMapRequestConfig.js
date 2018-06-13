// @flow

import { Location } from '../Response';
import { Label, Marker, Path, Size } from '../StaticMap';
import BaseRequestConfig from './BaseRequestConfig';

export default class StaticMapRequestConfig extends BaseRequestConfig {
  _location: Location;
  zoom: number;
  _size: Size;
  scale: 1 | 2;
  _markers: Marker[];
  _labels: Label[];
  _paths: Path[];
  traffic: 0 | 1;

  constructor() {
    super();
    this.zoom = 1;
    this.scale = 1;
    this.traffic = 0;
    this.size = new Size(400, 400);
  }

  set location(newValue: Location) {
    this._location = newValue;
  }

  get location(): Location {
    return this._location;
  }

  set size(newValue: Size) {
    this._size = newValue;
  }

  get size(): Size {
    return this._size;
  }

  set markers(markers: Marker[]) {
    this._markers = markers;
  }

  get markers(): Marker[] {
    return this._markers;
  }

  set labels(labels: Label[]) {
    this._labels = labels;
  }

  get labels(): Label[] {
    return this._labels;
  }

  set paths(paths: Path[]) {
    this._paths = paths;
  }

  get paths(): Path[] {
    return this._paths;
  }
}
