import * as fs from 'fs';

function binaryToHex(binary: string): string {
    const decimal = parseInt(binary, 2);
    return decimal.toString(16).toUpperCase().padStart(2, '0');
}

function convertBinaryFileToHex(inputFilePath: string, outputFilePath: string): void {
    try {
        const binaryData = fs.readFileSync(inputFilePath, 'utf-8').trim().split('\n');

        const hexArray: string[] = [];
        let binaryString = '';

        for (let i = 0; i < binaryData.length; i++) {
            binaryString += binaryData[i].trim();

            if (binaryString.length === 8) {
                hexArray.push(binaryToHex(binaryString));
                binaryString = '';
            }
        }

        if (binaryString.length > 0) {
            console.error('Incomplete byte in input file.');
            return;
        }

        const hexString = hexArray.join('');

        // Convert hex string to bytes
        const bytes = Buffer.from(hexString, 'hex');

        // Write bytes to output file
        fs.writeFileSync(outputFilePath, bytes);

        console.log(`Conversion successful. Hexadecimal data saved to ${outputFilePath}`);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Example usage: node binaryToHex.js input.txt output.raw
if (process.argv.length !== 4) {
    console.error('Usage: node binaryToHex.js input.txt output.raw');
} else {
    const inputFilePath = process.argv[2];
    const outputFilePath = process.argv[3];
    convertBinaryFileToHex(inputFilePath, outputFilePath);
}