import { Hero } from './hero';

export class HeroDb {
    constructor() {
    }

    public findByComic(comic: string): Hero[] {
        throw new Error('DBなんてないよ');
    }
}