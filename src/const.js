export const FILM_INFO = {
  title: [
    {name: `The Dance of Life`, original: `The Dance of Life`},
    {name: `Santa Claus Conquers the Martians`, original: `Santa Claus Conquers the Martians`},
    {name: `Sagebrush Trail`, original: `Sagebrush Trail`},
    {name: `Рик и Морти`, original: `Rick and Morty`},
  ],
  description: [
    `Сериал повествует о необыкновенных и весёлых приключениях двух лучших друзей: мальчика Финна и его собаки Джейка.`,
    `Действие сериала происходит в волшебной стране Ууу. Финн - 13-летний мальчик, который обожает путешествовать и спасать принцесс из лап ужасных монстров и злодеев, населяющих Землю Ууу.`,
    `В центре сюжета - школьник по имени Морти и его дедушка Рик. Морти - самый обычный мальчик, который ничем не отличается от своих сверстников. А вот его дедуля занимается необычными научными исследованиями и зачастую полностью неадекватен.`
  ],
  poster: [
    `made-for-each-other.png`,
    `sagebrush-trail.jpg`,
    `the-dance-of-life.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `popeye-meets-sinbad.png`,
    `the-man-with-the-golden-arm.jpg`,
  ],
  genres: [
    [`Drama`, `Film-Noir`, `Mystery`],
    `Musical`,
    `Comedy`,
  ],
  directors: [`Anthony Mann`, `Quentin Tarantino`, `Tim Burton`, `Pedro Almodóvar`],
  actors: [
    [`Kevin Spacey`, `Anne Hathaway`, `Brad Pitt`, `Rachel McAdams`],
    [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`],
    [`Leonardo DiCaprio`, `Joseph Gordon-Levitt`, `Elliot Page`]
  ],
  writers: [[`Joel Coen`, `Martin Scorsese`], `Woody Allen`, `Francis Ford Coppola`],
  country: [`USA`, `Italy`, `France`, `Great Britain`]
};

export const COMMENTS = {
  author: [`John Doe`, `Anton Dolin`, `Cococo`, `Jane Doe`],
  text: [`Interesting setting and a good cast`, `Boring`, `Not bad`, `Very very old. Meh`],
  commentedAt: [`2019/12/31 04:59`, `2018/10/14 10:59`, `2020/12/01 23:59`, `2020/07/12 20:34`],
  emoji: [`smile`, `sleeping`, `puke`, `angry`],
};

export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date-down`,
  RATING_UP: `rating-up`
};
