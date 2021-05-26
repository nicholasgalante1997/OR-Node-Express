const fortuneCookies = [
  'I am a fortune',
  'I am also a fortune',
  "Guess what? I'm a fortune too",
];

exports.getFortune = () => {
  const index = Math.floor(Math.random() * fortuneCookies.length);
  return fortuneCookies[index];
};
