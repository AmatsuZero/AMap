class AddressComponent {
    province: string
    city: string | []
    citycode: string
    district: string
    adcode: string
}

export default class RegeoResponse {
    formatted_address: string
    addressComponent: AddressComponent[] | AddressComponent
}
