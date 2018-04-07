interface Hero {
    name: string;
    trueName: string;
}

class Team {
    name: string;
    member: Hero[];
    constructor(name: string) {
        this.name = name;
        this.member = [];
    }
    public enlistment(hero: Hero): void {
        this.member.push(hero);
    }
    public teamIntroduction(): void {
        console.log(`We are ${this.name}`);
        if (this.member.length > 0) {
            console.log("=== Team Member ===");
            for (const hero of this.member) {
                console.log(greeter(hero));
            }
        }
    }
}

function greeter(hero: Hero): string {
    return `Hello, I'm ${hero.trueName}, a.k.a ${hero.name}`;
}

const avengers = new Team("Avengers");
avengers.teamIntroduction();
avengers.enlistment({ name: "Ironman", trueName: "Tony Stark" });
avengers.enlistment({ name: "Captain America", trueName: "Steve Rogers" });
avengers.teamIntroduction();