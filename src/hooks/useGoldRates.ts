import { useState, useEffect } from 'react';

interface GoldRates {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  gold14k: number;
  platinum: number;
  silver: number;
  lastUpdated: string;
  isLoading: boolean;
  error: string | null;
}

// MetalpriceAPI configuration
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.metalpriceapi.com/v1';
const USD_TO_INR = 83.5;

// Fallback rates (static) - Updated with current GRT Jewelry rates
const FALLBACK_RATES = {
  gold24k: 16343, // ₹16,343 per gram (24K gold)
  gold22k: 14970, // ₹14,970 per gram (22K gold)
  gold18k: 12257, // ₹12,257 per gram (18K gold)
  gold14k: 9533,  // ₹9,533 per gram (14K gold)
  platinum: 7505, // ₹7,505 per gram (Platinum)
  silver: 300,    // ₹300 per gram
  lastUpdated: new Date().toISOString(),
};

export const useGoldRates = (): GoldRates => {
  const [rates, setRates] = useState<GoldRates>({
    gold24k: FALLBACK_RATES.gold24k,
    gold22k: FALLBACK_RATES.gold22k,
    gold18k: FALLBACK_RATES.gold18k,
    gold14k: FALLBACK_RATES.gold14k,
    platinum: FALLBACK_RATES.platinum,
    silver: FALLBACK_RATES.silver,
    lastUpdated: FALLBACK_RATES.lastUpdated,
    isLoading: true,
    error: null,
  });

  const fetchRates = async () => {
    try {
      setRates(prev => ({ ...prev, isLoading: true, error: null }));

      // If no API key is provided, use fallback rates
      if (API_KEY === 'YOUR_API_KEY_HERE') {
        console.warn('Gold rates API key not configured. Using fallback rates.');
        setRates({
          ...FALLBACK_RATES,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Fetch current gold and silver prices in USD
      const response = await fetch(
        `${BASE_URL}/latest?api_key=${API_KEY}&base=USD&currencies=XAU,XAG`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.info || 'API request failed');
      }

      // Convert from troy ounce to grams and USD to INR
      // 1 troy ounce = 31.1035 grams
      const TROY_OUNCE_TO_GRAMS = 31.1035;

      const goldPricePerGramINR = (1 / data.rates.XAU) * USD_TO_INR / TROY_OUNCE_TO_GRAMS;
      const silverPricePerGramINR = (1 / data.rates.XAG) * USD_TO_INR / TROY_OUNCE_TO_GRAMS;

      // Calculate 22k gold price (22k is approximately 91.67% pure)
      const gold22kPrice = goldPricePerGramINR * 0.9167;

      setRates({
        gold24k: Math.round(goldPricePerGramINR),
        gold22k: Math.round(goldPricePerGramINR * 0.9167),
        gold18k: Math.round(goldPricePerGramINR * 0.75),
        gold14k: Math.round(goldPricePerGramINR * 0.583),
        platinum: Math.round(goldPricePerGramINR * 0.47), // Rough estimation if API doesn't provide it
        silver: Math.round(silverPricePerGramINR),
        lastUpdated: new Date().toISOString(),
        isLoading: false,
        error: null,
      });

    } catch (error) {
      console.error('Error fetching gold rates:', error);

      // Use fallback rates on error
      setRates({
        ...FALLBACK_RATES,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch rates',
      });
    }
  };

  useEffect(() => {
    fetchRates();

    // Refresh rates every 30 minutes
    const interval = setInterval(fetchRates, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return rates;
};

// Alternative hook for IBJA API (India-specific)
export const useIBJAGoldRates = (): GoldRates => {
  const [rates, setRates] = useState<GoldRates>({
    gold24k: FALLBACK_RATES.gold24k,
    gold22k: FALLBACK_RATES.gold22k,
    gold18k: FALLBACK_RATES.gold18k,
    gold14k: FALLBACK_RATES.gold14k,
    platinum: FALLBACK_RATES.platinum,
    silver: FALLBACK_RATES.silver,
    lastUpdated: FALLBACK_RATES.lastUpdated,
    isLoading: true,
    error: null,
  });

  const fetchIBJARates = async () => {
    try {
      setRates(prev => ({ ...prev, isLoading: true, error: null }));

      // IBJA API endpoint (requires subscription)
      const IBJA_API_KEY = 'YOUR_IBJA_API_KEY_HERE';

      if (IBJA_API_KEY === 'YOUR_IBJA_API_KEY_HERE') {
        console.warn('IBJA API key not configured. Using fallback rates.');
        setRates({
          ...FALLBACK_RATES,
          isLoading: false,
          error: null,
        });
        return;
      }

      // Example IBJA API call (adjust based on actual API documentation)
      const response = await fetch(
        `https://api.indiagoldratesapi.com/rates?api_key=${IBJA_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`IBJA API request failed: ${response.status}`);
      }

      const data = await response.json();

      setRates({
        gold24k: data.gold_24k || FALLBACK_RATES.gold24k,
        gold22k: data.gold_22k || FALLBACK_RATES.gold22k,
        gold18k: data.gold_18k || FALLBACK_RATES.gold18k,
        gold14k: data.gold_14k || FALLBACK_RATES.gold14k,
        platinum: data.platinum || FALLBACK_RATES.platinum,
        silver: data.silver || FALLBACK_RATES.silver,
        lastUpdated: data.last_updated || new Date().toISOString(),
        isLoading: false,
        error: null,
      });

    } catch (error) {
      console.error('Error fetching IBJA gold rates:', error);

      setRates({
        ...FALLBACK_RATES,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch IBJA rates',
      });
    }
  };

  useEffect(() => {
    fetchIBJARates();

    // Refresh rates every 30 minutes
    const interval = setInterval(fetchIBJARates, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return rates;
};
