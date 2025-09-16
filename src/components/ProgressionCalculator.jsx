import React, { useState, useEffect } from "react";
import {
  Calculator,
  Clock,
  Target,
  Zap,
  Globe,
  Image as ImageIcon,
  Coins,
  Shield,
} from "lucide-react";

const ProgressionCalculator = () => {
  const [generationRate, setGenerationRate] = useState("106.04");
  const [generationLevel, setGenerationLevel] = useState("w");
  const [currentGold, setCurrentGold] = useState("0");
  const [currentGoldLevel, setCurrentGoldLevel] = useState("w");
  const [targetAmount, setTargetAmount] = useState("813.23");
  const [targetLevel, setTargetLevel] = useState("y");
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("auto");
  const [showImage, setShowImage] = useState(true);

  // 🏦 Estados para Gold Vault
  const [useGoldVault, setUseGoldVault] = useState(false);

  // 🖼️ URL da imagem única
  const imageUrl = "https://i.ytimg.com/vi/FTuAcp3Cib4/maxresdefault.jpg";

  // 🔢 PROGRESSÃO CORRIGIDA
  const levels = [
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
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "aa",
    "ab",
    "ac",
    "ad",
    "ae",
    "af",
    "ag",
    "ah",
    "ai",
    "aj",
    "ak",
    "al",
    "am",
    "an",
    "ao",
    "ap",
    "aq",
    "ar",
    "as",
    "at",
    "au",
    "av",
    "aw",
    "ax",
    "ay",
    "az",
  ];

  // 🌍 Configuração completa de idiomas
  const translations = {
    pt: {
      title: "Calculadora de Progressão",
      subtitle: "Calcule quanto tempo levará para atingir seu objetivo",
      generationRate: "Taxa de Geração",
      currentGold: "Ouro Atual",
      target: "Objetivo",
      goldVault: "Calcular Gold Vault",
      goldVaultDescription: "A cada 20 minutos: +25.02% da taxa de geração",
      goldVaultCount: "Gold Vaults obtidos",
      goldVaultBonusTotal: "Bônus total dos vaults",
      finalRate: "Taxa final (com vaults)",
      calculate: "Calcular Tempo",
      timeNeeded: "Tempo Necessário",
      error: "Erro",
      ratePerSecond: "Taxa por segundo",
      currentAmount: "Quantidade atual",
      remainingAmount: "Quantidade restante",
      totalTarget: "Objetivo total",
      errorInvalidValues: "Por favor, insira valores válidos maiores que zero.",
      errorCalculation: "Não é possível calcular o tempo com esses valores.",
      errorGeneral: "Erro no cálculo. Verifique os valores inseridos.",
      errorAlreadyReached: "Você já atingiu seu objetivo! 🎉",
      languageAuto: "Automático",
      showImage: "Mostrar Imagem",
      hideImage: "Ocultar Imagem",
      imageAlt: "Exemplo de Progressão",
      timeUnits: {
        year: "ano",
        years: "anos",
        month: "mês",
        months: "meses",
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
      currentGold: "Current Gold",
      target: "Target",
      goldVault: "Calculate Gold Vault",
      goldVaultDescription: "Every 20 minutes: +25.02% of generation rate",
      goldVaultCount: "Gold Vaults obtained",
      goldVaultBonusTotal: "Total vault bonus",
      finalRate: "Final rate (with vaults)",
      calculate: "Calculate Time",
      timeNeeded: "Time Needed",
      error: "Error",
      ratePerSecond: "Rate per second",
      currentAmount: "Current amount",
      remainingAmount: "Remaining amount",
      totalTarget: "Total target",
      errorInvalidValues: "Please enter valid values greater than zero.",
      errorCalculation: "Cannot calculate time with these values.",
      errorGeneral: "Calculation error. Please check the entered values.",
      errorAlreadyReached: "You have already reached your goal! 🎉",
      languageAuto: "Automatic",
      showImage: "Show Image",
      hideImage: "Hide Image",
      imageAlt: "Progression Example",
      timeUnits: {
        year: "year",
        years: "years",
        month: "month",
        months: "months",
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
      currentGold: "Oro Actual",
      target: "Objetivo",
      goldVault: "Calcular Gold Vault",
      goldVaultDescription: "Cada 20 minutos: +25.02% de la tasa de generación",
      goldVaultCount: "Gold Vaults obtenidos",
      goldVaultBonusTotal: "Bonificación total de vaults",
      finalRate: "Tasa final (con vaults)",
      calculate: "Calcular Tiempo",
      timeNeeded: "Tiempo Necesario",
      error: "Error",
      ratePerSecond: "Tasa por segundo",
      currentAmount: "Cantidad actual",
      remainingAmount: "Cantidad restante",
      totalTarget: "Objetivo total",
      errorInvalidValues:
        "Por favor, ingresa valores válidos mayores que cero.",
      errorCalculation: "No es posible calcular el tiempo con estos valores.",
      errorGeneral: "Error en el cálculo. Verifica los valores ingresados.",
      errorAlreadyReached: "¡Ya has alcanzado tu objetivo! 🎉",
      languageAuto: "Automático",
      showImage: "Mostrar Imagen",
      hideImage: "Ocultar Imagen",
      imageAlt: "Ejemplo de Progresión",
      timeUnits: {
        year: "año",
        years: "años",
        month: "mes",
        months: "meses",
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
      currentGold: "Or Actuel",
      target: "Objectif",
      goldVault: "Calculer Gold Vault",
      goldVaultDescription:
        "Toutes les 20 minutes: +25.02% du taux de génération",
      goldVaultCount: "Gold Vaults obtenus",
      goldVaultBonusTotal: "Bonus total des vaults",
      finalRate: "Taux final (avec vaults)",
      calculate: "Calculer le Temps",
      timeNeeded: "Temps Nécessaire",
      error: "Erreur",
      ratePerSecond: "Taux par seconde",
      currentAmount: "Montant actuel",
      remainingAmount: "Montant restant",
      totalTarget: "Objectif total",
      errorInvalidValues:
        "Veuillez saisir des valeurs valides supérieures à zéro.",
      errorCalculation: "Impossible de calculer le temps avec ces valeurs.",
      errorGeneral: "Erreur de calcul. Vérifiez les valeurs saisies.",
      errorAlreadyReached: "Vous avez déjà atteint votre objectif ! 🎉",
      languageAuto: "Automatique",
      showImage: "Afficher Image",
      hideImage: "Masquer Image",
      imageAlt: "Exemple de Progression",
      timeUnits: {
        year: "année",
        years: "années",
        month: "mois",
        months: "mois",
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

  // 🔢 Funções de conversão
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
    // Calcular todas as unidades de tempo
    const years = Math.floor(totalSeconds / (365.25 * 24 * 3600));
    const remainingAfterYears = totalSeconds % (365.25 * 24 * 3600);

    const months = Math.floor(remainingAfterYears / (30.44 * 24 * 3600));
    const remainingAfterMonths = remainingAfterYears % (30.44 * 24 * 3600);

    const days = Math.floor(remainingAfterMonths / (24 * 3600));
    const remainingAfterDays = remainingAfterMonths % (24 * 3600);

    const hours = Math.floor(remainingAfterDays / 3600);
    const remainingAfterHours = remainingAfterDays % 3600;

    const minutes = Math.floor(remainingAfterHours / 60);
    const seconds = Math.floor(remainingAfterHours % 60);

    const parts = [];

    if (years > 0) {
      const yearUnit = years === 1 ? t("timeUnits.year") : t("timeUnits.years");
      parts.push(`${years} ${yearUnit}`);
    }

    if (months > 0) {
      const monthUnit =
        months === 1 ? t("timeUnits.month") : t("timeUnits.months");
      parts.push(`${months} ${monthUnit}`);
    }

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

  // 🏦 Função de cálculo com Gold Vault progressivo
  const calculateTime = () => {
    try {
      const rateValue = parseFloat(generationRate);
      const currentValue = parseFloat(currentGold);
      const targetValue = parseFloat(targetAmount);

      if (isNaN(rateValue) || isNaN(targetValue) || rateValue <= 0) {
        setResult({ error: t("errorInvalidValues") });
        return;
      }

      // Converter valores para base
      const baseRateInBase = convertToBase(rateValue, generationLevel);
      const currentInBase = convertToBase(currentValue || 0, currentGoldLevel);
      const targetInBase = convertToBase(targetValue, targetLevel);

      // Verificar se já atingiu o objetivo
      if (currentInBase >= targetInBase) {
        setResult({ error: t("errorAlreadyReached") });
        return;
      }

      // Calcular quantidade restante
      const remainingInBase = targetInBase - currentInBase;

      let totalTime = 0;
      let currentRemaining = remainingInBase;
      let currentRate = baseRateInBase;
      let goldVaultCount = 0;
      let goldVaultBonusTotal = 0;

      if (useGoldVault) {
        // 🏦 Cálculo progressivo do Gold Vault
        const goldVaultInterval = 20 * 60; // 20 minutos em segundos
        const goldVaultBonus = 0.2502; // 25.02%

        while (currentRemaining > 0) {
          // Taxa atual por segundo
          const currentRatePerSecond = currentRate / 5;

          // Quantidade que será gerada nos próximos 20 minutos
          const amountIn20Minutes = currentRatePerSecond * goldVaultInterval;

          if (amountIn20Minutes >= currentRemaining) {
            // Se conseguir completar nos próximos 20 minutos
            const timeToComplete = currentRemaining / currentRatePerSecond;
            totalTime += timeToComplete;
            currentRemaining = 0;
          } else {
            // Adiciona 20 minutos ao tempo total
            totalTime += goldVaultInterval;
            currentRemaining -= amountIn20Minutes;

            // Adiciona um novo Gold Vault (25.02% de bônus)
            goldVaultCount++;
            const newBonus = baseRateInBase * goldVaultBonus;
            currentRate += newBonus;
            goldVaultBonusTotal += newBonus;
          }

          // Proteção contra loop infinito
          if (goldVaultCount > 1000) {
            setResult({ error: t("errorCalculation") });
            return;
          }
        }
      } else {
        // Cálculo normal sem Gold Vault
        const ratePerSecond = baseRateInBase / 5;
        totalTime = remainingInBase / ratePerSecond;
      }

      if (!isFinite(totalTime) || totalTime < 0) {
        setResult({ error: t("errorCalculation") });
        return;
      }

      setResult({
        timeFormatted: formatTime(totalTime),
        totalSeconds: totalTime,
        baseRatePerSecond: convertFromBase(baseRateInBase / 5, "B"),
        goldVaultCount: useGoldVault ? goldVaultCount : 0,
        goldVaultBonusTotal: useGoldVault
          ? convertFromBase(goldVaultBonusTotal / 5, "B")
          : 0,
        finalRatePerSecond: convertFromBase(currentRate / 5, "B"),
        currentAmount: convertFromBase(currentInBase, "B"),
        remainingAmount: convertFromBase(remainingInBase, "B"),
        totalTarget: convertFromBase(targetInBase, "B"),
        useGoldVault: useGoldVault,
      });
    } catch (error) {
      setResult({ error: t("errorGeneral") });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
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
                    <option value="pt">🟢 PT</option>
                    <option value="en">🔵 EN</option>
                    <option value="es">🟡 ES</option>
                    <option value="fr">⚪ FR</option>
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
                    <option value="pt">🟢 Português</option>
                    <option value="en">🔵 English</option>
                    <option value="es">🟡 Español</option>
                    <option value="fr">⚪ Français</option>
                  </select>
                </div>
              </div>
              <p className="text-gray-600">{t("subtitle")}</p>
            </div>
          </div>

          {/* 🖼️ Seção da Imagem Única */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <ImageIcon className="w-5 h-5 text-indigo-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  {t("imageAlt")}
                </h3>
              </div>
              <button
                onClick={() => setShowImage(!showImage)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
              >
                {showImage ? t("hideImage") : t("showImage")}
              </button>
            </div>

            {showImage && (
              <div className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
                <img
                  src={imageUrl}
                  alt={t("imageAlt")}
                  className="w-full h-auto max-h-96 object-contain transition-all duration-300 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden w-full h-48 bg-gray-100 items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">
                      {getCurrentLanguage() === "pt" && "Imagem não disponível"}
                      {getCurrentLanguage() === "en" && "Image not available"}
                      {getCurrentLanguage() === "es" && "Imagen no disponible"}
                      {getCurrentLanguage() === "fr" && "Image non disponible"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 🎯 Layout Principal */}
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

              {/* 🏦 Gold Vault */}
              <div className="bg-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-200 hover-scale">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                    <h3 className="text-base sm:text-lg font-semibold text-purple-800">
                      {t("goldVault")}
                    </h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useGoldVault}
                      onChange={(e) => setUseGoldVault(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <p className="text-sm text-purple-700 bg-purple-100 rounded-lg p-3">
                  {t("goldVaultDescription")}
                </p>
              </div>

              {/* 💰 Ouro Atual */}
              <div className="bg-yellow-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-200 hover-scale">
                <div className="flex items-center mb-3 sm:mb-4">
                  <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mr-2" />
                  <h3 className="text-base sm:text-lg font-semibold text-yellow-800">
                    {t("currentGold")}
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3">
                  <input
                    type="number"
                    value={currentGold}
                    onChange={(e) => setCurrentGold(e.target.value)}
                    className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                    placeholder="0"
                    step="0.01"
                    min="0"
                  />
                  <select
                    value={currentGoldLevel}
                    onChange={(e) => setCurrentGoldLevel(e.target.value)}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
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

            {/* Results Section */}
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
                          {result.baseRatePerSecond.toExponential(2)}B
                        </p>
                        {result.useGoldVault && (
                          <>
                            <p className="break-all">
                              <span className="font-medium">
                                {t("goldVaultCount")}:
                              </span>{" "}
                              {result.goldVaultCount}
                            </p>
                            <p className="break-all">
                              <span className="font-medium">
                                {t("goldVaultBonusTotal")}:
                              </span>{" "}
                              {result.goldVaultBonusTotal.toExponential(2)}B
                            </p>
                            <p className="break-all">
                              <span className="font-medium">
                                {t("finalRate")}:
                              </span>{" "}
                              {result.finalRatePerSecond.toExponential(2)}B
                            </p>
                          </>
                        )}
                        <p className="break-all">
                          <span className="font-medium">
                            {t("currentAmount")}:
                          </span>{" "}
                          {result.currentAmount.toExponential(2)}B
                        </p>
                        <p className="break-all">
                          <span className="font-medium">
                            {t("remainingAmount")}:
                          </span>{" "}
                          {result.remainingAmount.toExponential(2)}B
                        </p>
                        <p className="break-all">
                          <span className="font-medium">
                            {t("totalTarget")}:
                          </span>{" "}
                          {result.totalTarget.toExponential(2)}B
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
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
