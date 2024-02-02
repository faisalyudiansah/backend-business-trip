function toRadians(degrees) {
    return degrees * Math.PI / 180
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    let R = 6371
    let dLat = toRadians(lat2 - lat1)
    let dLon = toRadians(lon2 - lon1)
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    let distance = R * c
    return distance
}

module.exports = calculateDistance