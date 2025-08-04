import React, { useState, useEffect } from "react";
import { Calculator, Clock, Target, Zap, Globe } from "lucide-react";

const ProgressionCalculator = () => {
  const [generationRate, setGenerationRate] = useState("106.04");
  const [generationLevel, setGenerationLevel] = useState("x");
  const [targetAmount, setTargetAmount] = useState("813.23");
  const [targetLevel, setTargetLevel] = useState("y");
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("auto"); // Inicializa como 'auto'

  // 🌍 Configuração completa de idiomas
  const translations = {
    pt: {
      title: "Calculadora de Progressão",
      subtitle: "Calcule quanto tempo levará para atingir seu objetivo",
      generationRate: "Taxa de Geração",
      target: "Objetivo",
      calculate: "Calcular Tempo",
      levelReference: "Referência de Níveis",
      timeNeeded: "Tempo Necessário",
      error: "Erro",
      ratePerSecond: "Taxa por segundo",
      totalTarget: "Objetivo total",
      errorInvalidValues: "Por favor, insira valores válidos maiores que zero.",
      errorCalculation: "Não é possível calcular o tempo com esses valores.",
      errorGeneral: "Erro no cálculo. Verifique os valores inseridos.",
      languageAuto: "Automático",
      timeUnits: {
        day: "dia",
        days: "dias",
        hour: "hora",
        hours: "horas",
        minute: "minuto",
        minutes: "minutos",
        second: "segundo",
        seconds: "segundos",
      },
    },
    en: {
      title: "Progression Calculator",
      subtitle: "Calculate how long it will take to reach your goal",
      generationRate: "Generation Rate",
      target: "Target",
      calculate: "Calculate Time",
      levelReference: "Level Reference",
      timeNeeded: "Time Needed",
      error: "Error",
      ratePerSecond: "Rate per second",
      totalTarget: "Total target",
      errorInvalidValues: "Please enter valid values greater than zero.",
      errorCalculation: "Cannot calculate time with these values.",
      errorGeneral: "Calculation error. Please check the entered values.",
      languageAuto: "Automatic",
      timeUnits: {
        day: "day",
        days: "days",
        hour: "hour",
        hours: "hours",
        minute: "minute",
        minutes: "minutes",
        second: "second",
        seconds: "seconds",
      },
    },
    es: {
      title: "Calculadora de Progresión",
      subtitle: "Calcula cuánto tiempo tomará alcanzar tu objetivo",
      generationRate: "Tasa de Generación",
      target: "Objetivo",
      calculate: "Calcular Tiempo",
      levelReference: "Referencia de Niveles",
      timeNeeded: "Tiempo Necesario",
      error: "Error",
      ratePerSecond: "Tasa por segundo",
      totalTarget: "Objetivo total",
      errorInvalidValues:
        "Por favor, ingresa valores válidos mayores que cero.",
      errorCalculation: "No es posible calcular el tiempo con estos valores.",
      errorGeneral: "Error en el cálculo. Verifica los valores ingresados.",
      languageAuto: "Automático",
      timeUnits: {
        day: "día",
        days: "días",
        hour: "hora",
        hours: "horas",
        minute: "minuto",
        minutes: "minutos",
        second: "segundo",
        seconds: "segundos",
      },
    },
    fr: {
      title: "Calculatrice de Progression",
      subtitle:
        "Calculez combien de temps il faudra pour atteindre votre objectif",
      generationRate: "Taux de Génération",
      target: "Objectif",
      calculate: "Calculer le Temps",
      levelReference: "Référence des Niveaux",
      timeNeeded: "Temps Nécessaire",
      error: "Erreur",
      ratePerSecond: "Taux par seconde",
      totalTarget: "Objectif total",
      errorInvalidValues:
        "Veuillez saisir des valeurs valides supérieures à zéro.",
      errorCalculation: "Impossible de calculer le temps avec ces valeurs.",
      errorGeneral: "Erreur de calcul. Vérifiez les valeurs saisies.",
      languageAuto: "Automatique",
      timeUnits: {
        day: "jour",
        days: "jours",
        hour: "heure",
        hours: "heures",
        minute: "minute",
        minutes: "minutes",
        second: "seconde",
        seconds: "secondes",
      },
    },
  };

  // 🔍 Detecção automática do idioma do navegador
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split("-")[0].toLowerCase();

    // Mapear códigos de idioma para nossos idiomas suportados
    const supportedLanguages = ["pt", "en", "es", "fr"];

    if (supportedLanguages.includes(langCode)) {
      return langCode;
    }

    // Fallback para inglês se o idioma não for suportado
    return "en";
  };

  // 💾 Persistência do idioma escolhido
  useEffect(() => {
    // Carregar idioma salvo ou detectar automaticamente
    const savedLanguage = localStorage.getItem("calculatorLanguage");

    if (savedLanguage && savedLanguage !== "auto") {
      setLanguage(savedLanguage);
    } else {
      const detectedLang = detectBrowserLanguage();
      setLanguage(detectedLang);
    }
  }, []);

  // Salvar idioma quando mudado
  useEffect(() => {
    if (language !== "auto") {
      localStorage.setItem("calculatorLanguage", language);
    }
  }, [language]);

  // Função para obter idioma atual (considerando auto)
  const getCurrentLanguage = () => {
    if (language === "auto") {
      return detectBrowserLanguage();
    }
    return language;
  };

  // Função para obter texto traduzido
  const t = (key) => {
    const currentLang = getCurrentLanguage();
    const keys = key.split(".");
    let value = translations[currentLang];

    for (const k of keys) {
      value = value?.[k];
    }

    // Fallback para inglês se a tradução não existir
    if (!value) {
      value = translations["en"];
      for (const k of keys) {
        value = value?.[k];
      }
    }

    return value || key;
  };

  // Função para lidar com mudança de idioma
  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === "auto") {
      localStorage.removeItem("calculatorLanguage");
      setLanguage(detectBrowserLanguage());
    } else {
      setLanguage(newLanguage);
    }
  };

  // Definição dos níveis em ordem crescente
  const levels = [
    "w",
    "x",
    "y",
    "z",
    "B",
    "T",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "t",
    "u",
    "v",
    "ab",
    "ad",
    "ae",
    "ag",
    "ai",
    "ak",
    "am",
    "ao",
    "ar",
    "at",
  ];

  // Converte qualquer valor para a unidade base (w)
  const convertToBase = (amount, level) => {
    const levelIndex = levels.indexOf(level);
    if (levelIndex === -1) return 0;
    return amount * Math.pow(1000, levelIndex);
  };

  // Converte da unidade base para um nível específico
  const convertFromBase = (baseAmount, targetLevel) => {
    const levelIndex = levels.indexOf(targetLevel);
    if (levelIndex === -1) return 0;
    return baseAmount / Math.pow(1000, levelIndex);
  };

  // 🕒 Formata o tempo com suporte a múltiplos idiomas
  const formatTime = (totalSeconds) => {
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const parts = [];

    if (days > 0) {
      const dayUnit = days === 1 ? t("timeUnits.day") : t("timeUnits.days");
      parts.push(`${days} ${dayUnit}`);
    }

    if (hours > 0) {
      const hourUnit = hours === 1 ? t("timeUnits.hour") : t("timeUnits.hours");
      parts.push(`${hours} ${hourUnit}`);
    }

    if (minutes > 0) {
      const minuteUnit =
        minutes === 1 ? t("timeUnits.minute") : t("timeUnits.minutes");
      parts.push(`${minutes} ${minuteUnit}`);
    }

    if (seconds > 0 || parts.length === 0) {
      const secondUnit =
        seconds === 1 ? t("timeUnits.second") : t("timeUnits.seconds");
      parts.push(`${seconds} ${secondUnit}`);
    }

    return parts.join(", ");
  };

  // Função principal de cálculo
  const calculateTime = () => {
    try {
      const rateValue = parseFloat(generationRate);
      const targetValue = parseFloat(targetAmount);

      if (isNaN(rateValue) || isNaN(targetValue) || rateValue <= 0) {
        setResult({ error: t("errorInvalidValues") });
        return;
      }

      // Converte ambos os valores para a unidade base (w)
      const rateInBase = convertToBase(rateValue, generationLevel);
      const targetInBase = convertToBase(targetValue, targetLevel);

      // Calcula a taxa por segundo (dividindo por 5 segundos)
      const ratePerSecond = rateInBase / 5;

      // Calcula o tempo necessário em segundos
      const timeInSeconds = targetInBase / ratePerSecond;

      // Verifica se o resultado é válido
      if (!isFinite(timeInSeconds) || timeInSeconds < 0) {
        setResult({ error: t("errorCalculation") });
        return;
      }

      setResult({
        timeFormatted: formatTime(timeInSeconds),
        totalSeconds: timeInSeconds,
        ratePerSecond: convertFromBase(ratePerSecond, "w"),
        targetInBase: convertFromBase(targetInBase, "w"),
      });
    } catch (error) {
      setResult({ error: t("errorGeneral") });
    }
  };

  // ... (mantenha todo o código anterior até a linha do return)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header com Assinatura e Seletor de Idioma */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calculator className="w-8 h-8 text-indigo-600 mr-3" />
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {t("title")}
                  </h1>
                  {/* ✨ Assinatura Tenshy */}
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500 font-medium">
                      By
                    </span>
                    <span className="text-sm font-bold text-indigo-600 ml-1 hover:text-indigo-700 transition-colors duration-200 cursor-default">
                      Tenshy
                    </span>
                    <div className="w-1 h-1 bg-indigo-400 rounded-full mx-2"></div>
                    <span className="text-xs text-gray-400 font-medium">
                      v2.0
                    </span>
                  </div>
                </div>
              </div>

              {/* 🌍 Seletor de Idioma Avançado */}
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <select
                  value={
                    language === detectBrowserLanguage() &&
                    !localStorage.getItem("calculatorLanguage")
                      ? "auto"
                      : language
                  }
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="auto">🌐 {t("languageAuto")}</option>
                  <option value="pt">🇧🇷 Português</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>
            </div>
            <p className="text-gray-600">{t("subtitle")}</p>
          </div>

          {/* ... (resto do código permanece igual) */}

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Taxa de Geração */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200 hover-scale">
                <div className="flex items-center mb-4">
                  <Zap className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-semibold text-green-800">
                    {t("generationRate")}
                  </h3>
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={generationRate}
                    onChange={(e) => setGenerationRate(e.target.value)}
                    className="flex-1 px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    placeholder="106.04"
                    step="0.01"
                  />
                  <select
                    value={generationLevel}
                    onChange={(e) => setGenerationLevel(e.target.value)}
                    className="px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <span className="flex items-center px-3 text-green-700 font-medium">
                    /5s
                  </span>
                </div>
              </div>

              {/* Objetivo */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 hover-scale">
                <div className="flex items-center mb-4">
                  <Target className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-blue-800">
                    {t("target")}
                  </h3>
                </div>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="813.23"
                    step="0.01"
                  />
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botão Calcular */}
              <button
                onClick={calculateTime}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Calculator className="w-5 h-5 inline mr-2" />
                {t("calculate")}
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Tabela de Referência */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover-scale">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t("levelReference")}
                </h3>
                <div className="grid grid-cols-4 gap-2 text-sm max-h-64 overflow-y-auto">
                  {levels.map((level, index) => (
                    <div
                      key={level}
                      className="bg-white px-2 py-1 rounded text-center border hover:bg-gray-50 transition-colors duration-150"
                    >
                      <span className="font-mono font-bold">{level}</span>
                      <div className="text-xs text-gray-500">
                        10^{index * 3}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resultado */}
              {result && (
                <div
                  className={`rounded-xl p-6 border transition-all duration-300 ${
                    result.error
                      ? "bg-red-50 border-red-200 hover:bg-red-100"
                      : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Clock
                      className={`w-5 h-5 mr-2 ${
                        result.error ? "text-red-600" : "text-purple-600"
                      }`}
                    />
                    <h3
                      className={`text-lg font-semibold ${
                        result.error ? "text-red-800" : "text-purple-800"
                      }`}
                    >
                      {result.error ? t("error") : t("timeNeeded")}
                    </h3>
                  </div>

                  {result.error ? (
                    <p className="text-red-700">{result.error}</p>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-2xl font-bold text-purple-800 break-words">
                        {result.timeFormatted}
                      </div>
                      <div className="text-sm text-purple-700 space-y-1">
                        <p>
                          {t("ratePerSecond")}:{" "}
                          {result.ratePerSecond.toExponential(2)}w
                        </p>
                        <p>
                          {t("totalTarget")}:{" "}
                          {result.targetInBase.toExponential(2)}w
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Indicador de Idioma Detectado */}
              {language === "auto" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center text-sm text-yellow-800">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>
                      {getCurrentLanguage() === "pt" &&
                        "Idioma detectado automaticamente: Português"}
                      {getCurrentLanguage() === "en" &&
                        "Language automatically detected: English"}
                      {getCurrentLanguage() === "es" &&
                        "Idioma detectado automáticamente: Español"}
                      {getCurrentLanguage() === "fr" &&
                        "Langue détectée automatiquement: Français"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressionCalculator;
