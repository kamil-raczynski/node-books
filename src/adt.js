const Result = require('folktale/result');
const union = require('folktale/adt/union/union');
const Equality = require('folktale/adt/union/derivations/equality');
const Serialization = require('folktale/adt/union/derivations/serialization');

const ok = Result.Ok("data");
const error = Result.Error("sth bad");

ok.map(x => x + "!").chain(x => Result.Ok(x + "!")).map(console.log);

const Maybe = require("folktale/maybe");

const just = Maybe.Just("data");
const nothing = Maybe.Nothing();

just.map(x => x + "!").chain(x => Maybe.Just(x + "!")).map(console.log);

console.log(Result.Ok(3).equals(Result.Ok(3)));
console.log(Result.Ok(3).toJSON());


const Score = union('Score', {
    Ten(){ return 10;  },
    Fourty() { return 40 }
});
Score.derive(Equality, Serialization);

const ten = Score.Ten();

console.log(Score.Ten().equals(Score.Ten()));
console.log(Score.Ten().toJSON());
