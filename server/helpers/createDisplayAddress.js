function createDisplayAddress(location) {
    let displayAddress = [location.address1]
    if (location.address2) {
        displayAddress.push(location.address2)
    }
    if (location.address3) {
        displayAddress.push(location.address3)
    }
    let cityStateZipCountry = `${location.city}, ${location.state} ${location.zip_code}, ${location.country}`
    displayAddress.push(cityStateZipCountry)
    return displayAddress
}

module.exports = createDisplayAddress