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

    console.log(Chunk)
    
    return Callback(_Writer.Finish());
}