// Comfort messages for different emotions
export const comfortMessages = {
  cemas: [
    "Tenang... bahkan superhero juga kadang deg-degan kok 🦸‍♀️",
    "Kecemasan itu cuma pikiran yang lagi drama queen 👑",
    "Plot twist: kamu lebih kuat dari yang kamu kira 💪",
    "Dunia gak akan berakhir karena kamu nervous, promise! 🌍",
    "Anxiety is just excitement without breath - so breathe! 🌬️",
    "Kamu gak sendirian, bahkan Einstein juga pernah cemas lho 🧠",
    "Your mind is like a browser with 100 tabs open - close some! 🖥️",
    "Kecemasan itu cuma alarm palsu di otak, matiin aja 🚨",
    "Fun fact: worry is like rocking chair - lots of movement, no progress 🪑",
    "Kamu udah survive 100% dari hari-hari terburukmu sejauh ini ✨",
    "Breathe in peace, breathe out chaos 🌸",
    "Cemas itu normal, tapi jangan sampai jadi full-time job ya 😅",
  ],

  stres: [
    "Kamu udah hebat bertahan sampai sejauh ini 💪",
    "Even Google butuh refresh kadang-kadang 🔄",
    "Stress is just spice of life - but don't overseasoning! 🌶️",
    "Kamu gak harus jadi superman/superwoman setiap hari kok 🦸",
    "Plot twist: istirahat itu produktif juga lho 😴",
    "Your to-do list can wait, your mental health can't 📝",
    "Kamu manusia, bukan robot. Butuh charging juga 🔋",
    "Overwhelmed? Remember: one step at a time 👣",
    "Stress spelled backwards is desserts - treat yourself! 🍰",
    "Kamu gak sendirian carry beban ini, minta bantuan ya 🤝",
    "Progress over perfection, always 📈",
    "Your worth isn't measured by your productivity 💎",
  ],

  sedih: [
    "Hujan juga akan berhenti kok, begitu juga air matamu 🌈",
    "Kamu boleh nangis, tapi jangan lupa tersenyum besok 😊",
    "Sadness is love with nowhere to go - find a new place for it 💙",
    "It's okay to not be okay - healing isn't linear 🌱",
    "Kamu lebih resilient dari yang kamu kira 🦋",
    "This too shall pass, but your strength is permanent ⭐",
    "Tears are the rain that helps your soul grow 🌧️",
    "You're not broken, you're breaking open to let light in ✨",
    "Sedih itu bukti kamu punya hati yang besar 💖",
    "Your feelings are valid, and so is your healing 🌸",
    "Tomorrow is a new page in your story 📖",
    "Kamu deserve semua kebahagiaan di dunia ini 🌻",
  ],

  marah: [
    "Tarik napas... kamu too cool untuk drama ini 😎",
    "Channel energi marahmu jadi motivasi aja 💪",
    "Anger is just passion in need of direction 🎯",
    "Marah itu kayak pegang bara api buat lempar orang lain 🔥",
    "You have every right to feel angry, just don't stay there 🚪",
    "Transform your anger into your superpower 🦸‍♀️",
    "Breathe it out before you burn it down 🌬️",
    "Your energy is too precious to waste on toxic people 💎",
    "Anger is temporary, but your peace is permanent ☮️",
    "Rise above the situation that's trying to bring you down 🚀",
    "Don't let someone else's behavior control your emotions 🎮",
    "You're the CEO of your own feelings - fire the negativity! 👔",
  ],

  bingung: [
    "Overthinking itu hobi yang gak menghasilkan apa-apa 🤯",
    "Kadang jawaban terbaik itu 'ya udah lah' 🤷‍♀️",
    "Your brain has too many tabs open - time to close some! 🖥️",
    "Not all questions need answers right now 🤔",
    "Sometimes the best decision is no decision (for now) ⏰",
    "Confusion is the beginning of wisdom - you're on the right track 🧭",
    "Your mind is like a washing machine - stop the spin cycle! 🌀",
    "Overthinking is the art of creating problems that don't exist 🎨",
    "Trust the process, even when you can't see the path 🛤️",
    "It's okay to not have all the answers - nobody does! 🤷",
    "Your intuition knows more than your anxiety thinks 💡",
    "Sometimes you gotta let your heart lead, not your head 💝",
  ],

  bahagia: [
    "Look at you, choosing happiness! Keep that energy! ✨",
    "Your positive vibes are contagious - spread them around! 🌟",
    "Happiness looks good on you, wear it more often 😊",
    "You're literally glowing right now - keep shining! 🌞",
    "This is your reminder that good things are coming 🎁",
    "Your joy is your strength - never forget that 💪",
    "Gratitude turns what we have into enough 🙏",
    "You're creating beautiful moments just by being you 🌺",
  ],

  netral: [
    "Terima kasih sudah sharing. Kamu sudah berani! 💙",
    "Menulis itu salah satu bentuk self-care terbaik 📝",
    "Your thoughts matter, and so do you ✨",
    "Sometimes we just need a safe space - this is yours 🏠",
    "You're taking steps toward healing, and that's beautiful 🌱",
    "Your journey is unique, and that's perfectly okay 🛤️",
  ],
};

// Function to get random comfort message based on emotion
export const getRandomComfortMessage = (emotion) => {
  const messages = comfortMessages[emotion] || comfortMessages.netral;
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// Function to get background class based on emotion
export const getEmotionBackground = (emotion) => {
  const backgrounds = {
    cemas: "bg-cemas",
    stres: "bg-stres",
    sedih: "bg-sedih",
    marah: "bg-marah",
    bingung: "bg-bingung",
    bahagia: "bg-bahagia",
  };

  return (
    backgrounds[emotion] || "bg-gradient-to-br from-blue-400 to-purple-500"
  );
};

// Function to get emotion-specific styling
export const getEmotionStyles = (emotion) => {
  const styles = {
    cemas: {
      textColor: "text-white",
      cardBg: "bg-white/10 backdrop-blur-lg",
      buttonColor: "bg-white/20 hover:bg-white/30",
    },
    stres: {
      textColor: "text-white",
      cardBg: "bg-white/10 backdrop-blur-lg",
      buttonColor: "bg-white/20 hover:bg-white/30",
    },
    sedih: {
      textColor: "text-white",
      cardBg: "bg-white/10 backdrop-blur-lg",
      buttonColor: "bg-white/20 hover:bg-white/30",
    },
    marah: {
      textColor: "text-white",
      cardBg: "bg-white/10 backdrop-blur-lg",
      buttonColor: "bg-white/20 hover:bg-white/30",
    },
    bingung: {
      textColor: "text-white",
      cardBg: "bg-white/10 backdrop-blur-lg",
      buttonColor: "bg-white/20 hover:bg-white/30",
    },
    bahagia: {
      textColor: "text-gray-800",
      cardBg: "bg-white/20 backdrop-blur-lg",
      buttonColor: "bg-white/30 hover:bg-white/40",
    },
  };

  return styles[emotion] || styles.cemas;
};
