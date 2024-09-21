// services/fetchPolygonInfo.ts
export const fetchPolygonInfo = async (name: string) => {
    try {
        const response = await fetch(`https://api.example.com/polygon-info?name=${name}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch polygon info:', error);
        throw error;
    }
};
