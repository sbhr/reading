var Team = /** @class */ (function () {
    function Team(name) {
        this.name = name;
        this.member = [];
    }
    Team.prototype.enlistment = function (hero) {
        this.member.push(hero);
    };
    Team.prototype.teamIntroduction = function () {
        console.log("We are " + this.name);
        if (this.member.length > 0) {
            console.log("=== Team Member ===");
            for (var _i = 0, _a = this.member; _i < _a.length; _i++) {
                var hero = _a[_i];
                console.log(greeter(hero));
            }
        }
    };
    return Team;
}());
function greeter(hero) {
    return "Hello, I'm " + hero.trueName + ", a.k.a " + hero.name;
}
var avengers = new Team("Avengers");
avengers.teamIntroduction();
avengers.enlistment({ name: "Ironman", trueName: "Tony Stark" });
avengers.enlistment({ name: "Captain America", trueName: "Steve Rogers" });
avengers.teamIntroduction();
//# sourceMappingURL=sample.js.map