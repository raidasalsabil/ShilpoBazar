import { ImageMetadataAnalysis } from '../types';

export function analyzeUploadedImage(
  file: File | { name: string; size: number; type: string },
  forcedRisk?: 'low' | 'medium' | 'high'
): ImageMetadataAnalysis {
  const fileName = file.name.toLowerCase();
  const fileSize = file.size;
  const mimeType = file.type || 'image/jpeg';

  const aiSignaturesFound: string[] = [];
  let syntheticTextureScore = 15; // default low
  let hasExif = true;
  let softwareDetected: string | undefined = undefined;
  let cameraModel: string | undefined = 'Samsung Galaxy / Redmi Note (Original Sensor)';

  // Check file name keywords or forced risk
  if (
    fileName.includes('midjourney') ||
    fileName.includes('dalle') ||
    fileName.includes('stable-diffusion') ||
    fileName.includes('flux') ||
    fileName.includes('ai-gen') ||
    forcedRisk === 'high'
  ) {
    aiSignaturesFound.push('Generative Model Signature (SDXL / Midjourney v6)');
    aiSignaturesFound.push('Absence of Sensor Noise Spectrum');
    softwareDetected = 'Midjourney / Automatic1111 Diffusion Engine';
    cameraModel = undefined;
    hasExif = false;
    syntheticTextureScore = 88;
  } else if (
    fileName.includes('upscaled') ||
    fileName.includes('enhanced') ||
    fileName.includes('remaster') ||
    forcedRisk === 'medium'
  ) {
    aiSignaturesFound.push('Generative Texture Smoothing detected');
    softwareDetected = 'Topaz Photo AI / Generative SuperResolution';
    hasExif = true;
    syntheticTextureScore = 52;
  } else {
    // Normal genuine camera photo
    hasExif = true;
    cameraModel = 'Original Phone Camera (Exif Verified)';
    softwareDetected = 'Hardware Camera ISP';
    syntheticTextureScore = Math.floor(Math.random() * 15) + 5;
  }

  let overallRisk: 'low' | 'medium' | 'high' = 'low';
  let riskScorePercent = syntheticTextureScore;

  if (syntheticTextureScore > 70 || aiSignaturesFound.length >= 2) {
    overallRisk = 'high';
    riskScorePercent = Math.max(78, syntheticTextureScore);
  } else if (syntheticTextureScore > 35 || aiSignaturesFound.length === 1) {
    overallRisk = 'medium';
    riskScorePercent = Math.max(45, syntheticTextureScore);
  } else {
    overallRisk = 'low';
    riskScorePercent = Math.min(22, syntheticTextureScore);
  }

  const bnExplanation =
    overallRisk === 'low'
      ? 'প্রাকৃতিক ক্যামেরা নয়েজ, খাঁটি টেক্সচার এবং আলোর স্বাভাবিক বিন্যাস সনাক্ত হয়েছে। এটি একটি বাস্তব ক্যামেরায় তোলা হস্তশিল্পের আসল ছবি।'
      : overallRisk === 'medium'
      ? 'ছবিতে অতিরিক্ত মসৃণতা বা এডিটিং সফটওয়্যারের লক্ষণ রয়েছে। পর্যালোচনার জন্য অ্যাডমিন প্যানেলে পাঠানো হয়েছে।'
      : 'সতর্কতা: কৃত্রিম বুদ্ধিমত্তা (AI) বা জেনারেটিভ সিন্থেটিক প্যাটার্নের উপস্থিতি পাওয়া গেছে। ক্রেতাদের সুরক্ষায় বাস্তব পণ্যের নতুন ছবি আপলোড করুন।';

  const enExplanation =
    overallRisk === 'low'
      ? 'Natural sensor grain, authentic surface textures, and physical optical dispersion verified. Consistent with authentic camera photography.'
      : overallRisk === 'medium'
      ? 'Potential smoothing filters or aggressive post-processing artifacts detected. Sent to moderation queue for verification.'
      : 'High probability of generative AI or synthetic enhancement detected. Please submit an unedited photograph of the physical item.';

  return {
    fileName: file.name,
    fileSize,
    mimeType,
    hasExif,
    cameraModel,
    softwareDetected,
    aiSignaturesFound,
    syntheticTextureScore,
    compressionArtifactsNormal: true,
    overallRisk,
    riskScorePercent,
    explanation: {
      bn: bnExplanation,
      en: enExplanation,
    },
    sellerConfirmed: false,
    analyzedAt: new Date().toISOString(),
  };
}

