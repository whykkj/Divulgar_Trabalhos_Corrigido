function calcularDistancia(lat1, lon1, lat2, lon2) {
    const raioTerra = 6371;

    const diferencaLat = grausParaRadianos(lat2 - lat1);
    const diferencaLon = grausParaRadianos(lon2 - lon1);

    const a =
        Math.sin(diferencaLat / 2) * Math.sin(diferencaLat / 2) +
        Math.cos(grausParaRadianos(lat1)) *
        Math.cos(grausParaRadianos(lat2)) *
        Math.sin(diferencaLon / 2) *
        Math.sin(diferencaLon / 2);

    const c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return raioTerra * c;
}

function grausParaRadianos(graus) {
    return graus * (Math.PI / 180);
}

module.exports = calcularDistancia;