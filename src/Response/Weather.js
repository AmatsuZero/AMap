// @flow
type WeatherDescription = '多云' | '阴' | '阵雨' | '雷阵雨'
    | '雷阵雨并伴有冰雹' | '雨夹雪' | '小雨'
    | '中雨' | '大雨' | '暴雨' | '大暴雨'
    | '特大暴雨' | '阵雪' | '小雪'
    | '中雪' | '大雪' | '暴雪'
    | '雾' | '冻雨' | '沙尘暴'
    | '小雨-中雨' | '中雨-大雨' | '大雨-暴雨'
    | '暴雨-大暴雨' | '大暴雨-特大暴雨' | '小雪-中雪'
    | '中雪-大雪' | '大雪-暴雪' | '浮尘'
    | '扬沙' | '强沙尘暴' | '飑'
    | '龙卷风' | '弱高吹雪' | '轻雾' | '霾';

type WindDirection = '无风向' | '东北' | '东'
    | '东南' | '南' | '西南'
    | '西' | '西北' | '北'
    | '旋转不定';

type WindPower = '<3' | '3~4' | '4~5' | '5~6' | '6~7' |
  '7~8' | '8~9' | '9~10' | '10~11' | '11~12';

const toDate = (str: string): Date => new Date(str);

class LievWeather {
    province: string;
    city: string;
    adcode: string;
    weather: WeatherDescription;
    temperature: number;
    winddirection: WindDirection;
    windpower: WindPower;
    humidity: number;
    reporttime: Date;

    constructor(props) {
      this.province = props.province;
      this.adcode = props.adcode;
      this.weather = props.weather;
      this.windpower = props.windpower;
      this.temperature = Number.parseInt(props.temperature, 10);
      this.winddirection = props.winddirection;
      this.humidity = Number.parseInt(props.humidity, 10);
      this.reporttime = toDate(props.reporttime);
    }
}

class WeatherCast {
    date: Date;
    week: string;
    dayweather: WeatherDescription;
    nightweather: WeatherDescription;
    daytemp: number;
    nighttemp: number;
    daywind: WindDirection;
    nightwind: WindDirection;
    daypower: WindPower;
    nightpower: WindPower;
    constructor(prop) {
      this.date = toDate(prop.date);
      this.week = prop.week;
      this.dayweather = prop.dayweather;
      this.nightweather = prop.nightweather;
      this.daytemp = Number.parseInt(prop.daytemp, 10);
      this.nighttemp = Number.parseInt(prop.nighttemp, 10);
      this.daywind = prop.daywind;
      this.nightwind = prop.nightwind;
      this.daypower = prop.daypower;
      this.nightpower = prop.nightpower;
    }
}

class ForecastWeather {
    city: string;
    adcode: string;
    province: string;
    reporttime: Date;
    casts: Array<WeatherCast>;
    constructor(prop) {
      this.city = prop.city;
      this.adcode = prop.adcode;
      this.province = prop.province;
      this.reporttime = toDate(prop.reporttime);
      this.casts = prop.casts.map(value => new WeatherCast(value));
    }
}

export default class {
    lives: ?Array<LievWeather>;
    forecasts: ?Array<ForecastWeather>;
    constructor(props: Object) {
      this.lives = props.lives !== undefined && Array.isArray(props.lives)
        ? props.lives.map(value => new LievWeather(value))
        : null;
      this.forecasts = props.forecasts !== undefined && Array.isArray(props.forecasts)
        ? props.forecasts.map(value => new ForecastWeather(value))
        : null;
    }
}
