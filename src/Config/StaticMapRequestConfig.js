// @flow

import { Location } from '../Response';
import { Label, Marker, Path, Size } from '../StaticMap';
import BaseRequestConfig from './BaseRequestConfig';

export default class StaticMapRequestConfig extends BaseRequestConfig {
  location: string;
  zoom: number;
  size: string;
  scale: 1 | 2;
  markers: string;
  labels: string;
  paths: string;
  traffic: 0 | 1;

  constructor() {
    super();
    this.zoom = 1;
    this.scale = 1;
    this.traffic = 0;
    this.setSize(new Size(400, 400));
  }

  setMarkers(markers: Marker[]) {
    this.markers = Marker.toParameter(markers);
  }

  setLabels(labels: Label[]) {
    this.labels = Label.toParameter(labels);
  }

  setPaths(paths: Path[]) {
    this.paths = Path.toParameter(paths);
  }

  setLocation(location: Location) {
    this.location = location.toString();
  }

  setSize(size: Size) {
    this.size = size.toParameter();
  }
}
