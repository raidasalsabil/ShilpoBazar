import { PricingCalculationResult } from '../types';

export function calculateFairPrice(params: {
  materialCost: number;
  laborHours: number;
  laborRatePerHour: number;
  otherExpenses?: number;
  profitPercent?: number;
  currentPrice?: number;
}): PricingCalculationResult {
  const materialCost = Math.max(0, Number(params.materialCost) || 0);
  const laborHours = Math.max(0, Number(params.laborHours) || 0);
  const laborRatePerHour = Math.max(0, Number(params.laborRatePerHour) || 0);
  const otherExpenses = Math.max(0, Number(params.otherExpenses) || 0);
  const profitPercent = Math.max(0, Number(params.profitPercent) || 0);
  const currentPrice = params.currentPrice !== undefined && params.currentPrice !== null && !isNaN(Number(params.currentPrice)) && Number(params.currentPrice) > 0
    ? Number(params.currentPrice)
    : undefined;

  const laborCost = Math.round(laborHours * laborRatePerHour);
  const totalProductionCost = Math.round(materialCost + laborCost + otherExpenses);
  const profitAmount = Math.round(totalProductionCost * (profitPercent / 100));
  const suggestedSellingPrice = Math.round(totalProductionCost + profitAmount);

  let priceDifference: number | undefined = undefined;
  let evaluationBn = '';
  let evaluationEn = '';

  if (currentPrice !== undefined) {
    priceDifference = suggestedSellingPrice - currentPrice;

    if (priceDifference > 0) {
      evaluationBn = `সতর্কতা: আপনার বর্তমান দাম (৳${currentPrice}) ন্যায্য মূল্যের চেয়ে ৳${priceDifference} কম! আপনি মাত্র উপকরণের খরচ তুলছেন, নিজের ${laborHours} ঘণ্টার অক্লান্ত শ্রম ও মেধার কোনো মূল্য নিচ্ছেন না। হাতের কাজের প্রকৃত মূল্য শ্রমের মধ্যেই।`;
      evaluationEn = `Warning: Your current price (৳${currentPrice}) is ৳${priceDifference} below the fair price! You are only covering materials, leaving your ${laborHours} hours of skilled craft unpaid. Handmade worth comes from hands and time.`;
    } else if (priceDifference < 0) {
      evaluationBn = `আপনার বর্তমান দাম (৳${currentPrice}) হিসাবকৃত মূল্যের চেয়ে ৳${Math.abs(priceDifference)} বেশি। প্রিমিয়াম বা বিশেষ কাজের ক্ষেত্রে এটি ভালো, তবে ক্রেতাদের সন্তুষ্টি মাথায় রাখুন।`;
      evaluationEn = `Your current price (৳${currentPrice}) is ৳${Math.abs(priceDifference)} above suggested price. Great for custom or collector pieces!`;
    } else {
      evaluationBn = `অভিনন্দন! আপনার দাম সম্পূর্ণ ভারসাম্যপূর্ণ। উপকরণ ও হাতের শ্রম দুটোই যথাযথ মূল্যায়িত হয়েছে।`;
      evaluationEn = `Congratulations! Your price is completely fair and honors both materials and labor.`;
    }
  } else {
    evaluationBn = `এই হিসাব অনুযায়ী আপনার হস্তশিল্পের ন্যায্য মূল্য ৳${suggestedSellingPrice}। এতে ৳${laborCost} আপনার মেধা ও শারীরিক শ্রমের মূল্য হিসেবে ধরা হয়েছে।`;
    evaluationEn = `Based on this calculation, the fair price of your craft is ৳${suggestedSellingPrice}, securing ৳${laborCost} as your rightful skilled labor reward.`;
  }

  return {
    materialCost,
    laborHours,
    laborRatePerHour,
    laborCost,
    otherExpenses,
    totalProductionCost,
    profitPercent,
    profitAmount,
    suggestedSellingPrice,
    currentPrice,
    priceDifference,
    evaluationBn,
    evaluationEn,
  };
}

