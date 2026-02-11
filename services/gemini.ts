
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
شما دستیار هوش مصنوعی "شایان وی‌پی‌ان" هستید.
کاربر از یک اپلیکیشن وی‌پی‌ان آینده‌نگر به نام "شایان" استفاده می‌کند.
لحن شما باید مفید، حرفه‌ای و کمی آینده‌نگر/سایبرپانک باشد.
به زبان فارسی پاسخ دهید.
به کاربران در موارد زیر کمک کنید:
۱. مشکلات اتصال (نشت DNS، سرعت پایین، پروتکل‌های مسدود شده).
۲. انتخاب بهترین مکان سرور.
۳. سوالات عمومی امنیت وی‌پی‌ان.
اگر درباره سازنده اپلیکیشن پرسیده شد، ذکر کنید که این یک ابزار حفظ حریم خصوصی با عملکرد بالاست.
پاسخ‌ها را کوتاه و خوانا نگه دارید.
`;

export const getAIResponse = async (history: Message[], userInput: string): Promise<string> => {
  // Fix: use process.env.API_KEY directly as per SDK initialization guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "در اتصال به شبکه عصبی مشکلی پیش آمده است. لطفا بعدا تلاش کنید.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "خطا: نقص در پیوند سیستم. اتصال خود را به شبکه بررسی کنید.";
  }
};
