import React, { useRef, useState } from "react";

type Props = {
  setResult: (result: string) => void;
};

const API_KEY = "AIzaSyA9bbxrqJlV2upXMLqV_C9xieWuEJ4I6-E";

const ImageUpload: React.FC<Props> = ({ setResult }) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  // 画像をBase64に変換
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = (reader.result as string).split(",")[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setLoading(true);
    setResult("");

    try {
      const base64 = await toBase64(file);

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "この画像はAIで生成されたものですか？YesかNoで答えてください。理由も簡単に述べてください。",
                  },
                  {
                    inlineData: {
                      mimeType: file.type,
                      data: base64,
                    },
                  },
                ],
              },
            ],
          }),
        }
      );
      if (!res.ok) {
        setResult("APIリクエストに失敗しました");
        setLoading(false);
        return;
      }
      const data = await res.json();
      const answer =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "判定できませんでした";
      setResult(answer);
    } catch (err) {
      setResult("判定に失敗しました");
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={fileInput}
        onChange={handleUpload}
        disabled={loading}
        title="画像ファイルを選択"
      />
      {loading && <p>判定中...</p>}
    </div>
  );
};

export default ImageUpload;