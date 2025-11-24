function calculateWindChill(tempC, speedKmh) {
    // Conversion pour formule standard
    const tempF = (tempC * 9/5) + 32;
    const speedMph = speedKmh / 1.609;
    
    if (tempF <= 50 && speedMph > 3) {
        const windChillF = 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speedMph, 0.16)) + (0.4275 * tempF * Math.pow(speedMph, 0.16));
        const windChillC = (windChillF - 32) * 5/9;
        return windChillC.toFixed(1) + "°C";
    } else {
        return "Not significant, feels like " + tempC + "°C";
    }
}

// Utilisation avec les données d'Haïti
const tempC = 30;
const speedKmh = 15;
document.getElementById("wcf").innerHTML = calculateWindChill(tempC, speedKmh);