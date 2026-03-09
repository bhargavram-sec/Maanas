'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
 import { 
  FaHome, FaUser, FaComments, FaBook, FaHeart, 
  FaMoon, FaSun, FaBell, FaCog, FaSignOutAlt,
  FaLeaf, FaHandHoldingHeart, FaRobot, FaUsers,
  FaSmile, FaMeh, FaFrown, FaAngry, FaSadTear,
  FaCalendar, FaChartLine, FaShare, FaDownload,
  FaLock, FaShieldAlt, FaGlobe, FaPhone,
  FaEnvelope, FaComment, FaPaperPlane, FaTrash,
  FaEdit, FaCheck, FaTimes, FaPlus, FaSearch,
  FaFilter, FaSort, FaStar, FaRegStar,
  FaVolumeUp, FaVolumeMute, FaPause, FaPlay, FaFire,
  FaQuoteRight, FaQuoteLeft,
  FaMagic,
  FaWind  
} from 'react-icons/fa';

export default function Home() {
  // Core states
  const [gender, setGender] = useState<'woman' | 'man' | 'nonbinary'>('woman');
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'journal' | 'community' | 'resources' | 'profile'>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [thought, setThought] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'ai', text: string, time: Date, read: boolean}>>([]);
  const [journalEntries, setJournalEntries] = useState<Array<{id: number, title: string, content: string, date: Date, mood: string, tags: string[]}>>([]);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [currentMood, setCurrentMood] = useState('😊');
  const [streak, setStreak] = useState(7);
  const [notifications, setNotifications] = useState(3);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('all');
  const [isTyping, setIsTyping] = useState(false);
  const [volume, setVolume] = useState(true);
  const [breathingExercise, setBreathingExercise] = useState(false);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [mounted, setMounted] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [showAffirmation, setShowAffirmation] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Set mounted state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Gender-specific themes with distinct colors and vibes
  const themes = {
    woman: {
      primary: 'from-pink-500 to-rose-500',
      secondary: 'from-pink-400 to-rose-400',
      accent: 'pink-500',
      light: 'pink-50',
      dark: 'pink-900',
      bg: 'bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200',
      darkBg: 'bg-gradient-to-br from-pink-950 via-rose-950 to-pink-900',
      card: 'bg-white/80 backdrop-blur-md',
      darkCard: 'bg-black/30 backdrop-blur-md',
      text: 'text-pink-900',
      darkText: 'text-pink-100',
      border: 'border-pink-200',
      darkBorder: 'border-pink-800',
      button: 'bg-gradient-to-r from-pink-500 to-rose-500',
      buttonHover: 'from-pink-600 to-rose-600',
      emoji: '🌸',
      gradient: 'from-pink-500 to-rose-500',
      icon: <FaHeart className="text-pink-500" />,
      wallpaper: 'radial-gradient(circle at 30% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)',
      quote: "She remembered who she was and the game changed.",
      sound: 'soft chimes',
      pattern: '🌸 🌸 🌸',
      accentColor: '#ec4899',
      secondaryColor: '#f43f5e'
    },
    man: {
      primary: 'from-blue-500 to-cyan-500',
      secondary: 'from-blue-400 to-cyan-400',
      accent: 'blue-500',
      light: 'blue-50',
      dark: 'blue-900',
      bg: 'bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200',
      darkBg: 'bg-gradient-to-br from-blue-950 via-cyan-950 to-blue-900',
      card: 'bg-white/80 backdrop-blur-md',
      darkCard: 'bg-black/30 backdrop-blur-md',
      text: 'text-blue-900',
      darkText: 'text-blue-100',
      border: 'border-blue-200',
      darkBorder: 'border-blue-800',
      button: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      buttonHover: 'from-blue-600 to-cyan-600',
      emoji: '🌊',
      gradient: 'from-blue-500 to-cyan-500',
      icon: <FaLeaf className="text-blue-500" />,
      wallpaper: 'radial-gradient(circle at 70% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
      quote: "Real strength is vulnerability.",
      sound: 'ocean waves',
      pattern: '🌊 🌊 🌊',
      accentColor: '#3b82f6',
      secondaryColor: '#06b6d4'
    },
    nonbinary: {
      primary: 'from-purple-500 to-violet-500',
      secondary: 'from-purple-400 to-violet-400',
      accent: 'purple-500',
      light: 'purple-50',
      dark: 'purple-900',
      bg: 'bg-gradient-to-br from-purple-100 via-violet-100 to-purple-200',
      darkBg: 'bg-gradient-to-br from-purple-950 via-violet-950 to-purple-900',
      card: 'bg-white/80 backdrop-blur-md',
      darkCard: 'bg-black/30 backdrop-blur-md',
      text: 'text-purple-900',
      darkText: 'text-purple-100',
      border: 'border-purple-200',
      darkBorder: 'border-purple-800',
      button: 'bg-gradient-to-r from-purple-500 to-violet-500',
      buttonHover: 'from-purple-600 to-violet-600',
      emoji: '✨',
      gradient: 'from-purple-500 to-violet-500',
      icon: <FaHandHoldingHeart className="text-purple-500" />,
      wallpaper: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 60%)',
      quote: "You are valid. You are real. You belong.",
      sound: 'gentle hum',
      pattern: '✨ ✨ ✨',
      accentColor: '#a855f7',
      secondaryColor: '#8b5cf6'
    }
  };

  const theme = themes[gender];

  // Mood options with colors
  const moods = [
    { emoji: '😊', label: 'Happy', color: 'yellow-400', bg: 'bg-yellow-400/20', border: 'border-yellow-400', icon: <FaSmile className="text-yellow-500" /> },
    { emoji: '😌', label: 'Calm', color: 'blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400', icon: <FaMeh className="text-blue-500" /> },
    { emoji: '😔', label: 'Sad', color: 'indigo-400', bg: 'bg-indigo-400/20', border: 'border-indigo-400', icon: <FaFrown className="text-indigo-500" /> },
    { emoji: '😤', label: 'Angry', color: 'red-400', bg: 'bg-red-400/20', border: 'border-red-400', icon: <FaAngry className="text-red-500" /> },
    { emoji: '😰', label: 'Anxious', color: 'purple-400', bg: 'bg-purple-400/20', border: 'border-purple-400', icon: <FaSadTear className="text-purple-500" /> },
    { emoji: '🥰', label: 'Loved', color: 'pink-400', bg: 'bg-pink-400/20', border: 'border-pink-400', icon: <FaHeart className="text-pink-500" /> },
    { emoji: '😴', label: 'Tired', color: 'gray-400', bg: 'bg-gray-400/20', border: 'border-gray-400', icon: <FaMoon className="text-gray-500" /> },
    { emoji: '🤔', label: 'Confused', color: 'amber-400', bg: 'bg-amber-400/20', border: 'border-amber-400', icon: <FaMeh className="text-amber-500" /> }
  ];

  // Affirmations based on gender
  const affirmations = {
    woman: [
      "You are enough, exactly as you are.",
      "Your voice matters. Your story matters.",
      "You don't need to shrink to make others comfortable.",
      "Rest is productive. You deserve peace.",
      "You are allowed to take up space.",
      "Your feelings are valid, always.",
      "You are stronger than you know.",
      "Self-love is your superpower."
    ],
    man: [
      "Real strength is being vulnerable.",
      "You are more than your achievements.",
      "It's okay to not be okay.",
      "Asking for help is brave.",
      "Your feelings make you human, not weak.",
      "You deserve love and connection.",
      "Rest is not failure. It's fuel.",
      "You are enough, right now."
    ],
    nonbinary: [
      "You are valid. You are real.",
      "Your identity is beautiful.",
      "You belong exactly where you are.",
      "You don't owe anyone an explanation.",
      "Your existence is resistance.",
      "You are worthy of love and respect.",
      "The right people will celebrate you.",
      "You are not alone. We see you."
    ]
  };

  // Quick tips based on gender
  const quickTips = {
    woman: [
      { text: "You're allowed to take up space", icon: "💫", color: "pink" },
      { text: "No is a complete sentence", icon: "✋", color: "rose" },
      { text: "Rest is productive", icon: "😴", color: "purple" },
      { text: "Your feelings are valid", icon: "💕", color: "red" },
      { text: "You don't have to be nice all the time", icon: "🦋", color: "fuchsia" }
    ],
    man: [
      { text: "Real strength is vulnerability", icon: "💪", color: "blue" },
      { text: "It's okay to ask for help", icon: "🤝", color: "cyan" },
      { text: "You are more than your job", icon: "🌱", color: "green" },
      { text: "Emotions are human", icon: "💧", color: "indigo" },
      { text: "You don't have to be strong alone", icon: "🫂", color: "teal" }
    ],
    nonbinary: [
      { text: "You are valid", icon: "✨", color: "purple" },
      { text: "You belong here", icon: "🏳️‍🌈", color: "violet" },
      { text: "Your identity is real", icon: "💫", color: "indigo" },
      { text: "You don't need permission", icon: "🦋", color: "fuchsia" },
      { text: "Your community exists", icon: "🤗", color: "pink" }
    ]
  };

  // Resources
  const resources = {
    woman: [
      { name: "Women's Helpline", number: "1800-XXX-XXXX", icon: "📞", color: "pink" },
      { name: "Domestic Violence Support", number: "1800-XXX-XXXX", icon: "🛡️", color: "rose" },
      { name: "Women's Therapy Network", number: "Online", icon: "💻", color: "purple" },
      { name: "Mental Health Support", number: "1800-XXX-XXXX", icon: "🧠", color: "fuchsia" }
    ],
    man: [
      { name: "Men's Mental Health", number: "1800-XXX-XXXX", icon: "📞", color: "blue" },
      { name: "Fatherhood Support", number: "1800-XXX-XXXX", icon: "👨‍👦", color: "cyan" },
      { name: "Anger Management", number: "Online", icon: "💻", color: "indigo" },
      { name: "Crisis Support", number: "1800-XXX-XXXX", icon: "🆘", color: "teal" }
    ],
    nonbinary: [
      { name: "LGBTQ+ Helpline", number: "1800-XXX-XXXX", icon: "📞", color: "purple" },
      { name: "Gender Identity Support", number: "1800-XXX-XXXX", icon: "🦋", color: "violet" },
      { name: "Queer Therapy Network", number: "Online", icon: "💻", color: "fuchsia" },
      { name: "Trans Lifeline", number: "1800-XXX-XXXX", icon: "🏳️‍⚧️", color: "indigo" }
    ]
  };

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [thought]);

  // Breathing exercise
  useEffect(() => {
    if (breathingExercise) {
      const interval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [breathingExercise]);

  // Initialize with welcome message
  useEffect(() => {
    setChatMessages([
      {
        sender: 'ai',
        text: `Hi there! I'm your MANAS companion. How are you feeling today?`,
        time: new Date(),
        read: true
      }
    ]);
    // Set random affirmation
    const randomAffirmation = affirmations[gender][Math.floor(Math.random() * affirmations[gender].length)];
    setAffirmation(randomAffirmation);
  }, []);

  // Update affirmation when gender changes
  useEffect(() => {
    const randomAffirmation = affirmations[gender][Math.floor(Math.random() * affirmations[gender].length)];
    setAffirmation(randomAffirmation);
  }, [gender]);

  // Filter journal entries
  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood;
    return matchesSearch && matchesMood;
  });

  // AI Chat response generator - SMART VERSION
  const getAIResponse = (message: string, gender: string) => {
    const lower = message.toLowerCase();
    
    // COMPLIMENT RESPONSES
    if (lower.includes('cute') || lower.includes('beautiful') || lower.includes('pretty') || lower.includes('handsome') || lower.includes('good looking')) {
      const responses = [
        "That's wonderful! Your external beauty reflects your inner light. What do you love most about your appearance? ✨",
        "I'm so glad you're feeling good about yourself! You deserve to feel confident and beautiful. What's your favorite feature? 💕",
        "Self-love is powerful! Remember, your worth goes beyond looks - but it's great you're appreciating yourself today. 🌸",
        "You ARE cute! And what makes you even more beautiful is how you see yourself. Tell me more about that feeling! 😊"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // SADNESS RESPONSES
    if (lower.includes('sad') || lower.includes('depressed') || lower.includes('down') || lower.includes('low')) {
      const responses = [
        "I hear your sadness. It's okay to not be okay. What do you think triggered this feeling? 💙",
        "Being sad is part of being human. I'm here with you. Would you like to talk about what's making you feel this way? 🫂",
        "Those heavy feelings are valid. Sometimes just naming them helps. Can you describe the sadness? 🌧️",
        "You're not alone in feeling this. Many people understand. What would help you feel even 1% better right now? 💜"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // ANXIETY RESPONSES
    if (lower.includes('anxious') || lower.includes('worry') || lower.includes('scared') || lower.includes('fear') || lower.includes('nervous')) {
      const responses = [
        "Anxiety is tough. Let's take a breath together. In... hold... out. What's at the root of this worry? 🫁",
        "I hear your anxiety. Sometimes writing down what you're anxious about can help. Want to try? 📝",
        "Those anxious feelings are real. Remember: thoughts aren't facts. What's one small thing that could bring comfort? 🌿",
        "You're safe right now. Take a moment to notice 3 things you can see around you. Ground yourself with me. 🌈"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // ANGER RESPONSES
    if (lower.includes('angry') || lower.includes('mad') || lower.includes('pissed') || lower.includes('furious')) {
      const responses = [
        "Anger often protects deeper feelings. What's really underneath the anger? Hurt? Fear? Let's explore. 🔥",
        "Your anger is valid. It tells you something matters to you. What do you think it's trying to protect? ⚡",
        "I hear your frustration. Sometimes moving your body helps - a walk, a stretch. Want to try together? 🏃",
        "Anger is energy. How can we channel it into something that serves you? What do you need right now? 💪"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // LONELINESS RESPONSES
    if (lower.includes('alone') || lower.includes('lonely') || lower.includes('nobody') || lower.includes('no one')) {
      const responses = [
        "Loneliness hurts deeply. You're not alone in feeling this way - and I'm here with you right now. 🤗",
        "That feeling of being alone is so heavy. What would connection look like to you right now? 💫",
        "You matter, even when it doesn't feel that way. Is there someone you could reach out to, even just to say hi? 📱",
        "Being lonely doesn't mean you're unworthy of connection. Your people are out there. What kind of community do you long for? 🏡"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // LOVE/HAPPINESS RESPONSES
    if (lower.includes('love') || lower.includes('happy') || lower.includes('joy') || lower.includes('grateful') || lower.includes('blessed')) {
      const responses = [
        "Joy looks beautiful on you! What's bringing you this happiness today? Let's savor it together. 🌈",
        "I'm so glad you're feeling this! These moments are precious. How can you carry this feeling with you? 💖",
        "Love and happiness - what wonderful feelings! Tell me more about what's creating this in your life. ✨",
        "This is beautiful! Gratitude multiplies joy. What else are you grateful for right now? 🌟"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // GUILT RESPONSES
    if (lower.includes('guilty') || lower.includes('sorry') || lower.includes('apologize') || lower.includes('shouldn\'t')) {
      const responses = [
        "Guilt can be heavy. Are you feeling guilty about something specific, or is it a general feeling? 💭",
        "You don't need to apologize for having feelings. What's making you feel this guilt? 🫂",
        "Sometimes we carry guilt that isn't ours to hold. Is this guilt coming from you or from what others expect? 🌱",
        "Guilt tells us we care. But you deserve compassion too. What would you tell a friend feeling this way? 💕"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // TIRED/EXHAUSTED RESPONSES
    if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('burnout') || lower.includes('drained')) {
      const responses = [
        "Rest is not a reward - it's a need. When did you last truly rest? 😴",
        "Your exhaustion is valid. What would it look like to give yourself permission to pause? 🌙",
        "Burnout is real. Your body is asking for care. What's one tiny act of rest you can give yourself right now? 🛌",
        "You've been carrying so much. Let's take a moment just to breathe together. You deserve this pause. 🌿"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // DEFAULT - varied responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me more about how that feels? 🫂",
      "I'm listening. What else is coming up for you right now? 🌼",
      "That's important. How long have you been feeling this way? 📝",
      "I appreciate you opening up. What do you need most in this moment? 💫",
      "Thank you for trusting me. How can I best support you right now? 🤗",
      "I hear you. Let's sit with that feeling together for a moment. 🌿",
      "That's real. What would help you feel even slightly better? 🌈",
      "You're doing important work by expressing this. What's underneath that feeling? 💭",
      "Your feelings are valid. Tell me more about what's going on. 🫂",
      "I'm here with you. What's on your heart right now? 💕"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Send chat message
  const sendChatMessage = () => {
    if (!newMessage.trim()) return;
    
    setIsTyping(true);
    const userMsg = { sender: 'user' as const, text: newMessage, time: new Date(), read: true };
    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');
    
    setTimeout(() => {
      const aiResponse = getAIResponse(newMessage, gender);
      setChatMessages(prev => [...prev, { 
        sender: 'ai', 
        text: aiResponse, 
        time: new Date(), 
        read: true 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  // Add journal entry
  const addJournalEntry = () => {
    if (!thought.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      title: thought.split(' ').slice(0, 5).join(' ') + '...',
      content: thought,
      date: new Date(),
      mood: currentMood,
      tags: [gender]
    };
    
    setJournalEntries([newEntry, ...journalEntries]);
    setThought('');
    setStreak(prev => prev + 1);
    setShowMoodPicker(false);
  };

  // Analyze thought
  const analyzeThought = () => {
    if (!thought.trim()) return;
    setLoading(true);
    
    setTimeout(() => {
      const responses = {
        woman: [
          {
            type: "Good Girl Syndrome",
            confidence: 94,
            origin: "From childhood messages: 'be nice', 'adjust', 'don't make waves'. Your mother and grandmother likely received the same conditioning.",
            rewrite: "You are allowed to say no. You are allowed to be 'too much'. You are allowed to exist exactly as you are.",
            practices: ["Practice saying no to small things", "Notice when you apologize unnecessarily", "Give yourself permission to rest"]
          },
          {
            type: "Imposter Syndrome",
            confidence: 87,
            origin: "Society tells women they need to be 200% qualified. Men apply with 60% confidence. You've internalized this impossible standard.",
            rewrite: "You earned your place. Doubt is not truth – it's conditioning. You belong here.",
            practices: ["List your achievements daily", "Notice when you minimize your success", "Accept compliments fully"]
          },
          {
            type: "People-Pleasing Burnout",
            confidence: 91,
            origin: "Women are taught their worth = how much they give. You've been pouring from an empty cup.",
            rewrite: "You can't pour from an empty cup. Rest is not selfish – it's survival. Your needs matter too.",
            practices: ["Schedule 'me time'", "Practice saying 'I need'", "Let others step up"]
          },
          {
            type: "Body Image Pressure",
            confidence: 89,
            origin: "From media, family, society: your value is in your appearance. This is a multi-billion dollar industry built on your insecurity.",
            rewrite: "Your body is not a project. It carries you, protects you, lets you experience life. You are beautiful.",
            practices: ["Unfollow accounts that make you feel bad", "Wear what makes YOU feel good", "Thank your body daily"]
          }
        ],
        man: [
          {
            type: "Provider Pressure",
            confidence: 92,
            origin: "Men are told their worth = their income. Your father carried this burden silently. His father too. It's a generational weight.",
            rewrite: "Your value is not in your paycheck. You are enough – working or not, providing or not.",
            practices: ["Separate identity from job", "Talk about money fears", "Define success yourself"]
          },
          {
            type: "Emotional Suppression",
            confidence: 88,
            origin: "Since childhood: 'boys don't cry', 'man up', 'be strong'. You learned to hide your heart to survive.",
            rewrite: "Feeling is human. Tears are healing. Real strength is letting yourself be vulnerable.",
            practices: ["Journal your feelings", "Cry if you need to", "Tell someone how you feel"]
          },
          {
            type: "Toxic Independence",
            confidence: 85,
            origin: "Men are taught needing help = weakness. This leads to isolation and silent suffering.",
            rewrite: "Connection is strength. Asking for help is brave. No one does it alone.",
            practices: ["Reach out to one friend", "Share a struggle", "Accept help"]
          },
          {
            type: "Success Anxiety",
            confidence: 86,
            origin: "Fear of not being 'man enough' if you're not achieving, climbing, winning.",
            rewrite: "You are enough in stillness too. Rest is allowed. Being is enough.",
            practices: ["Celebrate non-work wins", "Take guilt-free breaks", "Redefine success"]
          }
        ],
        nonbinary: [
          {
            type: "Identity Invalidation",
            confidence: 93,
            origin: "Constant messages your identity isn't real. Lack of representation. Family rejection. Society's binary cage.",
            rewrite: "Your identity is real because YOU are real. You don't need anyone's permission to exist.",
            practices: ["Find your community", "Affirm yourself daily", "Surround yourself with validation"]
          },
          {
            type: "Isolation",
            confidence: 86,
            origin: "Feeling you don't belong in male spaces OR female spaces. It's exhausting to navigate.",
            rewrite: "You belong exactly where you are. Your community exists – we're here.",
            practices: ["Connect with LGBTQ+ groups", "Create your own space", "Know you're not alone"]
          },
          {
            type: "Coming Out Fatigue",
            confidence: 90,
            origin: "Having to explain yourself over and over. Constant education. It's draining.",
            rewrite: "You don't owe anyone an explanation. Your existence is enough.",
            practices: ["Set boundaries on explaining", "Rest after coming out", "Find those who just get it"]
          },
          {
            type: "Visibility Anxiety",
            confidence: 84,
            origin: "Fear of being seen, judged, harassed for being yourself.",
            rewrite: "You deserve to take up space. Your visibility helps others feel less alone.",
            practices: ["Start with safe spaces", "Small steps in visibility", "Connect with visible role models"]
          }
        ]
      };

      const genderResponses = responses[gender];
      const randomResponse = genderResponses[Math.floor(Math.random() * genderResponses.length)];
      
      setResult(randomResponse);
      setLoading(false);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }, 2000);
  };

  // Get new affirmation
  const getNewAffirmation = () => {
    const randomAffirmation = affirmations[gender][Math.floor(Math.random() * affirmations[gender].length)];
    setAffirmation(randomAffirmation);
    setShowAffirmation(true);
    setTimeout(() => setShowAffirmation(false), 3000);
  };

  // Don't render until after hydration to prevent mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen ${darkMode ? theme.darkBg : theme.bg} transition-all duration-500 relative overflow-x-hidden`}>
      {/* Animated background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: theme.wallpaper }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => {
          const leftPositions = [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80, 90, 12];
          const topPositions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 15, 25, 35, 45, 55, 65, 75, 85, 95, 5, 18];
          const delays = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5];
          
          return (
            <motion.div
              key={i}
              className="absolute text-4xl opacity-10"
              style={{
                left: `${leftPositions[i]}%`,
                top: `${topPositions[i]}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: delays[i % delays.length],
                ease: "easeInOut"
              }}
            >
              {theme.emoji}
            </motion.div>
          );
        })}
      </div>

      {/* Top Navigation Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-black/40' : 'bg-white/40'} backdrop-blur-xl border-b ${darkMode ? theme.darkBorder : theme.border}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with animation */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                {theme.emoji}
              </motion.span>
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${theme.primary} text-transparent bg-clip-text`}>
                MANAS
              </h2>
            </motion.div>

            {/* Right side icons */}
            <div className="flex items-center gap-3">
              {/* Affirmation button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={getNewAffirmation}
                className={`relative p-2 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/10'} hover:bg-opacity-20 transition-all`}
              >
                <FaMagic className={darkMode ? 'text-purple-300' : 'text-purple-600'} />
                {showAffirmation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-full right-0 mt-2 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm whitespace-nowrap z-50 shadow-xl"
                  >
                    {affirmation}
                  </motion.div>
                )}
              </motion.button>

              {/* Dark mode toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/10'} hover:bg-opacity-20 transition-all`}
              >
                {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-indigo-400" />}
              </motion.button>

              {/* Sound toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setVolume(!volume)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/10'} hover:bg-opacity-20 transition-all`}
              >
                {volume ? <FaVolumeUp className="text-green-400" /> : <FaVolumeMute className="text-red-400" />}
              </motion.button>

              {/* Breathing exercise button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowBreathingModal(true)}
                className={`p-2 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/10'} hover:bg-opacity-20 transition-all`}
              >
                <FaWind className={darkMode ? 'text-blue-300' : 'text-blue-600'} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 container mx-auto px-4 max-w-6xl relative z-10">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"></div>
          <div className="flex items-center gap-4">
            <div className={`text-5xl p-3 rounded-xl bg-gradient-to-r ${theme.primary} text-white`}>
              {theme.emoji}
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Welcome back!
              </h1>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {affirmation}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Gender Selector - Beautiful Cards */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { id: 'woman', label: 'Woman', emoji: '👩', gradient: 'from-pink-500 to-rose-500', shadow: 'shadow-pink-500/30' },
            { id: 'man', label: 'Man', emoji: '👨', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/30' },
            { id: 'nonbinary', label: 'Non-binary', emoji: '✨', gradient: 'from-purple-500 to-violet-500', shadow: 'shadow-purple-500/30' }
          ].map((g) => (
            <motion.button
              key={g.id}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setGender(g.id as any)}
              className="relative group"
            >
              <motion.div
                animate={gender === g.id ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`absolute inset-0 bg-gradient-to-r ${g.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity ${gender === g.id ? 'opacity-70' : ''}`}
              />
              <div className={`relative px-8 py-4 rounded-2xl backdrop-blur-xl border-2 transition-all ${
                gender === g.id
                  ? `bg-gradient-to-r ${g.gradient} border-white/30 shadow-xl ${g.shadow}`
                  : `${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/40 border-black/10'}`
              }`}>
                <span className="text-3xl mr-3">{g.emoji}</span>
                <span className={`font-semibold text-lg ${gender === g.id ? 'text-white' : darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {g.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <FaFire className="text-orange-500" />, label: 'Streak', value: `${streak} days`, gradient: 'from-orange-500 to-red-500' },
            { icon: <FaBook className="text-blue-500" />, label: 'Journal', value: journalEntries.length, gradient: 'from-blue-500 to-cyan-500' },
            { icon: <FaHeart className="text-pink-500" />, label: 'Community', value: '24 online', gradient: 'from-pink-500 to-rose-500' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-4 rounded-xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'home', label: 'Home', icon: <FaHome />, color: 'pink' },
            { id: 'chat', label: 'Chat', icon: <FaComments />, color: 'blue' },
            { id: 'journal', label: 'Journal', icon: <FaBook />, color: 'purple' },
            { id: 'community', label: 'Community', icon: <FaUsers />, color: 'green' },
            { id: 'resources', label: 'Resources', icon: <FaHandHoldingHeart />, color: 'orange' },
            { id: 'profile', label: 'Profile', icon: <FaUser />, color: 'indigo' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                  : `${darkMode ? 'bg-white/10 text-gray-300 hover:bg-white/20' : 'bg-black/10 text-gray-600 hover:bg-black/20'}`
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === 'chat' && notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Main Content Area with Animations */}
        <AnimatePresence mode="wait">
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Quote Card */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className={`p-8 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} relative overflow-hidden`}
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
                <FaQuoteLeft className={`absolute top-4 left-4 text-4xl ${darkMode ? 'text-white/20' : 'text-black/20'}`} />
                <FaQuoteRight className={`absolute bottom-4 right-4 text-4xl ${darkMode ? 'text-white/20' : 'text-black/20'}`} />
                <p className={`text-2xl font-light italic text-center relative z-10 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  "{theme.quote}"
                </p>
              </motion.div>

              {/* Thought Input Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border}`}
              >
                <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${theme.primary}`}></span>
                  What's on your mind?
                </h3>
                <textarea
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="Share your thoughts freely..."
                  className={`w-full p-4 rounded-xl ${darkMode ? 'bg-white/10 text-white placeholder-gray-500' : 'bg-black/5 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-${theme.accent} resize-none transition-all`}
                  rows={4}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={analyzeThought}
                    disabled={loading}
                    className={`px-6 py-2 rounded-xl bg-gradient-to-r ${theme.primary} text-white font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaMagic /> Analyze
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addJournalEntry}
                    disabled={!thought.trim()}
                    className={`px-6 py-2 rounded-xl ${darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-gray-800 hover:bg-black/20'} font-semibold disabled:opacity-50 transition-all flex items-center gap-2`}
                  >
                    <FaBook /> Save
                  </motion.button>
                </div>
              </motion.div>

              {/* Result Card */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    ref={resultRef}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl animate-pulse">🔍</span>
                          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Conditioning Detected
                          </h3>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`px-4 py-2 rounded-full bg-gradient-to-r ${theme.primary} text-white font-bold shadow-lg`}
                        >
                          {result.confidence}% Match
                        </motion.div>
                      </div>

                      <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r ${theme.gradient} text-transparent bg-clip-text`}>
                        {result.type}
                      </h2>

                      <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-white/10' : 'bg-black/5'} border-l-4 border-${theme.accent}`}>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                          <span>📜</span> Origin
                        </p>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{result.origin}</p>
                      </div>

                      <div className={`p-4 rounded-xl bg-gradient-to-r ${theme.primary}/20 border border-${theme.accent}/30`}>
                        <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                          <span>💪</span> Healthy Rewrite
                        </p>
                        <p className={`text-xl font-light italic ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          "{result.rewrite}"
                        </p>
                      </div>

                      {/* Healing Practices */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
                        {result.practices?.map((practice: string, i: number) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className={`p-2 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-black/5'} text-center text-sm`}
                          >
                            {practice}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickTips[gender].map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`p-4 rounded-xl ${darkMode ? 'bg-black/20' : 'bg-white/30'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} flex items-center gap-3 cursor-pointer transition-all`}
                  >
                    <span className="text-3xl">{tip.icon}</span>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tip.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CHAT TAB - BEAUTIFUL CHAT INTERFACE */}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`h-[600px] flex flex-col rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} overflow-hidden`}
            >
              {/* Chat Header */}
              <div className={`p-4 border-b ${darkMode ? theme.darkBorder : theme.border} flex items-center gap-3 bg-gradient-to-r ${theme.primary} bg-opacity-10`}>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-2xl shadow-lg`}>
                  <FaRobot className="text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    MANAS Companion
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <p className="text-sm text-green-500">Online • Here for you</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center mr-2 text-sm shadow-lg`}>
                        <FaRobot className="text-white text-xs" />
                      </div>
                    )}
                    <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? `bg-gradient-to-r ${theme.primary} text-white rounded-br-none shadow-lg`
                          : `${darkMode ? 'bg-white/20' : 'bg-white/60'} rounded-bl-none shadow-md`
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'} ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {format(msg.time, 'hh:mm a')}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-sm shadow-lg`}>
                      <FaRobot className="text-white text-xs" />
                    </div>
                    <div className={`p-3 rounded-2xl ${darkMode ? 'bg-white/20' : 'bg-white/60'} rounded-bl-none flex gap-1`}>
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className={`p-4 border-t ${darkMode ? theme.darkBorder : theme.border}`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type your message..."
                    className={`flex-1 p-3 rounded-xl ${darkMode ? 'bg-white/10 text-white placeholder-gray-500' : 'bg-black/5 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-${theme.accent} transition-all`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendChatMessage}
                    disabled={!newMessage.trim()}
                    className={`p-3 rounded-xl bg-gradient-to-r ${theme.primary} text-white disabled:opacity-50 shadow-lg hover:shadow-xl transition-all`}
                  >
                    <FaPaperPlane />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* JOURNAL TAB */}
          {activeTab === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full pl-10 pr-4 p-3 rounded-xl ${darkMode ? 'bg-white/10 text-white placeholder-gray-500' : 'bg-black/5 text-gray-800 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-${theme.accent} transition-all`}
                  />
                </div>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className={`p-3 rounded-xl ${darkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-gray-800'} focus:outline-none focus:ring-2 focus:ring-${theme.accent} transition-all`}
                >
                  <option value="all">All Moods</option>
                  {moods.map(mood => (
                    <option key={mood.emoji} value={mood.emoji}>{mood.emoji} {mood.label}</option>
                  ))}
                </select>
              </div>

              {/* Journal Entries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} relative overflow-hidden group`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${theme.primary} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-4xl">{entry.mood}</span>
                      <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {format(entry.date, 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {entry.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-1">
                        {entry.tags.map((tag, i) => (
                          <span key={i} className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${theme.primary} text-white`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'} transition-all`}>
                        <FaEdit className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredEntries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-8 text-center rounded-2xl ${darkMode ? 'bg-black/20' : 'bg-white/30'} backdrop-blur-md`}
                >
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    No journal entries yet. Start writing on the Home tab! ✨
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* COMMUNITY TAB */}
          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { name: "Women's Circle", members: 234, time: "7 PM Today", emoji: "👩", color: "pink" },
                { name: "Men's Mental Health", members: 189, time: "8 PM Today", emoji: "👨", color: "blue" },
                { name: "Non-binary Support", members: 156, time: "6 PM Today", emoji: "✨", color: "purple" },
                { name: "Anxiety Warriors", members: 312, time: "5 PM Today", emoji: "🫂", color: "indigo" },
                { name: "Mindfulness Group", members: 178, time: "9 AM Tomorrow", emoji: "🧘", color: "green" },
                { name: "Healing Together", members: 267, time: "4 PM Today", emoji: "💕", color: "rose" }
              ].map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} cursor-pointer group`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${group.color}-500 to-${group.color}-600 flex items-center justify-center text-2xl`}>
                      {group.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{group.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          👥 {group.members} members
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          🕐 {group.time}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-${group.color}-500 to-${group.color}-600 text-white text-sm font-semibold`}
                      >
                        Join Group
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* RESOURCES TAB */}
          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {resources[gender].map((res, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} cursor-pointer group`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${res.color}-500 to-${res.color}-600 flex items-center justify-center text-2xl`}>
                      {res.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{res.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{res.number}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Breathing Exercise Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowBreathingModal(true)}
                className={`col-span-2 p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border} cursor-pointer group`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                    <FaWind />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>Guided Breathing Exercise</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tap to start a 5-minute calming session</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-6 rounded-2xl ${darkMode ? 'bg-black/30' : 'bg-white/40'} backdrop-blur-md border ${darkMode ? theme.darkBorder : theme.border}`}
            >
              <div className="flex items-center gap-6 mb-8">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-4xl shadow-xl`}>
                  {gender === 'woman' ? '👩' : gender === 'man' ? '👨' : '✨'}
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Your Profile</h2>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Member since {format(new Date(), 'MMMM yyyy')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Journal Entries', value: journalEntries.length, icon: <FaBook />, color: 'blue' },
                  { label: 'Healing Streak', value: `${streak} days`, icon: <FaFire />, color: 'orange' },
                  { label: 'Chat Sessions', value: chatMessages.length, icon: <FaComments />, color: 'green' },
                  { label: 'Community Posts', value: '12', icon: <FaUsers />, color: 'purple' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-xl ${darkMode ? 'bg-white/10' : 'bg-black/5'} text-center`}
                  >
                    <div className={`text-2xl mb-2 text-${stat.color}-500`}>{stat.icon}</div>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Settings */}
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h3>
              <div className="space-y-2">
                {[
                  { icon: <FaBell />, label: 'Notifications', value: 'On' },
                  { icon: <FaLock />, label: 'Privacy', value: 'Private' },
                  { icon: <FaShieldAlt />, label: 'Security', value: '2FA Off' },
                  { icon: <FaGlobe />, label: 'Language', value: 'English' }
                ].map((setting, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-${i === 0 ? 'blue' : i === 1 ? 'purple' : i === 2 ? 'green' : 'orange'}-500`}>
                        {setting.icon}
                      </span>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{setting.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{setting.value}</span>
                      <FaCog className="text-gray-500" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2026 MANAS • Healing gender conditioning together • {theme.pattern}
          </p>
        </motion.div>
      </div>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowBreathingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className={`max-w-md w-full p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Guided Breathing
              </h2>
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    scale: breathingExercise
                      ? breathPhase === 'inhale' ? [1, 1.5] : breathPhase === 'exhale' ? [1.5, 1] : 1.5
                      : 1
                  }}
                  transition={{ duration: 4 }}
                  className={`w-40 h-40 rounded-full bg-gradient-to-r ${theme.primary} flex items-center justify-center text-white text-2xl`}
                >
                  {breathingExercise ? (
                    breathPhase === 'inhale' ? '🌬️' : breathPhase === 'hold' ? '✨' : '💨'
                  ) : (
                    '🌿'
                  )}
                </motion.div>
              </div>
              <p className={`text-center text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {breathingExercise ? (
                  breathPhase === 'inhale' ? 'Breathe In...' : breathPhase === 'hold' ? 'Hold...' : 'Breathe Out...'
                ) : (
                  'Ready to begin?'
                )}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setBreathingExercise(!breathingExercise)}
                  className={`flex-1 px-6 py-3 rounded-xl bg-gradient-to-r ${theme.primary} text-white font-semibold`}
                >
                  {breathingExercise ? 'Stop' : 'Start'}
                </button>
                <button
                  onClick={() => {
                    setShowBreathingModal(false);
                    setBreathingExercise(false);
                  }}
                  className={`flex-1 px-6 py-3 rounded-xl ${darkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-800'}`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
