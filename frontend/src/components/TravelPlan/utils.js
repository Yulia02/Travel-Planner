export const formatInstructions = (steps) => {
    return steps.map((step, index) => {
        const distance = step.distance.text;
        const duration = step.duration.text;
        const instructions = step.instructions;
        const travelMode = step.travel_mode;

        let instructionText = `${index + 1}. ${instructions} (${distance}, ${duration})`;

        if (travelMode === window.google.maps.TravelMode.TRANSIT) {
            const transitDetails = step.transit;
            const lineName = transitDetails.line.name;
            const arrivalStop = transitDetails.arrival_stop.name;
            const vehicleType = transitDetails.line.vehicle.type;

            instructionText = `${index + 1}. ${instructions} (${lineName} ${vehicleType} до ${arrivalStop}) (${distance}, ${duration})`;
        }

        return instructionText;
    });
};