// Our proprietary conditioning detection engine
// Runs 100% on your Mac - no API calls!

export class ConditioningEngine {
  // Gender patterns database
  private patterns = {
    woman: [
      {
        name: "Good Girl Syndrome",
        keywords: ["guilty", "no", "mother", "family", "should", "adjust", "selfish", "please"],
        confidence: (text: string) => this.calculateMatch(text, ["guilty", "no", "mother", "should", "sorry"]),
        origin: "Messages like 'adjust beta' from childhood. Generational expectation to be 'nice'.",
        rewrite: "No is a complete sentence. You can love people AND protect your peace."
      },
      {
        name: "Imposter Syndrome",
        keywords: ["not good enough", "fraud", "don't deserve", "luck", "fake", "exposed"],
        confidence: (text: string) => this.calculateMatch(text, ["not enough", "others better", "exposed", "fake"]),
        origin: "Society tells women they have to be 200% qualified. Men apply with 60%.",
        rewrite: "You earned your place. Doubt is not truth – it's conditioning."
      },
      {
        name: "People-Pleasing Burnout",
        keywords: ["tired", "exhausted", "everyone needs me", "no time for myself", "can't say no"],
        confidence: (text: string) => this.calculateMatch(text, ["tired", "everyone", "help", "alone", "burnout"]),
        origin: "Women are taught that their worth = how much they give to others.",
        rewrite: "Rest is not lazy. You can't pour from an empty cup."
      }
    ],
    man: [
      {
        name: "Provider Pressure",
        keywords: ["failure", "lost job", "provide", "earn", "support", "money", "not enough"],
        confidence: (text: string) => this.calculateMatch(text, ["job", "money", "provide", "failure", "support"]),
        origin: "Men are told their worth = their income. Father's silence about his own struggles.",
        rewrite: "Your value is not your paycheck. Real strength is asking for help."
      },
      {
        name: "Emotional Suppression",
        keywords: ["cry", "man up", "don't show", "weakness", "tough", "alone", "shouldn't"],
        confidence: (text: string) => this.calculateMatch(text, ["cry", "weak", "alone", "show", "emotion"]),
        origin: "Messages like 'boys don't cry' from as young as age 3.",
        rewrite: "Feeling is human. Emotions are not weakness – they're wisdom."
      },
      {
        name: "Toxic Independence",
        keywords: ["alone", "help", "burden", "handle", "ask", "need"],
        confidence: (text: string) => this.calculateMatch(text, ["alone", "help", "burden", "handle", "need"]),
        origin: "Men are taught needing help = failure. This leads to isolation.",
        rewrite: "Connection is strength. Everyone needs help sometimes."
      }
    ],
    nonbinary: [
      {
        name: "Identity Invalidation",
        keywords: ["real", "valid", "confused", "phase", "attention", "understand"],
        confidence: (text: string) => this.calculateMatch(text, ["real", "valid", "understand", "confused", "fake"]),
        origin: "Constant messages that your identity isn't valid. Lack of representation.",
        rewrite: "Your identity is real. You don't need anyone's permission to exist."
      }
    ]
  };

  // Matching algorithm
  private calculateMatch(text: string, keywords: string[]): number {
    const lowerText = text.toLowerCase();
    let score = 0;
    
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) score += 20;
      if (keyword === "guilty" && lowerText.includes("guilt")) score += 15;
      if (keyword === "failure" && lowerText.includes("fail")) score += 15;
    });
    
    return Math.min(score, 100);
  }

  // Origin tracing
  private traceOrigin(pattern: any, text: string): string {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("mother") || lowerText.includes("father") || lowerText.includes("parent")) {
      return "This likely started in childhood. Parents often pass down conditioning without realizing it.";
    }
    
    if (lowerText.includes("society") || lowerText.includes("people") || lowerText.includes("they")) {
      return "Cultural expectations. Society has different rules for different genders since birth.";
    }
    
    return pattern.origin;
  }

  // Main analysis function
  public analyze(text: string, gender: string) {
    const patterns = this.patterns[gender as keyof typeof this.patterns] || this.patterns.nonbinary;
    
    let bestMatch = null;
    let highestConfidence = 0;
    
    patterns.forEach(pattern => {
      const confidence = pattern.confidence(text);
      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        bestMatch = pattern;
      }
    });
    
    if (!bestMatch || highestConfidence < 30) {
      return {
        conditioningType: "General Stress",
        confidence: highestConfidence,
        origin: "Sometimes thoughts are just thoughts. But if this pattern repeats, check in with yourself.",
        healthyRewrite: "Your feelings are valid. Give yourself permission to feel them."
      };
    }
    
    return {
      conditioningType: bestMatch.name,
      confidence: highestConfidence,
      origin: this.traceOrigin(bestMatch, text),
      healthyRewrite: bestMatch.rewrite
    };
  }
}
