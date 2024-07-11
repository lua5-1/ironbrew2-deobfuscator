module.exports = class {
    Chunk;
    
    Type;
    Value;
    Enum;
    Opcode;

    Data;

    A;
    B;
    C;

    constructor(Chunk) {
        this.Chunk = Chunk;

        this.Data = 0;
        
        this.A = 0;
        this.B = 0;
        this.C = 0;
    }
}
