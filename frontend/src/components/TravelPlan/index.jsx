import React from 'react';
import { formatInstructions } from './utils';
import './TravelPlan.css';
import {Font, Document, Page, Text, StyleSheet, pdf} from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

const styles = StyleSheet.create({
    document: {
        padding: '40px',
        fontFamily: 'Roboto',
    },
    heading: {
        fontSize: 24,
        marginBottom: '20px',
        marginLeft: '20px',
        fontFamily: 'Roboto',
    },
    placeName: {
        fontSize: 18,
        marginBottom: '10px',
        marginLeft: '20px',
        fontFamily: 'Roboto',
    },
    distance: {
        fontSize: 14,
        marginBottom: '5px',
        marginLeft: '40px',
        fontFamily: 'Roboto',
    },
    duration: {
        fontSize: 14,
        marginBottom: '5px',
        marginLeft: '40px',
        fontFamily: 'Roboto',
    },
    instructionsTitle: {
        fontSize: 16,
        marginBottom: '10px',
        marginLeft: '40px',
        fontFamily: 'Roboto',
    },
    instructionItem: {
        fontSize: 12,
        marginBottom: '5px',
        marginLeft: '60px',
        fontFamily: 'Roboto',
    },
});

const TravelPlan = ({ directions }) => {

    const generatePdf = async () => {
        const pdfDocument = (
            <Document>
                <Page style={styles.document}>
                    <Text style={styles.heading}>План подорожі</Text>
                    {directions.map((direction, index) => (
                        <div key={index}>
                            <Text style={styles.placeName}>{index + 1}. {direction.placeName}</Text>
                            {direction.routes[0].legs.map((leg, legIndex) => (
                                <div key={leg.distance.text}>
                                    <Text style={styles.distance}>Дистанція: {leg.distance.text}</Text>
                                    <Text style={styles.duration}>Час: {leg.duration.text}</Text>
                                    <Text style={styles.instructionsTitle}>Інструкції:</Text>
                                    {formatInstructions(leg.steps, direction.places).map((instruction, instructionIndex) => (
                                        <Text key={instructionIndex} style={styles.instructionItem}>{instruction}</Text>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </Page>
            </Document>
        );

        const pdfBlob = await pdf(pdfDocument).toBlob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = 'travel_plan.pdf';
        downloadLink.click();
        URL.revokeObjectURL(pdfUrl);
    };

    return (
        <div className="travel-plan-container">
            {directions.length > 0 && (
                <div>
                    <h1 className="heading">План подорожі</h1>
                    {directions.map((direction, index) => (
                        <div key={index} className="direction-container">
                            <h2 className="place-name">{index + 1}. {direction.placeName}</h2>
                            {direction.routes[0].legs.map((leg, legIndex) => (
                                <div key={leg.distance.text} className="leg-container">
                                    <h3 className="distance">Дистанція: {leg.distance.text}</h3>
                                    <h3 className="duration">Час: {leg.duration.text}</h3>
                                    <h3 className="instructions-title">Інструкції:</h3>
                                    <div className="instructions">
                                        {formatInstructions(leg.steps, direction.places).map((instruction, instructionIndex) => (
                                            <div key={instructionIndex} className="instruction-item">
                                                {instruction}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="button" onClick={async () => await generatePdf()}>Зберегти як PDF</button>
                </div>
            )}
        </div>
    );
};

export default TravelPlan;
