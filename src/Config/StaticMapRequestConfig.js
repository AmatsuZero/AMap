// @flow

import { Location } from '../Response';
import { Label, Marker, Path, Size } from '../StaticMap';

export default class StaticMapRequestConfig {
  location: string;
  zoom: number;
  size: Size;
  scale: 1 | 2;
  markers: string;
  labels: string;
  paths: string;
  traffic: 0 | 1;
  sig: string;
  constructor() {
    this.zoom = 1;
    this.size = new Size(400, 400);
    this.scale = 1;
    this.traffic = 0;
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
    this.location = location.stringValue;
  }
}
