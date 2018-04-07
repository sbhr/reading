import { Hero } from './hero';
import { HeroDb } from './hero-db';

export class HeroManager {
    constructor(private db: HeroDb) {
    }

    /**
     * <p>与えられたヒーローがMarvelならtrueを返す</p>
     * @param {hero} Hero
     * @returns {boolean} true なら marvel
     */
    public isMarvel(hero: Hero): boolean {
        return hero.comic === 'marvel';
    }

    /**
     * Marvelのヒーロー達を返す
     * @returns {Hero[]} ヒーロー配列
     */
    public getMarvelHeros(): Hero[] {
        const heros = this.db.findByComic('marvel');
        return heros;
    }
}