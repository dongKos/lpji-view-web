// Define the interface for the response data
export interface PolygonPrice {
    name: string;
    pricePerSquareMeter: number;
}

// Update the fetchPolygonPrices function to use the interface
export const fetchPolygonPrices = async (names: string[]): Promise<PolygonPrice[]> => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ names }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PolygonPrice[] = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch polygon prices:', error);
        throw error;
    }
};
