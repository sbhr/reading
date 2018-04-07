import * as chai from 'chai';
import * as typemoq from "typemoq";
import { HeroDb } from '../src/hero-db';
import { HeroManager } from '../src/hero-manager';

describe('HeroManager', () => {
    describe('isMarvel', () => {
        const heroDb = new HeroDb();
        const heroManager = new HeroManager(heroDb);

        it('marvel なら true をかえす', () => {
            const hero = {
                name: 'Ironman',
                comic: 'marvel'
            };
            chai.expect(heroManager.isMarvel(hero)).to.be.true;
        });

        it('marvel ではないなら false をかえす', () => {
            const hero = {
                name: 'Batman',
                comic: 'dc'
            };
            chai.expect(heroManager.isMarvel(hero)).to.be.false;
        });
    });
    describe('getMarvelGeros', () => {
        const marvelHeros = [
            { name: 'Ironman', comic: 'marvel' },
            { name: 'Captain America', comic: 'marvel' }
        ];

        it('marvel のヒーローが取得できる', () => {
            // モックを作る
            const dbMock: typemoq.IMock<HeroDb> = typemoq.Mock.ofType<HeroDb>();
            // marvel が引数できたら marvelHeros を返す
            dbMock.setup(x => x.findByComic(typemoq.It.isValue('marvel'))).returns(() => marvelHeros);

            const heroManager = new HeroManager(dbMock.object);
            chai.expect(heroManager.getMarvelHeros()).to.deep.equal(marvelHeros);

            dbMock.verifyAll();
        });
    });
});