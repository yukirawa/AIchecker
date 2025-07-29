export type ImageData = {
    url: string;
    width: number;
    height: number;
    format: 'jpeg' | 'png' | 'gif' | 'bmp' | 'webp';
};

export type DetectionResult = {
    isAIGenerated: boolean;
    confidence: number;
    message: string;
};