export const data = [
  { group: 1, word: "shit", meaning: "ขี้", sentence: "A is a shit." },
  {
    group: 2,
    word: "hell",
    meaning: "นรก",
    sentence: "What the hell is that?",
  },
  {
    group: 3,
    word: "damn",
    meaning: "บ้าจริง",
    sentence: "Damn, I forgot my keys.",
  },
  {
    group: 2,
    word: "crap",
    meaning: "เรื่องไร้สาระ",
    sentence: "This is a bunch of crap.",
  },
  {
    group: 4,
    word: "bastard",
    meaning: "ไอ้สารเลว",
    sentence: "That bastard lied to me.",
  },
  {
    group: 6,
    word: "jerk",
    meaning: "ไอ้เลว",
    sentence: "Don’t be such a jerk.",
  },
  {
    group: 2,
    word: "asshole",
    meaning: "ไอ้เวร",
    sentence: "He acted like a total asshole.",
  },
  {
    group: 1,
    word: "freak",
    meaning: "คนประหลาด",
    sentence: "He’s a control freak.",
  },
  {
    group: 5,
    word: "loser",
    meaning: "คนขี้แพ้",
    sentence: "Stop acting like a loser.",
  },
  { group: 7, word: "dumb", meaning: "โง่", sentence: "That was a dumb idea." },
];

export const getUniqueGroup = () => {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    let word = data[i];
    if (!arr.includes(word.group)) {
      arr.push(word.group);
    }
  }
  return arr;
};
