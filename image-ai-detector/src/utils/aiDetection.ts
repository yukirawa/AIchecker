export const isImageGeneratedByAI = async (imageUrl: string): Promise<boolean> => {
    try {
        const response = await fetch('https://api.example.com/ai-detection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.isGeneratedByAI; // Assuming the API returns an object with this property
    } catch (error) {
        console.error('Error detecting AI-generated image:', error);
        return false; // Return false if there's an error
    }
};