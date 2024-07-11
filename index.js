/*

   ironbrew2-deobfuscator
   -----------------------
   i know the code isn't 
   the best lol. i dont 
   code like this 
   anymore

   it was pretty fun to
   make, it can do stuff
   on default generated 
   samples, i guess

   this is really bad,
   and it shouldn't
   be private anymore
   
   2022-2023
   -----------------------
*/

const Parser = require("./AST/parser");  
const Matching = require("./Utilities/matching");
const Deserializer = require("./Bytecode Library/deserializer");
const Solve = require("./Utilities/solve");
const Optimizer = require("./Bytecode Library/optimizer");
const Writer = require("./Bytecode Library/serializer");

module.exports = async function(Script, Callback) {
    const AST = Parser.parse(Script);
    
    const _Matching = new Matching(AST);
    _Matching.Initiate();

    const _Deserializer = new Deserializer(Solve(_Matching.Bytestring, _Matching.PrimaryXorKey), _Matching.ConstantMapping, _Matching.ChunkMapping, _Matching.IXorKey1, _Matching.IXorKey2);
    const Chunk = _Deserializer.DecodeChunk();
    _Matching.Finish(Chunk);

    const _Optimizer = new Optimizer();
    _Optimizer.Finish(Chunk);  

    const _Writer = new Writer();
    _Writer.Initiate(Chunk);
    
    return Callback(_Writer.Finish());
}
