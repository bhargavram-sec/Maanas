import { NextRequest, NextResponse } from 'next/server';

// Dynamic response generator based on input
function generateResponse(text: string, gender: string) {
  const lowerText = text.toLowerCase();
  
  // WOMAN responses - dynamic based on keywords
  if (gender === 'woman') {
    if (lowerText.includes('guilty') || lowerText.includes('no')) {
      return {
        conditioningType: "Good Girl Syndrome",
        confidence: Math.floor(Math.random() * 20) + 85, // 85-95%
        origin: "From childhood messages like 'be nice', 'adjust', 'don't say no'. Your mother likely received the same conditioning.",
        healthyRewrite: "You are allowed to say no. Your peace matters as much as anyone else's."
      };
    }
    if (lowerText.includes('failure') || lowerText.includes('not enough')) {
      return {
        conditioningType: "Imposter Syndrome",
        confidence: Math.floor(Math.random() * 15) + 80,
        origin: "Society tells women they must be 200% qualified. You've internalized this impossible standard.",
        healthyRewrite: "You belong here. Doubt is not evidence of inadequacy."
      };
    }
    if (lowerText.includes('cry') || lowerText.includes('weak')) {
      return {
        conditioningType: "Emotional Shaming",
        confidence: Math.floor(Math.random() * 20) + 75,
        origin: "Messages like 'stop crying' or 'you're too sensitive' taught you to hide emotions.",
        healthyRewrite: "Your tears are not weakness. They are your body releasing what words cannot say."
      };
    }
    if (lowerText.includes('everyone') || lowerText.includes('tired')) {
      return {
        conditioningType: "Caregiver Burnout",
        confidence: Math.floor(Math.random() * 15) + 80,
        origin: "Women are taught their worth = how much they give to others. You've been giving until empty.",
        healthyRewrite: "You cannot pour from an empty cup. Rest is not selfish - it's survival."
      };
    }
  }
  
  // MAN responses - dynamic based on keywords
  if (gender === 'man') {
    if (lowerText.includes('failure') || lowerText.includes('job') || lowerText.includes('money')) {
      return {
        conditioningType: "Provider Pressure",
        confidence: Math.floor(Math.random() * 20) + 80,
        origin: "Men are taught their worth = their income. Your father likely carried this same burden silently.",
        healthyRewrite: "Your value is not in your paycheck. You are enough exactly as you are."
      };
    }
    if (lowerText.includes('cry') || lowerText.includes('emotion') || lowerText.includes('feel')) {
      return {
        conditioningType: "Emotional Suppression",
        confidence: Math.floor(Math.random() * 15) + 85,
        origin: "Since childhood: 'boys don't cry', 'man up'. You learned to hide feelings to survive.",
        healthyRewrite: "Feeling is human. Real strength is allowing yourself to be vulnerable."
      };
    }
    if (lowerText.includes('alone') || lowerText.includes('help') || lowerText.includes('ask')) {
      return {
        conditioningType: "Toxic Independence",
        confidence: Math.floor(Math.random() * 20) + 75,
        origin: "Men are taught needing help = weakness. This leads to isolation and silent suffering.",
        healthyRewrite: "Asking for help is not weakness. Connection is how humans survive."
      };
    }
    if (lowerText.includes('angry') || lowerText.includes('mad')) {
      return {
        conditioningType: "Anger as Default",
        confidence: Math.floor(Math.random() * 15) + 80,
        origin: "Men are often only allowed to express anger, never sadness or fear. Anger becomes armor.",
        healthyRewrite: "Under anger is usually hurt. It's safe to feel both."
      };
    }
  }
  
  // NON-BINARY responses
  if (gender === 'nonbinary') {
    if (lowerText.includes('real') || lowerText.includes('valid')) {
      return {
        conditioningType: "Identity Invalidation",
        confidence: Math.floor(Math.random() * 15) + 85,
        origin: "Constant messages that your identity isn't real. Lack of representation and family rejection.",
        healthyRewrite: "Your identity is real because YOU are real. You don't need anyone's permission."
      };
    }
    if (lowerText.includes('alone') || lowerText.includes('nobody')) {
      return {
        conditioningType: "Isolation",
        confidence: Math.floor(Math.random() * 20) + 75,
        origin: "Feeling like you don't belong anywhere - not in male spaces, not in female spaces.",
        healthyRewrite: "You belong exactly where you are. Your community exists - we're here."
      };
    }
  }
  
  // Default response if no patterns match
  return {
    conditioningType: "General Conditioning",
    confidence: 70,
    origin: "Your thought pattern may be influenced by societal expectations, family messages, or personal experiences.",
    healthyRewrite: "Your feelings are valid. Give yourself permission to feel and heal."
  };
}

export async function POST(req: NextRequest) {
  try {
    const { text, gender } = await req.json();
    
    if (!text || !gender) {
      return NextResponse.json(
        { error: 'Missing text or gender' },
        { status: 400 }
      );
    }

    // Generate dynamic response based on input
    const result = generateResponse(text, gender);
    
    // Add slight delay to simulate real AI (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json(
      { 
        conditioningType: "Processing Error",
        confidence: 0,
        origin: "We couldn't analyze your thought right now.",
        healthyRewrite: "Please try again. Your feelings are valid." 
      },
      { status: 200 }
    );
  }
}
