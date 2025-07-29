
import React, { useState } from "react";
import ImageUpload from "./components/ImageUpload";
import "./App.css";

const App: React.FC = () => {
  const [result, setResult] = useState<string>("");

  return (
    <main className="container">
      <h1>画像AI判定ツール</h1>
      <ImageUpload setResult={setResult} />
      {result && (
        <section>
          <h2>判定結果</h2>
          <p>{result}</p>
        </section>
      )}
    </main>
  );
};

export default App;