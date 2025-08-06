import React, { useState, useEffect } from "react";
import { Calculator, Clock, Target, Zap, Globe } from "lucide-react";

const ProgressionCalculator = () => {
  const [generationRate, setGenerationRate] = useState("106.04");
  const [generationLevel, setGenerationLevel] = useState("x");
  const [targetAmount, setTargetAmount] = useState("813.23");
  const [targetLevel, setTargetLevel] = useState("y");
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("auto");

  // 🌍 Configuração completa de idiomas
  const translations = {
    pt: {
      title: "Calculadora de Progressão",
      subtitle: "Calcule quanto tempo levará para atingir seu objetivo",
      generationRate: "Taxa de Geração",
      target: "Objetivo",
      calculate: "Calcular Tempo",
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

  // Funções de detecção e tradução
  const detectBrowserLanguage = () => {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split("-")[0].toLowerCase();
    const supportedLanguages = ["pt", "en", "es", "fr"];
    return supportedLanguages.includes(langCode) ? langCode : "en";
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("calculatorLanguage");
    if (savedLanguage && savedLanguage !== "auto") {
      setLanguage(savedLanguage);
    } else {
      const detectedLang = detectBrowserLanguage();
      setLanguage(detectedLang);
    }
  }, []);

  useEffect(() => {
    if (language !== "auto") {
      localStorage.setItem("calculatorLanguage", language);
    }
  }, [language]);

  const getCurrentLanguage = () => {
    if (language === "auto") {
      return detectBrowserLanguage();
    }
    return language;
  };

  const t = (key) => {
    const currentLang = getCurrentLanguage();
    const keys = key.split(".");
    let value = translations[currentLang];

    for (const k of keys) {
      value = value?.[k];
    }

    if (!value) {
      value = translations["en"];
      for (const k of keys) {
        value = value?.[k];
      }
    }

    return value || key;
  };

  const handleLanguageChange = (newLanguage) => {
    if (newLanguage === "auto") {
      localStorage.removeItem("calculatorLanguage");
      setLanguage(detectBrowserLanguage());
    } else {
      setLanguage(newLanguage);
    }
  };

  // Definição dos níveis
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

  // Funções de conversão
  const convertToBase = (amount, level) => {
    const levelIndex = levels.indexOf(level);
    if (levelIndex === -1) return 0;
    return amount * Math.pow(1000, levelIndex);
  };

  const convertFromBase = (baseAmount, targetLevel) => {
    const levelIndex = levels.indexOf(targetLevel);
    if (levelIndex === -1) return 0;
    return baseAmount / Math.pow(1000, levelIndex);
  };

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

  const calculateTime = () => {
    try {
      const rateValue = parseFloat(generationRate);
      const targetValue = parseFloat(targetAmount);

      if (isNaN(rateValue) || isNaN(targetValue) || rateValue <= 0) {
        setResult({ error: t("errorInvalidValues") });
        return;
      }

      const rateInBase = convertToBase(rateValue, generationLevel);
      const targetInBase = convertToBase(targetValue, targetLevel);
      const ratePerSecond = rateInBase / 5;
      const timeInSeconds = targetInBase / ratePerSecond;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
          {/* 📱 Header Mobile-First */}
          <div className="text-center mb-6 sm:mb-8">
            {/* Mobile Header */}
            <div className="block sm:hidden">
              <div className="flex items-center justify-center mb-3">
                <Calculator className="w-6 h-6 text-indigo-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-800">
                  {t("title")}
                </h1>
              </div>
              <div className="text-center mb-3">
                <span className="text-sm text-gray-400 font-light">by</span>
                <span className="text-sm font-semibold text-indigo-600 ml-1">
                  Tenshy
                </span>
              </div>
              <div className="flex justify-center mb-3">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-600" />
                  <select
                    value={
                      language === detectBrowserLanguage() &&
                      !localStorage.getItem("calculatorLanguage")
                        ? "auto"
                        : language
                    }
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-xs"
                  >
                    <option value="auto">🌐 {t("languageAuto")}</option>
                    <option value="pt">🇧🇷 PT</option>
                    <option value="en">🇺🇸 EN</option>
                    <option value="es">🇪🇸 ES</option>
                    <option value="fr">🇫🇷 FR</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-600 px-2">{t("subtitle")}</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calculator className="w-8 h-8 text-indigo-600 mr-3" />
                  <div className="text-left">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {t("title")}
                      <span className="text-lg text-gray-400 font-light ml-2">
                        by
                      </span>
                      <span className="text-lg font-semibold text-indigo-600 ml-1 hover:text-indigo-700 transition-colors duration-200 cursor-default">
                        Tenshy
                      </span>
                    </h1>
                  </div>
                </div>

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
          </div>

          {/* 🎯 Layout Simplificado - Foco nos Inputs e Resultado */}
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            {/* Input Section */}
            <div className="space-y-4 sm:space-y-6">
              {/* Taxa de Geração */}
              <div className="bg-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-green-200 hover-scale">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-green-800">
                    {t("generationRate")}
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                  <input
                    type="number"
                    value={generationRate}
                    onChange={(e) => setGenerationRate(e.target.value)}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                    placeholder="106.04"
                    step="0.01"
                  />
                  <div className="flex gap-2 sm:gap-0">
                    <select
                      value={generationLevel}
                      onChange={(e) => setGenerationLevel(e.target.value)}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <span className="flex items-center px-2 sm:px-3 text-green-700 font-medium text-sm sm:text-base">
                      /5s
                    </span>
                  </div>
                </div>
              </div>

              {/* Objetivo */}
              <div className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200 hover-scale">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-blue-800">
                    {t("target")}
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                    placeholder="813.23"
                    step="0.01"
                  />
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
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
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base"
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                {t("calculate")}
              </button>
            </div>

            {/* Results Section - Agora mais espaçoso */}
            <div className="space-y-4 sm:space-y-6">
              {/* Resultado */}
              {result ? (
                <div
                  className={`rounded-lg sm:rounded-xl p-6 sm:p-8 border transition-all duration-300 ${
                    result.error
                      ? "bg-red-50 border-red-200 hover:bg-red-100"
                      : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                  }`}
                >
                  <div className="flex items-center mb-4 sm:mb-6">
                    <Clock
                      className={`w-5 h-5 sm:w-6 sm:h-6 mr-3 ${
                        result.error ? "text-red-600" : "text-purple-600"
                      }`}
                    />
                    <h3
                      className={`text-lg sm:text-xl font-semibold ${
                        result.error ? "text-red-800" : "text-purple-800"
                      }`}
                    >
                      {result.error ? t("error") : t("timeNeeded")}
                    </h3>
                  </div>

                  {result.error ? (
                    <p className="text-red-700 text-sm sm:text-base leading-relaxed">
                      {result.error}
                    </p>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="text-xl sm:text-3xl font-bold text-purple-800 break-words leading-tight">
                        {result.timeFormatted}
                      </div>
                      <div className="text-sm sm:text-base text-purple-700 space-y-2 bg-purple-100 rounded-lg p-4">
                        <p className="break-all">
                          <span className="font-medium">
                            {t("ratePerSecond")}:
                          </span>{" "}
                          {result.ratePerSecond.toExponential(2)}w
                        </p>
                        <p className="break-all">
                          <span className="font-medium">
                            {t("totalTarget")}:
                          </span>{" "}
                          {result.targetInBase.toExponential(2)}w
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Placeholder quando não há resultado
                <div className="rounded-lg sm:rounded-xl p-6 sm:p-8 border border-gray-200 bg-gray-50">
                  <div className="text-center">
                    <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                      {t("timeNeeded")}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500">
                      {getCurrentLanguage() === "pt" &&
                        "Insira os valores e clique em calcular"}
                      {getCurrentLanguage() === "en" &&
                        "Enter values and click calculate"}
                      {getCurrentLanguage() === "es" &&
                        "Ingresa los valores y haz clic en calcular"}
                      {getCurrentLanguage() === "fr" &&
                        "Entrez les valeurs et cliquez sur calculer"}
                    </p>
                  </div>
                </div>
              )}

              {/* Indicador de Idioma Detectado */}
              {language === "auto" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-center text-xs sm:text-sm text-yellow-800">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="break-words">
                      {getCurrentLanguage() === "pt" &&
                        "Idioma detectado: Português"}
                      {getCurrentLanguage() === "en" &&
                        "Language detected: English"}
                      {getCurrentLanguage() === "es" &&
                        "Idioma detectado: Español"}
                      {getCurrentLanguage() === "fr" &&
                        "Langue détectée: Français"}
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
