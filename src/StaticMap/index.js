// @flow
import Location from '../Response/Location';

class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width <= 1 ? 1 : Math.min(width, 1024);
    this.height = height <= 1 ? 1 : Math.min(height, 1024);
  }
  toString(): string {
    return `${this.width}*${this.height}`;
  }
}

const convertLocations = (locations: Location[]): string => locations
  .map(value => value.toString())
  .reduce((accumulator, currentValue, currentIndex) =>
    (currentIndex === 0
      ? accumulator + currentValue
      : `${accumulator};${currentValue}`), '');

class Marker {
  size: string;
  color: string;
  label: string;
  location: string;
  url: string;
  constructor(
    locations: Location[],
    size: 'small' | 'mid' | 'large' | '-1' = 'small',
    color: string = '0xFC6054',
    label: string = '',
    url: string = '',
  ) {
    this.size = size;
    this.color = color;
    const regex = /[\d\w\u4e00-\u9fa5]/gi;
    this.label = regex.test(label) ? label.substring(0, 1) : '';
    this.location = convertLocations(locations);
    this.url = url;
  }
  toString(): string {
    if (this.size === '-1' && this.url.length > 0) {
      return `${this.size},${this.url},${this.label}:${this.location}`;
    }
    return `${this.size},${this.color},${this.label}:${this.location}`;
  }
}

class Label {
  content: string;
  font: number;
  bold: number;
  fontSize: number;
  fontColor: string;
  background: string;
  location: string;
  constructor(
    locations: Location[],
    content: string = '',
    font: 0 | 1 | 2 | 3 = 0,
    bold: 0 | 1 = 0,
    fontSize: number = 10,
    fontColor: string = '0xFFFFFF',
    background: string = '0x5288db',
  ) {
    this.content = content.length <= 15 ? content : content.substring(0, 15);
    this.font = font;
    this.bold = bold;
    this.fontSize = fontSize <= 1 ? 1 : Math.min(fontSize, 72);
    this.fontColor = fontColor;
    this.background = background;
    this.location = convertLocations(locations);
  }
  toString(): string {
    return `${this.content},${this.font},${this.bold},${this.fontSize},${this.fontColor},${this.background}:${this.location}`;
  }
}

class Path {
  weight: number;
  color: string;
  transparency: number;
  fillcolor: string;
  fillTransparency: number;
  location: string;
  constructor(
    locations: Location[],
    weight: number = 5,
    color: string = '0x0000FF',
    transparency: number = 1,
    fillcolor: string = '',
    fillTransparency: number = 0.5,
  ) {
    this.weight = weight <= 2 ? 2 : Math.min(weight, 15);
    this.color = color;
    this.transparency = transparency;
    this.fillcolor = fillcolor;
    this.fillTransparency = fillTransparency;
    this.location = convertLocations(locations);
  }

  toString(): string {
    return `${this.weight},${this.color},${this.transparency},${this.fillcolor},${this.fillTransparency}:${this.location}`;
  }
}

export {
  Size,
  Marker,
  Label,
  Path,
};
