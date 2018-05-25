// @flow
type MatchLevel = "国家" | "省" | "市" | "区县" | "开发区" | "乡镇" | "村庄" | "热点商圈" | "兴趣点" |
    "门牌号" | "单元号" | "道路" | "道路交叉口" | "公交站台、地铁站" | "地铁站"

export default class GeoResponse {
    formatted_address: string
    province: string
    city: string
    citycode: string
    district: string
    street: string
    number: string
    adcode: string
    location: string
    level: MatchLevel
}
