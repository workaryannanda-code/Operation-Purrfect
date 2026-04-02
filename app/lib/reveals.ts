export interface Reveal {
  step: number;
  unlockIST: string;
  title: string;
  teaserText: string;
  gifUrl: string;
  message: string;
  activityHint: string;
}

export const reveals: Reveal[] = [
  {
    step: 1,
    unlockIST: "2026-03-31T18:00:00+05:30",
    title: "Step 1: The Grand Entrance 🌹",
    teaserText: "Something (and someone) is on their way...",
    gifUrl: "https://media.giphy.com/media/3o7TKvPGVQNlViGSda/giphy.gif",
    message: `Okay, before you think this is an April Fool's prank — it's not. (Well. Maybe a little. But mostly not.)\n\nOn April 11th, our anniversary, I'm showing up at your PG with a bouquet. Yes, actual flowers. Yes, roses. I know you love lilies. I know. But roses are red, lilies are expensive, and you're worth every single petal. 🌹\n\nOne year together, Tannu. And this is just the beginning.\n\n— Your personal chauffeur (and biggest fan) 🐾`,
    activityHint: "🌹 Roses. PG pickup. A surprise arrival.",
  },
  {
    step: 2,
    unlockIST: "2026-04-03T00:00:00+05:30",
    title: "Step 2: Pick Your Café ✨",
    teaserText: "Step 2 is fancy. You might want to plan an outfit... 👀",
    gifUrl: "https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif",
    message: `You deserve a fairy tale. So I found five — literally.\n\nYou get to pick the café, Tannu. Here are your options:\n\n1. Café Wink\n2. Café Dori\n3. Diggin\n4. Café Tesu\n5. Café Vagabond\n\nJust tell me which one, and I'll take you somewhere a little magical. Come hungry, come happy.\n\nThe cat approves of all these venues. High paw rating across the board. 🐱✨`,
    activityHint: "🧁 Pick your café. 5 options. Your call.",
  },
  {
    step: 3,
    unlockIST: "2026-04-05T00:00:00+05:30",
    title: "Step 3: The Great Escape 🍦",
    teaserText: "Step 3 is breezy. Literally.",
    gifUrl: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
    message: `We're going somewhere with open skies and good vibes. Could be India Gate. Could be Talkatora Park. Either way — it's going to be beautiful.\n\nAlso, there may or may not be ice cream involved. (There will be ice cream. There is always ice cream.)\n\nPack your curiosity and your best candid-photo smile. One year together and still finding new places to explore. 🍦🌿`,
    activityHint: "🌿 Open skies, a nice drive, and something cold & sweet.",
  },
  {
    step: 4,
    unlockIST: "2026-04-07T00:00:00+05:30",
    title: "Step 4: One More Scoop 🍦",
    teaserText: "Almost there. One last sweet secret...",
    gifUrl: "https://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif",
    message: `The day is almost here — but we're not done yet.\n\nOn the way back, we're making one more stop. Cold. Creamy. Completely non-negotiable.\n\nBecause some things in life are mandatory. Ice cream on an anniversary trip is one of them. 🍦🐾\n\n(Only four days until our one year. The cat is vibrating with excitement.)`,
    activityHint: "🍦 One final detour. Worth it.",
  },
  {
    step: 5,
    unlockIST: "2026-04-09T00:00:00+05:30",
    title: "Step 5: Happy Anniversary, Tannu 🎂🍫",
    teaserText: "Two days to go 🎂 Open this. Right now.",
    gifUrl: "https://media.giphy.com/media/g9582DNuQppxC/giphy.gif",
    message: `And here we are. The final chapter — for now.\n\nOn April 11th, our one year anniversary, I'm dropping you home with a very big chocolate, because every love story deserves a perfect chapter. And because you deserve all the good things, always.\n\nThank you for the best year of my life. Thank you for being you. Happy almost anniversary, Tannu. 🎂🍫\n\nP.S. The cat says happy anniversary too. Actually, the cat said "meow" — but we both know that means exactly the same thing. 🐱\n\n— Aryan 🌹`,
    activityHint: "🍫 A big chocolate. A bigger hug. One year down. Forever to go.",
  },
];

export function isUnlocked(unlockIST: string): boolean {
  return new Date() >= new Date(unlockIST);
}

export function timeUntil(unlockIST: string): number {
  return new Date(unlockIST).getTime() - Date.now();
}
